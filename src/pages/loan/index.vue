<template>
  <view class="page">
    <!-- 顶部：搜索 + 图标 -->
    <!-- <view class="top">
		<view class="search" @click="tap('搜索')">
		  <image src="/static/liyu/ic_search_new.png" class="t-i" mode="aspectFit" />
		  <text class="s-ph">华兴智贷</text>
		</view>
      <view class="t-icons">
        <image src="/static/loan/calendar.png" class="t-i" mode="aspectFit"/>
        <image src="/static/icons/bell.png" class="t-i bell" mode="aspectFit"/>
      </view>
    </view> -->

	<view class="banner">
		<image src="/static/loan/ownbanner.png" class="banner-img" mode="widthFix" />
	  <!-- <swiper class="swiper" indicator-dots autoplay circular interval="3000" duration="500">
	    <swiper-item v-for="(b,i) in banners" :key="i">
	      <image :src="b.src" class="banner-img" mode="aspectFill" @click="tap(b.title)" />
	    </swiper-item>
	  </swiper> -->
	  <view class="date fontndigit">11月15日</view>
	  <view class="dkye fontdefault">贷款余额: <text class="num fontndigit">¥3500000</text></view>
	  <view class="kyye fontdefault">可用余额: <text class="num fontndigit">¥17500.0</text></view>
	</view>
	<view class="card navs fontdefault">
	  <view class="grid grid-5">
	    <view class="gitem" v-for="f in features" :key="f.text" @click="tap(f.text)">
	      <image :src="f.icon" class="gicon"/>
	      <text class="gtext">{{ f.text }}</text>
	    </view>
	  </view>
	</view>
	<view class="home1">
		  <image src="/static/loan/load1.jpeg" mode="widthFix"></image>
		  <image src="/static/loan/load2.jpeg" mode="widthFix"></image>
	 </view>
	 
    <!-- <view class="wrap"> -->

      <!-- 入口宫格：2 行 × 5 列 -->
     

      <!-- 精选产品（列表卡） -->
     <!-- <view class="card">
        <view class="sec-title">精选产品</view>
        <view class="prod" v-for="p in prods" :key="p.name" @click="tap(p.name)">
          <view class="p-left">
            <view class="p-name">{{ p.name }}</view>
            <view class="p-tag" v-if="p.tag">{{ p.tag }}</view>
            <view class="p-amt"><text class="num">{{ p.max }}</text><text class="unit">万元</text></view>
            <view class="p-sub">最高可借</view>
          </view>
          <view class="p-right">
            <view class="p-rate"><text class="num">{{ p.rate }}</text><text class="unit">%</text></view>
            <view class="p-sub">年利率 {{ p.rateText }}</view>
          </view>
        </view>
      </view> -->

      <!-- 特色产品（两列卡片） -->
     <!-- <view class="card">
        <view class="sec-title">特色产品</view>
        <view class="special-grid">
          <view class="sp" v-for="s in specials" :key="s.title" @click="tap(s.title)">
            <view class="sp-title line1">{{ s.title }}</view>
            <view class="sp-sub line2">{{ s.sub }}</view>
            <view class="sp-amt"><text class="num">{{ s.max }}</text><text class="unit">万元</text></view>
            <view class="sp-sub2">最高可借</view>
            <button class="btn primary mini">进入专区</button>
            <image :src="s.img" class="sp-img" mode="aspectFit"/>
          </view>
        </view>
      </view -->>

      <!-- 贷款工具 -->
     <!-- <view class="card">
        <view class="sec-title">贷款工具</view>
        <view class="tool-grid">
          <view class="tool" v-for="t in tools" :key="t.text" @click="tap(t.text)">
            <image :src="t.icon" class="tool-i"/>
            <view>
              <view class="tool-t">{{ t.text }}</view>
            </view>
          </view>
        </view>
      </view> -->

      <!-- 贷款资讯 -->
      <!-- <view class="card">
        <view class="sec-head">
          <text class="sec-title">贷款资讯</text>
          <text class="sec-arrow">→</text>
        </view>
        <view class="news" v-for="n in news" :key="n.id" @click="tap(n.title)">
          <view class="n-date">
            <view class="d-m">{{ n.mm }}</view>
            <view class="d-d">{{ n.dd }}</view>
          </view>
          <view class="n-main">
            <text class="n-title line2">{{ n.title }}</text>
            <text class="n-src">{{ n.src }}</text>
          </view>
        </view>
      </view> -->

    <!--  <view style="height: 44rpx"></view>
    </view> -->
  </view>
</template>

<script setup lang="ts">
const tap = (m:string)=>uni.showToast({title:m,icon:'none'})

const banners = [
  { src: '/static/loan/load1.png', title: '' },
  { src: '/static/loan/load2.png', title: '' },
  { src: '/static/loan/load3.png', title: '' }
]

const features = [
  { icon:'/static/loan/borrow.png',  text:'借还款' },
  { icon:'/static/loan/bill.png',    text:'待还账单' },
  { icon:'/static/loan/quota.png',   text:'我的额度' },
  { icon:'/static/loan/transfer.png',text:'资金转出' },
  { icon:'/static/loan/meeting.png', text:'合议室' },
  { icon:'/static/loan/quick.png',   text:'华兴快贷' },
  { icon:'/static/loan/good.png',    text:'华兴好贷' },
  { icon:'/static/loan/renew.png',   text:'续贷业务' },
  { icon:'/static/loan/raise.png',   text:'额度提款' },
  { icon:'/static/func/all.png',     text:'全部' }
]

const prods = [
  { name:'好企贷（个人生产经营）', max:500, rate:'3.34~9.80', rateText:'3.34% ~ 9.80%', tag:'' },
  { name:'随心借', max:1000, rate:'3.00~6.00', rateText:'3.00% ~ 6.00%', tag:'存款理财质押 灵活支用' },
  { name:'华兴快贷', max:2500, rate:'2.90~5.50', rateText:'2.90% ~ 5.50%', tag:'抵押贷款 支持多种抵押物' },
  { name:'华兴消费贷', max:100, rate:'3.00~13.80', rateText:'3.00% ~ 13.80%', tag:'线上申请 消费专用' }
]

const specials = [
  { title:'华兴饲料e贷', sub:'智能审批 即时放款', max:1000, img:'/static/loan/sp1.png' },
  { title:'商易贷|潮…', sub:'服务属地经济，支持小微发展', max:1000, img:'/static/loan/sp2.png' }
]

const tools = [
  { icon:'/static/loan/house.png', text:'房产评估' },
  { icon:'/static/loan/calc.png',  text:'贷款计算器' }
]

const news = [
  { id:1, mm:'11', dd:'06', title:'Rocket Companies 11月5日成交额为5.07亿美元 成交额较上…', src:'同花顺 iNews' }
]
</script>

<style scoped>
:root{
  --red:#e1251b;
  --blue:#1e76d1;
  --blue2:#54a3f1;
  --text:#1f2329;
  --sub:#8a8f99;
  --line:#f0f2f5;
  --bg:#f7f8fa;
  --card:#fff;
  --shadow:0 4rpx 12rpx rgba(0,0,0,.04);
}
.page{ background:var(--bg); min-height:100vh; }

/* 顶部 */
.top{ display:flex; align-items:center; gap:14rpx; padding: 14rpx 20rpx 0;position: relative;
    z-index: 99; }
.search{
  flex:5; height:64rpx; border-radius:999rpx; background:inherit;
  display:flex; align-items:center; gap:10rpx; padding:0 18rpx;color:white;border:1rpx solid white;
}
.s-icon{ font-size:28rpx; color:var(--sub); }
.s-ph{ color:var(--sub); font-size:26rpx; }
.t-icons{ display:flex; gap:12rpx; flex:1.5;justify-content: space-around;}
.t-i{ width:40rpx; height:40rpx; }

/* 英雄位 */
.hero{
  margin: 12rpx 20rpx 0;
  background: linear-gradient(180deg, var(--blue) 0%, var(--blue2) 90%);
  border-radius: 16rpx; color:#fff; padding: 20rpx; position: relative; box-shadow: var(--shadow);
}
.h-title{ font-size:30rpx; font-weight:700; }
.h-sub{ margin-top:4rpx; opacity:.95; font-size:22rpx; }
.h-amt{ margin-top:10rpx; font-size:28rpx; }
.h-amt .big{ font-size:48rpx; font-weight:800; margin:0 6rpx; }
.h-meta{ margin-top:6rpx; font-size:22rpx; opacity:.95; }
.btn.white{ background:#fff; color:var(--blue); border-radius:999rpx; padding: 10rpx 18rpx; margin-top:12rpx; }
.h-dots{ position:absolute; left:0; right:0; bottom:10rpx; display:flex; justify-content:center; gap:8rpx; }
.dot{ width:10rpx; height:10rpx; border-radius:50%; background:rgba(255,255,255,.5); }
.dot.on{ background:#fff; }

/* 容器与通用卡片 */
.wrap{ margin: 0 20rpx; }
.card{ background:var(--card); border-radius:16rpx; padding:20rpx; margin:12rpx 0; box-shadow:var(--shadow); }

/* 宫格 */
.grid{ display:grid; gap: 20rpx; }
.grid-5{ grid-template-columns: repeat(5,1fr); }
.gitem{ display:flex; flex-direction:column; align-items:center; gap:8rpx; }
.gicon{ width:56rpx; height:56rpx; }
.gtext{ font-size:24rpx; color:var(--text); }

/* 小标题 */
.sec-title{ font-weight:700; font-size:30rpx; color:var(--text); }
.sec-head{ display:flex; align-items:center; justify-content:space-between; }
.sec-arrow{ color:#c0c4cc; }

/* 精选产品列表卡 */
.prod{
  margin-top:12rpx; display:flex; justify-content:space-between; align-items:center;
  border:1rpx solid var(--line); border-radius:14rpx; padding:14rpx;
}
.p-left{ display:flex; flex-direction:column; }
.p-name{ font-size:26rpx; color:var(--text); }
.p-tag{ margin-top:4rpx; color:#d97706; background:#fff1e6; padding:2rpx 8rpx; border-radius:6rpx; font-size:20rpx; width:max-content; }
.p-amt{ margin-top:8rpx; }
.p-amt .num{ color:var(--red); font-weight:800; font-size:40rpx; line-height:1; }
.p-amt .unit{ color:var(--red); margin-left:4rpx; }
.p-sub{ color:var(--sub); font-size:22rpx; margin-top:4rpx; }
.p-right{ text-align:right; }
.p-rate .num{ color:var(--text); font-weight:700; font-size:28rpx; }
.p-rate .unit{ color:var(--text); margin-left:2rpx; }
.p-right .p-sub{ color:#9aa1ab; }

/* 特色产品 两列卡片 */
.special-grid{ display:grid; grid-template-columns: repeat(2,1fr); gap:12rpx; margin-top:12rpx; }
.sp{
  position:relative; border:1rpx solid var(--line); border-radius:14rpx; padding:14rpx; overflow:hidden;
}
.sp-title{ font-size:26rpx; font-weight:700; color:var(--text); }
.sp-sub{ color:var(--sub); font-size:22rpx; margin-top:6rpx; min-height: 54rpx; }
.sp-amt{ margin-top:6rpx; }
.sp-amt .num{ color:var(--red); font-weight:800; font-size:32rpx; }
.sp-amt .unit{ color:var(--red); margin-left:4rpx; }
.sp-sub2{ color:var(--sub); font-size:22rpx; margin-top:4rpx; }
.btn.primary.mini{ margin-top:10rpx; padding: 8rpx 14rpx; border-radius:999rpx; background:var(--red); color:#fff; font-size:24rpx; }
.sp-img{ position:absolute; right:8rpx; bottom:6rpx; width:120rpx; height:90rpx; opacity:.96; }

/* 贷款工具 */
.tool-grid{ display:grid; grid-template-columns: repeat(2,1fr); gap:12rpx; margin-top:12rpx; }
.tool{
  display:flex; align-items:center; gap:12rpx; padding:14rpx; border-radius:14rpx; background:#f8fafc; border:1rpx solid var(--line);
}
.tool-i{ width:40rpx; height:40rpx; }
.tool-t{ font-size:26rpx; color:var(--text); }

/* 资讯 */
.news{
  margin-top:12rpx; display:flex; gap:12rpx; border:1rpx solid var(--line); border-radius:14rpx; padding:12rpx;
}
.n-date{
  width:64rpx; height:64rpx; border-radius:10rpx; background:#111827; color:#fff;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
}
.d-m{ font-size:22rpx; }
.d-d{ font-size:22rpx; }
.n-main{ flex:1; }
.n-title{ font-size:26rpx; color:var(--text); }
.n-src{ display:block; margin-top:6rpx; color:var(--sub); font-size:22rpx; }

/* 文本截断 */
.line1{ overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
.line2{
  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;
  overflow:hidden; text-overflow:ellipsis;
}

.swiper{ width:100%; height: 380rpx; border-radius: 0rpx; overflow: hidden; }
.banner-img{ width:100%; height:100%; }
.banner{
	    border-radius: 0;
	    position: absolute;
	    top: 0px;
	    left: 0px;
	    width: 100%;
		
}
.t-i{ width: 40rpx; height: 40rpx; }
.home1 {
	width: 100%; /* 或者使用百分比等 */
	height: auto; /* 或者根据需要设置为固定值 */
	    background-color: #F8F8F8;
		
	position: relative;
	    top: 240rpx;
		    padding-bottom: 40px;
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
.bell {
	width: 60rpx; height: 60rpx;
	align-items: center;
}
.navs {
	position: relative;
	top: 360rpx;
	z-index: 999;
	background: white;
}
.date {
	position: absolute;
	right: 6.25rem;
	top: 3.58rem;
	color: #ffffffbf;
	font-size: 0.9125rem;
}
.dkye {
	position:absolute;
	left:40rpx;
	bottom:3.5875rem;
	color:#ffffffbf;
	font-family: 'default';
	display: flex;
	    align-items: center;
}
.kyye {
	position:absolute;
	left:40rpx;
	bottom:1.6625rem;
	color:white;
	display: flex;
	    align-items: center;

}

.num {
	margin-left:20rpx;
	font-size: 0.95rem;
}
.fontndigit {
	font-family: 'fontndigit';
}
@font-face {
	font-family: 'fontndigit';
	src: url('@/static/fonts/InteGration_4.6.4.ttf');
}

</style>
