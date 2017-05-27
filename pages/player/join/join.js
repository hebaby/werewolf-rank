//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    roomId: 0,
    passwd: ''
  },
  //事件处理函数
  bindKeyInput: function(e) {
    this.setData({
      roomId: e.detail.value
    })
  },
  joinRoom: function() {
    if(this.data.roomId>0){
      var roomId = this.data.roomId;
      wx.request({
        url: app.globalData.BASE_URL+'/api/game/'+roomId+'.json',
        data: {
          roomId :  this.data.roomId,
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          if(res.data && res.data.success) {
            wx.showToast({
              title: '加入房间成功！',
              icon: 'success',
              duration: 2000
            })
            wx.navigateTo({
              url: '../room/room?roomId='+roomId
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
  	//调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    //   that.update()
    // })
  }
})
