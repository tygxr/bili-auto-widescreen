// ==UserScript==
// @name         B站自动宽屏居中
// @namespace    https://github.com/tygxr/bili-auto-widescreen
// @version      1.3.2
// @description  自动宽屏播放并将播放器垂直居中视口，退出宽屏/网页全屏/全屏模式自动滚动页面到顶部。默认关闭自动宽屏。
// @author       deepseek v4.1 flash
// @icon         data:image/webp;base64,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
// @license      MIT
// @match        https://*.bilibili.com/video/*
// @match        https://*.bilibili.com/list/*
// @match        https://*.bilibili.com/bangumi/play/*
// @match        https://*.bilibili.com/festival/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @run-at       document-idle
// @downloadURL https://greasyfork.org/zh-CN/scripts/492413-b%E7%AB%99%E8%87%AA%E5%8A%A8%E5%AE%BD%E5%B1%8F%E5%B1%85%E4%B8%AD.user.js
// @updateURL https://greasyfork.org/zh-CN/scripts/492413-b%E7%AB%99%E8%87%AA%E5%8A%A8%E5%AE%BD%E5%B1%8F%E5%B1%85%E4%B8%AD.meta.js
// ==/UserScript==


/* ========== 更新日志 ==========

* v1.3.2: 脚本管理器页面新增了显示/隐藏设置面板的选项。

* v1.3.1: 修复了脚本管理器界面没有设置面板开启选项的问题。

* v1.3.0: 新增了控制面板，可开关宽屏模式或调整居中偏移量。

* v1.2.1: 优化了脚本逻辑，精简了代码，修补了一个盲区spa导航。

* v1.2.0: 修复切换标签页再回来时重新居中，播放器滚出视口时跳过居中，避免评论区切回被拉回。

* v1.1.0: 以别的宽屏居中脚本为底，修复后台打开的页面无法宽屏的问题。

* ========== 更新日志结束 ========== */

(function () {
    'use strict';

    /* ================== GM API 安全垫 ==================
     * 脚本管理器不提供某个 GM API 时，直接调用会抛 ReferenceError 并让整个脚本失效
     * （表现为：左下角没有齿轮、页面没有任何反应）。
     * 这里统一包一层：API 可用就用 API，不可用/抛错则退化为 localStorage，保证脚本始终能跑。
     */
    const STORAGE_PREFIX = 'bwc:';

    function gmGet(key, fallback) {
        if (typeof GM_getValue === 'function') {
            try { return GM_getValue(key, fallback); } catch (e) { /* 落到下面的兜底 */ }
        }
        try {
            const raw = localStorage.getItem(STORAGE_PREFIX + key);
            return raw === null ? fallback : JSON.parse(raw);
        } catch (e) {
            return fallback;
        }
    }

    function gmSet(key, value) {
        if (typeof GM_setValue === 'function') {
            try { GM_setValue(key, value); return; } catch (e) { /* 落到下面的兜底 */ }
        }
        try { localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value)); } catch (e) { /* 无痕模式等，忽略 */ }
    }

    // --- 配置项 ---
    const DEFAULT_PLAYER_CENTER_OFFSET = 75; // 居中偏移量的默认值 (像素)
    const DEBOUNCE_DELAY = 200;           // 事件防抖延迟 (ms)
    const URL_CHECK_DELAY = 500;          // URL 变化后执行逻辑的延迟 (ms)
    const FINAL_CHECK_DELAY = 300;        // 初始化或导航后最终检查状态的延迟 (ms)
    const SCROLL_ANIMATION_DURATION = 500;// 预估的平滑滚动动画时长 (ms)
    const OBSERVER_MAX_WAIT_TIME = 15000; // MutationObserver 首轮等待时间；超时后降级为低频轮询，不再永久放弃
    const HEARTBEAT_VISIBLE = 2000;       // 前台标签页：元素存活兜底检查间隔 (ms)
    const HEARTBEAT_HIDDEN = 3000;        // 后台标签页：同上 (ms)。不要设太大——浏览器本身会把后台定时器
                                          // 钳制到最低 1s、隐藏 5 分钟后进一步钳到约 1 次/分钟(深度节流)，
                                          // 我们设 3s 就能在节流生效前抓紧检查；切回前台由 visibilitychange 立即补偿
    const AUTO_WIDE_MAX_RETRY = 8;        // 自动宽屏「从未成功进入过」时的最大重试次数
    const AUTO_WIDE_RETRY_GAP = 1500;     // 两次自动宽屏尝试之间的最小间隔 (ms)，避免点太快来回切换
    const USER_SCROLL_THRESHOLD = 150;    // 滚动位置偏离脚本设定值超过此值(px)，视为用户已自行滚动
    const SCRIPT_SCROLL_GRACE = 1200;     // 脚本发起滚动后此时间内出现的 scroll 事件算作脚本自己的，不判定为用户

    // --- 状态变量 ---
    let elements = {
        wideBtn: null,
        webFullBtn: null,
        fullBtn: null,
        player: null,
        playerContainer: null,
    };
    let isEnabled = gmGet('enableWideScreen', false); // 自动宽屏功能是否启用
    let playerCenterOffset = gmGet('playerCenterOffset', DEFAULT_PLAYER_CENTER_OFFSET); // 当前居中偏移量
    let currentUrl = window.location.href;                  // 当前页面的完整URL
    let lastPathname = window.location.pathname;            // 上一次记录的路径，用于识别 SPA 导航
    let initTimeout = null;                                 // 初始化/重新初始化的延迟计时器
    let lastScrollTime = 0;                                 // 上次滚动时间，用于滚动节流
    let isScrolling = false;                                // 是否正在执行平滑滚动
    let registeredMenuCommands = [];                        // 已注册的菜单命令 {id, caption}
    let iconHidden = gmGet('iconHidden', false);            // 左下角设置齿轮是否隐藏

    let settingsPanel = null;                               // 设置面板元素
    let settingsOverlay = null;                             // 设置面板遮罩
    let offsetOnOpen = null;                                // 打开面板时的偏移量，用于取消预览时回滚

    let coreElementsObserver = null;                        // 用于核心元素加载的 MutationObserver
    let observerTimeoutId = null;                           // MutationObserver 的安全超时计时器

    let heartbeatId = null;                                 // 元素存活兜底轮询定时器
    let autoWideDone = false;                               // 本页面是否已成功自动进入过宽屏
    let autoWideAttempts = 0;                               // 自动宽屏已尝试点击的次数
    let lastAutoWideAttempt = 0;                            // 上次尝试自动宽屏的时间戳

    let scriptScrollY = null;                               // 脚本自己设置过的滚动位置
    let lastScriptScrollTime = 0;                           // 脚本发起滚动的时间戳（用来排除自己的滚动）
    let userScrolledAway = false;                           // 用户已自行滚动离开 → 暂停自动挪动页面
    let scrollWatcherAttached = false;                      // scroll 监听是否已挂载
    let programmaticWideClick = false;                      // 正在由脚本自己点击宽屏按钮（而非用户手点）

    // --- 工具函数 ---

    /**
     * 防抖函数：在事件触发后等待指定延迟，若期间无新触发则执行函数。
     * @param {Function} func 需要防抖的函数
     * @param {number} delay 延迟时间 (ms)
     * @returns {Function} 防抖处理后的函数
     */
    function debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    /**
     * 平滑滚动到指定的垂直位置 (带节流)。
     * @param {number} topPosition 目标垂直滚动位置
     * @param {boolean} [force=false] true=用户主动操作(点宽屏/全屏键等)产生的滚动，忽略"用户已接管"状态
     */
    function scrollToPosition(topPosition, force = false) {
        // 用户已经自己滚去别处（比如评论区）→ 非主动触发的滚动一律不打扰
        if (userScrolledAway && !force) return;

        if (isScrolling) return; // 如果已在滚动中，则忽略新的滚动请求
        const now = Date.now();
        // 简单的节流，避免过于频繁的滚动请求
        if (now - lastScrollTime < 100 && Math.abs(window.scrollY - topPosition) < 50) {
            return;
        }
        lastScrollTime = now;

        // 记录脚本自己滚到的位置 + 时间：后续 scroll 事件据此区分"脚本滚的"还是"用户滚的"
        scriptScrollY = topPosition;
        lastScriptScrollTime = now;
        if (force) userScrolledAway = false; // 主动滚动重新确立了基准位置

        // 后台标签页的平滑滚动动画不保证执行，且完成回调会被节流，
        // 会让 isScrolling 卡在 true。后台直接瞬时定位，不加锁。
        if (document.hidden) {
            window.scrollTo({ top: topPosition, behavior: 'auto' });
            isScrolling = false;
            return;
        }

        isScrolling = true;
        window.scrollTo({
            top: topPosition,
            behavior: 'smooth'
        });
        // 预估滚动动画完成时间，在此期间阻止新的滚动
        setTimeout(() => {
            isScrolling = false;
        }, SCROLL_ANIMATION_DURATION);
    }

    /* ================== 用户滚动接管检测 ================== */

    /**
     * 判断当前滚动到底是脚本发起的，还是用户自己滚的。
     * 用户一旦自行滚离脚本设定的位置（如滚到评论区），
     * 就置 userScrolledAway，之后所有非主动的居中/回顶全部让位。
     * 用户滚回脚本基准附近时自动恢复。
     */
    function handleUserScroll() {
        // 脚本自己发起的滚动（含其平滑动画期间的每一帧）
        if (Date.now() - lastScriptScrollTime < SCRIPT_SCROLL_GRACE) return;

        if (scriptScrollY === null) {
            // 脚本还没定过位置（例如浏览器恢复了上次的滚动位置）：先记基准，不判责
            scriptScrollY = window.scrollY;
            return;
        }

        const deviation = Math.abs(window.scrollY - scriptScrollY);
        if (deviation > USER_SCROLL_THRESHOLD) {
            if (!userScrolledAway) {
                userScrolledAway = true;
                console.log(`[B站自动宽屏居中] 用户已自行滚动 (偏离 ${Math.round(deviation)}px)，暂停自动居中/回顶。`);
            }
        } else if (userScrolledAway) {
            // 用户滚回播放器附近 → 恢复自动居中
            userScrolledAway = false;
            console.log("[B站自动宽屏居中] 用户已滚回播放器附近，恢复自动居中。");
        }
    }

    /** 挂载滚动监听（整页生命周期一次，不随播放器重建而重复挂）。 */
    function attachScrollWatcher() {
        if (scrollWatcherAttached) return;
        window.addEventListener('scroll', handleUserScroll, { passive: true });
        scrollWatcherAttached = true;
    }

    /** 滚动页面使播放器大致垂直居中于视口。 */
    function scrollToPlayer(forced = false) {
        // 确保播放器元素已缓存且仍在文档中
        if (!elements.player?.isConnected && (!cacheElements() || !elements.player)) return;
        // 下一帧计算滚动位置（后台标签页 rAF 不执行，走 nextFrameOrTimeout 降级）
        nextFrameOrTimeout(() => {
            const playerRect = elements.player.getBoundingClientRect();
            if (playerRect.height > 0) { // 仅当播放器有高度时执行
                const playerTop = playerRect.top + window.scrollY;
                const desiredScrollTop = playerTop - playerCenterOffset;
                // 仅当当前滚动位置与目标位置有显著差异时才滚动
                if (Math.abs(window.scrollY - desiredScrollTop) > 5) {
                    scrollToPosition(desiredScrollTop, forced);
                }
            }
        });
    }

    /** 滚动到页面顶部。 */
    function scrollToTop(forced = false) {
        if (window.scrollY > 0) {
            scrollToPosition(0, forced);
        }
    }

    /**
     * 判断缓存的核心元素是否仍连接在文档中。
     * 播放器 DOM 被重建（换分P、切清晰度、长时间播放后重挂载）时，
     * elements 里的引用会变成游离节点：非 null 但 isConnected === false，
     * 旧代码只判空所以察觉不到，点击全部打在失效节点上。
     */
    function areElementsAlive() {
        return !!(elements.player && elements.player.isConnected &&
                  elements.wideBtn && elements.wideBtn.isConnected);
    }

    /**
     * requestAnimationFrame 在后台（隐藏）标签页中不会被浏览器执行，
     * 因此隐藏时降级为 setTimeout，保证后台逻辑不被冻结。
     * @param {Function} fn 要在下一帧执行的函数
     */
    function nextFrameOrTimeout(fn) {
        if (document.hidden) {
            setTimeout(fn, 0);
        } else {
            requestAnimationFrame(fn);
        }
    }

    /**
     * 重新缓存核心元素并重建监听器。
     * 元素失效（游离）或监听器脱钩时调用；若元素尚未渲染出来则返回 false，
     * 由 MutationObserver / heartbeat 继续等待。
     * @returns {boolean} 是否恢复成功
     */
    function refreshElements() {
        removeListenersAndObserver(); // 清掉旧（可能已游离）的引用与监听
        if (!cacheElements()) return false; // 元素还没渲染，交给兜底轮询
        setupListeners();
        return true;
    }

    /* ================== 后台/长时间运行兜底轮询 ================== */

    /**
     * 元素存活兜底检查：
     * 1. 核心元素已游离（播放器重建）→ 重建缓存与监听；
     * 2. 自动宽屏已开启但从未成功进入过 → 重试点击（限次，避免和用户手动操作打架）。
     * 后台标签页定时器会被节流，所以间隔放宽；切回前台由 visibilitychange 立即补跑一次。
     */
    function heartbeat() {
        if (!isTargetPage(window.location.href)) return;

        // 播放器还没渲染出来：静默等待，不刷日志
        if (!document.querySelector('#bilibili-player') ||
            !document.querySelector('.bpx-player-ctrl-wide')) return;

        if (!areElementsAlive()) {
            console.log("[B站自动宽屏居中] heartbeat: 检测到核心元素已失效（播放器可能被重建），尝试恢复。");
            if (!refreshElements()) return; // 仍未就绪，下一轮重试
            console.log("[B站自动宽屏居中] heartbeat: 已重建缓存与监听器。");

            // 关键：重建出来的是全新播放器，会回到普通模式。
            // 不重置 autoWideDone 的话，重建后就再也不会自动进宽屏了。
            resetAutoWideRetries();
            setTimeout(checkAndScroll, FINAL_CHECK_DELAY);
        }

        // 从未成功自动进入宽屏（初始化时按钮未就绪、后台点击被吞等）→ 继续重试
        if (isEnabled && !autoWideDone && autoWideAttempts < AUTO_WIDE_MAX_RETRY) {
            ensureWideMode();
        }
    }

    /** 按当前可见性重建兜底轮询（后台用更长间隔，减少被节流的空转）。 */
    function restartHeartbeat() {
        stopHeartbeat();
        const interval = document.hidden ? HEARTBEAT_HIDDEN : HEARTBEAT_VISIBLE;
        heartbeatId = setInterval(heartbeat, interval);
    }

    function stopHeartbeat() {
        if (heartbeatId) {
            clearInterval(heartbeatId);
            heartbeatId = null;
        }
    }

    /**
     * 缓存播放器及相关的控制按钮。
     * @returns {boolean} 播放器与宽屏按钮都已就绪时返回 true（网页全屏/全屏按钮非必需）。
     */
    function cacheElements() {
        // 元素可能还没渲染出来（会被 observer/heartbeat 反复调用），这里保持静默
        elements.player = document.querySelector('#bilibili-player');
        if (!elements.player) return false;

        // 播放器容器：兼容旧版选择器，最差情况回退到播放器主元素
        elements.playerContainer = document.querySelector('.bpx-player-container') ||
                                   document.querySelector('#bilibiliPlayer') ||
                                   elements.player;

        // 按钮统一从容器内查找；容器缺失时回退到全局查找
        const scope = elements.playerContainer || document;
        elements.wideBtn = scope.querySelector('.bpx-player-ctrl-wide');
        elements.webFullBtn = scope.querySelector('.bpx-player-ctrl-web');
        elements.fullBtn = scope.querySelector('.bpx-player-ctrl-full');

        return !!elements.wideBtn; // 宽屏按钮是核心功能，必须有
    }

    /**
     * 检查播放器当前的宽屏/全屏状态，并据此执行相应的滚动操作。
     * @param {boolean} [force] 仅当严格等于 true 时才无视"用户已接管滚动"。
     *   注意：本函数常被直接注册为事件监听器，首参会是 Event 对象（真值），
     *   所以必须用 === true 判定，否则等于把守卫全部放行了。
     */
    function checkAndScroll(force) {
        const forced = (force === true);

        // 确保核心元素已缓存且仍连接在文档中
        // （长时间播放/换分P 后播放器 DOM 可能被重建，旧引用会变成游离节点）
        if (!areElementsAlive()) {
            if (!cacheElements() || !areElementsAlive()) {
                console.error("[B站自动宽屏居中] checkAndScroll: 核心元素缓存失败，无法执行滚动逻辑。");
                return;
            }
        }

        const isWide = elements.wideBtn.classList.contains('bpx-state-entered');
        const isWebFull = elements.webFullBtn && elements.webFullBtn.classList.contains('bpx-state-entered');
        const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);

        // 用户已自行滚走（如滚到评论区）→ 非主动触发时不挪动页面，
        // 否则切回标签页会把人从评论区拽回播放器。
        if (userScrolledAway && !forced) return;

        // 根据状态执行滚动
        if (isWide && !isWebFull && !isFull) { // 仅在宽屏模式（非网页全屏/全屏）下居中播放器
            scrollToPlayer(forced);
        } else if (!isWide && !isWebFull && !isFull) { // 非任何特殊模式时，滚动到顶部
            scrollToTop(forced);
        }
        // 其他情况（网页全屏/全屏）不执行滚动
    }

    /** 防抖处理的 checkAndScroll，用于 resize 事件，避免频繁触发。 */
    const debouncedCheckAndScroll = debounce(checkAndScroll, DEBOUNCE_DELAY);

    /**
     * checkAndScroll 的"主动"版本：无视 userScrolledAway，照常居中/回顶。
     * 只给用户亲手操作的入口用（点宽屏/网页全屏/全屏键、双击视频、ESC）。
     * 不能直接把 checkAndScroll 注册成监听器再指望自动 force——
     * 事件对象是真值，会绕过守卫。
     */
    function forceCheckAndScroll() {
        checkAndScroll(true);
    }

    /** 重置自动宽屏的重试预算，让"从未成功进入宽屏"的判断重新生效。 */
    function resetAutoWideRetries() {
        autoWideDone = false;
        autoWideAttempts = 0;
        lastAutoWideAttempt = 0;
    }

    /** 如果启用了自动宽屏，确保播放器处于宽屏模式。 */
    function ensureWideMode() {
        if (!isEnabled) return; // 如果未启用自动宽屏，则不执行任何操作

        // 元素游离（播放器重建）时先重建引用，而不是直接拿旧节点点按钮
        if (!areElementsAlive() && !refreshElements()) {
            console.error("[B站自动宽屏居中] ensureWideMode: 宽屏按钮无法缓存（元素未就绪或已失效）。");
            return;
        }
        if (!elements.wideBtn) { // 再次检查
            console.error("[B站自动宽屏居中] ensureWideMode: 宽屏按钮 (elements.wideBtn) 仍然无效。");
            return;
        }

        const isCurrentlyWide = elements.wideBtn.classList.contains('bpx-state-entered');
        const isWebFull = elements.webFullBtn && elements.webFullBtn.classList.contains('bpx-state-entered');
        const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement);

        // 如果当前不是宽屏，也不是网页全屏或全屏，则点击宽屏按钮
        if (!isCurrentlyWide && !isWebFull && !isFull) {
            // 限频限次：避免后台节流下的空转，也避免和用户手动切宽屏反复打架
            const now = Date.now();
            if (now - lastAutoWideAttempt < AUTO_WIDE_RETRY_GAP) return;
            lastAutoWideAttempt = now;
            autoWideAttempts++;
            console.log(`[B站自动宽屏居中] ensureWideMode: 尝试点击宽屏按钮 (第 ${autoWideAttempts}/${AUTO_WIDE_MAX_RETRY} 次)。`);
            // click() 会同步触发 handleWideBtnClick，那里默认 force。
            // 用标志位告知"这是程序点的"，免得自动宽屏绕过用户滚动守卫把人拽走。
            programmaticWideClick = true;
            try {
                elements.wideBtn.click();
            } finally {
                programmaticWideClick = false;
            }
            setTimeout(checkAndScroll, 200); // 点击后稍作延迟再检查滚动状态
        } else if (isCurrentlyWide && !isWebFull && !isFull) {
            // 已经是宽屏：记为成功，heartbeat 不再重复点击
            if (!autoWideDone) {
                autoWideDone = true;
                console.log("[B站自动宽屏居中] ensureWideMode: 已处于宽屏模式。");
            }
            checkAndScroll();
        }
    }

    /** 设置事件监听器。 */
    function setupListeners() {
        removeListenersAndObserver(); // 先移除旧的监听器和Observer，确保清洁状态
        console.log("[B站自动宽屏居中] setupListeners: 开始设置事件监听器。");

        if (!cacheElements()) { // 确保元素已缓存
            console.error("[B站自动宽屏居中] setupListeners: 核心元素查找失败，无法设置监听器。");
            return;
        }

        // 为播放器控制按钮添加点击事件监听
        // （这些是用户亲手点的 → 走 force 版本，即使他刚滚到评论区也照常居中）
        elements.wideBtn.addEventListener('click', handleWideBtnClick);
        if (elements.webFullBtn) elements.webFullBtn.addEventListener('click', forceCheckAndScroll);
        if (elements.fullBtn) elements.fullBtn.addEventListener('click', forceCheckAndScroll);

        // 为视频区域添加双击事件监听（双击通常也可能改变全屏状态）
        const videoArea = elements.playerContainer?.querySelector('.bpx-player-video-area');
        if (videoArea) videoArea.addEventListener('dblclick', forceCheckAndScroll);

        // 监听全屏状态变化事件（全屏进出是用户主动行为）
        document.addEventListener('fullscreenchange', forceCheckAndScroll);
        document.addEventListener('webkitfullscreenchange', forceCheckAndScroll); // 兼容 WebKit 内核
        document.addEventListener('mozfullscreenchange', forceCheckAndScroll);    // 兼容 Firefox
        document.addEventListener('MSFullscreenChange', forceCheckAndScroll);     // 兼容 IE/Edge (旧版)

        // 监听键盘事件：ESC 退出全屏后恢复布局。这里故意不 force——ESC 也常用来关闭
        // 弹幕面板/输入框，此时用户可能正看着评论区，不该把他拽回播放器。
        // （匿名监听器，整页只注册一次，无需配对移除）
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setTimeout(checkAndScroll, 150);
        });
        // 监听窗口大小变化事件
        window.addEventListener('resize', debouncedCheckAndScroll);
        console.log("[B站自动宽屏居中] setupListeners: 事件监听器设置完成。");
    }

    /** 移除所有已添加的事件监听器和 MutationObserver。 */
    function removeListenersAndObserver() {
        console.log("[B站自动宽屏居中] removeListenersAndObserver: 开始清理监听器和Observer。");

        // 移除按钮点击事件
        if (elements.wideBtn) elements.wideBtn.removeEventListener('click', handleWideBtnClick);
        if (elements.webFullBtn) elements.webFullBtn.removeEventListener('click', forceCheckAndScroll);
        if (elements.fullBtn) elements.fullBtn.removeEventListener('click', forceCheckAndScroll);

        // 移除视频区域双击事件 (需要重新获取容器以防 elements 对象被清空)
        const currentContainer = elements.playerContainer || document.querySelector('.bpx-player-container') || document.querySelector('#bilibiliPlayer');
        const videoArea = currentContainer?.querySelector('.bpx-player-video-area');
        if (videoArea) videoArea.removeEventListener('dblclick', forceCheckAndScroll);

        // 移除全屏状态变化事件（必须与注册时是同一个函数引用，否则监听器会泄漏）
        document.removeEventListener('fullscreenchange', forceCheckAndScroll);
        document.removeEventListener('webkitfullscreenchange', forceCheckAndScroll);
        document.removeEventListener('mozfullscreenchange', forceCheckAndScroll);
        document.removeEventListener('MSFullscreenChange', forceCheckAndScroll);

        // 移除窗口大小变化事件（keydown 为匿名监听器且只注册一次，无需移除）
        window.removeEventListener('resize', debouncedCheckAndScroll);

        // 断开并清理 MutationObserver
        if (coreElementsObserver) {
            coreElementsObserver.disconnect();
            coreElementsObserver = null;
            console.log("[B站自动宽屏居中] CoreElements MutationObserver 已断开。");
        }
        if (observerTimeoutId) {
            clearTimeout(observerTimeoutId);
            observerTimeoutId = null;
        }

        // 重置缓存的元素对象
        elements = { wideBtn: null, webFullBtn: null, fullBtn: null, player: null, playerContainer: null };
        console.log("[B站自动宽屏居中] removeListenersAndObserver: 清理完成。");
    }

    /** 按当前 isEnabled 立即应用：开启则进入宽屏，关闭则退出宽屏。 */
    function applyEnabledState() {
        if (isEnabled) { // 开启：重置重试状态，让本次开关立即生效
            resetAutoWideRetries();
            ensureWideMode();
        } else { // 关闭：若正处于宽屏则点一下退出（程序化点击 → 不 force，别把人从评论区拽走）
            if (elements.wideBtn?.isConnected && elements.wideBtn.classList.contains('bpx-state-entered')) {
                programmaticWideClick = true;
                try { elements.wideBtn.click(); } finally { programmaticWideClick = false; }
            }
            setTimeout(checkAndScroll, 100);
        }
    }

    /* ================== 设置面板 ================== */

    /** 注入面板样式：优先用 GM_addStyle，缺失时退化为 <style>。 */
    function addStyle(css) {
        if (typeof GM_addStyle === 'function') { GM_addStyle(css); return; }
        const style = document.createElement('style');
        style.textContent = css;
        (document.head || document.documentElement).appendChild(style);
    }

    const PANEL_CSS = `
        #bwcenter-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.45); z-index: 100000;
            opacity: 0; transition: opacity 0.2s ease;
            pointer-events: none;
        }
        #bwcenter-overlay.visible { opacity: 1; pointer-events: auto; }
        #bwcenter-trigger {
            position: fixed; bottom: 20px; left: 20px; z-index: 99999;
            width: 36px; height: 36px; border-radius: 50%;
            background: rgba(255,255,255,0.85); border: 1px solid #e3e5e7;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        #bwcenter-trigger:hover {
            background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,0.18);
            transform: scale(1.08);
        }
        #bwcenter-trigger svg { width: 18px; height: 18px; fill: #61666d; transition: fill 0.2s ease; }
        #bwcenter-trigger:hover svg { fill: #00a1d6; }
        #bwcenter-panel {
            position: fixed; bottom: 70px; left: 20px; z-index: 100001;
            width: 340px; background: #fff; border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.18);
            transform: translateY(12px) scale(0.96);
            opacity: 0; pointer-events: none;
            transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
            font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
            overflow: hidden;
        }
        #bwcenter-panel.visible { transform: translateY(0) scale(1); opacity: 1; pointer-events: auto; }
        .bwcp-header { padding: 16px 20px 12px; border-bottom: 1px solid #e3e5e7; display: flex; align-items: center; justify-content: space-between; }
        .bwcp-header h3 { margin: 0; font-size: 15px; font-weight: 600; color: #18191c; letter-spacing: 0.3px; }
        .bwcp-close { width: 28px; height: 28px; border-radius: 6px; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
        .bwcp-close:hover { background: #f1f2f3; }
        .bwcp-close svg { width: 14px; height: 14px; fill: #9499a0; }
        .bwcp-close:hover svg { fill: #61666d; }
        .bwcp-body { padding: 16px 20px; }
        .bwcp-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; }
        .bwcp-row + .bwcp-row { border-top: 1px solid #f1f2f3; }
        .bwcp-label { font-size: 13px; color: #18191c; font-weight: 500; }
        .bwcp-hint { font-size: 11px; color: #9499a0; margin-top: 2px; }
        .bwcp-switch { position: relative; width: 40px; height: 22px; cursor: pointer; flex-shrink: 0; }
        .bwcp-switch input { opacity: 0; width: 0; height: 0; }
        .bwcp-switch-slider { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: #c9ccd0; border-radius: 11px; transition: background 0.25s; }
        .bwcp-switch-slider::before { content: ''; position: absolute; width: 18px; height: 18px; left: 2px; top: 2px; background: #fff; border-radius: 50%; transition: transform 0.25s; box-shadow: 0 1px 3px rgba(0,0,0,0.15); }
        .bwcp-switch input:checked + .bwcp-switch-slider { background: #00a1d6; }
        .bwcp-switch input:checked + .bwcp-switch-slider::before { transform: translateX(18px); }
        .bwcp-num-group { display: flex; align-items: center; gap: 4px; }
        .bwcp-num-btn { width: 28px; height: 28px; border-radius: 6px; border: 1px solid #e3e5e7; background: #fff; font-size: 16px; font-weight: 600; color: #61666d; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; line-height: 1; padding: 0; }
        .bwcp-num-btn:hover { border-color: #00a1d6; color: #00a1d6; background: #f0f8ff; }
        .bwcp-num-btn:active { transform: scale(0.92); }
        .bwcp-num-input { width: 60px; height: 28px; border: 1px solid #e3e5e7; border-radius: 6px; text-align: center; font-size: 13px; color: #18191c; outline: none; transition: border-color 0.2s; -moz-appearance: textfield; }
        .bwcp-num-input::-webkit-inner-spin-button, .bwcp-num-input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        .bwcp-num-input:focus { border-color: #00a1d6; }
        .bwcp-px { font-size: 12px; color: #9499a0; margin-left: 2px; }
        .bwcp-footer { padding: 12px 20px 16px; display: flex; gap: 8px; justify-content: flex-end; }
        .bwcp-btn { height: 32px; padding: 0 16px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1px solid #e3e5e7; background: #fff; color: #18191c; transition: all 0.15s; }
        .bwcp-btn:hover { border-color: #00a1d6; color: #00a1d6; }
        .bwcp-btn-primary { background: #00a1d6; color: #fff; border-color: #00a1d6; }
        .bwcp-btn-primary:hover { background: #00b5e6; border-color: #00b5e6; color: #fff; }
    `;

    /** 面板内元素查询。 */
    function panelEl(id) {
        return document.getElementById(id);
    }

    /** 创建设置面板（只创建一次，之后靠 .visible 切换显隐）。 */
    function createSettingsPanel() {
        if (settingsPanel) return;
        addStyle(PANEL_CSS);

        settingsOverlay = document.createElement('div');
        settingsOverlay.id = 'bwcenter-overlay';
        settingsOverlay.addEventListener('click', toggleSettingsPanel);
        document.body.appendChild(settingsOverlay);

        const trigger = document.createElement('div');
        trigger.id = 'bwcenter-trigger';
        trigger.title = 'B站自动宽屏居中 - 设置';
        trigger.innerHTML = '<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z"/></svg>';
        trigger.addEventListener('click', toggleSettingsPanel);
        document.body.appendChild(trigger);
        applyIconVisibility(); // 用户若已隐藏齿轮，这里要立刻生效

        settingsPanel = document.createElement('div');
        settingsPanel.id = 'bwcenter-panel';
        settingsPanel.innerHTML = `
            <div class="bwcp-header">
                <h3>B站自动宽屏居中 设置</h3>
                <button class="bwcp-close" id="bwcp-close-btn"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
            </div>
            <div class="bwcp-body">
                <div class="bwcp-row">
                    <div>
                        <div class="bwcp-label">自动宽屏居中</div>
                        <div class="bwcp-hint">进入视频页自动切宽屏，并把播放器垂直居中</div>
                    </div>
                    <label class="bwcp-switch">
                        <input type="checkbox" id="bwcp-enabled"${isEnabled ? ' checked' : ''}>
                        <span class="bwcp-switch-slider"></span>
                    </label>
                </div>
                <div class="bwcp-row">
                    <div>
                        <div class="bwcp-label">居中偏移量</div>
                        <div class="bwcp-hint">播放器垂直居中的偏移像素值</div>
                    </div>
                    <div class="bwcp-num-group">
                        <button class="bwcp-num-btn" id="bwcp-offset-minus">−</button>
                        <input type="number" class="bwcp-num-input" id="bwcp-offset-input" value="${playerCenterOffset}" min="0" max="999">
                        <button class="bwcp-num-btn" id="bwcp-offset-plus">+</button>
                        <span class="bwcp-px">px</span>
                    </div>
                </div>
            </div>
            <div class="bwcp-footer">
                <button class="bwcp-btn" id="bwcp-reset-btn">恢复默认</button>
                <button class="bwcp-btn bwcp-btn-primary" id="bwcp-save-btn">保存并刷新</button>
            </div>
        `;
        document.body.appendChild(settingsPanel);

        panelEl('bwcp-close-btn').addEventListener('click', toggleSettingsPanel);
        panelEl('bwcp-offset-minus').addEventListener('click', () => stepOffset(-1));
        panelEl('bwcp-offset-plus').addEventListener('click', () => stepOffset(1));
        panelEl('bwcp-offset-input').addEventListener('input', previewOffset);
        panelEl('bwcp-reset-btn').addEventListener('click', () => {
            panelEl('bwcp-enabled').checked = false; // 脚本默认不自动宽屏
            panelEl('bwcp-offset-input').value = DEFAULT_PLAYER_CENTER_OFFSET;
            previewOffset();
        });
        panelEl('bwcp-save-btn').addEventListener('click', () => saveSettings(true));
    }

    /** 打开/关闭设置面板；关闭时回滚未保存的偏移量预览。 */
    function toggleSettingsPanel() {
        if (!settingsPanel) createSettingsPanel();
        const visible = settingsPanel.classList.toggle('visible');
        settingsOverlay.classList.toggle('visible', visible);

        if (visible) {
            panelEl('bwcp-enabled').checked = isEnabled;
            panelEl('bwcp-offset-input').value = playerCenterOffset;
            offsetOnOpen = playerCenterOffset;
        } else if (offsetOnOpen !== null) {
            playerCenterOffset = offsetOnOpen;
            offsetOnOpen = null;
            scrollToPlayerWithOffset();
        }
    }

    /** 用当前偏移量把播放器重新居中（仅用于面板预览，不参与自动居中判定）。 */
    function scrollToPlayerWithOffset() {
        const player = elements.player;
        if (!player?.isConnected) return;
        const rect = player.getBoundingClientRect();
        if (rect.height > 0) {
            window.scrollTo({ top: rect.top + window.scrollY - playerCenterOffset, behavior: 'auto' });
        }
    }

    /** 加减按钮：步进偏移量并即时预览。 */
    function stepOffset(delta) {
        const input = panelEl('bwcp-offset-input');
        const value = (parseInt(input.value, 10) || 0) + delta;
        input.value = Math.max(0, Math.min(999, value));
        previewOffset();
    }

    /** 输入偏移量时即时预览（不写配置，取消/关闭时回滚）。 */
    function previewOffset() {
        const value = parseInt(panelEl('bwcp-offset-input').value, 10);
        playerCenterOffset = Number.isNaN(value)
            ? DEFAULT_PLAYER_CENTER_OFFSET
            : Math.max(0, Math.min(999, value));
        scrollToPlayerWithOffset();
    }

    /** 保存面板设置；refresh 为 true 时刷新页面让设置完全生效。 */
    function saveSettings(refresh) {
        const value = parseInt(panelEl('bwcp-offset-input').value, 10);
        playerCenterOffset = Number.isNaN(value)
            ? DEFAULT_PLAYER_CENTER_OFFSET
            : Math.max(0, Math.min(999, value));
        gmSet('playerCenterOffset', playerCenterOffset);
        offsetOnOpen = null;

        const enabled = panelEl('bwcp-enabled').checked;
        if (enabled !== isEnabled) {
            isEnabled = enabled;
            gmSet('enableWideScreen', isEnabled);
            applyEnabledState();
        }

        if (refresh) location.reload();
        else toggleSettingsPanel();
    }

    /** 注销此前注册的全部菜单命令（不同管理器支持按 id 或按文案注销，两种都试）。 */
    function unregisterMenuCommands() {
        if (typeof GM_unregisterMenuCommand === 'function') {
            for (const cmd of registeredMenuCommands) {
                try { if (cmd.id !== undefined) GM_unregisterMenuCommand(cmd.id); } catch (e) { /* 忽略 */ }
                try { GM_unregisterMenuCommand(cmd.caption); } catch (e) { /* 忽略 */ }
            }
        }
        registeredMenuCommands = [];
    }

    /** 按 iconHidden 显示/隐藏左下角齿轮。 */
    function applyIconVisibility() {
        const trigger = document.getElementById('bwcenter-trigger');
        if (trigger) trigger.style.display = iconHidden ? 'none' : '';
    }

    /** 切换左下角齿轮的显隐，并持久化选择。 */
    function toggleIconVisibility() {
        iconHidden = !iconHidden;
        gmSet('iconHidden', iconHidden);
        applyIconVisibility();
        registerMenuCommand(); // 菜单文案需随之更新
    }

    /**
     * 注册油猴菜单命令：打开设置面板 + 隐藏/显示设置图标。
     * 每次调用先注销旧命令再重新注册，这样"隐藏/显示"的文案才能跟着状态变。
     */
    function registerMenuCommand() {
        if (typeof GM_registerMenuCommand !== 'function') {
            console.warn("[B站自动宽屏居中] 当前脚本管理器不支持菜单命令，请点击左下角齿轮打开设置面板。");
            return;
        }
        unregisterMenuCommands();

        const commands = [
            ['打开设置面板', toggleSettingsPanel],
            [iconHidden ? '显示设置图标' : '隐藏设置图标', toggleIconVisibility],
        ];
        for (const [caption, handler] of commands) {
            try {
                const id = GM_registerMenuCommand(caption, handler);
                registeredMenuCommands.push({ id, caption });
            } catch (e) {
                console.error(`[B站自动宽屏居中] 注册菜单命令「${caption}」失败:`, e);
            }
        }
    }

    /** 宽屏按钮被点击。区分是用户手点还是脚本自己 click() 触发的。 */
    function handleWideBtnClick() {
        // 脚本程序化点击 → 不 force，尊重"用户已滚到评论区"的状态；
        // 用户手点 → force，主动切换布局就该重新居中。
        const forced = !programmaticWideClick;
        checkAndScroll(forced); // 立即检查一次
        setTimeout(() => checkAndScroll(forced), 200); // 延迟后再次检查，确保状态更新
    }

    /** 元素就绪后的统一收尾：挂监听、按需进宽屏、最终检查一次状态。 */
    function setupAndCheck() {
        ensureUiEntry(); // 兜底：SPA 导航后补建面板与菜单（均幂等）
        setupListeners();
        if (isEnabled) ensureWideMode();
        setTimeout(checkAndScroll, FINAL_CHECK_DELAY);
    }

    /**
     * 确保设置入口可用：注册管理器菜单（若支持）+ 创建左下角齿轮面板。
     * 两个操作都是幂等的，可以放心在每次初始化时调用。
     */
    function ensureUiEntry() {
        registerMenuCommand();
        createSettingsPanel();
    }

    /**
     * 核心初始化逻辑：尝试缓存元素，如果失败则使用 MutationObserver 等待元素加载。
     */
    function initializeScriptLogic() {
        clearTimeout(initTimeout); // 清除可能存在的初始化延迟计时器

        // 新页面/新视频：重置自动宽屏重试状态，并让上一条视频的滚动基准失效
        resetAutoWideRetries();
        userScrolledAway = false;
        scriptScrollY = null;

        // 清理任何可能存在的旧 Observer 和其超时
        if (coreElementsObserver) { coreElementsObserver.disconnect(); coreElementsObserver = null; }
        if (observerTimeoutId) { clearTimeout(observerTimeoutId); observerTimeoutId = null; }

        console.log("[B站自动宽屏居中] initializeScriptLogic: 开始初始化脚本逻辑...");

        // 1. 尝试立即缓存核心元素
        if (cacheElements()) {
            setupAndCheck();
            return; // 初始化成功，结束
        }

        // 2. 元素还没渲染出来：用 MutationObserver 等它出现
        console.log("[B站自动宽屏居中] initializeScriptLogic: 初次缓存失败，设置 MutationObserver。");

        coreElementsObserver = new MutationObserver((mutations, observer) => {
            // cacheElements 会顺带完成缓存与校验，失败就等下一次 DOM 变化
            if (cacheElements()) {
                console.log("[B站自动宽屏居中] MutationObserver: 核心元素已成功缓存。");
                observer.disconnect();
                clearTimeout(observerTimeoutId);
                coreElementsObserver = null;
                observerTimeoutId = null;
                setupAndCheck();
            }
        });

        // 尽早发现播放器注入：优先观察具体容器，最差情况观察整个 body
        const targetNode = document.getElementById('playerWrap') ||
                           document.getElementById('mirror-vdcon') ||
                           document.getElementById('app') ||
                           document.body;
        coreElementsObserver.observe(targetNode, { childList: true, subtree: true });

        // 首轮等待超时后不等于永久放弃：只停掉 observer，交给 heartbeat 兜底轮询。
        // 后台标签页渲染被浏览器延迟，15 秒内没渲染出播放器是常态。
        observerTimeoutId = setTimeout(() => {
            if (!coreElementsObserver) return; // 已被成功回调清理
            console.warn(`[B站自动宽屏居中] MutationObserver 首轮等待超时 (${OBSERVER_MAX_WAIT_TIME}ms)，转由 heartbeat 兜底轮询。`);
            coreElementsObserver.disconnect();
            coreElementsObserver = null;
            observerTimeoutId = null;
        }, OBSERVER_MAX_WAIT_TIME);
    }

    /**
     * 安排脚本的重新初始化，通常在检测到页面导航（URL路径变化）时调用。
     * @param {number} delay 重新初始化前的延迟时间 (ms)
     */
    function scheduleReInitialization(delay = URL_CHECK_DELAY) {
        clearTimeout(initTimeout); // 已有待处理的重新初始化时，顺延为最新一次
        console.log(`[B站自动宽屏居中] scheduleReInitialization: 安排在 ${delay}ms 后重新初始化。`);
        initTimeout = setTimeout(() => {
            removeListenersAndObserver(); // 清理旧的监听器和状态
            setTimeout(initializeScriptLogic, 100); // 短暂延迟后开始新的初始化
        }, delay);
    }

    /**
     * 检查给定的URL是否匹配脚本的目标页面规则。
     * @param {string} url 要检查的URL
     * @returns {boolean} 如果是目标页面则返回true，否则返回false
     */
    function isTargetPage(url) {
        return /\/(video|list|bangumi\/play|festival)\//.test(url); // 匹配视频页、列表页、番剧播放页
    }

    /**
     * 处理URL发生变化（包括SPA导航和历史记录变化）。
     * 主要通过比较URL的pathname部分来判断是否需要重新初始化脚本。
     */
    function handleUrlChange() {
        // 用 nextFrameOrTimeout：后台（隐藏）标签页不执行 requestAnimationFrame，
        // 原来的 rAF 会把整个 URL 检测逻辑冻结到标签页回到前台为止。
        nextFrameOrTimeout(() => {
            const newHref = window.location.href;
            const newPathname = window.location.pathname; // 与 currentUrl 的 pathname 同源，可直接比较
            const previousHref = currentUrl;

            // 路径没变（只有查询参数/哈希变化）→ 仅更新记录，不重新初始化
            if (newPathname === lastPathname) {
                currentUrl = newHref;
                return;
            }

            console.log(`[B站自动宽屏居中] Pathname 变化: 从 "${lastPathname}" 到 "${newPathname}". 触发重新初始化.`);
            lastPathname = newPathname;
            currentUrl = newHref;

            if (isTargetPage(newHref)) {
                scheduleReInitialization();
            } else if (isTargetPage(previousHref)) { // 从目标页面导航到非目标页面
                console.log("[B站自动宽屏居中] 从目标页面导航到非目标页面，移除监听器。");
                removeListenersAndObserver();
                clearTimeout(initTimeout);
            }
        });
    }

    /** 脚本主入口函数。 */
    function main() {
        console.log("[B站自动宽屏居中] 脚本开始执行 (main)。");
        isEnabled = gmGet('enableWideScreen', false); // 读取用户保存的设置
        playerCenterOffset = gmGet('playerCenterOffset', DEFAULT_PLAYER_CENTER_OFFSET);

        // 监听浏览器历史记录变化 (前进/后退按钮)
        window.addEventListener('popstate', handleUrlChange);

        // 劫持 history.pushState / replaceState 以监听 SPA 导航
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        const patchedHistory = function(original) {
            return function(...args) {
                const result = original.apply(this, args);
                window.dispatchEvent(new CustomEvent('historystatechanged'));
                return result;
            };
        };
        history.pushState = patchedHistory(originalPushState);
        history.replaceState = patchedHistory(originalReplaceState);
        window.addEventListener('historystatechanged', handleUrlChange);

        // 初始加载时，如果当前页面是目标页面，则挂上设置入口并初始化脚本
        if (isTargetPage(currentUrl)) {
            ensureUiEntry();
            initializeScriptLogic();
        }

        // 挂载"用户是否自行滚动"的监测——所有自动居中/回顶都要靠它让位。
        // 整页只挂一次，不放进 setupListeners（那会随播放器重建反复挂）。
        attachScrollWatcher();

        // 后台/长时间运行兜底：始终启动存活轮询。
        // 后台标签页里 observer 超时、定时器被节流、点击被吞，全靠它补救。
        restartHeartbeat();

        // 标签页可见性变化：
        //  - 切回前台 → 立即补跑一次（后台期间被节流的逻辑在这里补上），并把轮询换成高频档；
        //  - 切到后台 → 换成低频档，避免和浏览器节流打架。
        // 注意这里的 checkAndScroll 必须是"非 force"的：切回标签页时用户可能正看着评论区，
        // 一旦 force 就会把他从评论区拽回播放器（1.70 版的 bug）。
        document.addEventListener('visibilitychange', () => {
            restartHeartbeat(); // 前台高频档 / 后台低频档
            if (document.hidden) return;
            console.log("[B站自动宽屏居中] 标签页回到前台，立即补跑检查。");
            if (!isTargetPage(window.location.href)) return;
            // 后台期间重试预算可能已被节流的定时器耗光，回到前台给它一次全新预算
            if (isEnabled && !autoWideDone && autoWideAttempts >= AUTO_WIDE_MAX_RETRY) {
                console.log("[B站自动宽屏居中] 重置自动宽屏重试预算。");
                autoWideAttempts = 0;
                lastAutoWideAttempt = 0;
            }
            // 后台期间 URL 可能已被 SPA 改写而检测被冻结，先对齐一次
            handleUrlChange();
            heartbeat();
            if (userScrolledAway) {
                console.log("[B站自动宽屏居中] 用户已滚到别处（如评论区），本次回到前台不调整滚动位置。");
                return;
            }
            setTimeout(checkAndScroll, FINAL_CHECK_DELAY);
        });

        // 页面卸载时执行清理操作
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

    // --- 启动脚本 ---
    // 等待 DOM 内容加载完成后执行 main 函数
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main(); // 如果 DOM 已加载，则直接执行
    }
})();
