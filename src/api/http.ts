export const http = (url:string, data:any={}, method:'GET'|'POST'='GET')=>{
  return new Promise((resolve,reject)=>{
    uni.request({
      url, data, method,
      header: {
        'User-Agent': 'okhttp/3.12.1',  // 模拟常见 UA
        'Accept': 'application/json'
      },
      success:(res)=> resolve(res.data),
      fail: reject
    })
  })
}

