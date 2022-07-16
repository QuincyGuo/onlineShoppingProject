import { reqGetCartList } from "../../api";
import { reqDeleteCart } from "../../api";
import { reqUpdateCartChecked } from "../../api";
const actions = {
  // 获取购物车内商品详情数据
  async getCartList({ commit }) {
    let result = await reqGetCartList(); // 调用api里的接口函数reqGetCartList
    if (result.code == 200) {
      commit("GETCARTLIST", result.data); // 如果数据正常，让数据进行commit操作
    }
  },

  // 删除购物车内商品
  async deleteCart({ commit }, skuId) {
    let result = await reqDeleteCart(skuId); // 调用api里的接口函数reqDeleteCart
    if (result.code == 200) {
      commit("NOUSE"); // 服务器没有返回数据，所以不需要commit操作，vuex三连至此结束。这里是为了使用commit，不让报错
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },

  // 切换购物车内商品选中状态
  async updateCartChecked({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCartChecked(skuId, isChecked); // 调用api里的接口函数reqUpdateCartChecked
    if (result.code == 200) {
      commit("NOUSE"); // 服务器没有返回数据，所以不需要commit操作，vuex三连至此结束。这里是为了使用commit，不让报错
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },

  // 删除购物车内所有选中的商品
  async deleteAllCheckedCart({ dispatch, getters }) {
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach((element) => {
      if (element.isChecked == 1) {
        let result = dispatch("deleteCart", element.skuId);
        // 将每一次返回的promise添加到数组当中；
        PromiseAll.push(result);
      }
    });
    //只要全部的p1p2.都成功，返回结果即为成功
    //如果有一个失败，返回即为失败结果
    return Promise.all(PromiseAll);
  },

  // 全选所有商品
  // 通过getters获得所有的商品id，对每一个都调用updateCartChecked的actions（参数固定为选中），然后将所有的请求返回结果插入数组，并将结果返回给组件
  async checkedAllCart({ dispatch, getters }, isChecked) {
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach((element) => {
      let result = dispatch("updateCartChecked", {
        skuId: element.skuId,
        isChecked: isChecked,
      });
      // 将每一次返回的promise添加到数组当中；
      PromiseAll.push(result);
    });
    //只要全部的p1p2.都成功，返回结果即为成功
    //如果有一个失败，返回即为失败结果
    return Promise.all(PromiseAll);
  },
};

const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },

  NOUSE() {},
};
const state = {
  cartList: [], // 商品详情数据，数据类型是数组
};

const getters = {
  cartList(state) {
    // 数据被嵌套的太深，这段代码让组件读取数据方便
    return state.cartList[0] || {};
  },
};

export default {
  actions,
  mutations,
  state,
  getters,
};
