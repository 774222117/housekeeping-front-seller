// pages/login/login.js
//获取应用实例
const app = getApp()
const Login = require('../../utils/config.js').HttpConfig.Login;
const Message = require('../../utils/util.js').Message;
const HttpClient = require('../../utils/util.js').HttpClient;

Page({

  /**
   * 页面的初始数据
   */
  data: {},
  // 一键授权
  getUserProfile:function(e){
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // console.log(res)
        //判断用户信息是否存在
        let userInfo = app.globalData.userInfo;
        if (!!userInfo && !!userInfo.id) {
          //有用户 直接跳转业务端
          wx.navigateTo({
            url: '../index/index',
          })
        } else {
          userInfo = {};
          userInfo['avatarUrl'] = res.userInfo.avatarUrl;
          //没有用户 登录或注册
          wx.login({
            // code只有5分钟有效期
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              // console.log(res)
              // 1.获取code
              const code = res.code;
              Message.Loading.loadingDefault();
              HttpClient.Method.get(Login.loginIn, {code:code}, function (result) {
                Message.Loading.close();
                //未注册过
                if(result.data.code == 1){
                  userInfo['openId'] = result.data.data.openid;
                  app.setUserInfo(userInfo);
                  wx.redirectTo({
                    url: '../phoneBind/phoneBind',
                  })
                }else if(result.data.code == 0){
                  Message.Alert.alertDefault(result.data.message)
                }else if(result.data.code == 2){
                  app.setUserInfo(result.data.data);
                  wx.navigateTo({
                    url: '../index/index',
                  })
                }
              })
            }
          })
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
