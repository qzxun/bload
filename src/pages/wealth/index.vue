<template>
  <view class="page">
    <!-- 顶部搜索 + 铃铛 -->
    <view class="top">
      <view class="search" @click="tap('搜索')">
        <image src="/static/wealth/icon_search_gray.png" class="t-i" mode="aspectFit" />
        <text class="s-ph">智能闲钱宝</text>
      </view>
      <image class="top-i" src="/static/wealth/bell.png" mode="aspectFit" />
    </view>

    <!-- 入口宫格：2 行 × 5 列 -->
    <view class="card">
      <view class="grid grid-5">
        <view class="gitem" v-for="f in features" :key="f.text" @click="tap(f.text)">
          <image :src="f.icon" class="gicon" />
          <text class="gtext">{{ f.text }}</text>
        </view>
      </view>
    </view>
	<view class="home1">
		  <image src="/static/wealth/wealth1.jpeg" mode="widthFix"></image>
		  <image src="/static/wealth/wealth2.jpeg" mode="widthFix"></image>
		  <image src="/static/wealth/wealth3.jpeg" mode="widthFix"></image>
		  <image src="/static/wealth/wealth4.jpeg" mode="widthFix"></image>
		  <image src="/static/wealth/wealth5.jpeg" mode="widthFix"></image>
	 </view>
    <!-- 华兴优选：三标签 + 六项收益 -->
   <!-- <view class="card">
      <view class="sec-tabs">
        <text v-for="t in preferTabs" :key="t" :class="['t', activePrefer===t && 'on']" @click="activePrefer=t">{{ t }}</text>
      </view>

      <view class="rates">
        <view class="row">
          <view class="rate">
            <text class="rt-name">日兴</text>
            <view class="rt-val"><text class="num">2.40</text><text class="unit">%</text></view>
            <text class="rt-sub">自产品成立以来年化…</text>
          </view>
          <view class="rate">
            <text class="rt-name">周兴</text>
            <view class="rt-val"><text class="num">5.50</text><text class="unit">%</text></view>
            <text class="rt-sub">自产品成立以来年化…</text>
          </view>
        </view>
        <view class="row">
          <view class="rate">
            <text class="rt-name">月兴</text>
            <view class="rt-val"><text class="num">4.05</text><text class="unit">%</text></view>
            <text class="rt-sub">自产品成立以来年化…</text>
          </view>
          <view class="rate">
            <text class="rt-name">季兴</text>
            <view class="rt-val"><text class="num">9.03</text><text class="unit">%</text></view>
            <text class="rt-sub">自产品成立以来年化…</text>
          </view>
        </view>
        <view class="row">
          <view class="rate">
            <text class="rt-name">半年</text>
            <view class="rt-val"><text class="num">5.48</text><text class="unit">%</text></view>
            <text class="rt-sub">自产品成立以来年化…</text>
          </view>
          <view class="rate">
            <text class="rt-name">年年</text>
            <view class="rt-val"><text class="num">4.00</text><text class="unit">%</text></view>
            <text class="rt-sub">近1年年化收益率</text>
          </view>
        </view>
      </view>
    </view> -->

    <!-- 热销产品 -->
  <!--  <view class="card">
      <view class="sec-head">
        <text class="sec-title">热销产品</text>
      </view>
      <view class="hot">
        <view class="hot-major" @click="tap('热销-主卡')">
          <view class="hm-left">
            <view class="hm-tag">臻选理财</view>
            <view class="hm-title">兴银理财睿利兴成稳健三个月</view>
            <view class="hm-rate"><text class="num">6.84</text><text class="unit">%</text></view>
            <view class="hm-sub">自产品成立以来年化…</view>
          </view>
          <image src="/static/wealth/leaf.png" class="hm-img" mode="aspectFit" />
        </view>

        <view class="hot-minor">
          <view class="hmn" v-for="h in hots" :key="h.title" @click="tap(h.title)">
            <view class="hmn-title">{{ h.title }}</view>
            <view class="hmn-rate"><text class="num">{{ h.rate }}</text><text class="unit">%</text></view>
            <view class="hmn-sub">{{ h.sub }}</view>
          </view>
        </view>
      </view>
    </view> -->

    <!-- 财富规划：两类（存款 / 理财） -->
    <!-- <view class="card">
      <view class="sec-head">
        <text class="sec-title">财富规划</text>
      </view>

      <view class="plan">
        <view class="plan-hd" @click="tap('存款')">
          <view class="ph-left"><image src="/static/wealth/icon_deposit.png" class="ph-i" />存款</view>
          <text class="ph-more">+</text>
        </view>
        <view class="plan-item">
          <view class="pi-title">新兴年25年第255期（深圳）</view>
          <view class="pi-desc">2.00% · 1万元起 · 15年</view>
          <view class="pi-banner">
            <image src="/static/wealth/bigcd.png" class="pi-img" mode="aspectFill" />
            <view class="pi-btext">
              <text class="b1">大额存单随选专区</text>
              <text class="b2">限时特惠，让资产稳稳升</text>
            </view>
          </view>
        </view>
      </view>

      <view class="plan">
        <view class="plan-hd" @click="tap('理财')">
          <view class="ph-left"><image src="/static/wealth/icon_wealth.png" class="ph-i" />理财</view>
          <text class="ph-more">+</text>
        </view>

        <view class="plan-item">
          <view class="pi-title">民生理财 贵竹固收增强稳健精选6…</view>
          <view class="pi-tag">代销</view>
          <view class="pi-desc red">4.55% · 1元起 · 最短持有182天</view>

          <view class="pi-row">
            <view class="pi-col">
              <text class="pi-k">兴享季成188天（私行专享）</text>
              <text class="pi-v">2.50% ~ 3.20%</text>
              <text class="pi-s">业绩比较基准</text>
            </view>
            <view class="pi-col">
              <text class="pi-k">投资额度</text>
              <text class="pi-v">20万元起 | 188天</text>
            </view>
          </view>

          <view class="pk">
            <view class="pk-left">
              <text class="pk-t">产品PK</text>
              <text class="pk-s">智能挑选对比工具</text>
            </view>
            <view class="pk-right">
              <text class="pk-a">代销理财</text>
              <text class="pk-b">业绩基准 188天</text>
            </view>
          </view>
        </view>
      </view>
    </view> -->

    <!-- 基金 -->
<!--    <view class="card">
      <view class="sec-head">
        <text class="sec-title">基金</text>
        <text class="sec-sub">进取稳健</text>
        <text class="sec-more">+</text>
      </view>

      <view class="funds">
        <view class="fund" v-for="f in funds" :key="f.title" @click="tap(f.title)">
          <view class="fund-hd">
            <text class="f-cat">{{ f.cat }}</text>
            <text class="f-title">{{ f.title }}</text>
          </view>
          <view class="fund-main">
            <image :src="f.spark" class="f-spark" mode="aspectFit" />
            <view class="f-num"><text class="num">+{{ f.y1 }}</text><text class="unit">%</text><text class="f-lab">近1年收益</text></view>
            <view class="f-num"><text class="num">+{{ f.y3 }}</text><text class="unit">%</text><text class="f-lab">近3年收益</text></view>
          </view>
        </view>
      </view>
    </view> -->

    <!-- 保险 -->
    <!-- <view class="card">
      <view class="sec-head">
        <text class="sec-title">保险</text>
        <text class="sec-sub">安全保障</text>
        <text class="sec-more">+</text>
      </view>

      <view class="insures">
        <view class="ins" v-for="i in insures" :key="i.title" @click="tap(i.title)">
          <image :src="i.img" class="ins-img" mode="aspectFill" />
          <view class="ins-meta">
            <view class="ins-title line2">{{ i.title }}</view>
            <view class="ins-price">{{ i.price }}</view>
          </view>
        </view>
      </view>

      <view class="ins-note">
        信息披露与售后专栏，保障您的权益
      </view>
      <view class="ins-badge">严选合作保险公司</view>
    </view> -->

    <!-- 投资进修 -->
   <!-- <view class="card">
      <view class="sec-head">
        <text class="sec-title">投资进修</text>
      </view>
      <view class="learn">
        <view class="learn-btn blue" @click="tap('理财小知识')">理财小知识</view>
        <view class="learn-btn orange" @click="tap('高手理财经')">高手理财经</view>
      </view>
    </view>

    <view class="card">
      <view class="sec-head">
        <text class="sec-title">理财资讯</text>
        <text class="sec-more">+</text>
      </view>
      <view class="news" v-for="n in news" :key="n.id" @click="tap(n.title)">
        <text class="n-title line2">{{ n.title }}</text>
        <text class="n-meta">{{ n.src }}</text>
      </view>
    </view>

    <view style="height: 48rpx" /> -->
  </view>
</template>

<script setup lang="ts">
const tap = (msg:string)=> uni.showToast({ title: msg, icon: 'none' })

const features = [
  { icon:'/static/wealth/deposit.png',  text:'存款' },
  { icon:'/static/wealth/wealth.png',   text:'理财' },
  { icon:'/static/wealth/fund.png',     text:'基金' },
  { icon:'/static/wealth/insurance.png',text:'保险' },
  { icon:'/static/wealth/market.png',   text:'转让市场' },
  { icon:'/static/wealth/bigdeposit.png', text:'大额存单' },
  { icon:'/static/wealth/cashplus.png', text:'智能闲钱宝' },
  { icon:'/static/wealth/gold.png',     text:'黄金' },
  { icon:'/static/wealth/usd.png',      text:'美元专区' },
  { icon:'/static/func/all.png',      text:'全部' }
]

const preferTabs = ['华兴优选','闲钱理财','稳健增值']
let activePrefer:'华兴优选'|'闲钱理财'|'稳健增值' = '华兴优选'

const hots = [
  { title:'兴享季成…', rate:'2.80', sub:'业绩比较基准' },
  { title:'华兴智稳…', rate:'1.60', sub:'专业稳健策略' },
  { title:'广发多因…', rate:'30.71', sub:'近一年收益率' }
]

const funds = [
  { cat:'业绩先锋', title:'广发上游金E…', y1:'44.51', y3:'—', spark:'/static/wealth/spark1.png' },
  { cat:'定投优选', title:'易方达黄金E…', y1:'42.71', y3:'—', spark:'/static/wealth/spark2.png' }
]

const insures = [
  { img:'/static/wealth/ins1.jpg', title:'都会佳作（优享版）重疾险', price:'2万起' },
  { img:'/static/wealth/ins2.jpg', title:'海港鸿运连年两全…', price:'1万起' }
]

const news = [
  { id:1, title:'基金管理 | 新华基金管理股份有限公司调研中工国际', src:'同花顺News' }
]
</script>

<style scoped>
/* 主题色与通用色 */
:root {
  --red:#e1251b;
  --text:#1f2329;
  --sub:#8a8f99;
  --line:#f0f2f5;
  --card:#ffffff;
  --bg:#f7f8fa;
  --shadow:0 4rpx 12rpx rgba(0,0,0,.04);
}

.page{ background:var(--bg); min-height:100vh; }

/* 顶部 */
.top{ display:flex; align-items:center; gap:16rpx; padding:12rpx 20rpx 0; }
.search{
  flex:1; height:64rpx; border-radius:999rpx; background:inherit;border: 2px solid #f0f2f5;
  display:flex; align-items:center; gap:10rpx; padding:0 18rpx;color:#a0a0a0;
}
.s-icon{ font-size:28rpx; color:var(--sub); }
.s-ph{ color:var(--sub); font-size:26rpx; }
.top-i{ width:40rpx; height:40rpx; }

/* 卡片容器 */
.card{
  background:var(--card); border-radius:16rpx; padding:20rpx; margin:12rpx 20rpx; box-shadow:var(--shadow);
}

/* 宫格 */
.grid{ display:grid; gap:16rpx; }
.grid-5{ grid-template-columns:repeat(5,1fr); }
.gitem{ display:flex; flex-direction:column; align-items:center; gap:8rpx; }
.gicon{ width:56rpx; height:56rpx; }
.gtext{ font-size:24rpx; color:var(--text); }

/* 小标题/导航 */
.sec-head{ display:flex; align-items:center; gap:12rpx; }
.sec-title{ font-size:30rpx; font-weight:700; color:var(--text); }
.sec-sub{ color:var(--sub); font-size:24rpx; margin-left:auto; }
.sec-more{ margin-left:6rpx; color:#c0c4cc; }

/* 华兴优选 tabs */
.sec-tabs{ display:flex; gap:24rpx; margin-bottom:16rpx; }
.t{ color:#6b7280; font-size:28rpx; }
.t.on{ color:var(--text); font-weight:700; position:relative; }
.t.on::after{
  content:''; position:absolute; left:0; right:0; bottom:-8rpx; margin:auto;
  width:86rpx; height:6rpx; background:#111827; border-radius:3rpx;
}

/* 收益栅格 */
.rates{ margin-top:6rpx; }
.row{ display:flex; gap:16rpx; }
.rate{
  flex:1; background:#fff; border:1rpx solid var(--line); border-radius:14rpx; padding:16rpx;
}
.rt-name{ font-size:24rpx; color:#6b7280; }
.rt-val{ display:flex; align-items:flex-end; gap:4rpx; margin:6rpx 0; }
.num{ color:var(--red); font-weight:700; font-size:38rpx; line-height:1; }
.unit{ color:var(--red); font-size:24rpx; }
.rt-sub{ color:var(--sub); font-size:22rpx; }

/* 热销 */
.hot-major{
  display:flex; align-items:center; justify-content:space-between;
  background:linear-gradient(180deg,#fff,#fff); border:1rpx solid var(--line);
  border-radius:14rpx; padding:16rpx; margin-bottom:14rpx;
}
.hm-left .hm-tag{
  display:inline-block; font-size:22rpx; padding:4rpx 10rpx; border-radius:999rpx; background:#fff1f0; color:var(--red); margin-bottom:6rpx;
}
.hm-title{ font-size:26rpx; color:var(--text); }
.hm-rate{ margin:8rpx 0 2rpx; }
.hm-sub{ color:var(--sub); font-size:22rpx; }
.hm-img{ width:120rpx; height:82rpx; }
.hot-minor{ display:grid; grid-template-columns:repeat(3,1fr); gap:12rpx; }
.hmn{
  border:1rpx solid var(--line); border-radius:12rpx; padding:12rpx;
}
.hmn-title{ font-size:24rpx; color:var(--text); }
.hmn-rate{ margin:4rpx 0; }
.hmn-sub{ color:var(--sub); font-size:22rpx; }

/* 财富规划 */
.plan{ margin-top:10rpx; }
.plan-hd{ display:flex; align-items:center; justify-content:space-between; padding:6rpx 0; }
.ph-left{ display:flex; align-items:center; gap:8rpx; font-weight:700; }
.ph-i{ width:28rpx; height:28rpx; }
.ph-more{ color:#c0c4cc; }
.plan-item{ margin-top:8rpx; border:1rpx solid var(--line); border-radius:12rpx; padding:14rpx; }
.pi-title{ font-size:26rpx; color:var(--text); }
.pi-tag{
  display:inline-block; font-size:20rpx; color:var(--red); background:#fff1f0; border-radius:6rpx;
  padding:2rpx 8rpx; margin-top:6rpx;
}
.pi-desc{ font-size:22rpx; color:var(--sub); margin-top:6rpx; }
.pi-desc.red{ color:var(--red); }
.pi-row{ display:flex; gap:14rpx; margin-top:10rpx; }
.pi-col{ flex:1; }
.pi-k{ color:var(--text); font-size:24rpx; }
.pi-v{ color:var(--red); font-weight:700; margin-top:2rpx; }
.pi-s{ color:var(--sub); font-size:22rpx; }
.pi-banner{ display:flex; align-items:center; gap:12rpx; background:#f3f7ff; border-radius:12rpx; padding:12rpx; margin-top:12rpx; }
.pi-img{ width:88rpx; height:56rpx; border-radius:10rpx; }
.pi-btext .b1{ font-weight:700; font-size:24rpx; }
.pi-btext .b2{ color:#6b7280; font-size:22rpx; margin-top:2rpx; }

/* PK 条 */
.pk{
  display:flex; align-items:center; justify-content:space-between;
  background:#f8fafc; border-radius:12rpx; padding:12rpx; margin-top:12rpx;
}
.pk-left .pk-t{ font-weight:700; }
.pk-left .pk-s{ display:block; color:var(--sub); font-size:22rpx; }
.pk-right{ display:flex; gap:10rpx; }
.pk-a,.pk-b{
  font-size:22rpx; padding:4rpx 10rpx; border-radius:999rpx; background:#e7f1ff; color:#3b82f6;
}

/* 基金 */
.funds{ display:grid; grid-template-columns:1fr; gap:12rpx; margin-top:10rpx; }
.fund{ border:1rpx solid var(--line); border-radius:12rpx; padding:14rpx; }
.fund-hd{ display:flex; gap:8rpx; align-items:center; }
.f-cat{ font-size:22rpx; color:#fff; background:#111827; padding:2rpx 8rpx; border-radius:6rpx; }
.f-title{ font-size:24rpx; color:var(--text); font-weight:700; }
.fund-main{ display:flex; align-items:center; gap:12rpx; margin-top:10rpx; }
.f-spark{ width:120rpx; height:60rpx; }
.f-num .num{ color:var(--red); font-weight:700; }
.f-lab{ margin-left:6rpx; color:var(--sub); font-size:22rpx; }

/* 保险 */
.insures{ display:grid; grid-template-columns:1fr; gap:12rpx; margin-top:10rpx; }
.ins{ display:flex; gap:12rpx; border:1rpx solid var(--line); border-radius:12rpx; padding:12rpx; }
.ins-img{ width:120rpx; height:80rpx; border-radius:10rpx; background:#fafafa; }
.ins-title{ font-size:24rpx; color:var(--text); }
.ins-price{ margin-top:6rpx; color:var(--red); font-weight:700; }
.ins-note{ margin-top:10rpx; color:var(--sub); font-size:22rpx; }
.ins-badge{ margin-top:8rpx; display:inline-block; padding:4rpx 10rpx; border-radius:999rpx; background:#f3f4f6; color:#6b7280; font-size:22rpx; }

/* 投资进修 */
.learn{ display:flex; gap:12rpx; margin-top:10rpx; }
.learn-btn{
  flex:1; text-align:center; padding:18rpx 0; border-radius:12rpx; color:#111827; font-weight:700;
}
.learn-btn.blue{ background:#e7f1ff; color:#1f5cd4; }
.learn-btn.orange{ background:#fff1e6; color:#d97706; }

/* 资讯 */
.news{ padding:12rpx 0; border-bottom:1rpx solid var(--line); }
.news:last-child{ border-bottom:0; }
.n-title{ font-size:26rpx; color:var(--text); }
.n-meta{ display:block; color:var(--sub); font-size:22rpx; margin-top:4rpx; }

/* 两行省略 */
.line2{
  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;
  overflow:hidden; text-overflow:ellipsis;
}
.t-i{ width: 40rpx; height: 40rpx; }
.home1 {
	width: 100%; /* 或者使用百分比等 */
	height: auto; /* 或者根据需要设置为固定值 */
	    background-color: #F8F8F8;
		
	position: relative;
	/* top: 340rpx; */
}
.home image {
	width:100%;
}
.home1 uni-image {
	width:100% !important;
	display: block !important; 
}
.home2 image {
	width:100%;
	height:auto;
}
.home3 image {
	width:100%;
	height:auto;
}
</style>
