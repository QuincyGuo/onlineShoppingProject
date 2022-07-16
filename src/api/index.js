// API统一管理
import requests from "./request";
import mockRequests from "./mockAjax";

//三级联动接口
//api/product/getBaseCategoryList get 无参数
//发请求：axios发请求返回结果Promise对象
export const reqCategoryList = () =>
  requests({ url: "/product/getBaseCategoryList", method: "get" });

// 获取banner数据
export const reqGetBannerList = () =>
  mockRequests({ url: "/banner", method: "get" });

// 获取floor数据
export const reqGetFloorList = () =>
  mockRequests({ url: "/floor", method: "get" });

// 获取搜索模块数据   地址：/api/list   请求方式：post    需要带参数
// 参数例子，共十个，非必选
// {
//   "category1Id": "61",
//   "category2Id": "61",
//   "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// }
// 该params参数至少要是一个空对象，不能是null，否则服务器返回数据会报错
export const reqGetSearchInfo = (data) =>
  requests({ url: "/list", method: "post", data });

// 获取商品详情数据   地址：/api/item/{skuId}   请求方式：get    需要带参数skuId
export const reqGetGoodInfo = (skuId) =>
  requests({ url: `/item/${skuId}`, method: "get" });

// 将商品加入购物车或者在购物车中改变商品数量   地址：/api/cart/addToCart/{skuId}/ {skuNum}  请求方式：post    skuId skuNum
export const reqAddOrUpdateCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

// 获取购物车列表数据接口
// URL:/api/cart/cartList method:get
export const reqGetCartList = () =>
  requests({ url: "/cart/cartList ", method: "get" });

// 删除购物车商品接口
// URL:/api/cart/deleteCart/{skuId}   method:DELETE  需要带参数skuId
export const reqDeleteCart = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: "DELETE" });

// 切换购物车商品选中状态接口
// URL:/api/cart/checkCart/{skuId}/{isChecked}   method:get   需要带参数skuId,isChecked
export const reqUpdateCartChecked = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });

// 获取注册验证码接口
// URL:/api/user/passport/sendCode/{phone}   method:get   需要带参数phone
export const reqGetCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });

// 用户注册接口
// URL:/api/user/passport/register  method:post   需要带参数data{ phone, password, code }
export const reqUserRegister = (data) =>
  requests({ url: "/user/passport/register", data, method: "post" });

// 用户登录接口
// URL:/api/user/passport/login  method:post   需要带参数data{ phone, password}
export const reqUserLogin = (data) =>
  requests({ url: "/user/passport/login", data, method: "post" });

// 获取用户信息【需要带着用户的token向服务器要用户信息】
// URL:/api/user/passport/auth/getUserInfo method:get
// 此处并没有携带token数据，是将token数据放到请求头中带到服务器
export const reqUserInfo = () =>
  requests({ url: "/user/passport/auth/getUserInfo", method: "get" });

// 退出登录
// URL:/api/user/passport/logout get
export const reqLogout = () =>
  requests({ url: "/user/passport/logout", method: "get" });

// 获取用户地址信息
// URL:/api/user/userAddress/auth/findUserAddresslist method：get
export const reqAddressInfo = () =>
  requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });

// 获取商品清单
// URL:/api/order/auth/trade  method:get
export const reqOrderInfo = () =>
  requests({ url: "/order/auth/trade", method: "get" });

// 提交订单
// URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  mehtod:post   需要带参数tradeNo, data{consigne,totalPrice...}
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "post",
  });

// 获取订单支付信息
// URL:/api/payment/weixin/createNative/{orderId}   method:get   需要带参数orderId
export const reqGetPayInfo = (orderId) =>
  requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" });

// 获取订单支付状态
//URL:/api/payment/weixin/queryPayStatus/{orderId} method:get   需要带参数orderId
export const reqPayStatus = (orderId) =>
  requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" });

// 获取我的订单数据
// URL:/api/order/auth/{page}/{limit}  mehtod:get   需要带参数page页码 ，limit每页数据量
export const reqMyOrderList = (page, limit) =>
  requests({
    url: `/order/auth/${page}/${limit}`,
    method: "get",
  });
