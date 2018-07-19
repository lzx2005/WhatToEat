var Zan = require('../../wxss/dist/index');

const config = require('./config');
const app = getApp()
const timer = null


console.log("开始检查更新...")
const updateManager = wx.getUpdateManager()

updateManager.onCheckForUpdate(function (res) {
  // 请求完新版本信息的回调
  console.log(res.hasUpdate)
})

updateManager.onUpdateReady(function () {
  wx.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success: function (res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      }
    }
  })
})

updateManager.onUpdateFailed(function () {
  // 新的版本下载失败
  wx.showToast({
    title: '新的版本下载失败',
    icon: 'none',
    duration: 2000
  })
})

Page(Object.assign({}, Zan.TopTips, {
  data: {
    config,
    dishesObjects: null,
    dish: "今天吃什么呢？",
    keyword: '',
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
  toCustomMenu: function () {
    wx.navigateTo({
      url: '../menu/menu'
    })
  },
  toPie: function () {
    wx.navigateTo({
      url: '../pie/pie'
    })
  },
  toAbout: function () {
    wx.navigateTo({
      url: '../about/about'
    })
  },
  bindClickTap: function () {
    if (!this.data.hasUserInfo){
      wx.showModal({
        title: '提示',
        content: '请先登录',
        showCancel: false
      })
    }else{
      var that = this
      clearInterval(this.data.timer);
      if (this.data.isProcess) {
        console.log("停止")
        this.setData({
          isProcess: false,
          btnText: "开始！"
        })

        wx.showModal({
          title: '成功！',
          content: '今天就吃' + that.data.dish + "！",
          confirmText: "好！",
          cancelText: "不吃，换",
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              // todo 记录数据
              that.recordData(that.data.dish);
              wx.navigateTo({
                url: '../map/map?dish=' + that.data.dish + '&keyword=' + that.data.keyword
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        console.log("开始")

        console.log(that.data.dishesObjects.length)
        var newDishes = that.dishesFillter(
          that.data.dishesObjects,
          that.data.budgetIndex,
          that.data.eatTypeIndex
        );
        if (newDishes.length > 0) {
          this.setData({
            isProcess: true,
            btnText: "决定了！"
          })
          this.data.timer = setInterval(function () {
            var randomIndex = Math.floor((Math.random() * 100 % newDishes.length))
            var dishObject = newDishes[randomIndex]
            if (!newDishes[randomIndex].keyword) {
              newDishes[randomIndex].keyword = newDishes[randomIndex].name
            }
            that.setData({
              dish: newDishes[randomIndex].name,
              keyword: newDishes[randomIndex].keyword
            })
          }, 10);
        } else {
          wx.showModal({
            title: '提示',
            content: '菜单为空，请到自定义菜单中添加',
            showCancel: false
          })
        }
      }
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
    this.checkUpdate();
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
      if (!dishObject.on){
        pass = false
      }
      //如果通过筛选则加到数组中
      if(pass){
        newDishes.push(dishObject)
      }
    }
    return newDishes
  },
  getDishesObjects() {
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
        console.log(e, "没有找到，从配置中加载默认数据")
        //没有找到，从配置中加载默认数据
        wx.setStorage({
          key: "dishesObjects",
          data: config.dishesObjects,
          success: function (res) {
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
  recordData(dishName){
    wx.getStorage({
      key: 'confirmDishes',
      success: function (res) {
        console.log(res)
        if (res.data[dishName]){
          res.data[dishName] += 1
        } else {
          res.data[dishName] = 1
        }
        wx.setStorage({
          key: "confirmDishes",
          data: res.data
        })
      },
      fail: function (e) {
        var obj = new Object();
        obj[dishName] = 1;
        wx.setStorage({
          key: "confirmDishes",
          data: obj
        })
      }
    })
  },
  onShow: function () {
    this.getDishesObjects()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    return {
      title: '不知道吃什么？进来选',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  checkUpdate(){
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
}))
