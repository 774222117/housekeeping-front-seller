// app.js
App({
  onLaunch() {
    this.globalData.userInfo = wx.getStorageSync('userKey');
  },
  setUserInfo: function (userInfo) {
    this.globalData.userInfo = userInfo;
    wx.setStorageSync('userKey', userInfo)
  },
  globalData: {
    userInfo: '',
  }
})
