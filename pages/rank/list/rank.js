var util = require('../../../utils/util.js')
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
        "id":1,
        "result": 0,
        "score": "+3",
        "role": {
          "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495780893652&di=df8d2daaf134f888fcf9a3bc39521d3d&imgtype=0&src=http%3A%2F%2Fwww.ahgame.com%2Fuploads%2Fallimg%2F160922%2F1-160922161233.jpg",
          "name": '白痴'
        }
    },{
      "config": {
            "name": "12人预女猎守",
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
                        "roleId": 8,
                        "amount": 1,
                        "roleName": "守卫",
                        "roleAvatar": "",
                        "roleCamp": 1
                    }
                ],
                "2": [
                    {
                        "roleId": 1,
                        "amount": 3,
                        "roleName": "狼人",
                        "roleAvatar": "",
                        "roleCamp": 2
                    },
                    {
                        "roleId": 9,
                        "amount": 1,
                        "roleName": "白狼王",
                        "roleAvatar": "",
                        "roleCamp": 2
                    }
                ]
            },
            "id": 1
        },
        "id":2,
        "result": 1,
        "score": "-5",
        "role": {
          "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496807459&di=94f869ca10b42cd25049dc00e8da9131&imgtype=jpg&er=1&src=http%3A%2F%2Fi-4.yxdown.com%2F2017%2F2%2F28%2FW3dtOjEucG5nLHI6MTAsYjoxMF0%3D%2F2c09ee4f-4045-4bbc-aedf-d83b95607d44.jpg",
          "name": '守卫'
        }
    }]
  },
  checkDetail: function(event) {
    let itemIndex = event.currentTarget.dataset.index;
    wx.navigateTo({
        url: '../detail/rank?roundId='+itemIndex
    })
  },  
  onLoad: function () {
    var that = this;
  }
})
