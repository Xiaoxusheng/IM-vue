<template>
  <div class="fade-in-linear">

    <span class="el-badge__contents">
       <h2 style="font-family: 宋体">在线聊天系统</h2>
    <el-color-picker v-model="color" :show-alpha="true" @change="changecolor"></el-color-picker>
    </span>
    <div ref="ond" class="actives">
      <!--  <div-->
      <!--      @mousemove="onMousemove"-->
      <!--      :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"-->
      <!--      class="movearea"-->
      <!--  >-->
      <!--</div>-->
      <!-- 左边     -->
      <div class="arrow-left">
        <Seach></Seach>
        <Friendlist></Friendlist>
      </div>
      <!-- 中间-->
      <div class="arrow-middle">
        <chatheader></chatheader>
        <div class="icon-Chats">
          <router-view></router-view>
        </div>
        <Userinput></Userinput>

      </div>
      <div class="arrow-right">
        <svg aria-hidden="true" class="#icon-nosignal">
          <use xlink:href="#icon-wifi"></use>
        </svg>
      </div>
    </div>
  </div>
</template>


<script>
import Seach from "@/views/left/seach";
import Friendlist from "@/views/left/friendlist";
import Chatheader from "@/views/middle/chatheader";
import Userinput from "@/views/middle/userinput";

export default {
  name: "home",
  components: {Userinput, Chatheader, Seach, Friendlist},
  data() {
    return {
      x: 0,
      color: "#409EFF",

    }
  },
  methods: {
    onMousemove(e) {
      this.x = e.clientX
    },
    changecolor(e) {
      console.log(e)
      this.$refs.ond.style.background = e
    }
  }
}
</script>

<style lang="less" scoped>
.fade-in-linear {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw; /* 设置宽度为屏幕宽度 */
  height: 100vh; /* 设置高度为屏幕高度 */
  background: url("/src/assets/login1.jpg") no-repeat;
  background-size: cover;

}

.fade-in-linear .el-badge__contents {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-in-linear .actives {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 60%;
  height: 80%;
  background: rgba(255, 255, 255, 0);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
  padding: 20px;


}

.fade-in-linear .actives .movearea {
  width: 100%;
  height: 10%;
  border-radius: 10px;

}

.fade-in-linear .actives .arrow-left {
  width: 30%;
  height: 100%;
  /*background: black;*/
  border-radius: 10px 0 0 10px;

}

.fade-in-linear .actives .arrow-middle {
  width: 67%;
  height: 100%;
}

.fade-in-linear .actives .arrow-middle .icon-Chats {
  border-left: #bebbbb 1px solid;
  width: 100%;
  height: 65%;
}

.fade-in-linear .actives .arrow-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
  height: 100%;
  width: 3%;
  border-radius: 0 10px 10px 0;
}

</style>