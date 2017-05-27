//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getLocalUser();
  },
 
  getLocalUser: function(){
    //用户登录获取登录凭证
    var that = this;
    var code,encryptedData,iv;
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.getUserInfo({
            success: res2 => {
              encryptedData = res2.encryptedData;
              iv = res2.iv;
              code = res.code;
              wx.request({
                url: that.globalData.BASE_URL+'/api/wx/user.json',
                method: 'POST',
                dataType: "json",
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                },
                data: {
                  code: code,
                  encryptedData: encryptedData,
                  iv: iv
                },
                success: function (res) {
                  that.globalData.userInfo = res.data.data;
                  console.log(res.data.data);
                }
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },

  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },

  nextDay: function(){
    var that = this;
    that.globalData.dayIndex++;
  },

  globalData:{
    userInfo:null,
    dayIndex:0,
    BASE_URL: 'https://97750414.qcloud.la'
  }
})



