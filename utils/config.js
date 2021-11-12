// 项目配置
// 正式服
const host = 'https://housekeeping.ckldzsw.com'

const HttpConfig = {
  Login:{
    loginIn:`${host}/app/seller/loginIn`,//登录
    sendCode: `${host}/app/seller/sendCode`, //发送登录验证码
    register:`${host}/app/seller/register`,//完成手机绑定
    getOne:`${host}/app/seller/getOne`,//完成手机绑定
  },
  Order:{
    findData:`${host}/app/order/findData`,//订单列表
    getOrder:`${host}/app/order/getOrder`,//订单列表
    save:`${host}/app/order/save`,//创建订单
  },
  Service:{
    getServiceItem:`${host}/app/contract/getServiceItem`//工作内容
  }
}

module.exports = {
  HttpConfig,
}

