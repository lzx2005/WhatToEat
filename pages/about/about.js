// pages/about/about.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  copyEmail: function(){
    wx.setClipboardData({
      data: 'lizhengxian2005@gmail.com',
      success: function (res) {
        wx.showToast({
          title: '已复制邮箱',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
})