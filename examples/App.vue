<template>
  <div id="app">
    <p class="label">normal</p>
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
    />

    <p class="label">custom</p>
    <div class="search">
      <div class="search__input" @click="showKeyboardCustom = true">
        <div :class="showKeyboardCustom && keywordCustom ? 'focus' : ''">
          {{ keywordCustom || "请输入科创板股票代码/简拼" }}
        </div>
      </div>
    </div>

    <StockKeyboard
      :visible="showKeyboardCustom"
      :custom="['002', '688', '900']"
      @close="showKeyboardCustom = arguments[0]"
      @input="keywordCustom += arguments[0]"
      @delete="keywordCustom = keywordCustom.slice(0, -1)"
    />
  </div>
</template>

<script>
import StockKeyboard from "../packages/StockKeyboard.vue";
export default {
  name: "App",
  components: {
    StockKeyboard,
  },
  data() {
    return {
      keyword: "",
      showKeyboard: false,

      keywordCustom: "",
      showKeyboardCustom: false,
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.label {
  margin: .3rem 0;
  font-size: .3rem;
  font-weight: bold;
}
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
