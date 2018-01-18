// pages/map/map.js
var bmap = require('../../libs/bmap-wx.min.js');
Page( {
  /**
   * 页面的初始数据
   */
  data: {
    rests: [],
    dish: null,
    keyword: null,
    total: 0,
    checked: false,
    loading: true
  },
  bindViewTap: function (e) {
    var info = this.data.rests[e.currentTarget.id]
    console.log(info)
    
    wx.openLocation({
      name: info.title,
      address: info.address,
      latitude: info.latitude,
      longitude: info.longitude,
      scale: 28
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.dish, options.keyword)
    this.setData({
      dish: options.dish,
      keyword : options.keyword
    })
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'hadDaukDFocq0vGFVXY6iTBhhWUEyNGt'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var info = data.wxMarkerData;
      console.log(info)
      that.setData({
        rests: info,
        total: info.length,
        loading : false
      })
      if (info.length>0){
        
        // wx.openLocation({
        //   name: info[0].title,
        //   address: info[0].address,
        //   latitude: info[0].latitude,
        //   longitude: info[0].longitude,
        //   scale: 28
        // })
      }
    }
    var query = this.data.keyword
    if (query == null || query === '' || query ==='undefined'){
      query = this.data.dish
    }
    // 发起POI检索请求 
    BMap.search({
      "query": query,
      //"query": "馄饨",
      fail: fail,
      success: success
    }); 
  }
})