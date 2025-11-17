<template>
  <view class="header" :style="bgStyle">
    <view class="status" />
    <view class="bar row space-between">
      <slot name="left"></slot>
      <view class="search" @click="onSearch">
        <text class="ph">{{ placeholder }}</text>
      </view>
      <slot name="right"></slot>
    </view>
    <slot />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const props = defineProps<{ color?: 'red'|'blue', placeholder?: string }>()
const placeholder = props.placeholder ?? '搜索'
const bgStyle = computed(()=> props.color==='blue'
  ? 'background:linear-gradient(180deg,#2a7de1, #5aa4f1);'
  : 'background:linear-gradient(180deg,#e1251b,#ee4d3b);')
const onSearch = ()=> uni.showToast({ title:'搜索', icon:'none' })
</script>

<style scoped>
.status{ height: var(--status-bar-height); }
.bar{ padding: 16rpx 24rpx; gap: 16rpx; }
.search{
  flex:1; height: 64rpx; background: rgba(255,255,255,.2);
  border-radius: 999rpx; display:flex; align-items:center; padding: 0 24rpx;
}
.ph{ color:#fff; opacity:.95; font-size:26rpx; }
.header{ color:#fff; padding-bottom: 24rpx; }
</style>

