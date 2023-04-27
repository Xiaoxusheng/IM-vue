<template>
  <div id="app">
    <!--    <h1>我是app</h1>-->
    <loadings v-show="$store.state.isLoading"></loadings>

    <router-view></router-view>
    <AddFriends :title="$store.state.title" :visible="$store.state.show"></AddFriends>
  </div>
</template>

<script>
import loadings from "./components/loading"
import AddFriends from "./components/appendfriends"

export default {
  name: 'App',
  components: {
    loadings, AddFriends
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
