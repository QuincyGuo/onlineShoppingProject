import { reqAddressInfo, reqOrderInfo } from "../../api";
const actions = {
  // 获取用户地址信息
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo();
    if (result.code == 200) {
      commit("GETUSERADDRESS", result.data);
    }
  },

  // 获取商品清单
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo();
    if (result.code == 200) {
      commit("GETORDERINFO", result.data);
    }
  },
};

const mutations = {
  GETUSERADDRESS(state, userAddress) {
    state.userAddress = userAddress;
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  },

  NOUSE() {},
};
const state = {
  userAddress: [], // 用户地址数据
  orderInfo: {}, // 商品清单数据
};

const getters = {};

export default {
  actions,
  mutations,
  state,
  getters,
};
