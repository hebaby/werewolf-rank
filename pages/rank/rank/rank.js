var app = getApp();
var util = require('../../../utils/util.js');

Page({
  data: {
      playerList:[]
  },

  // 获取事件列表
  getPlayerRank: function(){
      let that = this;
      wx.request({
        url: app.globalData.BASE_URL+'/api/ranks.json?page=0',
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
            if(res.data && res.data.success) {
                console.log(res.data.data);
                that.setData({
                    playerList: res.data.data
                })
            }else{
                wx.showToast(
                {
                    title: '获取排行列表失败',
                    icon: 'loading',
                    duration: 2000
                })
            }
        }
    })
  },
  onLoad: function (option) {
    var that = this;
    this.getPlayerRank();
  }
})
