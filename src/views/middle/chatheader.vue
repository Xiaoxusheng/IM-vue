<template>
  <div class="chat-header">
    <div class="username">
      <h5>
        {{ this.$store.state.user === "" ? this.$store.state.username : this.$store.state.user.userinfo.username }}</h5>
      <div v-show="this.online">
        <svg aria-hidden="true" class="icon">
          <use xlink:href="#icon-zaixianzhuangtai"></use>
        </svg>
      </div>
    </div>

    <div class="icon-pictur">
      <el-dropdown placement="top" trigger="hover" @command="handleCommand">
        <svg aria-hidden="true" class="icon">
          <use xlink:href="#icon-MoreSquare"></use>
        </svg>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="SetPicture">设置头像</el-dropdown-item>
          <el-dropdown-item command="a">狮子头</el-dropdown-item>
          <el-dropdown-item command="a">螺蛳粉</el-dropdown-item>
          <el-dropdown-item command="a">双皮奶</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>

  </div>
</template>

<script>


export default {
  name: "chatheader",
  data() {
    return {
      username: "小米",
      online: false
    }
  },
  methods: {
    async getonline() {
      const {data: res} = await this.$axios({
        method: "get",
        url: "/user/online",
        params: {
          account: this.$store.state.user.userinfo.account
        }
      })
      this.online = !!res.status;
    },
    handleCommand(e) {
      console.log(e)
      if (e === "SetPicture") {
        this.$router.push("/userinfo")
      }
    }
  },
  updated() {
    if (this.$store.state.user !== "") {
      this.getonline()
    }
  }

}
</script>

<style scoped>

.chat-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 10%;
  /*background-color: #222;*/
  color: #333333;
  border-bottom: #bebbbb 1px solid;
}

.chat-header .username {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /*font-size: 18px;*/
  padding: 20px;
  width: 90%;
  font-size: larger;
}

.chat-header .username h5 {
  font-size: larger;
}

.chat-header .username .icon {
  margin-left: 20px;
  height: 10px;
  width: 10px;
}

.chat-header .icon-pictur {
  display: flex;
  justify-content: center;
  align-items: center;

}

.chat-header .icon-pictur .icon {
  height: 30px;
  width: 30px;
}

</style>