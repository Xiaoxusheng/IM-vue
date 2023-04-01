<template>
  <div class="ws">
    <p>{{ this.$store.state.message }}</p>
    <div v-for="(item,index) in this.$store.state.message" :key="index">
      <!-- 自己-->
      <ul v-if="item.on" class="icon—myself">
        <li>{{ item.message }}</li>
        <li>
          <el-avatar :size="50" :src="squareUrl" shape="square"></el-avatar>
        </li>
      </ul>
      <!--其他人-->
      <ul v-else class="icon—other">
        <li>
          <el-avatar :size="size" :src="circleUrl"></el-avatar>
        </li>
        <li>{{ item.message }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "chat",
  // components: {HappyScroll} ,//在组件内注册,
  data() {
    return {
      socket: ""
    }
  },
  methods: {
    async getinfo() {
      const {data: res} = await this.$axios({
        method: "get",
        url: "/user/userinfo "
      })
      console.log(res)
      if (res.code === 200) {
        this.$store.commit("getinfo", (res.data))
        localStorage.setItem("indently", res.data.data.indently)
      } else {
      }
    }

  },
  mounted() {
    const indently = localStorage.getItem("indently")
    if (!indently) {
      this.getinfo()
    }
  },

  computed: {
    reverseMessage() {
      return this.$store.state.message.forEach((i, v) => {
        console.log(i.idently === localStorage.getItem("indently"))
        return i.indently === localStorage.getItem("indently")
      })

      // console.log(this.$store.state.message[0].idently,localStorage.getItem("indently"))
      //  return this.$store.state.message[0].idently===localStorage.getItem("indently")
    },
  },


}

</script>

<style lang="less" scoped>
.ws {
  overflow-y: scroll;
  height: 65%;
  width: 100%;
  background-color: pink;
}

::-webkit-scrollbar {
  width: 5px;
  height: 10px;
  background-color: #F5F5F5;
}

.ws .icon—myself {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  min-height: 10%;
  background-color: #fff;
  list-style: none;

}

.ws .icon—myself li {
  height: 100%;
  padding: 20px;
  width: auto;
}

.ws .icon—myself li:nth-child(1) {
  background-color: #333;
  color: #fffdef;
  border-radius: 25px;
}

.ws .icon—other {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 10%;
  background-color: #fff;
  list-style: none;

}

.ws .icon—other li {
  height: 100%;
  padding: 20px;
  width: auto;
}

.ws .icon—other li:nth-child(2) {
  background-color: #333;
  color: #fffdef;
  border-radius: 25px;
}
</style>