// home 模块的小仓库
import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "../../api";

const state = {
  //state中数据默认初始值,根据接口返回值的数据类型进行初始化
  categoryList: [],
  bannerList: [], // 轮播图banner数据
  floorList: [], // floor数据
};
const actions = {
  //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      commit("CATEGORYLIST", result.data);
    }
  },

  //获取banner数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList(); // 调用api里的接口函数，由mock拦截请求，并返回我们预先设置的模拟数据
    if (result.code == 200) {
      commit("BANNERLIST", result.data); // 如果数据正常，让数据进行commit操作
    }
  },

  //获取floor数据
  async getFloorList({ commit }) {
    let result = await reqGetFloorList();
    if (result.code == 200) {
      commit("FLOORLIST", result.data);
    }
  },
};

const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  FLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};

const getters = {};

export default {
  actions,
  mutations,
  state,
  getters,
};
