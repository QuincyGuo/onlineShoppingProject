// 对于axios进行二次封装
import axios from "axios";
// 引入store，目的是为了使用store内的数据
import store from "@/store";

//1：利用axios对象的方法create，去创建一个axios实例
//2：request就是axios，只不过稍微配置一下
const requests = axios.create({
  //配置对象
  //基础路径，发请求的时候，路径当中会出现api
  baseURL: "/api",
  //代表请求超时的时间5S
  timeout: 5000,
});

// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  //config：配置对象，对象里面有一个属性很重要，headers请求头
  if (store.state.detail.uuid_token) {
    // 如果有唯一id，则在每次的网络请求的请求头中加入uuid，且uuid的名称要和后台商定好
    config.headers.userTempId = store.state.detail.uuid_token;
  }

  // 此处是登录后，服务器返回的token，而不是自己生成的uuid_token
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  return config;
});

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    //成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data;
  },
  (error) => {
    //响应失败的回调函数
    return Promise.reject(error);
  }
);

export default requests;
