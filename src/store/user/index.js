import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout,
} from "../../api";
import { getToken, setToken, removeToken } from "@/utils/token";
const actions = {
  // 获取验证码其实本来应该是将验证码发向手机号，但这不属于前台工作。所以此处服务器将验证码发送回浏览器，由我们自行填写。
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data); // 如果数据正常，让数据进行commit操作
    }
  },

  // 用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    if (result.code == 200) {
      commit("NOUSE");
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },

  // 用户登录
  async userLogin({ commit }, user) {
    let result = await reqUserLogin(user);
    //服务器下发token，用户唯一标识符（uuid）
    //将来经常通过请求中携带token，作为识别本用户的标识，找服务器要用户信息进行展示
    if (result.code == 200) {
      commit("USERLOGIN", result.data.token);
      // 持久化存储token
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },

  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    console.log(result);
    //服务器下发token，用户唯一标识符（uuid）
    //将来经常通过请求中携带token，作为识别本用户的标识，找服务器要用户信息进行展示
    if (result.code == 200) {
      commit("GETUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },

  //退出登录
  async userLogout({ commit }) {
    //只是向服务器发起一次请求，通知服务器清除token
    let result = await reqLogout();
    //action里面不能操作state，提交mutation修改state
    if (result.code == 200) {
      commit("CLEAR");
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
};

const mutations = {
  GETCODE(state, testCode) {
    state.testCodeFromServer = testCode;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  // 清除本地数据
  CLEAR(state) {
    //仓库中相关用户信息清空
    state.token = "";
    state.userInfo = {};
    //本地存储数据清空
    removeToken();
  },
  NOUSE() {},
};
const state = {
  testCodeFromServer: "", // 验证码数据
  token: getToken(), // 用户标识字符
  userInfo: {}, // 用户信息数据
};

const getters = {};

export default {
  actions,
  mutations,
  state,
  getters,
};
