import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

Page({
  data: {
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    loading: true,
  },
  onReady() {
    // 获取组件
    var that = this;
    wx.getStorage({
      key: 'confirmDishes',
      success: function (res) {
        that.setData({
          loading: false
        })
        that.ecComponent = that.selectComponent('#mychart-dom-pie');
        if (that.ecComponent){
          //todo 构建options
          var array = new Array();
          for (var name in res.data) {
            array.push({
              name: name,
              value: res.data[name]
            })
          }
          var option = {
            title: {
              text: '选定菜品数据',
              subtext: '仅统计本机数据',
              left: 'center'
            },
            color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F", "#0099FF", "#33CCFF", "#33CC99"],
            legend: {
              // orient: 'vertical',
              // top: 'middle',
              bottom: 10,
              left: 'center',
              data: array,
              selectedMode: false
            },
            series: [{
              label: {
                normal: {
                  formatter: '{b}:{c}次',
                  rich: {
                    b: {
                      fontSize: 16,
                      lineHeight: 16
                    },
                    c: {
                      fontSize: 16,
                      lineHeight: 16,
                    }
                  }
                }
              },
              type: 'pie',
              center: ['50%', '50%'],
              radius: [0, '60%'],
              data: array
            }]
          };

          console.log(res.data)
          that.init(option);
        }
      },
      fail: function (e) {

        wx.showModal({
          title: '提示',
          content: '还没有数据，请在首页选定相应菜品，系统才会记录数据',
          showCancel: false,
          success: function (res) {
            wx.navigateBack({
              delta: 1
            })
          }
        })
        console.log("没有数据")
      }
    })
  },

  // 点击按钮后初始化图表
  init: function (options) {
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      chart.setOption(options);
      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

  cleanData: function(){
    wx.showModal({
      title: '提示',
      content: '确定要清空并且重新统计吗？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'confirmDishes',
            success: function (res) {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      }
    })
  }
})