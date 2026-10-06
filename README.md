# bili-auto-widescreen
> b站自动宽屏居中，由deepseek生成，ai还是太好用了。

版本 2.6.0 的关键改动
用动态稳定性检测替代固定等待

旧版 scheduleEnsureWide(3000) 是固定等 3 秒再检查。新版完全去掉固定等待，改成：

|参数	|值	|说明|
|----|----|----|
|WATCH_INIT_DELAY	|300ms	|开始检查前的短延迟|
|WATCH_CHECK_INTERVAL	|400ms	|每 400ms 检查一次|
|WATCH_STABLE_THRESHOLD	|3	|连续 3 次 class 不变 ≈ 1.2 秒|
|WATCH_MAX_WAIT	|5000ms	|最长观察时间|
|WATCH_MIN_CLICK_INTERVAL	|2000ms	|两次点击最小间隔|

执行逻辑：

1. 从 300ms 开始，每 400ms 观察宽屏按钮的 class

2. 如果 class 还在变（B 站正在初始化/恢复），stableCount 清零，继续等

3. 一旦连续 3 次（约 1.2 秒）class 不变，说明 B 站动作完成了

4. 此时判断：

  - 已是宽屏 → 完成，居中

  - 不是宽屏 → 主动点击一次（2 秒内不重复点击）

5. 最长观察 5 秒，超时做最后一次点击

预期速度：

|场景	|大致完成时间|
|---|---|
|推荐视频（B 站继承宽屏）	|约 0.7 秒（class 一直稳定，很快达到阈值）|
|前台刷新（B 站 1 秒恢复）	|约 1.5-2 秒|
|从首页进视频（B 站 1.5 秒恢复）	|约 2-2.5 秒|
|B 站完全不恢复	|约 1.5 秒后脚本主动点|

其他改进：

 - 去掉初次缓存失败时的暴力重试点击（旧版的 waitElementAndClick），改为等 MutationObserver 发现元素后走统一流程，避免在元素刚出现、B 站还在初始化时误点

 - handleVisibilityChange 切回前台也走 scheduleEnsureWide，享受同样的动态检测

 - 全部参数在文件头配置区，想调整随时改

如果还想更快:
 - 把 WATCH_STABLE_THRESHOLD 从 3 调到 2（少等 400ms，但稳定性判断更敏感）

 - 把 WATCH_CHECK_INTERVAL 从 400 调到 300（检查更频繁）

 - 如果发现又开始闪烁，反过来把 WATCH_STABLE_THRESHOLD 调到 4 或 5
