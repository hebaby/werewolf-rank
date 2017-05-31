var util = require('../../../utils/util.js')
Page({
  data: {
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
    detail: [
        {
            day: 1,
            night: true,
            events: [{
                actionType: 0,
                targetNumber: 5
            },{
                actionType: 1,
                targetNumber: -1
            },{
                actionType: 3,
                targetNumber: 5
            }]
        },{
            day: 1,
            night: false,
            events: [{
                actionType: 9,
                targetNumber: 8
            },{
                actionType: 8,
                targetNumber: 9
            }]
        },{
            day: 2,
            night: true,
            events: [{
                actionType: 0,
                targetNumber: 6
            },{
                actionType: 1,
                targetNumber: 3
            },{
                actionType: 3,
                targetNumber: 1
            }]
        },{
            day: 2,
            night: false,
            events: [{
                actionType: 8,
                targetNumber: 9
            },{
                actionType: 10,
                targetNumber: -1
            }]
        }
    ],
    playerList: [
        {
            "userName": "Sera",
            "roleId": 1,
            "userId": 10,
            "dead": false,
            "deadDay": 0,
            "deadNight": false,
            "userAvatar": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLZWwwicRDmD3kPS8XjqNkH7IfX9VpW5Hlbic9hvmhTtkcgfWAJKuMqAYJjREl1ia0XfwrxuO8lxNotQ/0",
            "roleName": "狼人",
            "roleAvatar": "",
            "number": 1
        },
        {
            "userName": "kid婷",
            "roleId": 4,
            "userId": 13,
            "dead": false,
            "deadDay": 0,
            "deadNight": false,
            "userAvatar": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJGN8r79oPFFXYgtDJMicg7vKho7O3u3evROVZpH3IQ8HaGHL4RKKQJSoKzGvC7gcdNt6S4cJN6JEg/0",
            "roleName": "女巫",
            "roleAvatar": "",
            "number": 2
        },
        {
            "userName": "NANCY(������)",
            "roleId": 0,
            "userId": 15,
            "dead": false,
            "deadDay": 0,
            "deadNight": false,
            "userAvatar": "http://wx.qlogo.cn/mmopen/vi_32/C7wQqEICc4EgPmWg91o9LqA7ry5vZOcpXgYyvylwJyN9eeobPZWl0ZAdYNPUsBT4O5kVKlibPz0dVPllqzzjOlA/0",
            "roleName": "村民",
            "roleAvatar": "",
            "number": 3
        },
        {
            "userName": "MC",
            "roleId": 1,
            "userId": 11,
            "dead": false,
            "deadDay": 0,
            "deadNight": false,
            "userAvatar": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLicWr3PbrWbGYesoUdoWbNMPj8b2NhV4PLzb2DiaR34maLoRSZJnLSGRPnLZcEb90ySOyFKlyh0CFQ/0",
            "roleName": "狼人",
            "roleAvatar": "",
            "number": 4
        },
        {
            "userName": "yes",
            "roleId": 0,
            "userId": 14,
            "dead": false,
            "deadDay": 0,
            "deadNight": false,
            "userAvatar": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKkoe0LNLniawuAibAYiaRWuibMakjSLTcOab34tOTkrqLO75UnGEKfibAjBSUQMPUKpJcGXqTTNGDicnyA/0",
            "roleName": "村民",
            "roleAvatar": "",
            "number": 5
        },
        {
            "userName": "���������",
            "roleId": 7,
            "userId": 12,
            "dead": false,
            "deadDay": 0,
            "deadNight": false,
            "userAvatar": "http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eob6cf5bHByPEOLEXXxTPeyVrFVIGP478EnjbPaqeenXYDjXSsia1icBlK3sPeSicMOHWTO7lsqkURrA/0",
            "roleName": "白痴",
            "roleAvatar": "",
            "number": 6
        },
        {
            "userName": "Sasuke������������",
            "roleId": 5,
            "userId": 5,
            "dead": false,
            "deadDay": 0,
            "deadNight": false,
            "userAvatar": "http://wx.qlogo.cn/mmopen/vi_32/Hk6ZTagyeQjaemNQ8hykX05XVGNcTrMaicMZfPqKHCQibysqmIxeibEGsU6Zne8l2ia2PLWUVxBPsqLPHMyMYNQiaIQ/0",
            "roleName": "猎人",
            "roleAvatar": "",
            "number": 7
        },
        {
            "userName": "����������",
            "roleId": 1,
            "userId": 16,
            "dead": false,
            "deadDay": 0,
            "deadNight": false,
            "userAvatar": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJIxrskooDbSyjt2PzAhX0ficguibr9zrhIHIhp8zRntaNqEqLM3ee8qNicNEIJsS9R5ncoG2NDeq4DQ/0",
            "roleName": "狼人",
            "roleAvatar": "",
            "number": 8
        },
        {
            "userName": "����������",
            "roleId": 3,
            "userId": 17,
            "dead": false,
            "deadDay": 0,
            "deadNight": false,
            "userAvatar": "http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqrvEYTpYwksMSVQWNOHciacsjV0QzpzhvNwD9lOfwv9icLoFs79N5NGKHusicTTF8OqN9pS5GsCFFfA/0",
            "roleName": "预言家",
            "roleAvatar": "",
            "number": 9
        },
        {
            "userName": "���������������",
            "roleId": 1,
            "userId": 18,
            "dead": false,
            "deadDay": 0,
            "deadNight": false,
            "userAvatar": "http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoicc0icCyicSjNSdI9W7Bpqsr4yCq0fGqLR8euoiaBhHOe6CV1l0lgLPVBIrzia1VotneufnOa7bZNDEQ/0",
            "roleName": "狼人",
            "roleAvatar": "",
            "number": 10
        },
        {
            "userName": "大明",
            "roleId": 0,
            "userId": 1,
            "dead": false,
            "deadDay": 0,
            "deadNight": false,
            "userAvatar": "http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ergjK8Gj5icBUG09PyUTpsngxse7tia6gRw9ckpHkxjJlOL22iclDdkrcoHibjj5YA7R6HEJxY7ibm2sgg/0",
            "roleName": "村民",
            "roleAvatar": "",
            "number": 11
        },
        {
            "userName": "大明",
            "roleId": 0,
            "userId": 1,
            "dead": false,
            "deadDay": 0,
            "deadNight": false,
            "userAvatar": "http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ergjK8Gj5icBUG09PyUTpsngxse7tia6gRw9ckpHkxjJlOL22iclDdkrcoHibjj5YA7R6HEJxY7ibm2sgg/0",
            "roleName": "村民",
            "roleAvatar": "",
            "number": 12
        }
    ],
    history:{
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
    },
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
