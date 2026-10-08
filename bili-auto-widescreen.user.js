// ==UserScript==
// @name         B站自动宽屏居中
// @namespace    https://github.com/tygxr/bili-auto-widescreen
// @version      2.6.2
// @description  进入视频页自动宽屏并将播放器垂直居中...
// @author       deepseek网页版专业模式
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/list/*
// @match        https://www.bilibili.com/bangumi/play/*
// @match        https://bangumi.bilibili.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/tygxr/bili-auto-widescreen/main/bili-auto-widescreen.user.js
// @updateURL    https://raw.githubusercontent.com/tygxr/bili-auto-widescreen/main/bili-auto-widescreen.user.js
// ==/UserScript==

/* ========== 更新日志 ==========

* v2.6.2: 切换标签页再回来时不再关闭小窗

* v2.6.1: 修复切换标签页再回来时重新居中，播放器滚出视口时跳过居中，避免评论区切回被拉回

* v2.6.0: 用动态稳定性检测替代固定等待，响应更快且不打架

 * ========== 更新日志结束 ========== */


(function () {
    'use strict';

    // ==================== 配置项 ====================
    const DEFAULT_CONFIG = {
        mode: 'widescreen',
        enabled: true,
        playerCenterOffset: 90,
        iconHidden: false
    };
    const DEFAULT_PLAYER_CENTER_OFFSET = 90;
    const OFFSET_STEP = 1;
    const DEBOUNCE_DELAY = 200;
    const URL_CHECK_DELAY = 500;
    const FINAL_CHECK_DELAY = 400;
    const SCROLL_ANIMATION_DURATION = 500;
    const OBSERVER_MAX_WAIT_TIME = 15000;
    const SCRIPT_VERSION = '2.6.2';

    const WIDE_SETTLE_DELAY = 300;

    // ====== 动态稳定性检测参数 ======
    const WATCH_INIT_DELAY = 300;
    const WATCH_CHECK_INTERVAL = 400;
    const WATCH_STABLE_THRESHOLD = 3;
    const WATCH_MAX_WAIT = 5000;
    const WATCH_MIN_CLICK_INTERVAL = 2000;

    const RETRY_TIMES = 20;
    const RETRY_INTERVAL = 2000;

    // ==================== 状态变量 ====================
    let elements = {
        wideBtn: null,
        webFullBtn: null,
        fullBtn: null,
        player: null,
        playerContainer: null,
        _wideObserver: null
    };
    let isEnabled = GM_getValue('enableWideScreen', DEFAULT_CONFIG.enabled);
    let currentMode = GM_getValue('mode', DEFAULT_CONFIG.mode);
    let playerCenterOffset = GM_getValue('playerCenterOffset', DEFAULT_PLAYER_CENTER_OFFSET);
    let currentUrl = window.location.href;
    let initTimeout = null;
    let reInitScheduled = false;
    let lastScrollTime = 0;
    let isScrolling = false;
    let registeredCommandIds = [];
    let coreElementsObserver = null;
    let observerTimeoutId = null;
    let settingsPanel = null;
    let settingsOverlay = null;
    let savedOffsetOnOpen = null;
    let ensureTimer = null;

    // ==================== 工具函数 ====================
    function getConfig() {
        return {
            mode: GM_getValue('mode', DEFAULT_CONFIG.mode),
            enabled: GM_getValue('enableWideScreen', DEFAULT_CONFIG.enabled),
            playerCenterOffset: GM_getValue('playerCenterOffset', DEFAULT_PLAYER_CENTER_OFFSET),
            iconHidden: GM_getValue('iconHidden', false)
        };
    }

    /**
     * 检测小窗模式是否激活。
     * 覆盖三种情况：
     * 1. 浏览器原生画中画（document.pictureInPictureElement）
     * 2. B站自己的小窗（.bpx-player-mini / data-screen="mini"）
     * 3. 播放器容器被移动到悬浮小窗
     */
    function isMiniPlayerActive() {
        // 浏览器原生画中画
        if (document.pictureInPictureElement) return true;
        if (document.webkitPictureInPictureElement) return true;

        // B站自己的小窗容器
        if (document.querySelector('.bpx-player-mini')) return true;
        if (document.querySelector('.bilibili-player-mini')) return true;

        // 播放器容器的 data-screen 属性为 mini
        const container = document.querySelector('.bpx-player-container');
        if (container) {
            const screenMode = container.getAttribute('data-screen');
            if (screenMode === 'mini') return true;
        }

        // 播放器元素上有 mini 相关 class
        const player = document.querySelector('#bilibili-player');
        if (player && (player.classList.contains('mini') || player.classList.contains('bpx-player-mini'))) return true;

        return false;
    }

    function isCurrentlyWide() {
        if (!elements.wideBtn) return false;
        const isWide = elements.wideBtn.classList.contains('bpx-state-entered');
        const isWebFull = elements.webFullBtn && elements.webFullBtn.classList.contains('bpx-state-entered');
        const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement);
        return isWide && !isWebFull && !isFull;
    }

    function isCurrentlyWebFull() {
        if (!elements.webFullBtn) return false;
        return elements.webFullBtn.classList.contains('bpx-state-entered');
    }

    function isCurrentlyFullscreen() {
        return !!(document.fullscreenElement || document.webkitFullscreenElement);
    }

    function isInTargetMode() {
        if (currentMode === 'widescreen') return isCurrentlyWide();
        if (currentMode === 'fullscreen') return isCurrentlyWebFull() || isCurrentlyFullscreen();
        return false;
    }

    // ==================== 设置面板 ====================
    function createSettingsPanel() {
        if (settingsPanel) return;

        GM_addStyle(`
            #bili-wide-settings-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.45); z-index: 100000;
                opacity: 0; transition: opacity 0.2s ease;
                pointer-events: none;
            }
            #bili-wide-settings-overlay.visible { opacity: 1; pointer-events: auto; }
            #bili-wide-settings-trigger {
                position: fixed; bottom: 20px; left: 20px; z-index: 99999;
                width: 36px; height: 36px; border-radius: 50%;
                background: rgba(255,255,255,0.85); border: 1px solid #e3e5e7;
                display: flex; align-items: center; justify-content: center;
                cursor: pointer; transition: all 0.2s ease;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            #bili-wide-settings-trigger:hover {
                background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,0.18);
                transform: scale(1.08);
            }
            #bili-wide-settings-trigger svg { width: 18px; height: 18px; fill: #61666d; transition: fill 0.2s ease; }
            #bili-wide-settings-trigger:hover svg { fill: #00a1d6; }
            #bili-wide-settings-panel {
                position: fixed; bottom: 70px; left: 20px; z-index: 100001;
                width: 340px; background: #fff; border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.18);
                transform: translateY(12px) scale(0.96);
                opacity: 0; pointer-events: none;
                transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
                font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
                overflow: hidden;
            }
            #bili-wide-settings-panel.visible { transform: translateY(0) scale(1); opacity: 1; pointer-events: auto; }
            .bwsp-header { padding: 16px 20px 12px; border-bottom: 1px solid #e3e5e7; display: flex; align-items: center; justify-content: space-between; }
            .bwsp-header h3 { margin: 0; font-size: 15px; font-weight: 600; color: #18191c; letter-spacing: 0.3px; }
            .bwsp-close { width: 28px; height: 28px; border-radius: 6px; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
            .bwsp-close:hover { background: #f1f2f3; }
            .bwsp-close svg { width: 14px; height: 14px; fill: #9499a0; }
            .bwsp-close:hover svg { fill: #61666d; }
            .bwsp-body { padding: 16px 20px; }
            .bwsp-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; }
            .bwsp-row + .bwsp-row { border-top: 1px solid #f1f2f3; }
            .bwsp-label { font-size: 13px; color: #18191c; font-weight: 500; }
            .bwsp-hint { font-size: 11px; color: #9499a0; margin-top: 2px; }
            .bwsp-switch { position: relative; width: 40px; height: 22px; cursor: pointer; flex-shrink: 0; }
            .bwsp-switch input { opacity: 0; width: 0; height: 0; }
            .bwsp-switch-slider { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: #c9ccd0; border-radius: 11px; transition: background 0.25s; }
            .bwsp-switch-slider::before { content: ''; position: absolute; width: 18px; height: 18px; left: 2px; top: 2px; background: #fff; border-radius: 50%; transition: transform 0.25s; box-shadow: 0 1px 3px rgba(0,0,0,0.15); }
            .bwsp-switch input:checked + .bwsp-switch-slider { background: #00a1d6; }
            .bwsp-switch input:checked + .bwsp-switch-slider::before { transform: translateX(18px); }
            .bwsp-select { padding: 6px 10px; border: 1px solid #e3e5e7; border-radius: 6px; font-size: 13px; color: #18191c; background: #fff; cursor: pointer; outline: none; transition: border-color 0.2s; min-width: 120px; }
            .bwsp-select:focus { border-color: #00a1d6; }
            .bwsp-num-group { display: flex; align-items: center; gap: 4px; }
            .bwsp-num-btn { width: 28px; height: 28px; border-radius: 6px; border: 1px solid #e3e5e7; background: #fff; font-size: 16px; font-weight: 600; color: #61666d; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; line-height: 1; padding: 0; }
            .bwsp-num-btn:hover { border-color: #00a1d6; color: #00a1d6; background: #f0f8ff; }
            .bwsp-num-btn:active { transform: scale(0.92); }
            .bwsp-num-input { width: 60px; height: 28px; border: 1px solid #e3e5e7; border-radius: 6px; text-align: center; font-size: 13px; color: #18191c; outline: none; transition: border-color 0.2s; -moz-appearance: textfield; }
            .bwsp-num-input::-webkit-inner-spin-button, .bwsp-num-input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
            .bwsp-num-input:focus { border-color: #00a1d6; }
            .bwsp-px { font-size: 12px; color: #9499a0; margin-left: 2px; }
            .bwsp-footer { padding: 12px 20px 16px; display: flex; gap: 8px; justify-content: flex-end; }
            .bwsp-btn { height: 32px; padding: 0 16px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1px solid #e3e5e7; background: #fff; color: #18191c; transition: all 0.15s; }
            .bwsp-btn:hover { border-color: #00a1d6; color: #00a1d6; }
            .bwsp-btn-primary { background: #00a1d6; color: #fff; border-color: #00a1d6; }
            .bwsp-btn-primary:hover { background: #00b5e6; border-color: #00b5e6; color: #fff; }
        `);

        settingsOverlay = document.createElement('div');
        settingsOverlay.id = 'bili-wide-settings-overlay';
        document.body.appendChild(settingsOverlay);

        const trigger = document.createElement('div');
        trigger.id = 'bili-wide-settings-trigger';
        trigger.innerHTML = `<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z"/></svg>`;
        trigger.title = 'B站自动宽屏居中 - 设置';
        if (GM_getValue('iconHidden', false)) trigger.style.display = 'none';
        document.body.appendChild(trigger);
        trigger.addEventListener('click', toggleSettingsPanel);

        settingsPanel = document.createElement('div');
        settingsPanel.id = 'bili-wide-settings-panel';

        const cfg = getConfig();

        settingsPanel.innerHTML = `
            <div class="bwsp-header">
                <h3>B站自动宽屏居中 设置</h3>
                <button class="bwsp-close" id="bwsp-close-btn">
                    <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </button>
            </div>
            <div class="bwsp-body">
                <div class="bwsp-row">
                    <div>
                        <div class="bwsp-label">启用自动模式</div>
                        <div class="bwsp-hint">进入视频页自动切换宽屏/全屏；小窗模式下不干预</div>
                    </div>
                    <label class="bwsp-switch">
                        <input type="checkbox" id="bwsp-enabled" ${cfg.enabled ? 'checked' : ''}>
                        <span class="bwsp-switch-slider"></span>
                    </label>
                </div>
                <div class="bwsp-row">
                    <div>
                        <div class="bwsp-label">模式选择</div>
                        <div class="bwsp-hint">宽屏 = 网页内放大；网页全屏 = 占满浏览器窗口</div>
                    </div>
                    <select class="bwsp-select" id="bwsp-mode">
                        <option value="widescreen" ${cfg.mode === 'widescreen' ? 'selected' : ''}>自动宽屏</option>
                        <option value="fullscreen" ${cfg.mode === 'fullscreen' ? 'selected' : ''}>自动网页全屏</option>
                    </select>
                </div>
                <div class="bwsp-row">
                    <div>
                        <div class="bwsp-label">居中偏移量</div>
                        <div class="bwsp-hint">播放器垂直居中的偏移像素值</div>
                    </div>
                    <div class="bwsp-num-group">
                        <button class="bwsp-num-btn" id="bwsp-offset-minus">−</button>
                        <input type="number" class="bwsp-num-input" id="bwsp-offset-input" value="${cfg.playerCenterOffset}" min="0" max="999">
                        <button class="bwsp-num-btn" id="bwsp-offset-plus">+</button>
                        <span class="bwsp-px">px</span>
                    </div>
                </div>
            </div>
            <div class="bwsp-footer">
                <button class="bwsp-btn" id="bwsp-reset-btn">恢复默认</button>
                <button class="bwsp-btn bwsp-btn-primary" id="bwsp-save-refresh-btn">保存并刷新</button>
            </div>
        `;
        document.body.appendChild(settingsPanel);

        document.getElementById('bwsp-close-btn').addEventListener('click', toggleSettingsPanel);
        settingsOverlay.addEventListener('click', toggleSettingsPanel);

        document.getElementById('bwsp-offset-minus').addEventListener('click', () => {
            const input = document.getElementById('bwsp-offset-input');
            const v = parseInt(input.value) || 0;
            input.value = Math.max(0, v - OFFSET_STEP);
            previewOffset();
        });
        document.getElementById('bwsp-offset-plus').addEventListener('click', () => {
            const input = document.getElementById('bwsp-offset-input');
            const v = parseInt(input.value) || 0;
            input.value = Math.min(999, v + OFFSET_STEP);
            previewOffset();
        });
        document.getElementById('bwsp-offset-input').addEventListener('input', previewOffset);

        document.getElementById('bwsp-reset-btn').addEventListener('click', () => {
            document.getElementById('bwsp-enabled').checked = DEFAULT_CONFIG.enabled;
            document.getElementById('bwsp-mode').value = DEFAULT_CONFIG.mode;
            document.getElementById('bwsp-offset-input').value = DEFAULT_PLAYER_CENTER_OFFSET;
            previewOffset();
        });

        document.getElementById('bwsp-save-refresh-btn').addEventListener('click', () => {
            saveSettings(true);
        });
    }

    function previewOffset() {
        const v = parseInt(document.getElementById('bwsp-offset-input').value);
        playerCenterOffset = isNaN(v) ? DEFAULT_PLAYER_CENTER_OFFSET : Math.max(0, Math.min(999, v));
        if (!elements.player) return;
        const playerRect = elements.player.getBoundingClientRect();
        if (playerRect.height > 0) {
            const playerTop = playerRect.top + window.scrollY;
            window.scrollTo({ top: playerTop - playerCenterOffset, behavior: 'instant' });
        }
    }

    function toggleSettingsPanel() {
        if (!settingsPanel) createSettingsPanel();
        const visible = settingsPanel.classList.toggle('visible');
        settingsOverlay.classList.toggle('visible', visible);
        if (visible) {
            const cfg = getConfig();
            document.getElementById('bwsp-enabled').checked = cfg.enabled;
            document.getElementById('bwsp-mode').value = cfg.mode;
            document.getElementById('bwsp-offset-input').value = cfg.playerCenterOffset;
            savedOffsetOnOpen = cfg.playerCenterOffset;
        } else {
            if (savedOffsetOnOpen !== null) {
                playerCenterOffset = savedOffsetOnOpen;
                savedOffsetOnOpen = null;
                if (elements.player) {
                    const r = elements.player.getBoundingClientRect();
                    if (r.height > 0) window.scrollTo({ top: r.top + window.scrollY - playerCenterOffset, behavior: 'instant' });
                }
            }
        }
    }

    function saveSettings(refresh) {
        const newEnabled = document.getElementById('bwsp-enabled').checked;
        const newMode = document.getElementById('bwsp-mode').value;
        const newOffset = parseInt(document.getElementById('bwsp-offset-input').value);
        const finalOffset = isNaN(newOffset) ? DEFAULT_PLAYER_CENTER_OFFSET : Math.max(0, Math.min(999, newOffset));

        GM_setValue('enableWideScreen', newEnabled);
        GM_setValue('mode', newMode);
        GM_setValue('playerCenterOffset', finalOffset);
        isEnabled = newEnabled;
        currentMode = newMode;
        playerCenterOffset = finalOffset;
        savedOffsetOnOpen = null;
        registerMenuCommands();

        if (refresh) {
            location.reload();
        } else {
            toggleSettingsPanel();
            if (isEnabled) scheduleEnsureWide();
            debouncedCheckAndScroll();
        }
    }

    // ==================== 滚动相关 ====================
    function scrollToPosition(topPosition) {
        if (isScrolling) return;
        const now = Date.now();
        if (now - lastScrollTime < 100 && Math.abs(window.scrollY - topPosition) < 5) return;
        lastScrollTime = now;
        isScrolling = true;
        window.scrollTo({ top: topPosition, behavior: 'smooth' });
        setTimeout(() => { isScrolling = false; }, SCROLL_ANIMATION_DURATION);
    }

    const scrollToPlayer = function () {
        if (!elements.player && !cacheElements()) return;
        if (!elements.player) return;

        // 小窗模式下不做任何滚动
        if (isMiniPlayerActive()) return;

        requestAnimationFrame(() => {
            const playerRect = elements.player.getBoundingClientRect();
            if (playerRect.height <= 0) return;

            const isPlayerOffscreen = playerRect.bottom < 0 || playerRect.top > window.innerHeight;
            if (isPlayerOffscreen) return;

            const playerTop = playerRect.top + window.scrollY;
            const desiredScrollTop = playerTop - playerCenterOffset;
            if (Math.abs(window.scrollY - desiredScrollTop) > 5) {
                scrollToPosition(desiredScrollTop);
            }
        });
    }

    const scrollToTop = function () {
        if (window.scrollY > 0) scrollToPosition(0);
    }

    const debouncedCheckAndScroll = (function () {
        let timeoutId;
        return function () {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                // 小窗模式下不做任何操作
                if (isMiniPlayerActive()) return;

                if (!elements.player || !elements.wideBtn) {
                    if (!cacheElements()) return;
                }
                if (isCurrentlyWide()) {
                    scrollToPlayer();
                } else if (!isCurrentlyWebFull() && !isCurrentlyFullscreen()) {
                    scrollToTop();
                }
            }, DEBOUNCE_DELAY);
        };
    })();

    // ==================== 元素缓存 ====================
    function cacheElements() {
        elements.player = document.querySelector('#bilibili-player');
        if (!elements.player) return false;
        elements.playerContainer = document.querySelector('.bpx-player-container') ||
                                   document.querySelector('#bilibiliPlayer') ||
                                   elements.player;
        if (elements.playerContainer) {
            elements.wideBtn = elements.playerContainer.querySelector('.bpx-player-ctrl-wide');
            elements.webFullBtn = elements.playerContainer.querySelector('.bpx-player-ctrl-web');
            elements.fullBtn = elements.playerContainer.querySelector('.bpx-player-ctrl-full');
        } else {
            elements.wideBtn = document.querySelector('.bpx-player-ctrl-wide');
            elements.webFullBtn = document.querySelector('.bpx-player-ctrl-web');
            elements.fullBtn = document.querySelector('.bpx-player-ctrl-full');
        }
        return !!(elements.wideBtn || elements.webFullBtn);
    }

    function observeWideState() {
        if (!elements.wideBtn) return;

        if (elements._wideObserver) {
            elements._wideObserver.disconnect();
            elements._wideObserver = null;
        }

        const handleWide = () => {
            // 小窗模式下不触发居中
            if (isMiniPlayerActive()) return;
            if (isCurrentlyWide()) {
                setTimeout(scrollToPlayer, WIDE_SETTLE_DELAY);
            }
        };

        elements._wideObserver = new MutationObserver(handleWide);
        elements._wideObserver.observe(elements.wideBtn, {
            attributes: true,
            attributeFilter: ['class']
        });

        setTimeout(handleWide, 200);
    }

    /**
     * 动态稳定性检测：连续检测到宽屏按钮 class 稳定后做决策。
     * 小窗模式下直接跳过。
     */
    function scheduleEnsureWide() {
        if (!isEnabled) return;

        if (ensureTimer) {
            clearTimeout(ensureTimer);
            ensureTimer = null;
        }

        const startTime = Date.now();
        let lastClass = null;
        let stableCount = 0;
        let lastClickTime = 0;

        const check = () => {
            // 小窗模式：停止检测，不干预
            if (isMiniPlayerActive()) {
                console.log('[B站自动宽屏居中] 检测到小窗模式，停止自动切换');
                ensureTimer = null;
                return;
            }

            if (Date.now() - startTime > WATCH_MAX_WAIT) {
                if (!isInTargetMode() && Date.now() - lastClickTime > WATCH_MIN_CLICK_INTERVAL) {
                    if (currentMode === 'widescreen' && elements.wideBtn) {
                        elements.wideBtn.click();
                        setTimeout(scrollToPlayer, WIDE_SETTLE_DELAY);
                    } else if (currentMode === 'fullscreen' && elements.webFullBtn) {
                        elements.webFullBtn.click();
                    }
                } else if (isCurrentlyWide()) {
                    setTimeout(scrollToPlayer, WIDE_SETTLE_DELAY);
                }
                ensureTimer = null;
                return;
            }

            if (!elements.wideBtn || !document.contains(elements.wideBtn)) {
                if (!cacheElements()) {
                    ensureTimer = setTimeout(check, WATCH_CHECK_INTERVAL);
                    return;
                }
                observeWideState();
                lastClass = null;
                stableCount = 0;
            }

            const currentClass = elements.wideBtn.className;

            if (currentClass === lastClass) {
                stableCount++;
            } else {
                stableCount = 0;
                lastClass = currentClass;
            }

            if (stableCount >= WATCH_STABLE_THRESHOLD) {
                if (isInTargetMode()) {
                    ensureTimer = null;
                    if (isCurrentlyWide()) setTimeout(scrollToPlayer, WIDE_SETTLE_DELAY);
                    return;
                }

                // 点击前再检查一次小窗
                if (isMiniPlayerActive()) {
                    ensureTimer = null;
                    return;
                }

                if (Date.now() - lastClickTime > WATCH_MIN_CLICK_INTERVAL) {
                    if (currentMode === 'widescreen' && elements.wideBtn) {
                        elements.wideBtn.click();
                    } else if (currentMode === 'fullscreen' && elements.webFullBtn) {
                        elements.webFullBtn.click();
                    }
                    lastClickTime = Date.now();
                    lastClass = null;
                    stableCount = 0;
                }
            }

            ensureTimer = setTimeout(check, WATCH_CHECK_INTERVAL);
        };

        ensureTimer = setTimeout(check, WATCH_INIT_DELAY);
    }

    // ==================== 事件监听 ====================
    function setupListeners() {
        if (!cacheElements()) return;

        if (elements.wideBtn) elements.wideBtn.addEventListener('click', debouncedCheckAndScroll);
        if (elements.webFullBtn) elements.webFullBtn.addEventListener('click', debouncedCheckAndScroll);
        if (elements.fullBtn) elements.fullBtn.addEventListener('click', debouncedCheckAndScroll);

        const videoArea = elements.playerContainer?.querySelector('.bpx-player-video-area');
        if (videoArea) videoArea.addEventListener('dblclick', debouncedCheckAndScroll);

        document.addEventListener('fullscreenchange', debouncedCheckAndScroll);
        document.addEventListener('webkitfullscreenchange', debouncedCheckAndScroll);
        document.addEventListener('mozfullscreenchange', debouncedCheckAndScroll);
        document.addEventListener('MSFullscreenChange', debouncedCheckAndScroll);

        document.addEventListener('keydown', handleKeyPress);
        window.addEventListener('resize', debouncedCheckAndScroll);

        observeWideState();
    }

    function removeListenersAndObserver() {
        if (elements.wideBtn) elements.wideBtn.removeEventListener('click', debouncedCheckAndScroll);
        if (elements.webFullBtn) elements.webFullBtn.removeEventListener('click', debouncedCheckAndScroll);
        if (elements.fullBtn) elements.fullBtn.removeEventListener('click', debouncedCheckAndScroll);

        const currentContainer = elements.playerContainer || document.querySelector('.bpx-player-container') || document.querySelector('#bilibiliPlayer');
        const videoArea = currentContainer?.querySelector('.bpx-player-video-area');
        if (videoArea) videoArea.removeEventListener('dblclick', debouncedCheckAndScroll);

        document.removeEventListener('fullscreenchange', debouncedCheckAndScroll);
        document.removeEventListener('webkitfullscreenchange', debouncedCheckAndScroll);
        document.removeEventListener('mozfullscreenchange', debouncedCheckAndScroll);
        document.removeEventListener('MSFullscreenChange', debouncedCheckAndScroll);

        document.removeEventListener('keydown', handleKeyPress);
        window.removeEventListener('resize', debouncedCheckAndScroll);

        if (coreElementsObserver) { coreElementsObserver.disconnect(); coreElementsObserver = null; }
        if (observerTimeoutId) { clearTimeout(observerTimeoutId); observerTimeoutId = null; }

        if (elements._wideObserver) {
            elements._wideObserver.disconnect();
            elements._wideObserver = null;
        }

        if (ensureTimer) {
            clearTimeout(ensureTimer);
            ensureTimer = null;
        }

        elements = { wideBtn: null, webFullBtn: null, fullBtn: null, player: null, playerContainer: null, _wideObserver: null };
    }

    function handleKeyPress(event) {
        if (event.key === 'Escape') debouncedCheckAndScroll();
    }

    function handleVisibilityChange() {
        if (document.visibilityState !== 'visible') return;
        if (!isTargetPage(window.location.href)) return;

        // 小窗模式下切回，什么都不做
        if (isMiniPlayerActive()) {
            console.log('[B站自动宽屏居中] 小窗模式下切回，不干预');
            return;
        }

        console.log('[B站自动宽屏居中] 标签页切回前台');

        if (isEnabled) {
            scheduleEnsureWide();
        } else {
            setTimeout(() => {
                if (isMiniPlayerActive()) return;
                if (!elements.wideBtn || !document.contains(elements.wideBtn)) {
                    cacheElements();
                }
                observeWideState();
                if (isCurrentlyWide()) scrollToPlayer();
            }, 500);
        }
    }

    // ==================== 菜单命令 ====================
    function registerMenuCommands() {
        if (typeof GM_registerMenuCommand !== 'function') return;
        if (typeof GM_unregisterMenuCommand === 'function') {
            registeredCommandIds.forEach(id => {
                try { GM_unregisterMenuCommand(id); } catch (e) {}
            });
        }
        registeredCommandIds = [];

        registeredCommandIds.push(GM_registerMenuCommand('打开设置面板', toggleSettingsPanel));

        const iconHidden = GM_getValue('iconHidden', false);
        registeredCommandIds.push(GM_registerMenuCommand(iconHidden ? '显示设置图标' : '隐藏设置图标', toggleIconVisibility));
    }

    function toggleIconVisibility() {
        const newState = !GM_getValue('iconHidden', false);
        GM_setValue('iconHidden', newState);
        const trigger = document.getElementById('bili-wide-settings-trigger');
        if (trigger) trigger.style.display = newState ? 'none' : '';
        registerMenuCommands();
    }

    // ==================== 初始化核心逻辑 ====================
    function initializeScriptLogic() {
        reInitScheduled = false;
        clearTimeout(initTimeout);
        if (coreElementsObserver) { coreElementsObserver.disconnect(); coreElementsObserver = null; }
        if (observerTimeoutId) { clearTimeout(observerTimeoutId); observerTimeoutId = null; }

        if (cacheElements()) {
            setupListeners();
            if (isEnabled) scheduleEnsureWide();
            return;
        }

        const observerCallback = function (mutationsList, observerInstance) {
            if (document.querySelector('#bilibili-player') && document.querySelector('.bpx-player-ctrl-wide')) {
                if (cacheElements()) {
                    observerInstance.disconnect();
                    clearTimeout(observerTimeoutId);
                    coreElementsObserver = null;
                    observerTimeoutId = null;

                    setupListeners();
                    if (isEnabled) scheduleEnsureWide();
                }
            }
        };

        coreElementsObserver = new MutationObserver(observerCallback);
        let targetNodeToObserve = document.getElementById('playerWrap') || document.getElementById('mirror-vdcon') || document.getElementById('app') || document.body;
        coreElementsObserver.observe(targetNodeToObserve, { childList: true, subtree: true });

        observerTimeoutId = setTimeout(() => {
            if (coreElementsObserver) {
                coreElementsObserver.disconnect();
                coreElementsObserver = null;
            }
        }, OBSERVER_MAX_WAIT_TIME);
    }

    // ==================== URL 变化处理 ====================
    function scheduleReInitialization(delay = URL_CHECK_DELAY) {
        if (reInitScheduled) return;
        reInitScheduled = true;
        clearTimeout(initTimeout);
        initTimeout = setTimeout(() => {
            removeListenersAndObserver();
            if (typeof GM_unregisterMenuCommand === 'function') {
                registeredCommandIds.forEach(id => {
                    try { GM_unregisterMenuCommand(id); } catch (e) {}
                });
                registeredCommandIds = [];
            }
            setTimeout(initializeScriptLogic, 100);
        }, delay);
    }

    function isTargetPage(url) {
        return /\/(video|list|bangumi\/play)\//.test(url);
    }

    function handleUrlChange() {
        requestAnimationFrame(() => {
            const newHref = window.location.href;
            const newPathname = window.location.pathname;

            let oldPathnameFromCurrentUrl = '/';
            if (currentUrl) {
                try {
                    oldPathnameFromCurrentUrl = new URL(currentUrl).pathname;
                } catch (e) {
                    const doubleSlashIndex = currentUrl.indexOf('//');
                    if (doubleSlashIndex !== -1) {
                        const pathStartIndex = currentUrl.indexOf('/', doubleSlashIndex + 2);
                        if (pathStartIndex !== -1) {
                            const queryIndex = currentUrl.indexOf('?', pathStartIndex);
                            const hashIndex = currentUrl.indexOf('#', pathStartIndex);
                            let endIndex = currentUrl.length;
                            if (queryIndex !== -1) endIndex = queryIndex;
                            if (hashIndex !== -1 && hashIndex < endIndex) endIndex = hashIndex;
                            oldPathnameFromCurrentUrl = currentUrl.substring(pathStartIndex, endIndex);
                        }
                    }
                }
            }

            if (newPathname !== oldPathnameFromCurrentUrl) {
                const previousFullUrl = currentUrl;
                currentUrl = newHref;

                const isNowTarget = isTargetPage(newHref);
                if (isNowTarget) {
                    scheduleReInitialization();
                } else if (isTargetPage(previousFullUrl)) {
                    removeListenersAndObserver();
                    if (typeof GM_unregisterMenuCommand === 'function') {
                        registeredCommandIds.forEach(id => { try { GM_unregisterMenuCommand(id); } catch (e) {} });
                        registeredCommandIds = [];
                    }
                    clearTimeout(initTimeout);
                    reInitScheduled = false;
                }
            } else if (newHref !== currentUrl) {
                currentUrl = newHref;
            }
        });
    }

    // ==================== 主入口 ====================
    function main() {
        isEnabled = GM_getValue('enableWideScreen', DEFAULT_CONFIG.enabled);
        currentMode = GM_getValue('mode', DEFAULT_CONFIG.mode);
        playerCenterOffset = GM_getValue('playerCenterOffset', DEFAULT_PLAYER_CENTER_OFFSET);

        if (isTargetPage(currentUrl)) {
            registerMenuCommands();
            createSettingsPanel();
        }

        window.addEventListener('popstate', handleUrlChange);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        const originalPushState = history.pushState;
        history.pushState = function (...args) {
            const result = originalPushState.apply(this, args);
            window.dispatchEvent(new CustomEvent('historystatechanged'));
            return result;
        };
        const originalReplaceState = history.replaceState;
        history.replaceState = function (...args) {
            const result = originalReplaceState.apply(this, args);
            window.dispatchEvent(new CustomEvent('historystatechanged'));
            return result;
        };
        window.addEventListener('historystatechanged', handleUrlChange);

        if (isTargetPage(currentUrl)) {
            initializeScriptLogic();
        }

        window.addEventListener('unload', () => {
            removeListenersAndObserver();
            history.pushState = originalPushState;
            history.replaceState = originalReplaceState;
            window.removeEventListener('historystatechanged', handleUrlChange);
            window.removeEventListener('popstate', handleUrlChange);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            clearTimeout(initTimeout);
            if (typeof GM_unregisterMenuCommand === 'function') {
                registeredCommandIds.forEach(id => { try { GM_unregisterMenuCommand(id); } catch (e) {} });
                registeredCommandIds = [];
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }
})();
