var app = getApp();
var util = require('../../../utils/util.js');

Page({
  data: {
    detail: [],
    playerList: [],
    history:{},
    gameId: null,
    gameResultDict: null
  },

  // 获取配置信息
  getDetailHistory: function(){
      let userId = app.globalData.userInfo.id;
      console.log(userId);
      let that = this;
      wx.request({
        url: app.globalData.BASE_URL+'/api/game/'+that.data.gameId+'/record.json',
        data: {
            userId: userId
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
            if(res.data && res.data.success) {
                let history = res.data.data;
                that.setData( {
                    history: history
                })
            }else{
                wx.showToast(
                {
                    title: '获取配置信息失败',
                    icon: 'loading',
                    duration: 2000
                })
            }
        }
    })
  },

  // 获取玩家列表
  getDetailPlayer: function(){
      let userId = app.globalData.userInfo.id;
      let that = this;
      wx.request({
        url: app.globalData.BASE_URL+'/api/game/'+this.data.gameId+'/players.json',
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
            if(res.data && res.data.success) {
                let playerList = res.data.data;
                that.setData({
                    playerList: playerList
                })
            }else{
                wx.showToast(
                {
                    title: '获取玩家列表失败',
                    icon: 'loading',
                    duration: 2000
                })
            }
        }
    })
  },

  // 获取事件列表
  getDetailEvent: function(){
      let userId = app.globalData.userInfo.id;
      let that = this;
      wx.request({
        url: app.globalData.BASE_URL+'/api/game/'+this.data.gameId+'/events.json',
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
            if(res.data && res.data.success) {
                let data = res.data.data;
                let dayIndex = 0;
                let nightIndex = true;
                let detail = [];
                let tempObj = {
                    day: 0,
                    night: true,
                    events: []
                };
                data.forEach((item)=>{
                    if(dayIndex == item.day && nightIndex == item.night){
                        tempObj.events.push(item.desc);
                    }else{
                        detail.push(Object.assign({},tempObj));
                        tempObj.day = item.day;
                        tempObj.night = item.night;
                        tempObj.events = [item.desc];
                        dayIndex = item.day;
                        nightIndex = item.night;
                    }
                })
                if(data.length>0){
                    detail.push(tempObj);
                }
                that.setData({
                    detail: detail
                })
            }else{
                wx.showToast(
                {
                    title: '获取事件列表失败',
                    icon: 'loading',
                    duration: 2000
                })
            }
        }
    })
  },
  onLoad: function (option) {
    var that = this;
    this.setData({
        gameId: option.gameId,
        gameResultDict: app.globalData.gameResultDict
    })
    this.getDetailHistory();
    this.getDetailPlayer();
    this.getDetailEvent();
  }
})
