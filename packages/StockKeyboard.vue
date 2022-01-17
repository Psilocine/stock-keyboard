<template>
  <div class="stock-keyboard">
    <div
      class="keyboard keyboard__number"
      :class="visible && isNumber ? 'show' : ''"
    >
      <ul class="keyboard__row f-between">
        <li class="keyboard__item f-center fs36" @click="onInput(custom[0])">
          {{ custom[0] }}
        </li>
        <li
          class="keyboard__item f-center"
          v-for="item in [1, 2, 3]"
          :key="item"
          @click="onInput(item)"
        >
          {{ item }}
        </li>
      </ul>

      <ul class="keyboard__row f-between">
        <li class="keyboard__item f-center fs36" @click="onInput(custom[1])">
          {{ custom[1] }}
        </li>
        <li
          class="keyboard__item f-center"
          v-for="item in [4, 5, 6]"
          :key="item"
          @click="onInput(item)"
        >
          {{ item }}
        </li>
      </ul>
      <ul class="keyboard__row f-between">
        <li class="keyboard__item f-center fs36" @click="onInput(custom[2])">
          {{ custom[2] }}
        </li>
        <li
          class="keyboard__item f-center"
          v-for="item in [7, 8, 9]"
          :key="item"
          @click="onInput(item)"
        >
          {{ item }}
        </li>
      </ul>
      <ul class="keyboard__row f-between">
        <li class="keyboard__item f-center fs34" @click="onToggle">ABC</li>
        <li class="f-center hide-icon keyboard__item" @click="onClose"></li>
        <li class="keyboard__item f-center" @click="onInput('0')">0</li>
        <li
          class="f-center delete-icon keyboard__item"
          @click="onDelete"
        ></li>
      </ul>
    </div>
    <div
      class="keyboard keyboard__en"
      :class="visible && !isNumber ? 'show' : ''"
    >
      <ul class="keyboard__row f-between">
        <li
          v-for="item in ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']"
          :key="item"
          class="keyboard__item keyboard__item--en f-center"
          @click="onInput(item)"
        >
          {{ item }}
        </li>
      </ul>
      <ul class="keyboard__row f-center">
        <li
          v-for="item in ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']"
          :key="item"
          class="keyboard__item keyboard__item keyboard__item--en f-center"
          @click="onInput(item)"
        >
          {{ item }}
        </li>
      </ul>

      <ul class="keyboard__row f-between">
        <li
          class="keyboard__item keyboard__item--special f-center hide-icon"
          @click="onClose"
        ></li>
        <div class="f-center">
          <li
            v-for="item in ['Z', 'X', 'C', 'V', 'B', 'N', 'M']"
            :key="item"
            class="keyboard__item keyboard__item keyboard__item--en f-center"
            @click="onInput(item)"
          >
            {{ item }}
          </li>
        </div>
        <li
          class="keyboard__item keyboard__item--special delete-icon f-center"
          @click="onDelete"
        ></li>
      </ul>

      <ul class="keyboard__row f-between">
        <li
          class="keyboard__item f-center toggle-btn fs36"
          @click="onToggle"
        >
          123
        </li>
        <li class="keyboard__item f-center blank-btn"></li>
        <li
          class="keyboard__item f-center search-btn fs36"
          @click="onSubmit"
        >
          {{ submitText }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "StockKeyboard",
  props: {
    /**
     * 键盘显隐
     */
    visible: {
      type: Boolean,
      default: false,
    },
    /**
     * 数字键盘可自定义第一列数值
     */
    custom: {
      type: Array,
      default() {
        return ["000", "300", "600"];
      },
      validator: (arr) => {
        return arr.length === 3;
      },
    },
    /**
     * 字母键盘提交按钮文案
     */
    submitText: {
      type: String,
      default: "搜索",
    },
  },
  data() {
    return {
      isNumber: true,
    };
  },
  methods: {
    /**
     * 按钮点击派发
     */
    onInput(value) {
      this.$emit("input", value);
    },
    /**
     * 数字键盘和英文键盘 toggle
     */
    onToggle() {
      this.isNumber = !this.isNumber;
    },
    /**
     * 关闭键盘派发
     */
    onClose() {
      this.$emit("close", false);
    },
    /**
     * 删除按钮事件派发
     */
    onDelete() {
      this.$emit("delete");
    },
    /**
     * 确认按钮事件派发
     */
    onSubmit() {
      this.$emit("submit");
    },
  },
  created () {
    // 该组件用 1rem = 100px 适配布局，未设置会导致样式错误
    const HTML = document.querySelector('html')
    const INNER_STYLE = HTML.getAttribute('style')
    if (!INNER_STYLE) {
      HTML.style.fontSize = `${Math.min(window.innerWidth * 100 / 750, 100)}px`
    } else if (INNER_STYLE.indexOf('font-size') === -1) {
      HTML.style.fontSize = `${Math.min(window.innerWidth * 100 / 750, 100)}px`
    }
  }
});
</script>

<style lang="scss" scoped>
.stock-keyboard {
  .keyboard {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 4.28rem;
    width: 100vw;
    padding-bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    transform: translate3d(0, 100%, 0);
    transition: transform 0.3s ease;
    z-index: 9;
    &.show {
      transform: translate3d(0, 0, 0);
    }
  }

  .keyboard__row {
    align-items: flex-start;
    height: 1.05rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .keyboard__number {
    font-size: 0.48rem;
    font-weight: 500;
    background: #fff;
    .keyboard__row {
      border-top: 0.01rem solid #c9c9c9;
      align-items: stretch;
      &:last-child {
        border-bottom: 0.01rem solid #c9c9c9;
      }
    }
    .keyboard__item {
      flex: 1;
      box-shadow: none;
      + .keyboard__item {
        border-left: 0.01rem solid #c9c9c9;
      }
    }
  }

  .keyboard__en {
    height: 4.09rem;
    width: calc(100vw - 0.16rem);
    padding-top: 0.19rem;
    padding-left: 0.08rem;
    padding-right: 0.08rem;
    background: #D2D3D7;
    font-size: 0.42rem;
    .keyboard__row {
      align-items: flex-start;
    }
  }
  .keyboard__item--en {
    width: 0.62rem;
    height: 0.84rem;
    background: #ffffff;
    border-radius: 0.08rem;
    + .keyboard__item--en {
      margin: 0 0 0 0.12rem;
    }
  }

  .keyboard__item {
    box-shadow: 0 0.02rem 0 0 #888888;
    &:active {
      background-color: #bfbfbf;
    }
  }

  .keyboard__item--special {
    width: 0.83rem;
    height: 0.84rem;
    background-color: #ACB0BC;
    border-radius: 0.08rem;
  }
  .hide-icon {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAABgCAMAAACwq3V1AAAAAXNSR0IArs4c6QAAAPBQTFRFAAAAAAAAQEBAMzMzJCQkOTk5MzMzLi4uOzs7MDAwLS0tOTk5Li4uNTU1Ly8vMDAwNTU1MzMzNDQ0MzMzNDQ0NDQ0NDQ0MzMzMjIyMjIyMjIyMjIyMjIyNDQ0MzMzMzMzMjIyNDQ0MzMzMjIyMzMzMjIyMzMzNDQ0MzMzMzMzNDQ0MzMzMjIyMzMzNDQ0MzMzMzMzNDQ0MzMzMzMzMzMzNDQ0MjIyNDQ0MzMzMzMzMzMzMjIyMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzZJpFSwAAAE90Uk5TAAIEBQcJCgsNEBESFhgbIDA8QFBTVFlaW2BhZWZnaGlrbG9wcnV4e3x+gIOEiIqLkJSapbCytre5vr/AwsPE0NLV4OLj5Obp6uvs7vDy/ZrX9GgAAAHpSURBVGje7dhZUxpBGIXhVxEwbqjjiBgjIhFJFOOeaFzHuKDR8///TS7srpIUIgwfpRd9ruZUdT01Nb3MAAD5ylFTJmkeVfK4zN3IMDdzz+qajLMGEMk8EWT/SNLDznLJIMs7D5J0lWVJkk7GMcr4iSQt8UvS/RhmGbuX9JNbSVsY5oekWySpaMkWJQk3c3aJAvsGW/zbVYo9sqXutmkpsIFNxcZJV4nDmfAh2F0/IQCH7voM4MyVQwA/ardLdt8vH4Bzd50AJK6cA/hR+4ENbE/snn8BApy66wuAC1dOAfyovXAmvB87+dulAkz7EgMzvswAsS/TQMWXyVfZgl8z28CsL9WXv1sioOrLLLDtSyGwgX0fduiTSxYY9mUEyPiSAUZ8GQayvgyFo6YdO2/JzksSd5I2LdlNSXccS7rO26n5a0nHrErSQc5KzR1I0iqjTUlK6nFkkLieSFJzFBbt/1laBGhYq43n57HyaIk+rvjnPLFxaYVebky8nMHMVMEgUxlCQkJCQj5GcvXvb2Q91WfAwlPn98vTQrr77eymVTu76dVObj8qfHmN/dzfeii3V8v9rrPyQNS2btliX3z9X63a7Ldaq1qz2se1gagtbs3y3Pnm1XXb86zR8qFt7Jqr0BiICls9qP8A4kv/HdYx0voAAAAASUVORK5CYII=");
    background-position: center center;
    background-size: 0.43rem 0.48rem;
    background-repeat: no-repeat;
  }
  .delete-icon {
    background-image: url("data:image/png;base64,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");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 0.42rem 0.3rem;
  }
  .toggle-btn,
  .search-btn,
  .blank-btn {
    width: 1.74rem;
    height: 0.83rem;
    background: #ffffff;
    border-radius: 0.1rem;
  }
  .search-btn {
    background: #2e7bfd;
    color: #fff;
  }
  .blank-btn {
    width: 3.65rem;
  }

  .f-center,
  .f-between,
  .f-start {
    display: flex;
    align-items: center;
  }
  .f-center {
    justify-content: center;
  }
  .f-between {
    justify-content: space-between;
  }
  .f-start {
    justify-content: flex-start;
  }
  .fs36 {
    font-size: 0.36rem;
  }
  .fs34 {
    font-size: 0.34rem;
  }
}
</style>
