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
    roleDict: {
        '0':'狼人杀人',
        '1':'预言家验人',
        '2':'守护守护',
        '3':'女巫救人',
        '4':'女巫毒人',
        '5':'猎人开枪',
        '6':'白狼王自爆',
        '7':'狼人自爆',
        '8':'公投出局',
        '9':'移交警徽',
        '10':'游戏结束'
    },
    gameResultDict:{
      '0':'未分出胜负',
      '1':'好人阵营胜利',
      '2':'坏人阵营胜利',
      '3':'第三方阵营胜利',
      '4':'游戏中断'
    },
    actionDict: [{
      title: '狼人请睁眼' ,
      content: '请点击狼人今晚要击杀的玩家头像',
      tips: '狼人要击杀的目标是:',
      actionId: 0
    },{
      title: '预言家请睁眼' ,
      content: '请点击预言家晚上要验的玩家头像',
      tips: '预言家验的目标是:',
      actionId: 1
    },{
      title: '守卫请睁眼' ,
      content: '请选择要守卫的玩家头像',
      tips: '守卫守护的目标是:',
      actionId: 2
    },{
      title: '女巫请睁眼' ,
      content: '请点击女巫要救的玩家头像',
      tips: '女巫救的目标是:',
      actionId: 3
    },{
      title: '女巫请睁眼' ,
      content: '请点击女巫要毒的玩家头像',
      tips: '女巫毒的目标是:',
      actionId: 4
    },{
      title: '猎人' ,
      content: '请点击猎人开枪的玩家头像',
      tips: '猎人开枪的目标是:',
      actionId: 5
    },{
      title: '白狼王' ,
      content: '请点击白狼王要带走的玩家头像',
      tips: '白狼王爆掉的目标是:',
      actionId: 6
    },{
      title: '狼人' ,
      content: '狼人自爆',
      tips: '狼人自爆的目标是:',
      actionId: 7
    },{
      title: '公投' ,
      content: '请选择公投的玩家头像',
      tips: '公投的玩家是：',
      actionId: 8
    },{
      title: '警徽' ,
      content: '请选择警徽移交的玩家',
      tips: '警徽移交的玩家是:',
      actionId: 9
    }],
    dayIndex:0,
    BASE_URL: 'https://97750414.qcloud.la'
  }
})



