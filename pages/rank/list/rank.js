var util = require('../../../utils/util.js')
var app = getApp()
Page({
  data: {
    rank: [],
    defaultSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496297505148&di=a38826ec80ca357a62bd278ae91f064c&imgtype=0&src=http%3A%2F%2Fwww.lgmjg.com%2Fimg%2F338986.jpg',
    userInfo: {
      userScore: 156,
      userRank: 38
    },
    gameResultDict: null,
    refreshLock: false,
    pullDownLock: false,
    historyIndex: 0,
    pullDownFlag: false,
    historyList: []
  },
  checkDetail: function(event) {
    let itemIndex = event.currentTarget.dataset.index;
    wx.navigateTo({
        url: '../detail/rank?gameId='+itemIndex
    })
  },  

  loadMore: function() {
    if(!this.data.pullDownLock){
        var that = this;
        var historyIndex = this.data.historyIndex;
        let userId = app.globalData.userInfo.id;
        this.setData({
            pullDownLock: true
        });
        wx.showToast(
        {
            title: '记录加载中',
            icon: 'loading',
            duration: 1000
        })
        wx.request({
            url: app.globalData.BASE_URL+'/api/user/'+userId+'/records.json',
            header: {
                'content-type': 'application/json'
            },
            data: {
                page: historyIndex+1
            },
            success: function(res) {
                if(res.data && res.data.success) {
                    var historyList = that.data.historyList;
                    res.data.data.forEach((item)=>{
                        historyList.push(item);
                    })
                    console.log(historyList);
                    that.setData({
                        historyList: historyList,
                        historyIndex: that.data.historyIndex+1
                    })
                }else{
                    wx.showToast(
                    {
                        title: '获取列表失败',
                        icon: 'loading',
                        duration: 2000
                    })
                }
            }
        })
        setTimeout(function(){
            that.setData({
                pullDownLock: false
            });
        },1000);
        console.log('loadMore');
    }
  },
  refresh: function() {
    var that = this;
    if(!this.data.refreshLock){
        this.setData({
            refreshLock: true
        });
        this.getHistoryList();
        setTimeout(function(){
            that.setData({
                refreshLock: false
            });
        },1000);
        console.log('refresh');
    }
  },

  // 进入天梯排名
  enterRank: function() {
      wx.navigateTo({
          url: '../rank/rank'
      })
  },

  // 拿到历史数据
  getHistoryList: function(){
    var that = this;
    let userId = app.globalData.userInfo.id;
    wx.request({
        url: app.globalData.BASE_URL+'/api/user/'+userId+'/records.json',
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
            if(res.data && res.data.success) {
                that.setData({
                    historyList: res.data.data
                })
            }else{
                wx.showToast(
                {
                    title: '获取列表失败',
                    icon: 'loading',
                    duration: 2000
                })
            }
        }
    })
  },

  // 拿到排名信息
  getRankInfo: function(){
    var that = this;
    let userId = app.globalData.userInfo.id;
    wx.request({
        url: app.globalData.BASE_URL+'/api/user/'+userId+'/rank.json',
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
            if(res.data && res.data.success) {
                let userInfo = {
                    userScore: res.data.data.score,
                    userRank: res.data.data.rank
                };
                that.setData({
                    userInfo: userInfo
                })
                console.log(that.data.userInfo);
            }else{
                wx.showToast(
                {
                    title: '获取排名失败',
                    icon: 'loading',
                    duration: 2000
                })
            }
        }
    })
  },

  onLoad: function () {
    var that = this;
    this.setData({
        gameResultDict: app.globalData.gameResultDict
    })
    this.getHistoryList();
    this.getRankInfo();
  }
})
