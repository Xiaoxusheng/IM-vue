<template>
  <div id="app">
    <!--    <h1>我是app</h1>-->
    <transition>
      <router-view></router-view>
    </transition>

  </div>
</template>

<script src="../src/assets/font_kyz1xooni39/iconfont.js"></script>
<style lang="less">
#app {
  margin: 0;
  padding: 0;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;

}
</style>
