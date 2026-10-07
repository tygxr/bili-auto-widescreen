// ==UserScript==
// @name         B站自动宽屏居中
// @namespace    https://github.com/tygxr/bili-auto-widescreen
// @version      3.1.0
// @description  自动宽屏播放并将播放器垂直居中；默认启用；用户滚动接管；小窗模式下不干预；5秒后不再重试宽屏
// @author       DEEPSEEK
// @icon         data:image/webp;base64,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
// @license      MIT
// @match        https://*.bilibili.com/video/*
// @match        https://*.bilibili.com/list/*
// @match        https://*.bilibili.com/bangumi/play/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/tygxr/bili-auto-widescreen/main/bili-auto-widescreen.user.js
// @updateURL    https://raw.githubusercontent.com/tygxr/bili-auto-widescreen/main/bili-auto-widescreen.user.js
// ==/UserScript==

(function () {
    'use strict';

    // --- 配置项 ---
    const DEFAULT_PLAYER_CENTER_OFFSET = 90;  // 播放器垂直居中时的默认偏移量 (像素)
    const DEBOUNCE_DELAY = 200;
    const URL_CHECK_DELAY = 500;
    const FINAL_CHECK_DELAY = 300;
    const SCROLL_ANIMATION_DURATION = 500;
    const OBSERVER_MAX_WAIT_TIME = 15000;
    const HEARTBEAT_VISIBLE = 2000;
    const HEARTBEAT_HIDDEN = 3000;

    // ====== 自动宽屏窗口：3秒内基本确定结果，5秒后不再尝试 ======
    const AUTO_WIDE_MAX_RETRY = 4;            // 最大重试次数
    const AUTO_WIDE_RETRY_GAP = 1000;         // 两次尝试最小间隔
    const AUTO_WIDE_WINDOW = 5000;            // 自动宽屏重试的总时间窗口(ms)

    const USER_SCROLL_THRESHOLD = 150;
    const SCRIPT_SCROLL_GRACE = 1200;
    const OFFSET_STEP = 1;
    const SCRIPT_VERSION = '3.1.0';

    // --- 状态变量 ---
    let elements = {
        wideBtn: null,
        webFullBtn: null,
        fullBtn: null,
        player: null,
        playerContainer: null,
    };
    let isEnabled = GM_getValue('enableWideScreen', true); // 默认启用
    let playerCenterOffset = GM_getValue('playerCenterOffset', DEFAULT_PLAYER_CENTER_OFFSET);
    let currentUrl = window.location.href;
    let lastPathname = window.location.pathname;
    let initTimeout = null;
    let lastScrollTime = 0;
    let isScrolling = false;
    let currentMenuCommandText = '';

    let coreElementsObserver = null;
    let observerTimeoutId = null;

    let heartbeatId = null;
    let autoWideDone = false;
    let autoWideAttempts = 0;
    let lastAutoWideAttempt = 0;
    let autoWideStartTime = 0;

    let scriptScrollY = null;
    let lastScriptScrollTime = 0;
    let userScrolledAway = false;
    let scrollWatcherAttached = false;
    let programmaticWideClick = false;

    // 设置面板
    let settingsPanel = null;
    let settingsOverlay = null;
    let savedOffsetOnOpen = null;

    // --- 工具函数 ---

    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => { func.apply(this, args); }, delay);
        };
    }

    function scrollToPosition(topPosition, force = false) {
        if (userScrolledAway && !force) return;
        if (isScrolling) return;
        const now = Date.now();
        if (now - lastScrollTime < 100 && Math.abs(window.scrollY - topPosition) < 50) return;
        lastScrollTime = now;

        scriptScrollY = topPosition;
        lastScriptScrollTime = now;
        if (force) userScrolledAway = false;

        if (document.hidden) {
            window.scrollTo({ top: topPosition, behavior: 'auto' });
            isScrolling = false;
            return;
        }

        isScrolling = true;
        window.scrollTo({ top: topPosition, behavior: 'smooth' });
        setTimeout(() => { isScrolling = false; }, SCROLL_ANIMATION_DURATION);
    }

    function handleUserScroll() {
        if (Date.now() - lastScriptScrollTime < SCRIPT_SCROLL_GRACE) return;
        if (scriptScrollY === null) { scriptScrollY = window.scrollY; return; }
        const deviation = Math.abs(window.scrollY - scriptScrollY);
        if (deviation > USER_SCROLL_THRESHOLD) {
            if (!userScrolledAway) {
                userScrolledAway = true;
                console.log(`[B站自动宽屏居中] 用户已自行滚动 (偏离 ${Math.round(deviation)}px)，暂停自动居中/回顶。`);
            }
        } else if (userScrolledAway) {
            userScrolledAway = false;
            console.log("[B站自动宽屏居中] 用户已滚回播放器附近，恢复自动居中。");
        }
    }

    function attachScrollWatcher() {
        if (scrollWatcherAttached) return;
        window.addEventListener('scroll', handleUserScroll, { passive: true });
        scrollWatcherAttached = true;
    }

    /**
     * 检测小窗模式是否激活。小窗模式下脚本不干预任何状态。
     */
    function isMiniPlayerActive() {
        if (document.pictureInPictureElement) return true;
        if (document.webkitPictureInPictureElement) return true;
        if (document.querySelector('.bpx-player-mini')) return true;
        if (document.querySelector('.bilibili-player-mini')) return true;
        const container = document.querySelector('.bpx-player-container');
        if (container && container.getAttribute('data-screen') === 'mini') return true;
        const player = document.querySelector('#bilibili-player');
        if (player && (player.classList.contains('mini') || player.classList.contains('bpx-player-mini'))) return true;
        return false;
    }

    function scrollToPlayer(forced = false) {
        if (isMiniPlayerActive()) return;
        if (!elements.player?.isConnected && (!cacheElements() || !elements.player)) return;
        nextFrameOrTimeout(() => {
            const playerRect = elements.player.getBoundingClientRect();
            if (playerRect.height > 0) {
                const playerTop = playerRect.top + window.scrollY;
                const desiredScrollTop = playerTop - playerCenterOffset;
                if (Math.abs(window.scrollY - desiredScrollTop) > 5) {
                    scrollToPosition(desiredScrollTop, forced);
                }
            }
        });
    }

    function scrollToTop(forced = false) {
        if (window.scrollY > 0) scrollToPosition(0, forced);
    }

    function areElementsAlive() {
        return !!(elements.player && elements.player.isConnected &&
                  elements.wideBtn && elements.wideBtn.isConnected);
    }

    function nextFrameOrTimeout(fn) {
        if (document.hidden) { setTimeout(fn, 0); }
        else { requestAnimationFrame(fn); }
    }

    function refreshElements() {
        removeListenersAndObserver();
        if (!cacheElements()) return false;
        setupListeners();
        return true;
    }

    function heartbeat() {
        if (!isTargetPage(window.location.href)) return;
        if (!document.querySelector('#bilibili-player') ||
            !document.querySelector('.bpx-player-ctrl-wide')) return;

        if (!areElementsAlive()) {
            console.log("[B站自动宽屏居中] heartbeat: 检测到核心元素已失效，尝试恢复。");
            if (!refreshElements()) return;
            console.log("[B站自动宽屏居中] heartbeat: 已重建缓存与监听器。");
            resetAutoWideRetries();
            setTimeout(checkAndScroll, FINAL_CHECK_DELAY);
        }

        // 自动宽屏只在时间窗口内重试（5秒后不再尝试）
        if (isEnabled && !autoWideDone &&
            autoWideAttempts < AUTO_WIDE_MAX_RETRY &&
            Date.now() - autoWideStartTime < AUTO_WIDE_WINDOW) {
            ensureWideMode();
        }
    }

    function restartHeartbeat() {
        stopHeartbeat();
        const interval = document.hidden ? HEARTBEAT_HIDDEN : HEARTBEAT_VISIBLE;
        heartbeatId = setInterval(heartbeat, interval);
    }

    function stopHeartbeat() {
        if (heartbeatId) { clearInterval(heartbeatId); heartbeatId = null; }
    }

    function cacheElements() {
        elements.player = document.querySelector('#bilibili-player');
        if (!elements.player) return false;
        elements.playerContainer = document.querySelector('.bpx-player-container') ||
                                   document.querySelector('#bilibiliPlayer') ||
                                   elements.player;
        const scope = elements.playerContainer || document;
        elements.wideBtn = scope.querySelector('.bpx-player-ctrl-wide');
        elements.webFullBtn = scope.querySelector('.bpx-player-ctrl-web');
        elements.fullBtn = scope.querySelector('.bpx-player-ctrl-full');
        return !!elements.wideBtn;
    }

    function checkAndScroll(force) {
        const forced = (force === true);

        if (isMiniPlayerActive()) return;

        if (!areElementsAlive()) {
            if (!cacheElements() || !areElementsAlive()) {
                console.error("[B站自动宽屏居中] checkAndScroll: 核心元素缓存失败。");
                return;
            }
        }

        const isWide = elements.wideBtn.classList.contains('bpx-state-entered');
        const isWebFull = elements.webFullBtn && elements.webFullBtn.classList.contains('bpx-state-entered');
        const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);

        if (userScrolledAway && !forced) return;

        if (isWide && !isWebFull && !isFull) {
            scrollToPlayer(forced);
        } else if (!isWide && !isWebFull && !isFull) {
            scrollToTop(forced);
        }
    }

    const debouncedCheckAndScroll = debounce(checkAndScroll, DEBOUNCE_DELAY);

    function forceCheckAndScroll() { checkAndScroll(true); }

    function resetAutoWideRetries() {
        autoWideDone = false;
        autoWideAttempts = 0;
        lastAutoWideAttempt = 0;
        autoWideStartTime = Date.now();
    }

    function ensureWideMode() {
        if (!isEnabled) return;
        if (isMiniPlayerActive()) return;

        if (!areElementsAlive() && !refreshElements()) return;
        if (!elements.wideBtn) return;

        const isCurrentlyWide = elements.wideBtn.classList.contains('bpx-state-entered');
        const isWebFull = elements.webFullBtn && elements.webFullBtn.classList.contains('bpx-state-entered');
        const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement);

        if (!isCurrentlyWide && !isWebFull && !isFull) {
            const now = Date.now();
            if (now - autoWideStartTime > AUTO_WIDE_WINDOW) return;
            if (now - lastAutoWideAttempt < AUTO_WIDE_RETRY_GAP) return;
            if (autoWideAttempts >= AUTO_WIDE_MAX_RETRY) return;

            lastAutoWideAttempt = now;
            autoWideAttempts++;
            console.log(`[B站自动宽屏居中] ensureWideMode: 尝试点击宽屏 (第 ${autoWideAttempts}/${AUTO_WIDE_MAX_RETRY} 次)。`);
            programmaticWideClick = true;
            try {
                elements.wideBtn.click();
            } finally {
                programmaticWideClick = false;
            }
            setTimeout(checkAndScroll, 200);
        } else if (isCurrentlyWide && !isWebFull && !isFull) {
            if (!autoWideDone) {
                autoWideDone = true;
                console.log("[B站自动宽屏居中] ensureWideMode: 已处于宽屏模式。");
            }
            checkAndScroll();
        }
    }

    function setupListeners() {
        removeListenersAndObserver();

        if (!cacheElements()) {
            console.error("[B站自动宽屏居中] setupListeners: 核心元素查找失败。");
            return;
        }

        elements.wideBtn.addEventListener('click', handleWideBtnClick);
        if (elements.webFullBtn) elements.webFullBtn.addEventListener('click', forceCheckAndScroll);
        if (elements.fullBtn) elements.fullBtn.addEventListener('click', forceCheckAndScroll);

        const videoArea = elements.playerContainer?.querySelector('.bpx-player-video-area');
        if (videoArea) videoArea.addEventListener('dblclick', forceCheckAndScroll);

        document.addEventListener('fullscreenchange', forceCheckAndScroll);
        document.addEventListener('webkitfullscreenchange', forceCheckAndScroll);
        document.addEventListener('mozfullscreenchange', forceCheckAndScroll);
        document.addEventListener('MSFullscreenChange', forceCheckAndScroll);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setTimeout(checkAndScroll, 150);
        });
        window.addEventListener('resize', debouncedCheckAndScroll);
    }

    function removeListenersAndObserver() {
        if (elements.wideBtn) elements.wideBtn.removeEventListener('click', handleWideBtnClick);
        if (elements.webFullBtn) elements.webFullBtn.removeEventListener('click', forceCheckAndScroll);
        if (elements.fullBtn) elements.fullBtn.removeEventListener('click', forceCheckAndScroll);

        const currentContainer = elements.playerContainer || document.querySelector('.bpx-player-container') || document.querySelector('#bilibiliPlayer');
        const videoArea = currentContainer?.querySelector('.bpx-player-video-area');
        if (videoArea) videoArea.removeEventListener('dblclick', forceCheckAndScroll);

        document.removeEventListener('fullscreenchange', forceCheckAndScroll);
        document.removeEventListener('webkitfullscreenchange', forceCheckAndScroll);
        document.removeEventListener('mozfullscreenchange', forceCheckAndScroll);
        document.removeEventListener('MSFullscreenChange', forceCheckAndScroll);

        window.removeEventListener('resize', debouncedCheckAndScroll);

        if (coreElementsObserver) {
            coreElementsObserver.disconnect();
            coreElementsObserver = null;
        }
        if (observerTimeoutId) {
            clearTimeout(observerTimeoutId);
            observerTimeoutId = null;
        }

        elements = { wideBtn: null, webFullBtn: null, fullBtn: null, player: null, playerContainer: null };
    }

    // ================== 设置面板 ==================

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
                        <div class="bwsp-hint">进入视频页自动宽屏并将播放器居中</div>
                    </div>
                    <label class="bwsp-switch">
                        <input type="checkbox" id="bwsp-enabled" ${isEnabled ? 'checked' : ''}>
                        <span class="bwsp-switch-slider"></span>
                    </label>
                </div>
                <div class="bwsp-row">
                    <div>
                        <div class="bwsp-label">居中偏移量</div>
                        <div class="bwsp-hint">播放器垂直居中的偏移像素值</div>
                    </div>
                    <div class="bwsp-num-group">
                        <button class="bwsp-num-btn" id="bwsp-offset-minus">−</button>
                        <input type="number" class="bwsp-num-input" id="bwsp-offset-input" value="${playerCenterOffset}" min="0" max="999">
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

        document.getElementById('bwsp-enabled').addEventListener('change', (e) => {
            isEnabled = e.target.checked;
            GM_setValue('enableWideScreen', isEnabled);
            updateMenuCommandText();
            if (isEnabled) {
                resetAutoWideRetries();
                ensureWideMode();
            } else {
                if (elements.wideBtn?.isConnected && elements.wideBtn.classList.contains('bpx-state-entered')) {
                    programmaticWideClick = true;
                    try { elements.wideBtn.click(); } finally { programmaticWideClick = false; }
                }
                setTimeout(checkAndScroll, 100);
            }
        });

        document.getElementById('bwsp-offset-minus').addEventListener('click', () => {
            const input = document.getElementById('bwsp-offset-input');
            const v = parseInt(input.value) || 0;
            input.value = Math.max(0, v - OFFSET_STEP);
            applyOffset(input.value);
        });
        document.getElementById('bwsp-offset-plus').addEventListener('click', () => {
            const input = document.getElementById('bwsp-offset-input');
            const v = parseInt(input.value) || 0;
            input.value = Math.min(999, v + OFFSET_STEP);
            applyOffset(input.value);
        });
        document.getElementById('bwsp-offset-input').addEventListener('input', (e) => {
            applyOffset(e.target.value);
        });

        document.getElementById('bwsp-reset-btn').addEventListener('click', () => {
            document.getElementById('bwsp-enabled').checked = true;
            document.getElementById('bwsp-offset-input').value = DEFAULT_PLAYER_CENTER_OFFSET;
            isEnabled = true;
            playerCenterOffset = DEFAULT_PLAYER_CENTER_OFFSET;
            GM_setValue('enableWideScreen', true);
            GM_setValue('playerCenterOffset', DEFAULT_PLAYER_CENTER_OFFSET);
            updateMenuCommandText();
            checkAndScroll(true);
        });

        document.getElementById('bwsp-save-refresh-btn').addEventListener('click', () => {
            location.reload();
        });
    }

    function applyOffset(rawValue) {
        const v = parseInt(rawValue);
        playerCenterOffset = isNaN(v) ? DEFAULT_PLAYER_CENTER_OFFSET : Math.max(0, Math.min(999, v));
        GM_setValue('playerCenterOffset', playerCenterOffset);
        if (elements.player && elements.player.isConnected) {
            checkAndScroll(true);
        }
    }

    function toggleSettingsPanel() {
        if (!settingsPanel) createSettingsPanel();
        const visible = settingsPanel.classList.toggle('visible');
        settingsOverlay.classList.toggle('visible', visible);
        if (visible) {
            savedOffsetOnOpen = playerCenterOffset;
        } else {
            // 关闭面板时若不保存也不还原——这里保持"改了就生效"的语义，
            // savedOffsetOnOpen 只用于撤销逻辑，当前实现为即时生效，不还原。
            savedOffsetOnOpen = null;
        }
    }

    // ================== 菜单命令 ==================

    function updateMenuCommandText() {
        if (typeof GM_registerMenuCommand !== 'function' || typeof GM_unregisterMenuCommand !== 'function') return;

        const text = `自动宽屏模式 (当前: ${isEnabled ? '✅ 开启' : '❌ 关闭'})`;
        if (currentMenuCommandText && currentMenuCommandText !== text) {
            try { GM_unregisterMenuCommand(currentMenuCommandText); } catch (e) {}
        }
        try {
            GM_registerMenuCommand(text, toggleWideScreen);
            currentMenuCommandText = text;
        } catch (e) {
            console.error("[B站自动宽屏居中] 注册菜单命令失败:", e);
        }
    }

    function registerMenuCommand() {
        if (typeof GM_registerMenuCommand !== 'function') return;

        updateMenuCommandText();
        try {
            GM_registerMenuCommand('打开设置面板', toggleSettingsPanel);
        } catch (e) {}

        const iconHidden = GM_getValue('iconHidden', false);
        try {
            GM_registerMenuCommand(iconHidden ? '显示设置图标' : '隐藏设置图标', toggleIconVisibility);
        } catch (e) {}
    }

    function toggleIconVisibility() {
        const newState = !GM_getValue('iconHidden', false);
        GM_setValue('iconHidden', newState);
        const trigger = document.getElementById('bili-wide-settings-trigger');
        if (trigger) trigger.style.display = newState ? 'none' : '';
        registerMenuCommand();
    }

    function toggleWideScreen() {
        const next = !GM_getValue('enableWideScreen', true);
        if (!window.confirm(`是否要${next ? "开启" : "关闭"}自动宽屏模式？`)) return;

        isEnabled = next;
        GM_setValue('enableWideScreen', isEnabled);
        updateMenuCommandText();

        const panelToggle = document.getElementById('bwsp-enabled');
        if (panelToggle) panelToggle.checked = isEnabled;

        if (isEnabled) {
            resetAutoWideRetries();
            ensureWideMode();
        } else {
            if (elements.wideBtn?.isConnected && elements.wideBtn.classList.contains('bpx-state-entered')) {
                programmaticWideClick = true;
                try { elements.wideBtn.click(); } finally { programmaticWideClick = false; }
            }
            setTimeout(checkAndScroll, 100);
        }
    }

    // ================== 主逻辑 ==================

    function handleWideBtnClick() {
        const forced = !programmaticWideClick;
        checkAndScroll(forced);
        setTimeout(() => checkAndScroll(forced), 200);
    }

    function setupAndCheck() {
        setupListeners();
        if (isEnabled) ensureWideMode();
        setTimeout(checkAndScroll, FINAL_CHECK_DELAY);
    }

    function initializeScriptLogic() {
        clearTimeout(initTimeout);

        resetAutoWideRetries();
        userScrolledAway = false;
        scriptScrollY = null;

        if (coreElementsObserver) { coreElementsObserver.disconnect(); coreElementsObserver = null; }
        if (observerTimeoutId) { clearTimeout(observerTimeoutId); observerTimeoutId = null; }

        if (cacheElements()) {
            setupAndCheck();
            return;
        }

        coreElementsObserver = new MutationObserver((mutations, observer) => {
            if (cacheElements()) {
                observer.disconnect();
                clearTimeout(observerTimeoutId);
                coreElementsObserver = null;
                observerTimeoutId = null;
                setupAndCheck();
            }
        });

        const targetNode = document.getElementById('playerWrap') ||
                           document.getElementById('mirror-vdcon') ||
                           document.getElementById('app') ||
                           document.body;
        coreElementsObserver.observe(targetNode, { childList: true, subtree: true });

        observerTimeoutId = setTimeout(() => {
            if (!coreElementsObserver) return;
            coreElementsObserver.disconnect();
            coreElementsObserver = null;
            observerTimeoutId = null;
        }, OBSERVER_MAX_WAIT_TIME);
    }

    function scheduleReInitialization(delay = URL_CHECK_DELAY) {
        clearTimeout(initTimeout);
        initTimeout = setTimeout(() => {
            removeListenersAndObserver();
            setTimeout(initializeScriptLogic, 100);
        }, delay);
    }

    function isTargetPage(url) {
        return /\/(video|list|bangumi\/play)\//.test(url);
    }

    function handleUrlChange() {
        nextFrameOrTimeout(() => {
            const newHref = window.location.href;
            const newPathname = window.location.pathname;
            const previousHref = currentUrl;

            if (newPathname === lastPathname) {
                currentUrl = newHref;
                return;
            }

            lastPathname = newPathname;
            currentUrl = newHref;

            if (isTargetPage(newHref)) {
                scheduleReInitialization();
            } else if (isTargetPage(previousHref)) {
                removeListenersAndObserver();
                clearTimeout(initTimeout);
            }
        });
    }

    function main() {
        console.log(`[B站自动宽屏居中] 脚本开始执行。版本: ${SCRIPT_VERSION}`);
        isEnabled = GM_getValue('enableWideScreen', true);
        playerCenterOffset = GM_getValue('playerCenterOffset', DEFAULT_PLAYER_CENTER_OFFSET);

        registerMenuCommand();

        if (isTargetPage(currentUrl)) {
            createSettingsPanel();
        }

        window.addEventListener('popstate', handleUrlChange);

        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        const patchedHistory = function (original) {
            return function (...args) {
                const result = original.apply(this, args);
                window.dispatchEvent(new CustomEvent('historystatechanged'));
                return result;
            };
        };
        history.pushState = patchedHistory(originalPushState);
        history.replaceState = patchedHistory(originalReplaceState);
        window.addEventListener('historystatechanged', handleUrlChange);

        if (isTargetPage(currentUrl)) {
            initializeScriptLogic();
        }

        attachScrollWatcher();
        restartHeartbeat();

        document.addEventListener('visibilitychange', () => {
            restartHeartbeat();
            if (document.hidden) return;
            if (!isTargetPage(window.location.href)) return;
            if (isEnabled && !autoWideDone && autoWideAttempts >= AUTO_WIDE_MAX_RETRY) {
                autoWideAttempts = 0;
                lastAutoWideAttempt = 0;
                autoWideStartTime = Date.now();
            }
            handleUrlChange();
            heartbeat();
            if (userScrolledAway) return;
            setTimeout(checkAndScroll, FINAL_CHECK_DELAY);
        });

        window.addEventListener('unload', () => {
            stopHeartbeat();
            removeListenersAndObserver();
            history.pushState = originalPushState;
            history.replaceState = originalReplaceState;
            window.removeEventListener('historystatechanged', handleUrlChange);
            window.removeEventListener('popstate', handleUrlChange);
            clearTimeout(initTimeout);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }
})();
