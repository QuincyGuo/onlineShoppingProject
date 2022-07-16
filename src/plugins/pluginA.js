// vue插件一定对外暴露一个对象
let pluginA = {};

// // 插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
// pluginA.install = function (Vue, options) {
//   Vue.directive(options.name, {
//     bind: function (el, binding) {
//       el.innerHTML = el.textContent + binding.value;
//     },
//   });
// };

export default pluginA;
