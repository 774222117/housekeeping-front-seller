// pages/orderList/orderList.js
const app = getApp()
const Order = require('../../utils/config.js').HttpConfig.Order;
const HttpClient = require('../../utils/util.js').HttpClient;
const Message = require('../../utils/util.js').Message;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentIndex:0,
      status:'0',//0未支付，2支付成功 所有 ''
      limit:10, //每页数量
      current:1,//起始数量
      nowOrderList:[],//当前订单数据
  },
  titileItemClick(event){
    const index = event.currentTarget.dataset.index
    let current = 1;
    let clickStatus = '';
    if(index == 0){
      clickStatus = ''
    }else if(index == 1){
      clickStatus = 0 //未支付
    }else if(index == 2){
      clickStatus = 1 //已支付 开始履约
    }
    this.setData({
      currentIndex:index,
      current:current,
      status:clickStatus,
      nowOrderList:[]
    })
    this.getOrderList()
  },
  // 返回
  takeBack(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.currentIndex;
    let clickStatus = '';
    if(index == 0){
      clickStatus = ''
    }else if(index == 1){
      clickStatus = 0 //未支付
    }else if(index == 2){
      clickStatus = 1 //已支付 开始履约
    }
    this.setData({
      currentIndex:index,
      status:clickStatus,
      nowOrderList:[]
    })
    this.getOrderList()

    
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
    let that = this;
    let current = that.data.current + 1;
    that.setData({current})
    that.getOrderList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getOrderList(){
    let that = this;

    let param = {
      sellerId:app.globalData.userInfo.id,
      status:that.data.status,
      limit:that.data.limit,
      current:that.data.current,
    }
    Message.Loading.loadingDefault();
    HttpClient.Method.get(Order.findData, param, function (result) {
      Message.Loading.close();
      let data = that.data.nowOrderList;
      data = data.concat(result.data.data.rows)
      that.setData({nowOrderList:data})
      
    })
  },
  editOrder(e) {
    const ordersn = e.currentTarget.dataset.ordersn
    wx.navigateTo({
      url: '../createOrder/createOrder?ordersn=' + ordersn,
    })
  },

  shareOrder(e){
    const ordersn = e.currentTarget.dataset.ordersn
    console.log(ordersn)
    wx.navigateToMiniProgram({
      appId: 'wx21ac77c18c37ac6a',
      path: 'pages/index/index?ordersn='+ordersn,
      success(res) {
        // 打开成功
      }
    })

  }
})
