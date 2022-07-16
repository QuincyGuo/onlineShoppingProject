//引入Vue
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
//应用vuex
Vue.use(Vuex); // 这里不像插件那样，在main.js里使用，是因为规定Vue.use(Vuex)要在new Vuex之前。

import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";
const store = new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade,
  },
});
//导出store
export default store;
