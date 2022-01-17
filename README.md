<h3 align="center">stock-keyboard</h3>

<p align="center">
  <a href="https://www.npmjs.org/package/stock-keyboard">
    <img src="https://img.shields.io/npm/v/stock-keyboard.svg" alt="Npm package">
  </a>
  <a>
    <img src="https://img.shields.io/badge/language-javascript-yellow.svg" alt="Language">
  </a>
  <a>
    <img src="https://img.shields.io/badge/license-MIT-000000.svg" alt="License">
  </a>
</p>

> 📈⌨️ 基于 Vue2.x 封装的股票键盘组件

本质是模拟键盘弹出，故需要防止系统软键盘出现。可通过 js 禁用，或使用非输入标签配合 CSS 模拟光标。事件派发请自行防抖

[![7dX8l4.gif](https://s4.ax1x.com/2022/01/18/7dX8l4.gif)](https://imgtu.com/i/7dX8l4)

## 支持性

移动端使用。理论上支持所有现代浏览器及 IE9+ ，包括 pc 端。

## 安装

```
npm i stock-keyboard -S
```

## 快速上手

```html
<template>
  <div>
    <div class="search">
      <div class="search__input" @click="showKeyboard = true">
        <div :class="showKeyboard && keyword ? 'focus' : ''">
          {{ keyword || "请输入股票代码/简拼" }}
        </div>
      </div>
    </div>
    <StockKeyboard
      :visible="showKeyboard"
      @close="showKeyboard = arguments[0]"
      @input="keyword += arguments[0]"
      @delete="keyword = keyword.slice(0, -1)"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
  import StockKeyboard from "stock-keyboard";
  export default {
    components: { StockKeyboard },
    data() {
      return {
        keyword: "",
        showKeyboard: false,
      };
    },
    // ...
  };
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  width: 100%;
  height: 0.64rem;
  box-sizing: border-box;
  background: #f5f5f5;
  border-radius: 0.28rem;
}
.search__input {
  height: 0.64rem;
  width: 6.56rem;
  padding: 0 0 0 0.2rem;
  line-height: 0.64rem;
  color: #666;
  box-sizing: border-box;
  font-size: 0.28rem;
  .focus {
    position: relative;
    display: inline-block;
    &::after {
      position: absolute;
      right: -0.04rem;
      top: 0.18rem;
      content: "";
      width: 1px;
      height: 0.28rem;
      animation: blink 1s infinite steps(1, start);
    }
    @keyframes blink {
      0% {
        background-color: white;
      }
      50% {
        background-color: #999;
      }
      100% {
        background-color: white;
      }
    }
  }
}
</style>
```

## API

### 参数

| 参数       | 说明               | 类型      | 默认值                  |
| ---------- | ------------------ | --------- | ----------------------- |
| visible    | 是否显示           | _boolean_ | `false`                 |
| custom     | 数字键盘第一列数值 | _array_   | `["000", "300", "600"]` |
| submitText | 提交按钮文案       | _string_  | `搜索`                  |

### Event

| 事件名 | 说明             | 回调参数             |
| ------ | ---------------- | -------------------- |
| input  | 点击键盘派发     | _string_ \| _number_ |
| delete | 点击删格按钮派发 | -                    |
| close  | 点击关闭按钮派发 | `false`              |
| submit | 点击搜索按钮派发 | -                    |

## License

[MIT](http://opensource.org/licenses/MIT)
