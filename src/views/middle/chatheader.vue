<template>
  <div class="chat-header">
    <div class="username">
      <h5 v-if="this.$store.state.user.room_type==='private'">
        {{ this.$store.state.user === "" ? this.$store.state.username : this.$store.state.user.userinfo.username }}</h5>
      <h5 v-else>{{ this.$store.state.user === "" ? this.$store.state.username : this.$store.state.user.info }}</h5>
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
          <el-dropdown-item command="SetPicture">个人资料</el-dropdown-item>
          <el-dropdown-item command="AddFriends">添加好友</el-dropdown-item>
          <el-dropdown-item v-if="$store.state.user" command="Friends">好友信息</el-dropdown-item>
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
      switch (e) {
        case "AddFriends":
          this.open()
          // this.$router.push("/appendfriends")
          break
        case "SetPicture":
          this.$router.push("/userinfo")
          break
        case "Friends":
          this.$router.push("/friends")

      }


    },
    open() {
      this.$prompt('输入账号', '添加好友', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d{10}$/,
        inputErrorMessage: '格式不正确'
      }).then(async ({value}) => {
        const {data: res} = await this.$axios({
          method: "get",
          url: "/user/join",
          params: {
            account: value
          }
        })
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "添加成功！"
          });
        } else {
          this.$message.warning({message: res.msg});
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    updated() {
      if (this.$store.state.user !== "") {
        this.getonline()
      }
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