<template>
  <div id="app">
    <!--    <h1>我是app</h1>-->
    <loadings v-show="$store.state.isLoading"></loadings>
    <message :show="$store.state.title.show" backgroundColor="#fff" textColor="#333">{{ $store.state.title.message }}
    </message>
    <router-view></router-view>

  </div>
</template>

<!--<script src="../src/assets/font_sl3lmg4aoba/iconfont.js"></script>-->
<script>
import loadings from "./components/loading"
import message from "./components/message";

export default {
  name: 'App',
  components: {
    loadings,
    message
  },
  data() {
    return {}
  }
}
</script>

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
