// pages/phoneBind/phoneBind.js
const app = getApp()
const HttpClient = require('../../utils/util.js').HttpClient;
const Login = require('../../utils/config.js').HttpConfig.Login;
const Message = require('../../utils/util.js').Message;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",//手机号
    msgCode: "",
    sendCodeText: '获取验证码',
    sellerId:'',//业务员ID
  },
  setPhoneInput: function (e) {
    let that = this
    that.setData({
      phone: e.detail.value
    })
  },
  setCodeInput: function (e) {
    let that = this
    that.setData({
      msgCode: e.detail.value
    })
  },
  // 发送验证码
  sendCode: function () {
    let that = this
    if (!that.data.phone) {
      wx.showToast({
        title: '请填写手机号!',
        icon: 'none'
      });
      return false
    }
    if(that.data.sending){
      return
    }
    const params = {}

    params.phone = that.data.phone
    let time = 60
    Message.Loading.loadingDefault()
    HttpClient.Method.get(Login.sendCode, params, function (res){
      Message.Loading.close();
      // 保存业务员id
      that.data.sellerId = res.data.data
      Message.Alert.alertDefault(res.data.message)
      if(res.data.flag){
        let timer = setInterval(function(){
          time--
          if (time <= 0) {
            that.setData({
              sending: false,
              sendCodeText: '重新发送'
            })
            clearInterval(timer)
            return
          }
          let text = '重新发送(' + time + ')'
          that.setData({
            sending: true,
            sendCodeText: text
          })
        },1000)
      }
    })
  },
  // 点击完成绑定
  getBindPhone() {
    const userInfo = app.globalData.userInfo;
    var that = this
    const param = {
      openId:userInfo.openId,
      code:that.data.msgCode,
      icon:userInfo.avatarUrl,
      id:that.data.sellerId,
    }
    Message.Loading.loadingDefault();
    HttpClient.Method.post(Login.register, param, function (result) {
      Message.Loading.close();
      Message.Alert.alertDefault(result.data.message)
      if(result.data.flag) {
        userInfo.id = that.data.sellerId;
        app.setUserInfo(userInfo);
        wx.navigateTo({
          url: '../index/index',
        })
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
