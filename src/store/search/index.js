// search 模块的小仓库
import { reqGetSearchInfo } from "../../api";
const actions = {
  //获取搜索结果商品数据
  async getSearchList({ commit }, params = {}) {
    // params参数是用户派发action时，第二个参数传递进来的，其至少要是一个空对象，不能是null，否则服务器返回数据会报错
    let result = await reqGetSearchInfo(params); // 调用api里的接口函数reqGetSearchInfo
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data); // 如果数据正常，让数据进行commit操作
    }
  },
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const state = {
  searchList: {}, // 搜索结果商品数据，数据类型是对象
};

// getters简化数据，便于组件读取
// 如果不用getters，也能组件读取数据，但是就要嵌套多层着写：state.search.searchList.goodsList,
const getters = {
  goodsList(state) {
    // 此处的state参数是本search模块的state
    // 加空数组的原因是，如果网络请求失败，此处返回的goodsList会是一个undefined
    // 而组件还要对goodsList进行v-for操作，会报错，所以至少加一个空数组
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
};

export default {
  actions,
  mutations,
  state,
  getters,
};
