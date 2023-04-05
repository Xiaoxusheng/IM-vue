<template>
  <div v-if="show" class="glass-notification">
    <div :style="wrapperStyle" class="glass-notification__wrapper">
      <div class="glass-notification__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null // 记录弹窗显示的时间
    }
  },

  props: {
    show: {
      type: Boolean,
      default: false
    },
    opacity: {
      type: Number,
      default: 0.8
    },
    blur: {
      type: String,
      default: "5px"
    },
    backgroundColor: {
      type: String,
      default: "rgba(255, 255, 255, 0.5)"
    },
    textColor: {
      type: String,
      default: "#333"
    },
    borderRadius: {
      type: String,
      default: "10px"
    }
  },
  computed: {
    wrapperStyle() {
      return {
        opacity: this.opacity,
        backdropFilter: `blur(${this.blur})`,
        backgroundColor: this.backgroundColor,
        color: this.textColor,
        borderRadius: this.borderRadius
      };
    }
  },
  mounted() {
    this.timer = setTimeout(() => {
      this.show = false; // 2秒后隐藏弹窗
    }, 2000);
    clearTimeout(this.timer)
  },
};
</script>

<style lang="less" scoped>
.glass-notification {
  position: fixed;
  top: 200px;
  left: 45%;
  width: 400px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  z-index: 999;

}

.glass-notification__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 30px;
  border-radius: 10px;
  padding: 20px;
  z-index: 999;
}

.glass-notification__content {
  font-size: 18px;
  font-weight: bolder;
  line-height: 1.5;
  z-index: 999;

}


</style>