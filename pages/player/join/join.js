//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    roomId: 0,
    passwd: '',
    isLoading: false
  },
  //事件处理函数
  bindKeyInput: function(e) {
    this.setData({
      roomId: e.detail.value
    })
  },
  joinRoom: function() {
    let that = this;
    let userId = app.globalData.userInfo.id;
    if(this.data.roomId>0){
      var roomId = this.data.roomId;
      this.setData({
        isLoading: true
      })
      wx.request({
        url: app.globalData.BASE_URL+'/api/game/'+roomId+'.json',
        data: {
          roomId :  this.data.roomId,
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          that.setData({
            isLoading: false
          })
          if(res.data && res.data.success) {
            if(res.data.data.judgeId == userId){
              //法官判断逻辑
              app.setDay(res.data.data.day);
              if(res.data.data.night){
                wx.navigateTo({
                  url: '../../god/game/night/night?roomId='+roomId
                })
              }else{
                wx.navigateTo({
                  url: '../../god/game/day/day?roomId='+roomId
                })
              }
            }else{
              //玩家判断逻辑
              wx.navigateTo({
                url: '../room/room?roomId='+roomId
              })
            }
            wx.showToast({
              title: '加入房间成功！',
              icon: 'success',
              duration: 2000
            })
          }else{
            wx.showToast(
            {
              title: '房间加入失败，请确认房间号',
              icon: 'loading',
              duration: 2000
            })
          }
        }
      })
    }else {
       wx.showToast(
        {
          title: '加入失败！',
          icon: 'loading',
          duration: 2000
        })
    }
    
  },
  history: function(){
    wx.navigateTo({
      url: '../history/history'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  }
})
