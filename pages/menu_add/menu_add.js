// pages/menu_add/menu_add.js
const Zan = require('../../wxss/dist/index');
const config = require('./config');
Page(Object.assign({}, Zan.Field, Zan.Switch, {

  /**
   * 页面的初始数据
   */
  data: {
    config,
    title: '',
    keyword: '',
    level: ['随便凑合', '大吃一顿'],
    levelIndex: 0,
    sw: {
      breakfast: true,
      lunch: true,
      dinner: true,
      night: true
    }
  },

  onLevelChange(e) {
    this.setData({
      levelIndex: e.detail.value
    });
  },

  handleZanSwitchChange(e) {
    console.log(e)

    var param = {}
    var key = "sw." + e.componentId
    param[key] = e.checked
    this.setData(param);
  },
  handleZanFieldChange(e) {
    const { componentId, detail } = e;
    var param = {}
    var key = e.componentId
    param[key] = detail.value
    this.setData(param);
    console.log('[zan:field:change]', componentId, detail);
  },

  handleZanFieldFocus(e) {
    const { componentId, detail } = e;

    console.log('[zan:field:focus]', componentId, detail);
  },

  handleZanFieldBlur(e) {
    const { componentId, detail } = e;

    console.log('[zan:field:blur]', componentId, detail);
  },
  save:function(){
    console.log(this.data.title)
    console.log(this.data.keyword)
    console.log(this.data.levelIndex)
    console.log(this.data.sw.breakfast)
    console.log(this.data.sw.lunch)
    console.log(this.data.sw.dinner)
    console.log(this.data.sw.night)
    if (this.data.title === ''){
      wx.showModal({
        title: '提示',
        content: '请填写标题',
        showCancel: false
      })
    } else if (this.data.keyword===''){
      wx.showModal({
        title: '提示',
        content: '请填写搜索词',
        showCancel: false
      })
    }else{
      var dish = {
        "name": this.data.title,
        "level": this.data.levelIndex + 1,
        "breakfast": this.data.sw.breakfast,
        "lunch": this.data.sw.lunch,
        "dinner": this.data.sw.dinner,
        "night": this.data.sw.night,
        "on": true,
        "keyword": this.data.keyword,
        "custom": true
      }

      wx.getStorage({
        key: 'dishesObjects',
        success: function (res) {
          console.log("成功获取到数据...")
          console.log(res)
          res.data.push(dish)
          wx.setStorage({
            key: "dishesObjects",
            data: res.data,
            success: function (res) {
              console.log("存储成功，返回上一页...");
              wx.showModal({
                title: '提示',
                content: '保存成功',
                showCancel: false,
                success: function (res) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            },
            fail: function () {
              console.log("存储失败，提示用户...");
              wx.showModal({
                title: '提示',
                content: '保存失败',
                showCancel: false,
                success: function (res) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            }
          })
        },
        fail: function (e) {
          console.log(e, "没有找到，从配置中加载默认数据")
          wx.showModal({
            title: '提示',
            content: '菜单丢失，返回首页重新加载...',
            showCancel: false,
            success: function (res) {
              wx.navigateBack({
                delta: 2
              })
            }
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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