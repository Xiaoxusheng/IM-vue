<template>
  <div ref="scrollWrapper" class="ws" @scroll="scroll" @wheel="handleWheel">
    <div v-for="(item,index) in this.$store.state.message" :id="item.message_id" :key="item.message_id" ref="li">
<!--      <p>{{ item.id }}</p>-->
      <!-- 自己-->
      <ul v-if="item.on && item.room_idently===$store.state.user.room_id" class="icon—myself"
          @click="check(item.message_id)">
        <li v-if="item.message_type==='picture'" class="chat-img"><img :src="item.message" alt=""></li>
        <li v-else-if="item.message_type==='video'" class="chat-video">
          <video controls>
            <source src="" type="video/webm">
          </video>
        </li>
        <li v-else>{{ item.message }}</li>
        <li>
          <el-avatar :src="$store.state.myinfo" shape="square"></el-avatar>
        </li>
      </ul>
      <!--其他人-->
      <ul v-if="item.idently===$store.state.user.userinfo.indently" class="icon—other">
        <li>
          <el-avatar :size="50" :src="$store.state.user.userinfo.headpicture"></el-avatar>
        </li>
        <li v-if="item.message_type==='picture'" class="chat-img"><img :src="item.message" alt="图片"></li>
        <li v-else-if="item.message_type==='video'" class="chat-video">
          <video controls>
            <source src="" type="video/webm">
          </video>
        </li>
        <li v-else>{{ item.message }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "chat",
  data() {
    return {
      scolltop: 0,
      lastViewedMessageId: null
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

        // this.$store.commit("getinfo", (res.data.data))
        localStorage.setItem("indently", res.data.data.indently)
        localStorage.setItem("headpicture", res.data.data.headpicture)
      } else {
      }
    },
    //获取聊天信息
    async getMessage() {
      if (!this.$store.state.user.room_id) {
        return
      }
      const {data: res} = await this.$axios({
        method: "get",
        url: "/user/get_message",
        params: {
          room_id: this.$store.state.user.room_id,
          pageSize: this.$store.state.count
        }
      })
      //反转
      res.data.data.reverse()
      if (res.code === 200) {
        console.log(res.data.data)
        if (res.data.data.length === 0) {
          this.$store.state.alltop = true
          setTimeout(() => {
            this.$message({
              type: "warning",
              message: "没有更多聊天记录！"
            })
          }, 500)
          return
        }
        this.$store.commit("addMessage", res.data.data)
      }
    },
    scroll(event) {
      const el = event.target;
      // console.log(this.$refs.scrollWrapper.scrollTop,this.$refs.scrollWrapper.scrollHeight)
      //处于顶部
    },
    handleWheel(e) {
      if (e.deltaY < 0 && this.$refs.scrollWrapper.scrollTop === 0) {
        if (this.$store.state.alltop) {
          return
        }
        console.log('鼠标向上滑动')
        this.getMessage()
        this.$store.commit("getcount")
      }
    },
    check(e) {
      console.log(e)
    }
  },
  mounted() {
    const indently = localStorage.getItem("indently")
    if (!indently) {
      this.getinfo()
    }
    if (!localStorage.getItem("scrollHeight")) {
      localStorage.setItem("scrollHeight", 0)
    }
  },
  updated() {
    this.$nextTick(() => {
      if (this.$store.state.send) {
        // 将消息列表滚动到最底部
        this.$refs.scrollWrapper.scrollTop = this.$refs.scrollWrapper.scrollHeight;
      } else {
        console.log(this.$refs.scrollWrapper.scrollHeight, JSON.parse(localStorage.getItem("scrollHeight")))
        this.$refs.scrollWrapper.scrollTop = this.$refs.scrollWrapper.scrollHeight - JSON.parse(localStorage.getItem("scrollHeight"))
        localStorage.setItem("scrollHeight", this.$refs.scrollWrapper.scrollHeight)
      }
    });

  },
  beforeDestroy() {
    localStorage.setItem("scrollHeight", 0)
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
  background: url("/src/assets/login1.jpg") no-repeat;
  background-size: cover;
}

::-webkit-scrollbar {
  width: 5px;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background-color: #fff;

}

.ws .icon—myself {
  padding: 0;
  margin: 0;
  margin-top: 10px;
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

.ws .icon—myself .chat-img {
  /*padding: 20px;*/
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15vw;
  max-width: 20vm;
  height: 20vh;
  max-height: 30vh;
  border-radius: 10px;
  border: #333333 1px solid;
}

.ws .icon—myself .chat-img img {
  width: 100%;
  height: 100%;
  padding: 0;
  object-fit: cover;
}

.ws .icon—myself .chat-video {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20vw;
  max-width: 20vm;
  height: 20vh;
  max-height: 30vh;
  border-radius: 10px;
  border: #333333 1px solid;
}

.ws .icon—myself .chat-video video {
  width: 20vw;
  max-width: 20vm;
  height: 20vh;
  max-height: 30vh;
  padding: 0;
}

.ws .icon—myself li:nth-child(1) {
  background-color: #fc8c04;
  color: #fffdef;
  padding: 10px;
  min-height: 20px;
  min-width: 40px;
  border-radius: 10px;
}

.ws .icon—other {
  margin: 0;
  margin-top: 10px;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 10%;
  list-style: none;

}

.ws .icon—other li {
  height: 100%;
  padding: 20px;
  width: auto;
}

.ws .icon—other .chat-img {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 15vw;
  height: 20vh;
  border-radius: 10px;
  border: #333333 1px solid;
}

.ws .icon—other .chat-img img {
  max-width: 100%;
  height: 100%;
  object-fit: cover;
}


.ws .icon—other .chat-video {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20vw;
  max-width: 20vm;
  height: 20vh;
  max-height: 30vh;
  border-radius: 10px;
  border: #333333 1px solid;
}

.ws .icon—other .chat-video video {
  width: 20vw;
  max-width: 20vm;
  height: 20vh;
  max-height: 30vh;
  padding: 0;
}

.ws .icon—other li:nth-child(2) {
  background-color: #fc8c04;
  min-height: 20px;
  min-width: 40px;
  color: #fffdef;
  border-radius: 10px;
  padding: 10px;
}
</style>