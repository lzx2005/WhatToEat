var Zan = require('../../wxss/dist/index');

const app = getApp()
const timer = null
Page(Object.assign({}, Zan.TopTips, {
  data: {
    dishes:[
      "宫保鸡丁",
      "黄焖鸡米饭",
      "馄饨",
      "炒面",
      "沙县小吃",
      "烤肉",
      "咖喱",
      "花甲",
      "肯德基",
      "必胜客",
      "盖浇饭",
      "卤肉饭",
      "米线",
      "披萨",
      "日料",
      "火锅",
      "烧烤",
      "蛋糕",
      "韩国菜",
      "川菜",
      "江浙菜",
      "麦当劳",
      "小龙虾"
    ],
    dish: "今天吃什么呢？",
    btnText:"开始！",
    isProcess:false,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    count : 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    people: ["不限",'1人', '2-4人', '5-8人', '8人以上'],
    peopleIndex: 0,
    budget: ["不限","5元/人", "20元/人", "50元/人", "100元/人", "200元/人", "300元/人", "更高"],
    budgetIndex: 0,
    eatType: ["不限","早餐", "午餐", "早午餐", "下午茶", "晚餐", "夜宵"],
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
      this.data.timer = setInterval(function () {
        var randomIndex = Math.floor((Math.random() * 100 % that.data.dishes.length))
        that.setData({
          dish: that.data.dishes[randomIndex]
        })
      }, 10);
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
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
    this.showZanTopTips('条件选择暂时没法用，因为还没写完，我传上来看看效果');
  }
}))
