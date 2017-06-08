//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    number: 12,
    numberList: ['8','9','10','11','12','13','14'],
    configList: [],
    index: 4,
    mode: 1,
    isLoading: false,
    showModalStatus: false 
  },




  //事件处理函数
  radioChange: function() {
    //TODO
  },
  bindPickerChange: function(e) {
    var that = this;
    var index = e.detail.value;
    let tempNumber = that.data.numberList[index];
    that.setData({
      number: tempNumber,
      index: index
    });
    wx.request({
      url: app.globalData.BASE_URL+'/api/gameConfigs.json',
      data: {
        members	 :  that.data.number
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        if(res.data && res.data.success) {
          that.setData({
              configList: res.data.data
          })
        }
      }
    })
  },
  //加入房间
  joinRoom: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var configId = this.data.configList[index].id;
    var judgeId = app.globalData.userInfo.id;
    this.setData({
      isLoading: true
    })
    wx.request({
      url: app.globalData.BASE_URL+'/api/game.json',
      method: 'POST',
      data: {
        configId,
        judgeId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        that.setData({
          isLoading: false
        })
        if(res.data && res.data.success) {
          var roomId = res.data.data.id;
          wx.navigateTo({
            url: '../room/room?roomId='+roomId
          })
          that.setData({
            configList: res.data.data.configList
          })
        }
      }
    })

  },

  //进入已有房间
  // openModal: function(e) {
  //   this.setData({
  //     showModalStatus: true
  //   })
  // },
  
  onShow: function () {
    var that = this;
  
    console.warn("进入配置页面")

    //获取基本配置
    wx.request({
        // url: 'http://localhost:8888/pages/god/config/config'+that.data.number+'.json',
        url: app.globalData.BASE_URL+'/api/gameConfigs.json',
        data: {
          members :  that.data.number
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          if(res.data && res.data.success) {
            console.warn("拿到数据");
            console.warn(res.data.data);
            that.setData({
              configList: res.data.data
            })
          }
        }
    })
  }
})
