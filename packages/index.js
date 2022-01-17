import StockKeyboard from "./StockKeyboard";

StockKeyboard.install = function (Vue) {
  Vue.component(StockKeyboard.name, StockKeyboard);
};

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  StockKeyboard.install(window.Vue);
}

export default StockKeyboard;
