//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    roomId: 58,
    playList: null,
    infoTitle: '',
    infoContent: '',
    infoTips: '',
    orderList: [],
    actionList: [],
    actionMap: [],
    selectIndex: -1,
    roundIndex: 0
  },

  //上一步
  backButton: function() {
    var roundIndex = this.data.roundIndex;
    var actionList = this.data.actionList;
    if(this.data.roundIndex==0){
      wx.showToast(
      {
        title: "没有上一步",
        icon: 'loading',
        duration: 1500
      });
    }else{
      // 初始化相关操作
      actionList.pop();
      this.setData({
        roundIndex: roundIndex-1,
        actionList: actionList,
        selectIndex: -1
      })
      this.updateTips();
    }
  },
  //下一步
  nextButton: function() {
    var that = this;
    var actionList = this.data.actionList;
    var actionMap = this.data.actionMap;
    if(this.data.selectIndex>-1){
      actionList.push({
        actionType: this.data.orderList[this.data.roundIndex].id,
        targetNumber: this.data.selectIndex+1
      })
      actionMap.push(this.data.orderList[this.data.roundIndex].name);
    }
    this.setData({
      actionList: actionList,
      actionMap: actionMap,
      roundIndex: this.data.roundIndex+1,
      selectIndex: -1
    })
    if(this.data.roundIndex==this.data.orderList.length){
      wx.request({
        url: app.globalData.BASE_URL+'/api/game/'+that.data.roomId+'/events.json',
        data: this.data.actionList,
        method:'POST',
        success: function(res) {
          if(res.data && res.data.success) {
            if(res.data.data.gameResult==0){
              app.nextDay();
              wx.redirectTo({
                url: '../day/day?roomId='+that.data.roomId
              })
            }else{
              let tipMsg = '';
              let code = res.data.data.gameResult||4;
              switch(code) {
                case 1:
                  tipMsg = '好人阵营获胜！';
                  break;
                case 2:
                  tipMsg = '坏人阵营获胜！';
                  break;
                case 3:
                  tipMsg = '第三方阵营获胜！';
                  break;
                default:
                  tipMsg = '游戏被中止！';
              }
              wx.showModal({
                title: '游戏结束',
                content: tipMsg,
                showCancel: false,
                confirmText: '回到主页',
                success: function(res) {
                  wx.navigateBack({
                    delta: 5
                  })
                }

              })
            }
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
      this.updateTips();
    }
  },

  //选择角色
  selectPlayer: function(e) {
    var that = this;
    let index = e.currentTarget.dataset.index;
    if(index == this.data.selectIndex){
      index = -1;
    }
    this.setData({
      selectIndex: index
    })
  },
  //文案更新
  updateTips: function() {
    var orderList = this.data.orderList;
    var roundIndex = this.data.roundIndex;
    this.setData({
      infoTitle: orderList[roundIndex].name,
      infoContent: orderList[roundIndex].confirm,
      infoTips: orderList[roundIndex].tips
    })
  },
  //获取玩家配置
  getPlayerConfig: function() {
    var that = this;
    wx.request({
        url: app.globalData.BASE_URL+'/api/game/'+that.data.roomId+'/players.json',
        data: {
          roomId :  that.data.roomId,
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
  //获取夜晚可执行的操作
  getNightConfig: function() {
    var that = this;
    var orderIndexList = app.globalData.actionDict;
    wx.request({
        url: app.globalData.BASE_URL+'/api/game/'+that.data.roomId+'/actions.json',
        data: {
          id :  that.data.roomId,
          night: true
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          if(res.data && res.data.success) {
            let tempList = res.data.data;                                                                                                     
            tempList.map(function(item){
              item.name = orderIndexList[item.id].title;
              item.tips = orderIndexList[item.id].tips;
              item.confirm = orderIndexList[item.id].content;
            })
            that.setData({
              orderList: tempList
            })
            that.updateTips();
            console.log(res);
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
          console.log(res.data.data);
          if(res.data && res.data.success) {
            that.setData({
              configData: res.data.data.config
            })
          }
        }
      })
  },
  onLoad: function (option) {
    var that = this;
    this.setData({
      roomId: 70
      // roomId: option.roomId,
    })
    this.getNightConfig();
    this.getPlayerConfig();
    this.getBasicConfig();
  },
})
