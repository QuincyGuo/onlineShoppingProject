import Vue from "vue";
import App from "./App.vue";
import router from "./router"; // 引入router
import store from "./store"; // 引入store
import "@/mock/mockServe"; // 引入mockServe.js文件
import "swiper/css/swiper.css"; // 引入Swiper样式
import { MessageBox } from "element-ui"; // 引入element-ui组件库中的messagebox组件
import VueLazyload from "vue-lazyload"; // 引入VueLazyload图片懒加载插件
import pluginA from "@/plugins/pluginA"; // 引入自定义插件
// 统一引入api接口
import * as API from "@/api";

// 注册导航列表组件、轮播图组件、分页器组件为全局组件
import TypeNav from "./components/TypeNav";
import CarouselA from "./components/Carousel";
import PaginationA from "./components/Pagination";
Vue.component(TypeNav.name, TypeNav);
Vue.component(CarouselA.name, CarouselA);
Vue.component(PaginationA.name, PaginationA);

// 将messagebox组件挂载到vue原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//注册vueLazyload插件
import imgLoading from "@/assets/logo.png";
Vue.use(VueLazyload, {
  loading: imgLoading,
});
// 注册自定义插件pluginA
Vue.use(pluginA, {
  name: "upper",
});

Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this; // 安装全局事件总线
    Vue.prototype.$API = API; // 将所有的api挂载在vue原型对象上，以后就不再需要在组件里一个个引入
  },
}).$mount("#app");
