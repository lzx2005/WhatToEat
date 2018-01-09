// pages/menu/menu.js
const config = require('../index/config.js');
var Zan = require('../../wxss/dist/index');

Page(Object.assign({}, Zan.Switch, {

  /**
   * 页面的初始数据
   */
  data: {
    config,
    checked: true,
    dishesObjects: null,
    loading: true
  },

  handleZanSwitchChange(e) {
    console.log(e)

    var param = {}
    var key = "dishesObjects[" + e.componentId + "].on"
    param[key] = e.checked
    this.setData(param);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDishesObjects();
  },
  getDishesObjects(){
    var that = this
    wx.getStorage({
      key: 'dishesObjects',
      success: function (res) {
        console.log("成功获取到数据...")
        console.log(res)
        that.setData({
          dishesObjects: res.data,
          loading: false
        });
      },
      fail: function (e) {
        console.log(e,"没有找到，从配置中加载默认数据")
        //没有找到，从配置中加载默认数据
        wx.setStorage({
          key: "dishesObjects",
          data: config.dishesObjects,
          success: function (res){
            console.log("存储成功，重新读取...");
            that.getDishesObjects();
          },
          fail: function () {
            console.log("存储失败，提示用户...");
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
}))