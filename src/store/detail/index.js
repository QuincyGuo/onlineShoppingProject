// detail 模块的小仓库
import { getUUID } from "@/utils/uuid_token";
import { reqGetGoodInfo, reqAddOrUpdateCart } from "../../api";
const actions = {
  // 获取商品详情数据
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGetGoodInfo(skuId); // 调用api里的接口函数reqGetGoodInfo
    if (result.code == 200) {
      commit("GETGOODINFO", result.data); // 如果数据正常，让数据进行commit操作
    }
  },

  // 将商品加入购物车
  async addOrUpdateCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateCart(skuId, skuNum); // 调用api里的接口函数reqGetGoodInfo
    if (result.code == 200) {
      commit("NOUSE"); // 服务器没有返回数据，所以不需要commit操作。这里是为了使用commit，不让报错
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
  NOUSE() {},
};
const state = {
  goodInfo: {}, // 商品详情数据，数据类型是对象
  uuid_token: getUUID(),
};

// getters简化数据，便于组件读取
const getters = {
  // 简化路径导航数据
  categoryView(state) {
    // 此处的state参数是本search模块的state
    return state.goodInfo.categoryView || {};
  },
  // 简化产品信息数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  // 简化商品加入购物车的选择属性
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  },
};

export default {
  actions,
  mutations,
  state,
  getters,
};
