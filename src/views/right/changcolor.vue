<template>
  <div class="el-icon">
    <el-color-picker v-model="color" @change="ChangeColor"></el-color-picker>
  </div>
</template>

<script>
export default {
  name: "changcolor",
  data() {
    return {
      color: "#409EFF"
    }
  },
  props: {
    background: {
      type: "string",
      required: true
    }
  },
  methods: {
    ChangeColor(e) {
      console.log(e)
      // this.$refs.ond.style.background=e
    }
  }
}
</script>

<style lang="less" scoped>
.el-icon {
  width: 100px;
  height: 100px;
}
</style>