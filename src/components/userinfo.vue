<template>
  <div class="cl_hover">
    <div class="get_hover">

    </div>
  </div>
</template>

<script>
export default {
  name: "userinfo"
}
</script>

<style lang="less" scoped>
.cl_hover {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw; /* 设置宽度为屏幕宽度 */
  height: 100vh; /* 设置高度为屏幕高度 */
  background: url("/src/assets/login1.jpg") no-repeat;
  background-size: cover;
  color: #000000;
}

.cl_hover .get_hover {
  width: 50%; /* 设置宽度为屏幕宽度 */
  height: 50%; /* 设置高度为屏幕高度 */
  background: rgba(255, 255, 255, 0);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>