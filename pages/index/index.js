// pages/index/index.js
const app = getApp()
const HttpClient = require('../../utils/util.js').HttpClient;
const Message = require('../../utils/util.js').Message;
const Login = require('../../utils/config.js').HttpConfig.Login;
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  // 创建订单
  createOrderBtn() {
    wx.navigateTo({
      url: '../createOrder/createOrder',
    })
  },
  // 返回上一页
  handTakeBack(){
    wx.navigateBack({
      delta: 1,
    })
  },
  // 未支付订单
  noPaidOrder(){
    wx.redirectTo({
      url: '../orderList/orderList' + '?currentIndex=1',
    })
  },
  // 已支付订单
  paidOrder(){
    wx.redirectTo({
      url: '../orderList/orderList' + '?currentIndex=2',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = app.globalData.userInfo;
    if (!userInfo || !userInfo.id) {
      //有用户 直接跳转业务端
      wx.navigateTo({
        url: '../login/login',
      })
    } else {
      Message.Loading.loadingDefault();
      HttpClient.Method.get(Login.getOne, {sellerId:userInfo.id}, function (result) {
        Message.Loading.close();
        if(result.data.flag) {
          app.setUserInfo(result.data.data);
        } else {
          Message.Alert.alertDefault(result.data.message)
          wx.navigateTo({
            url: '../login/login',
          })
        }
      })
    }

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
