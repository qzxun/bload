export async function getHomeFeed(){
  // 可替换为真实接口
  return {
    shortcuts: [
      { icon:'/static/images/ic_nav_1.png', text:'活动' },
      { icon:'/static/images/ic_nav_2.png', text:'分类' },
      { icon:'/static/images/ic_nav_3.png', text:'附近' },
      { icon:'/static/images/ic_nav_4.png', text:'客服' }
    ],
    list: [
      { id:1, title:'示例商品A', price:99, cover:'/static/images/demo1.jpg' },
      { id:2, title:'示例商品B', price:129, cover:'/static/images/demo2.jpg' }
    ]
  }
}

