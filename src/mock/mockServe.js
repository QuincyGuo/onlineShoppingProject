// 引入mockjs模块
import Mock from "mockjs";
// 引入JSON数据
// webpack 默认对外暴露：图片、JSON数据，所以不需要额外加入export语句
import banner from "./banner.json";
import floor from "./floor.json";

// 下面的Mock是mockjs对外暴露的引用对象
// mock是其中的一个方法，需要两个参数，参数1是请求地址，参数2是请求返回的数据；表示当有请求地址为参数1的地址时，返回参数2的模拟数据
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
