//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    roomId: '33',
    number: 0,
    mode: 0,
    role: null,
    configData: null,
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
        // url: 'http://localhost:8888/pages/god/room/join.json',
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
        title: '加入失败！',
        icon: 'loading',
        duration: 2000
      })
    }
  },

  //开始游戏部分
  startGame: function() {
    var roomId = this.data.roomId;
    var that = this;
    wx.request({
      url: app.globalData.BASE_URL+'/api/game/'+that.data.roomId+'/start.json',
      data: {
        roomId :  this.data.roomId,
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if(res.data && res.data.success) {
          wx.navigateTo({
            url: '../game/night/night?roomId='+roomId
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
  },

  //获取基本配置
  getBasicConfig: function() {
    var that = this;
    wx.request({
        // url: 'http://localhost:8888/pages/player/room/roomInfo.json',
        url: app.globalData.BASE_URL+'/api/game/'+that.data.roomId+'.json',
        data: {
          roomId :  this.data.roomId,
          // roomId: 33
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
        // url: 'http://localhost:8888/pages/player/room/playerInfo.json',
        url: app.globalData.BASE_URL+'/api/game/'+that.data.roomId+'/players.json',
        data: {
          roomId :  this.data.roomId,
          // roomId: 33
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
      roomId: option.roomId,
    })
    this.getBasicConfig();
    this.getPlayerConfig();
    var timeoutInfo= setInterval(function(){
      that.getPlayerConfig();
    },2000)
    this.setData({
      timeoutInfo: timeoutInfo
    })
  },
  onUnload: function() {
    clearInterval(this.data.timeoutInfo);
  },
  onHide: function(){
    clearInterval(this.data.timeoutInfo);
  }
})
