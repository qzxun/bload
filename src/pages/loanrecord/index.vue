<template>
  <view class="page">
    <!-- 顶部导航 -->
    <view class="nav">
      <text class="nav-back" @click="goBack">‹</text>
      <text class="nav-title">借还款</text>
      <text class="nav-holder"></text>
    </view>

    <!-- 顶部二级 Tab：未结清 / 已结清 -->
    <view class="tab-row">
      <view class="tab-item" @click="activeTab = 'unsettled'">
        <text :class="['tab-text', activeTab==='unsettled' ? 'on' : '']">未结清</text>
        <view v-if="activeTab==='unsettled'" class="tab-underline" />
      </view>
      <view class="tab-item" @click="activeTab = 'settled'">
        <text :class="['tab-text', activeTab==='settled' ? 'on' : '']">已结清</text>
        <view v-if="activeTab==='settled'" class="tab-underline" />
      </view>
    </view>

    <!-- 筛选下拉（这里先做静态“全部▼”） -->
    <view class="filter-row">
      <text class="filter-text">全部 ▼</text>
    </view>

    <!-- 借款记录列表 -->
    <scroll-view class="list" scroll-y>
      <view
        v-for="loan in filteredList"
        :key="loan.id"
        class="loan-card"
      >
        <!-- 第一行：产品名 + 借据号 + 状态角标 -->
        <view class="row1">
          <view class="loan-main">
            <text class="loan-name">{{ loan.productName }}</text>
            <text class="loan-no fontdefault">借据号：{{ loan.loanNo }}</text>
          </view>
          <view
            class="status-tag"
            :class="loan.status==='repaying' ? 'status-repaying' : 'status-settled'"
          >
            {{ loan.status==='repaying' ? '还款中' : '已结清' }}
          </view>
        </view>

        <!-- 第二行：金额 / 放款时间 / 到期日期 -->
        <view class="row2">
          <view class="col">
            <text class="col-main fontdigit">¥{{ fmt(loan.amount) }}</text>
            <text class="col-sub">借款金额</text>
          </view>
          <view class="col" style="text-align: center;">
            <text class="col-main fontdigit">{{ loan.startDate }}</text>
            <text class="col-sub">放款时间</text>
          </view>
          <view class="col" style="text-align: right;">
            <text class="col-main fontdigit">{{ loan.endDate }}</text>
            <text class="col-sub">到期日期</text>
          </view>
        </view>

        <!-- 第三行：剩余金额 + 还款计划链接 -->
        <view class="row3">
          <text class="remain-text fontmdigit">
            本笔借据剩余余额 {{ fmt(loan.remainingAmount) }} 元，点击查看
          </text>
          <text class="plan-link" @click="viewPlan(loan)"> 还款计划</text>
        </view>

        <!-- 第四行：右下角 按钮 -->
        <view class="row4">
          <button class="btn-upload" @click="uploadVoucher(loan)">凭证上传</button>
        </view>
      </view>

      <view style="height:40rpx" />
    </scroll-view>

    <!-- 底部双按钮：借款记录 / 还款记录（可选） -->
    <view class="bottom-tabs">
      <view class="b-tab active">
        <image class="b-icon" src="/static/loan-record/loan.png" mode="aspectFit" />
        <text class="b-text on">借款记录</text>
      </view>
      <view class="b-tab">
        <image class="b-icon" src="/static/loan-record/repay.png" mode="aspectFit" />
        <text class="b-text">还款记录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type LoanStatus = 'repaying' | 'settled'

interface LoanRecord {
  id: string
  productName: string
  loanNo: string
  amount: number
  startDate: string
  endDate: string
  status: LoanStatus
  remainingAmount: number
}

const activeTab = ref<'unsettled' | 'settled'>('unsettled')

/** 样例数据（你可以根据真实情况改金额和日期） */
const list = ref<LoanRecord[]>([
  {
    id: '1',
    productName: '华兴快贷（住宅）经营',
    loanNo: '50230512000056001',
    amount: 3500000.0,
    startDate: '2023-05-30',
    endDate: '2026-05-29',
    status: 'repaying',
    remainingAmount: 3403050.0
  },
  {
    id: '2',
    productName: '华兴快贷（住宅） 个人',
    loanNo: '50220101000088001',
    amount: 5000000.0,
    startDate: '2023-05-10',
    endDate: '2026-05-09',
    status: 'settled',
    remainingAmount: 0
  }
])

/** 根据 Tab 过滤 */
const filteredList = computed(() =>
  activeTab.value === 'unsettled'
    ? list.value.filter(l => l.status === 'repaying')
    : list.value.filter(l => l.status === 'settled')
)

/** 金额格式化 */
function fmt(n: number) {
  return (n || 0).toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

/** 交互 */
function viewPlan(loan: LoanRecord) {
  // 这里先简单 toast；之后可以跳到还款计划页面
  uni.showToast({
    title: '查看还款计划',
    icon: 'none'
  })
  // 例：跳转
  // uni.navigateTo({ url: `/pages/repay-plan/index?loanId=${loan.id}` })
}

function uploadVoucher(loan: LoanRecord) {
  uni.showToast({
    title: '凭证上传（示例）',
    icon: 'none'
  })
}

function goBack() {
  uni.navigateBack({
    fail() {
      uni.switchTab({
        url: '/pages/loan/index'
      })
    }
  })
}

</script>

<style scoped>
.page {
  min-height: 100vh;
  background-color: #f5f5f7;
  display: flex;
  flex-direction: column;
  
}

/* 顶部导航 */
.nav {
  height: 92rpx;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
}
.nav-back {
  width: 80rpx;
  font-size: 48rpx;
  color: #333333;
}
.nav-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #111111;
}
.nav-holder {
  width: 80rpx;
}

/* Tab 行 */
.tab-row {
  background-color: #ffffff;
  padding: 10rpx 80rpx 0;
  display: flex;
  justify-content: center;
}
.tab-item {
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.tab-text {
  font-size: 30rpx;
  color: #999999;
}
.tab-text.on {
  color: #111111;
  font-weight: 700;
}
.tab-underline {
  width: 52rpx;
  height: 4rpx;
  border-radius: 4rpx;
  background-color: #111111;
  margin: 8rpx auto 0;
}

/* 筛选行 */
.filter-row {
  padding: 16rpx 24rpx 10rpx;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
}
.filter-text {
  font-size: 26rpx;
  color: #666666;
}

/* 列表区域 */
.list {
  flex: 1;
  padding-top: 8rpx;
}

/* 借款卡片 */
.loan-card {
 /* margin: 12rpx 20rpx; */
  padding: 0.825rem 0.825rem 0.6625rem;
      background-color: #ffffff;
      box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.03);
}

/* 第一行 */
.row1 {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.loan-main {
  max-width: 520rpx;
  display: flex;
  flex-direction: column;
}
.loan-name {
  font-size: 0.8375rem;
  color: #111111;
}
.loan-no {
  font-size: 0.7075rem;
  color: #a0a0a0;
/*  	letter-spacing: 0.03925rem; */
}
.status-tag {
  padding: 8rpx 18rpx;
  border-radius: 6rpx;
  font-size: 22rpx;
}
.status-repaying {
  background-color: #fff4e6;
  color: #f97316;
}
.status-settled {
  background-color: #e5f6f1;
  color: #10b981;
}

/* 第二行 */
.row2 {
  margin-top: 1.625rem;
  display: flex;
  justify-content: space-between;
}
.col {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 0.125rem;
      font-size: 0.6875rem;
      color: #a0a0a0;
}
.col-main {
  font-size: 30rpx;
  /* font-weight: 700; */
  color: #111111;
}
.col-sub {
  margin-top: 4rpx;
  font-size: 0.6875rem;
  color: #a0a0a0;
}

/* 第三行 */
.row3 {
  margin-top: 1.625rem;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}
.remain-text {
  font-size: 24rpx;
  color: #111111;
}
.plan-link {
  font-size: 24rpx;
  color: #1d6fe9;
  margin-left: 4rpx;
}

/* 第四行：按钮 */
.row4 {
  margin-top: 18rpx;
  display: flex;
  justify-content: flex-end;
}
.btn-upload {
  padding: 0 32rpx;
  height: 64rpx;
  line-height: 64rpx;
  border-radius: 40rpx;
  background-color: #e02020;
  color: #ffffff;
  font-size: 26rpx;
  border: none;
}
.btn-upload::after {
  border: none;
}

/* 底部双按钮（可当作内页底部切换） */
.bottom-tabs {
  height: 96rpx;
  background-color: #ffffff;
  border-top: 1px solid #f0f0f0;
  display: flex;
}
.b-tab {
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.b-icon {
  width: 36rpx;
  height: 36rpx;
  margin-bottom: 2rpx;
}
.b-text {
  font-size: 24rpx;
  color: #999999;
}
.b-text.on {
  color: #111111;
  font-weight: 600;
}
.active {
  /* 目前只高亮左边“借款记录” */
}

.col-main {
		font-size: 1.3375rem;
}
/* @font-face {
  font-family: 'default';
  src: url('@/static/fonts/D-DIN-PRO-500-Medium.otf');
} */
.btn-upload{
	margin-left: inherit !important;
	    margin-right: inherit !important;
	    padding: 0 0.9rem;
	    height: 1.4rem;
	    line-height: 1.4rem;
	    margin-top: 1rem;
	    margin-bottom: 0.5rem;
}
.fontmdigit {
	font-family: 'fontmdigit';
}
@font-face {
  font-family: 'fontmdigit';
  src: url('@/static/fonts/default.ttf');
}
@font-face {
	font-family: 'alimama';
	src: url('@/static/fonts/Alimama_ShuHeiTi_Bold.ttf');
}

</style>
