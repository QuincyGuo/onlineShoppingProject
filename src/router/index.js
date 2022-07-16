import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import store from "@/store"; // 引入store

// 解决问题：编程式路由跳转，参数不变时多次执行，会抛出NavigationDuplicated的警告错误
// -------------------------------------------------------------------------------
//将原有的push方法地址，保存起来，后期还能拿到原来的
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;
//可以大胆的去修改原型的push，让原型的push指向另外一个函数
VueRouter.prototype.push = function (location, onResolved, onRejected) {
  //location就是我们调用 this.$router.push，传递过来的对象
  if (onResolved === undefined && onRejected === undefined) {
    //证明调用的时候只传递了个匹配路由对象，没有传递成功或者失败的回调
    return originPush.call(this, location).catch(() => {});
  } else {
    //证明调用的时候传递了成功或者失败的回调，或者都有
    return originPush.call(this, location, onResolved, onRejected);
  }
};
VueRouter.prototype.replace = function (location, onResolved, onRejected) {
  //location就是我们调用 this.$router.replace，传递过来的对象

  if (onResolved === undefined && onRejected === undefined) {
    //证明调用的时候只传递了个匹配路由对象，没有传递成功或者失败的回调
    return originReplace.call(this, location).catch(() => {});
  } else {
    //证明调用的时候传递了成功或者失败的回调，或者都有
    return originReplace.call(this, location, onResolved, onRejected);
  }
};
// -------------------------------------------------------------------------------

//引入路由组件
import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search";
import Detail from "../pages/Detail";
import AddCartSuccess from "../pages/AddCartSuccess";
import ShopCart from "../pages/ShopCart";
import Trade from "../pages/Trade";
import Pay from "../pages/Pay";
import PaySuccess from "../pages/PaySuccess";
import Center from "../pages/Center";

// 引入二级路由组件
import MyOrder from "../pages/Center/myOrder";
import GroupOrder from "../pages/Center/groupOrder";

//创建一个路由器
const router = new VueRouter({
  routes: [
    {
      path: "/home",
      name: "RouterHome", // name作用是在嵌套路由时，替代较长路径的path；以及routerlink跳转时，不用路径而用名称跳转
      component: () => import("@/pages/Home"),
      meta: {
        show: true, // 作用是：是否显示页面下方的footer组件
      },
    },
    {
      path: "/login",
      name: "RouterLogin",
      component: Login,
      meta: {
        show: false,
      },
    },
    {
      path: "/register",
      name: "RouterRegister",
      component: Register,
      meta: {
        show: false,
      },
    },
    {
      path: "/search/:keyword?",
      name: "RouterSearch",
      component: Search,
      meta: {
        show: true,
      },
    },
    {
      path: "/detail/:skuid", // 进入该详情页需要传参，所以在此处提前设置好路径；不加问号表示该参数必须传递
      name: "RouterDetail",
      component: Detail,
      meta: {
        show: true,
      },
    },
    {
      path: "/addcartsuccess",
      name: "RouterAddCartSuccess",
      component: AddCartSuccess,
      meta: {
        show: true,
      },
    },
    {
      path: "/shopcart",
      name: "RouterShopCart",
      component: ShopCart,
      meta: {
        show: true,
      },
    },
    {
      path: "/trade",
      name: "RouterTrade",
      component: Trade,
      meta: {
        show: true,
      },
      // trade的路由独享守卫
      beforeEnter: (to, from, next) => {
        // 要去trade路由，必须是从shopcart而来；其他来源的路由都让其停留在原页面路由；
        if (from.path == "/shopcart") {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      path: "/pay",
      name: "RouterPay",
      component: Pay,
      meta: {
        show: true,
      },
      // pay的路由独享守卫
      beforeEnter: (to, from, next) => {
        // 要去pay路由，必须是从trade而来；其他来源的路由都让其停留在原页面路由；
        if (from.path == "/trade") {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      path: "/paysuccess",
      name: "RouterPaySuccess",
      component: PaySuccess,
      meta: {
        show: true,
      },
    },
    {
      path: "/center",
      name: "RouterCenter",
      component: Center,
      meta: {
        show: true,
      },
      // 二级路由组件
      children: [
        {
          path: "myorder",
          name: "RouterMyOrder",
          component: MyOrder,
        },
        {
          path: "grouporder",
          name: "RouterGroupOrder",
          component: GroupOrder,
        },
        // 重定向，让进入center路由时就立马定向到myorder
        {
          path: "/center",
          redirect: "/center/myorder",
        },
      ],
    },
    // 重定向，让项目在跑起来的时候，立马定向到首页
    {
      path: "*",
      redirect: "/home",
    },
  ],

  // 滚动行为
  scrollBehavior() {
    // 表示返回的滚动条在垂直方向上的最顶端
    return { y: 0 };
  },
});

// 全局前置导航守卫
router.beforeEach(async (to, from, next) => {
  //to：可以获取到你要跳转到那个路由信息
  //from：可以获取到你从哪个路由而来的信息
  //next：放行函数;   next():放行，让路由跳转正常运行；   next(path):强制跳转到指定路径的路由     next(false)；

  // 1、登录后不能再路由跳转至登录页面
  // 2、在进行路由跳转前进行判断，有用户信息的正常跳转，没有的先运行获取用户信息的action，使state中有用户信息，再进行跳转
  // （因为要使每个组件都要在mounted阶段获取用户信息，但是在所有组件里面每一个都写太麻烦，所以在这里写）
  // 要让每个组件都要在mounted阶段获取用户信息的理由是，每个组件都需要用户信息来展示数据，但是组件页面点击浏览器刷新按钮时，vuex数据会消失，所以要先派发请求再跳转
  // 所以，如果是在已登录状态下，由首页路由跳转至search，此时state中有用户信息；如果此时在search页面刷新，则没有用户信息，会派发请求之后再跳转至本组件页面

  // 用户登录了，才会有token，未登录一定不会有token
  let token = store.state.user.token;
  // 获取用户信息里的姓名，已确保当前state中是否已有用户信息
  let name = store.state.user.userInfo.name;
  if (token) {
    // 1已登录
    if (to.path == "/login") {
      // 1已经登录且要跳转至登录路由组件，让其强制跳转至首页
      next("/home");
      // console.log(111);  // 这些输出，是为了便于查看目前运行到哪一步而设置
    } else {
      // 2已经登录且不是跳转至登录路由组件；再次判断state中是否已有用户信息
      if (name) {
        // 2有用户信息，正常跳转
        next();
        // console.log(222);
      } else {
        // 2无用户信息，则先获取用户信息再跳转
        try {
          await store.dispatch("getUserInfo");
          next();
          // console.log(333);
        } catch (error) {
          // 2token失效，获取不到用户信息，需要先退出登录重新登录，再强制跳转至登录路由
          store.dispatch("userLogout");
          next("/login");
        }
      }
    }
  } else {
    // 2、未登录
    let toPath = to.path;
    if (
      to.path.indexOf("trade") != -1 ||
      to.path.indexOf("pay") != -1 ||
      to.path.indexOf("center") != -1
    ) {
      // 2.1、如果去往trade、pay、paysuccess、center路由组件，则拦截，强制跳转至登录路由
      next("/login?redirect=" + toPath);
    }
    // 2.2、其余的正常通行
    else {
      next();
    }
  }
});

export default router;
