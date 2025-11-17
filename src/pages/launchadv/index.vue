<template>
  <view class="launchadv">
    <image class="launchadv__bg" src="/static/launchadv/splash_bg.png" mode="aspectFill" />
    <view class="launchadv__skip" @tap="skip">
      跳过 {{ countdown }}s
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { isGestureSet } from '@/utils/auth'

const TOTAL_SECONDS = 3
const countdown = ref(TOTAL_SECONDS)
let timer: ReturnType<typeof setInterval> | null = null
let finished = false

function clearTimer() {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}

function goNext() {
  if (finished) return
  finished = true
  clearTimer()
  uni.switchTab({ url: '/pages/home/index' })
}

function skip() {
  goNext()
}

function startTimer() {
  countdown.value = TOTAL_SECONDS
  clearTimer()
  timer = setInterval(() => {
    if (countdown.value <= 1) {
      countdown.value = 0
      goNext()
    } else {
      countdown.value -= 1
    }
  }, 1000)
}

onLoad(() => {
  finished = false
  startTimer()
})

onUnload(() => {
  clearTimer()
})
</script>

<style scoped>
.launchadv {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #ffffff;
}

.launchadv__bg {
  width: 100%;
  height: 100%;
}

.launchadv__skip {
  position: absolute;
  right: 32rpx;
  padding: 12rpx 24rpx;
  font-size: 24rpx;
  color: rgba(0, 0, 0, 0.65);
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 100rpx;
  z-index: 2;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 64rpx;
  top: calc(24rpx + constant(safe-area-inset-top, 0));
  top: calc(24rpx + env(safe-area-inset-top, 0));
}
</style>
