<template>
  <div ref="scrollWrapper" class="ws" @scroll="scroll">
    <div v-for="(item,index) in this.$store.state.message" :key="index">
      <!-- 自己-->
      <ul v-if="item.on && item.room_idently===$store.state.user.room_id" class="icon—myself">
        <li>{{ item.message }}</li>
        <li>
          <el-avatar :size="50" :src="squareUrl" shape="square"></el-avatar>
        </li>
      </ul>

      <ul v-if="item.idently===$store.state.user.userinfo.indently" class="icon—other">
        <li>
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
        </li>
        <li>{{ item.message }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "chat",
  data() {
    return {}
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
    },
    async getMessage() {
      const {data: res} = await this.$axios({
        method: "get",
        url: "/user/get_message",
        params: {
          room_id: this.$store.state.user.room_id
        }
      })
      console.log(res)
    },
    scroll(event) {
      const el = event.target;
      console.log(el)
      if (this.$refs.scrollWrapper.scrollTop === 0) {
        this.getMessage()
      }
      console.log(this.$refs.scrollWrapper.scrollTop)
    }

  },
  mounted() {
    const indently = localStorage.getItem("indently")
    if (!indently) {
      this.getinfo()
    }
  },
  updated() {
    this.$nextTick(() => {
      // 将消息列表滚动到最底部
      this.$refs.scrollWrapper.scrollTop = this.$refs.scrollWrapper.scrollHeight;
    });

  }

}

</script>

<style lang="less" scoped>
.ws {
  border: 0;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
}

::-webkit-scrollbar {
  width: 5px;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
}

.ws .icon—myself {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  min-height: 10%;
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