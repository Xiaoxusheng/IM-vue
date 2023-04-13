<template>
  <div class="caret-add">
    <div class="card-add">
      111
    </div>
  </div>
</template>

<script>
export default {
  name: "appendfriends",
  data() {
    return {}
  }
}
</script>

<style scoped>
.caret-add {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw; /* 设置宽度为屏幕宽度 */
  height: 100vh; /* 设置高度为屏幕高度 */
  background: url("/src/assets/login1.jpg") no-repeat;
  background-size: cover;
  color: #000000;
}

.caret-add .card-add {
  width: 50%; /* 设置宽度为屏幕宽度 */
  height: 70%; /* 设置高度为屏幕高度 */
  background: rgba(255, 255, 255, 0);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>