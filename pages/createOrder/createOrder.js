// pages/createOrder/createOrder.js
const app = getApp()
const Order = require('../../utils/config.js').HttpConfig.Order;
const Service = require('../../utils/config.js').HttpConfig.Service;
const HttpClient = require('../../utils/util.js').HttpClient;
const Message = require('../../utils/util.js').Message;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    serviceDetail:[],
    changeService:true,
    customerName:'',//用户姓名
    identityCard:'',//身份证号
    detailInfo:'',//服务地址
    startTime:'请选择时间',//开始时间
    finishTime:'请选择时间',//结束时间
    nannySalary:'',//保姆工资
    agencyFeeA:'',//服务费
    discountPrice:'',//优惠金额
    serviceItem:'',//工作内容
    otherService:'',//其他工作内容
    workStr:'',//所有工作内容
    phone:'',//用户手机号
  },
  onLoad(options){
    if(!app.globalData.userInfo){
      wx.redirectTo({
        url: '../login/login',
      })
    }
    const that = this;
    Message.Loading.loadingDefault();
    //获取服务项目
    HttpClient.Method.get(Service.getServiceItem,{}, function (result) {
      Message.Loading.close();
      let serviceDetail = result.data.data;
      serviceDetail = serviceDetail.map(item => {
        return {name:item, type:false}
      })
      that.setData({serviceDetail})
    })
    if(!!options.ordersn) {
      let that = this;
      //获取服务项目
      Message.Loading.loadingDefault();
      HttpClient.Method.get(Order.getOrder,{ordersn:options.ordersn}, function (result) {
        Message.Loading.close();
        that.setData(result.data.data)
        let serviceDetail = that.data.serviceDetail;
        let serviceItem = result.data.data.serviceItem;
        serviceDetail = serviceDetail.map(item => {
          if(serviceItem.indexOf(item.name) > -1) {
            item.type = true;
          }
          return item;
        })
        that.setData({serviceDetail})
        if(serviceItem.indexOf('其他:') > -1) {
          that.setData({changeService:false})
          that.setData({otherService:serviceItem.substr(serviceItem.indexOf('其他:') + 3)})
        }
      })
    }

  },
  onShow(options) {
  },
  // 获取用户姓名
  getUserName(e){
    this.setData({
      customerName:e.detail.value
    })
  },
  // 获取用户身份证号
  getUseridCard(e){
    this.setData({
      identityCard:e.detail.value
    })
  },
  // 获取用户服务地址
  getUserAddress(e){
    this.setData({
      detailInfo:e.detail.value
    })
  },
  // 保姆工资
  getNannySalary(e){
    this.setData({
      nannySalary:parseInt(e.detail.value)
    })
  },
  // 服务费
  getAgencyFeeA(e){
    this.setData({
      agencyFeeA:parseInt(e.detail.value)
    })
  },
  // 联系电话
  getUserPhone(e){
    this.setData({
      phone:parseInt(e.detail.value)
    })
  },
  // 优惠金额
  getDiscountPrice(e){
    this.setData({
      discountPrice:parseInt(e.detail.value)
    })
  },
  // 其他工作内容
  otherService(e){
    this.setData({
      otherService:e.detail.value
    })
  },
  serviceClick1(event){
    // console.log(event)
    const index = event.currentTarget.dataset.index;
    var str = 'serviceDetail[' + index + '].type'
    this.setData({
      [str]:false
    })

  },
  serviceClick2(event){
    const index = event.currentTarget.dataset.index;
    var str = 'serviceDetail[' + index + '].type'
   this.setData({
    [str]:true
   })
  },
  clickOther1(){
    this.setData({
      changeService:false
    })
  },
  clickOther2(){
    this.setData({
      changeService:true
    })
  },
  takeBack(){
    wx.navigateBack({
      delta: 1,
    })
  },

  changeDate1(e){
    this.setData({ startTime:e.detail.value});
  },
  changeDate2(e){
    this.setData({ finishTime:e.detail.value});
  },

  // 点击立即生成订单
  readyOrderBtn(){
    //先清空之前存的服务内容
    this.setData({
      workStr:'',
      serviceItem:''
    })

    // 先遍历所选的工作内容
    for(let i = 0;i < this.data.serviceDetail.length;i++){
      if(this.data.serviceDetail[i].type == true){
        this.data.serviceItem += this.data.serviceDetail[i].name + ','
      }

    }
    if(this.data.changeService == false){
      this.data.workStr = this.data.serviceItem + "其他:" + this.data.otherService
    }else{
      this.data.workStr = this.data.serviceItem
    }

    // 如果没有选则提示选择工作内容
    if(this.data.workStr == ''){
      wx.showToast({
        title: '请选择服务内容',
      })
      return
    }

    console.log(this.data.workStr)
    if(this.data.customerName == ''){
      wx.showToast({
        title: '请填写甲方姓名',
      })
    }else if(this.data.identityCard == ''){
      wx.showToast({
        title: '请填写身份证号',
      })
    }else if(this.data.detailInfo == ''){
      wx.showToast({
        title: '请填写服务地址',
      })
    }else if(this.data.phone == ''){
      wx.showToast({
        title: '请填写联系电话',
      })
    }else if(this.data.nannySalary == ''){
      wx.showToast({
        title: '请填写保姆薪资',
      })
    }else if(this.data.agencyFeeA == ''){
      wx.showToast({
        title: '请填写服务费',
      })
    }else if(this.data.discountPrice == ''){
      wx.showToast({
        title: '请填写优惠金额',
      })
    }else {
      let that = this;
      const userInfo = app.globalData.userInfo;
      const order = {
        sellerId:userInfo.id,
        phone:that.data.phone,//用户手机号
        customerName:that.data.customerName,//用户姓名
        identityCard:that.data.identityCard,//身份证号
        detailInfo:that.data.detailInfo,//服务地址
        startTime:that.data.startTime,//开始时间
        finishTime:that.data.finishTime,//结束时间
        nannySalary:that.data.nannySalary,//保姆工资
        agencyFeeA:that.data.agencyFeeA,//服务费
        discountPrice:that.data.discountPrice,//优惠金额
        serviceItem:that.data.workStr,//工作内容
      }
      if(!!that.data.id) {
        order.id = that.data.id;
      }
      Message.Loading.loadingDefault();
      HttpClient.Method.post(Order.save, order, function (result) {
        Message.Loading.close();
        if(result.data.flag){
          wx.navigateTo({
            url: '../orderList/orderList',
          })
        }else{
          Message.Alert.alertDefault(result.data.message)
        }
      })
    }
  }
})
