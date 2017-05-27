var util = require('../../utils/util.js')
Page({
  data: {
    history: []
  },
  onLoad: function () {
    var that = this;
    // wx.request({
    //   url: 'http://localhost:8888/pages/history/history.json',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function (res) {
    //     that.setData({
    //       history: res.data.data
    //     })
    //   }
    // })
  }
})
