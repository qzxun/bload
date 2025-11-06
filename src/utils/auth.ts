// 统一的本地存储 Key
const KEY_GESTURE = 'gesture_pattern'         // 数组，如 [0,1,2,5,8]
const KEY_AUTH_TIME = 'gesture_authed_at'     // number: 毫秒时间戳
const KEY_BG_TIME = 'app_bg_at'               // number: 最近进入后台时间戳

// 配置
export const VALID_WINDOW_MS = 60 * 60 * 1000      // 前台有效 1 小时
export const BG_VALID_WINDOW_MS = 10 * 60 * 1000   // 后台有效 10 分钟

export function getGesture(): number[] | null {
  try {
    const v = uni.getStorageSync(KEY_GESTURE)
    return Array.isArray(v) && v.length ? v : null
  } catch { return null }
}
export function isGestureSet(): boolean {
  return !!getGesture()
}

export function markAuthedNow() {
  uni.setStorageSync(KEY_AUTH_TIME, Date.now())
}

export function isAuthedNow(): boolean {
  try {
    const t = Number(uni.getStorageSync(KEY_AUTH_TIME) || 0)
    if (!t) return false
    return (Date.now() - t) <= VALID_WINDOW_MS
  } catch { return false }
}

export function markBackgroundNow() {
  uni.setStorageSync(KEY_BG_TIME, Date.now())
}

// 在 App 回到前台时调用：后台停留过久则让认证失效
export function maybeInvalidateAfterBackground() {
  try {
    const bg = Number(uni.getStorageSync(KEY_BG_TIME) || 0)
    if (!bg) return
    const delta = Date.now() - bg
    if (delta > BG_VALID_WINDOW_MS) {
      // 使上次认证时间过期
      uni.setStorageSync(KEY_AUTH_TIME, 0)
    }
    // 复位
    uni.removeStorageSync(KEY_BG_TIME)
  } catch {}
}
