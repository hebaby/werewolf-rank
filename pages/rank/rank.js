var util = require('../../utils/util.js')
Page({
  data: {
    rank: [],
    userInfo: {
      userScore: 156,
      userRank: 38
    },
    historyList: [{
      "config": {
            "name": "12人预女猎白",
            "members": 12,
            "groupedItems": {
                "0": [
                    {
                        "roleId": 0,
                        "amount": 4,
                        "roleName": "村民",
                        "roleAvatar": "",
                        "roleCamp": 0
                    }
                ],
                "1": [
                    {
                        "roleId": 3,
                        "amount": 1,
                        "roleName": "预言家",
                        "roleAvatar": "",
                        "roleCamp": 1
                    },
                    {
                        "roleId": 4,
                        "amount": 1,
                        "roleName": "女巫",
                        "roleAvatar": "",
                        "roleCamp": 1
                    },
                    {
                        "roleId": 5,
                        "amount": 1,
                        "roleName": "猎人",
                        "roleAvatar": "",
                        "roleCamp": 1
                    },
                    {
                        "roleId": 7,
                        "amount": 1,
                        "roleName": "白痴",
                        "roleAvatar": "",
                        "roleCamp": 1
                    }
                ],
                "2": [
                    {
                        "roleId": 1,
                        "amount": 4,
                        "roleName": "狼人",
                        "roleAvatar": "",
                        "roleCamp": 2
                    }
                ]
            },
            "id": 1
        },
        "result": 0,
        "score": "+3",
        "role": {
          "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495780893652&di=df8d2daaf134f888fcf9a3bc39521d3d&imgtype=0&src=http%3A%2F%2Fwww.ahgame.com%2Fuploads%2Fallimg%2F160922%2F1-160922161233.jpg",
          "name": '白痴'
        }
    }]
  },
  onLoad: function () {
    var that = this;
    // wx.request({
    //   url: 'http://localhost:8888/pages/rank/rank.json',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function (res) {
    //     that.setData({
    //       rank: res.data.data
    //     })
    //   }
    // })
  }
})
