var Zan = require('../../wxss/dist/index');

const config = require('./config');
const app = getApp()
const timer = null
Page(Object.assign({}, Zan.TopTips, {
  data: {
    config,
    dish: "今天吃什么呢？",
    btnText:"开始！",
    isProcess:false,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    count : 0,
    loading: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // people: ["不限",'1狗', '2-4人', '5-8人', '8人以上'],
    // peopleIndex: 0,
    budget: ["不限", "随便凑合", "大吃一顿"],
    budgetIndex: 0,
    eatType: ["不限", "早餐", "午餐",  "晚餐", "夜宵"],
    eatTypeIndex: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onPeopleChange(e) {
    this.showTopTips();
    this.setData({
      peopleIndex: e.detail.value
    });
  },
  onBudgetChange(e) {
    this.showTopTips();
    this.setData({
      budgetIndex: e.detail.value
    });
  },
  onEatTypeChange(e) {
    this.showTopTips();
    this.setData({
      eatTypeIndex: e.detail.value
    });
  },
  toCustomMenu: function(){
    wx.navigateTo({
      url: '../menu/menu'
    })
  },
  bindClickTap: function () {
    var that = this
    clearInterval(this.data.timer);
    if (this.data.isProcess){
      console.log("停止")
      this.setData({
        isProcess: false,
        btnText: "开始！"
      })

      wx.showModal({
        title: '成功！',
        content: '今天就吃' + that.data.dish+"！",
        confirmText:"好！",
        cancelText:"不吃，换",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../map/map?dish='+that.data.dish
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      console.log("开始")
      this.setData({
        isProcess: true,
        btnText: "决定了！"
      })

      console.log(that.data.config.dishesObjects.length)
      var newDishes = that.dishesFillter(
        that.data.config.dishesObjects,
        that.data.budgetIndex,
        that.data.eatTypeIndex
      );
      this.data.timer = setInterval(function () {
        var randomIndex = Math.floor((Math.random() * 100 % newDishes.length))
        var dishObject = newDishes[randomIndex]
        that.setData({
          dish: newDishes[randomIndex].name
        })
      }, 10);
    }
  },
  onLoad: function () {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        loading: false
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            loading: false
          })
        }
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            loading: false
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showTopTips() {
    //this.showZanTopTips('条件选择暂时没法用，因为还没写完，我传上来看看效果');
  },
  //根据条件筛选出合适的列表
  dishesFillter(dishObjects, budgetIndex, eatTypeIndex){
    console.log("筛选", budgetIndex, eatTypeIndex)
    var newDishes = new Array()
    //对每个美食进行过滤
    for(var dishObjectIndex in dishObjects){
      var pass = true;
      var dishObject = dishObjects[dishObjectIndex]
      //判断消费类型
      switch (parseInt(budgetIndex)) {
        case 1:
          //判断是否为“随便凑合”
          if (!(dishObject.level === 1)) pass = false
          break;
        case 2:
          //判断是否为“大吃一顿”
          if (!(dishObject.level === 2)) pass = false
          break;
        default:
      }
      //判断就餐类型
      switch (parseInt(eatTypeIndex)) {
        case 1:
          //判断是否为早餐
          if (!dishObject.breakfast) pass = false
          break;
        case 2:
          //判断是否为午餐
          if (!dishObject.lunch) pass = false
          break;
        case 3:
          //判断是否为晚餐
          if (!dishObject.dinner) pass = false
          break;
        case 4:
          //判断是否为夜宵
          if (!dishObject.night) pass = false
          break;
        default:
      }
      //如果通过筛选则加到数组中
      if(pass){
        newDishes.push(dishObject)
      }
    }
    return newDishes
  }
}))
