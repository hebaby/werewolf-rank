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
    // showModalStatus: false,
    modalFlag: true,
    confirmTips: '请输入要带走的人',
    inputValue: null,
    tempAction: 0
  },

  bindKeyInput: function(e) {
     this.setData({
      inputValue: e.detail.value
    })
  },

  modalOk: function(e) {
    let value = this.data.inputValue;
    if(/^\d+$/.test(value)){
      let actionList = this.data.actionList;
      let actionMap = this.data.actionMap;
      actionList.push({
        actionType: this.data.tempAction,
        targetNumber: value
      })
      actionMap.push(app.globalData.actionDict[this.data.tempAction].title);
      this.setData({
        actionList: actionList,
        actionMap: actionMap,
        modalFlag: !this.data.modalFlag
      })
    }else{
      wx.showToast(
      {
        title: "请输入有效数字",
        icon: 'loading',
        duration: 2000
      })
    }
  },

  modalCancel: function(e) {
    console.log("cancel");
    this.setData({
      modalFlag: !this.data.modalFlag
    })
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

  //白狼王操作
  bindexpose: function() {
    this.actionSheetbindchange();
    this.setData({
      tempAction: 6,
      modalFlag: !this.data.modalFlag
    })
  },

  //猎人操作
  bindgun: function() {
    this.actionSheetbindchange();
    this.setData({
      tempAction: 5,
      modalFlag: !this.data.modalFlag
    })
  },

  //移交法官操作
  bindappoint: function() {
    let judgeId = this.data.playList[this.data.selectIndex].userId;
    let that = this;
    wx.request({
        url: app.globalData.BASE_URL+'/api/game/'+that.data.roomId+'/appointJudge.json',
        method: 'POST',
        data: {
          id :  that.data.roomId,
          judgeId: parseFloat(judgeId,10)
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if(res.data && res.data.success) {
            wx.showModal({
              title: '移交法官成功',
              content: '您已经法官移交给【'+res.data.data.judgeName+'】,感谢您的记录。',
              showCancel: false,
              confirmText: '回到主页',
              success: function(res) {
                wx.navigateBack({
                  delta: 5
                })
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
    this.actionSheetbindchange();
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
    if(this.data.playList[index].roleId ==2){
      actionList.push({
        bindtap: 'expose',
        text: '白狼王自曝'
      })
    }
    if(this.data.playList[index].dead) {
      actionList = [{
        bindtap: 'appoint',
        text: '移交法官'
      }]
    }
    if(this.data.playList[index].roleId ==5){
      actionList.push({
        bindtap: 'gun',
        text: '猎人开枪'
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
