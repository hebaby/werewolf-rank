//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    roomId: 123,
    number: 0,
    mode: 1,
    role: null,
    roleList: [],
    playList: [],
    timeoutInfo: null
  },
 //事件处理函数
 joinRoom: function(e) {
    var that = this;
    let index = e.currentTarget.dataset.index;
    let seatId = index+1;
    let userId = app.globalData.userInfo.id;
    let roomId = this.data.roomId;
    if(this.data.playList[index].userId==0) {
      wx.request({
        url: app.globalData.BASE_URL+'/api/game/'+roomId+'/join.json',
        method: 'POST',
        data: {
          number: seatId,
          userId: userId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if(res.data && res.data.success) {
            that.setData({
              playList: res.data.data,
              role: res.data.data[index]
            })
             wx.showModal({
              title: '加入成功',
              content: '你的身份信息是：'+that.data.role.roleName,
              showCancel: false,
              confirmText: "知道了",
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }else{
            wx.showToast(
            {
              title: res.data.error.message,
              icon: 'loading',
              duration: 2000
            })
          }
        }
      })
    }else{
      wx.showToast(
      {
        title: '请选择没人的位置入座！',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  
  //获取基本配置
  getBasicConfig: function() {
    var that = this;
    wx.request({
        // url: 'http://localhost:8888/pages/player/room/roomInfo.json',
        url: app.globalData.BASE_URL+'/api/game/'+that.data.roomId+'.json',
        data: {
          roomId :  this.data.roomId,
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          if(res.data && res.data.success) {
            that.setData({
              configData: res.data.data.config
            })
          }
        }
      })
  },

  //获取玩家配置
  getPlayerConfig: function() {
    var that = this;
    wx.request({
        url: app.globalData.BASE_URL+'/api/game/'+that.data.roomId+'/players.json',
        data: {
          roomId :  this.data.roomId,
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          if(res.data && res.data.success) {
            that.setData({
              playList: res.data.data
            })
          }
        }
      })
  },

  onLoad: function (option) {
    var that = this;
    this.setData({
      roomId: option.roomId
    });
    this.getBasicConfig();
    this.getPlayerConfig();
    var timeoutInfo= setInterval(function(){
      that.getPlayerConfig();
    },2000)
    this.setData({
      timeoutInfo: timeoutInfo
    });
  },
  onUnload: function () {
    clearInterval(this.data.timeoutInfo);
  }
})
