// pages/menu_add/menu_add.js
const Zan = require('../../wxss/dist/index');
const config = require('./config');
Page(Object.assign({}, Zan.Field, Zan.Switch, {

  /**
   * 页面的初始数据
   */
  data: {
    config,
    value: 'test',
    textareaValue: 'test textarea',
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

  clearInput() {
    this.setData({
      value: ''
    });
  },

  clearTextarea() {
    this.setData({
      textareaValue: ''
    });
  },

  formSubmit(event) {
    console.log('[zan:field:submit]', event.detail.value);
  },

  formReset(event) {
    console.log('[zan:field:reset]', event);
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