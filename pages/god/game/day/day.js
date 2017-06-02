//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    roomId: 34,
    dayIndex: 0,
    playList: null,
    infoCount: '',
    infoContent: [],
    actionList: [],
    actionMap: [],
    actionSheetItems: [],
    actionDefault: [
      {bindtap: 'police', text: '当选警长'},
      {bindtap: 'banish', text: '公投出局'}
    ],
    actionSheetHidden: true,
    selectIndex: -1,
  },

  //重置操作
  resetAction: function() {
    this.setData({
      actionMap:[],
      actionList: []
    })
  },

  //进入黑夜
  enterNight: function() {
    var that = this;
    wx.request({
      url: app.globalData.BASE_URL+'/api/game/'+that.data.roomId+'/events.json',
      data: this.data.actionList,
      method:'POST',
      success: function(res) {
        if(res.data && res.data.success) {
           if(res.data.data.gameResult==0){
              wx.redirectTo({
                url: '../night/night?roomId='+that.data.roomId
              })
            }else{
              console.log(res.data.data.gameResult);
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
              console.log(tipMsg);
              wx.showModal({
                title: '游戏结束',
                content: tipMsg,
                showCancel: false,
                confirmText: '回到主页',
                success: function(res) {
                  console.log("i'm here");
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
  },

  //当选警长操作
  bindpolice: function() {
    let actionList = this.data.actionList;
    let actionMap = this.data.actionMap;
    actionList.push({
      actionType: 9,
      targetNumber: this.data.selectIndex+1
    })
    actionMap.push('警长');
    this.setData({
      actionList: actionList,
      actionMap: actionMap
    })
    this.actionSheetbindchange();
  },
  //公投出局操作
  bindbanish: function() {
    let actionList = this.data.actionList;
    let actionMap = this.data.actionMap;
    actionList.push({
      actionType: 8,
      targetNumber: this.data.selectIndex+1
    })
    actionMap.push('公投');
    this.setData({
      actionList: actionList,
      actionMap: actionMap
    })
    this.actionSheetbindchange();
  },
  //自曝操作
  bindfire: function() {
    let actionList = this.data.actionList;
    let actionMap = this.data.actionMap;
    actionList.push({
      actionType: 7,
      targetNumber: this.data.selectIndex+1
    })
    actionMap.push('自曝');
    this.setData({
      actionList: actionList,
      actionMap: actionMap
    })
    this.actionSheetbindchange();
  },

  //关闭功能区域
  actionSheetbindchange:function(){
    this.setData({
      actionSheetHidden:!this.data.actionSheetHidden,
      selectIndex: -1
    })
  },

  //选择角色
  selectPlayer: function(e) {
    var that = this;
    var actionList = this.data.actionDefault.slice();
    let index = e.currentTarget.dataset.index;
    if(this.data.playList[index].roleId ==1){
      actionList.push({
        bindtap: 'fire',
        text: '狼人自曝'
      })
    }
    this.setData({
      selectIndex: index,
      actionSheetItems: actionList,
      actionSheetHidden:!this.data.actionSheetHidden
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
            let playList = res.data.data;
            let infoContent = [];
            console.log(playList);
            console.log(that.data.dayIndex);
            playList.forEach((item)=>{
              if(item.dead && item.deadNight && item.deadDay == that.data.dayIndex-1) {
                infoContent.push(item);
              }
            })
            that.setData({
              playList: res.data.data,
              infoContent: infoContent
            })
          }
        }
      })
  },

  onLoad: function (option) {
    var that = this;
    var dayIndex = app.globalData.dayIndex;
    console.log(dayIndex);
    this.setData({
      roomId: option.roomId,
      dayIndex: dayIndex
    })
    this.getPlayerConfig();
  },
})
