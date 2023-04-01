<template>
  <div class="el-listfrien">

    <!-- 好友列表   -->
    <!-- 你的内容 -->
    <div ref="chatContainer" class="frist">
      <div v-for="(item,index) in friends" :key="item.Indently" class="icon_lists" @click="check(index)">
          <span class="imgs">
            <el-avatar :size="size" :src="squareUrl" shape="square"></el-avatar>
          </span>
        <span>
            {{ item.userinfo.username }}
          </span>
        <span>
          </span>
      </div>
    </div>

  </div>
</template>

<script>


export default {
  name: "friendlist",
  data() {
    return {
      friends: [],
      title: "好友列表",
    }
  },
  methods: {
    async getuserinfo() {
      const {data: res} = await this.$axios({
        method: "get",
        url: "/user/friend_list"
      })
      console.log(res)
      if (res.code === 200) {
        this.friends = res.data.data
      }
    },
    check(e) {
      this.$store.commit('getUsername', (this.friends[e]))
      this.$router.push({
        name: "home",
        params: {
          username: e
        }
      })
    },
  },
  created() {
    this.getuserinfo()
  }
}

</script>

<style lang="less" scoped>

/*!* 滑动条轨道 *!*/
/*::-webkit-scrollbar { width: 10px; height: 10px; background-color: #F5F5F5; }*/

/*!*!* 滑动条滑块 *!*!*/
/*!*.scrollbar-vertical::-webkit-scrollbar-thumb {*!*/
/*!*  background-color: #888;*!*/
/*!*  border-radius: 5px;*!*/
/*!*}*!*/

/*!*!* 滑动条按钮（上下箭头） *!*!*/
/*!*.scrollbar-vertical::-webkit-scrollbar-button {*!*/
/*!*  display: none;*!*/
/*!*}*!*/

.el-listfrien {
  display: flex;
  justify-content: center;
  align-content: flex-start;
  flex-wrap: wrap;
  min-width: 100%;
  height: 95%;
  color: #606266;
}

.el-listfrien h5 {
  padding: 0;
  margin: 0;
  height: 5%;
}

::-webkit-scrollbar {
  width: 5px;
  height: 10px;
  background-color: #F5F5F5;
}

.el-listfrien .frist {
  /*overflow-x:hidden ;*/
  /*border-radius: 10px;*/
  backdrop-filter: blur(1px);
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

.el-listfrien .frist .icon_lists {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 10%;
  /*width: 100% !important;*/
  background-color: #fff;
  list-style: none;
}

.el-listfrien .frist .icon_lists .imgs {
  width: 130px;
  height: 40px;
}

.el-listfrien .frist .icon_lists span {
  display: flex;
  justify-content: flex-start;
  padding: 5px;
  /*padding-right: 0;*/
  /*padding-bottom: 0;*/
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 16px;
  /*font-family: "sans-serif";*/
}

</style>