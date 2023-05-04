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
          <el-dropdown-item v-if="$store.state.user&&$store.state.user.room_type==='private'" command="Friends">好友信息
          </el-dropdown-item>
          <!--      退出    -->
          <el-dropdown-item v-if="$store.state.user&&$store.state.user.room_type==='private'" command="delete">删除好友
          </el-dropdown-item>
          <el-dropdown-item v-else-if="$store.state.user&&$store.state.user.room_type==='group'" command="delete">退出群聊
          </el-dropdown-item>
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
      online: false,
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
          break
        case "SetPicture":
          this.$router.push("/userinfo")
          break
        case "Friends":
          this.$router.push("/friends")
          break;
        case "delete":
          this.delete()
          break;
      }


    },
    open() {
      this.$store.state.show = true
      this.$store.state.title = "添加好友"
    },
    async delete() {
      let title = this.$store.state.user.room_type === 'private' ? '删除好友' : '退出群聊'
      this.$confirm(`${title}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const code = await this.deleteaccount()
        console.log(code)
        if (code) {
          this.$message.success("删除成功")
        } else {
          this.$message.warning("删除失败")
        }

      }).catch((e) => {
        console.log(e)
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    updated() {
      if (this.$store.state.user !== "") {
        this.getonline()
      }
    },
    async deleteaccount() {
      console.log(this.$store.state.user)
      if (this.$store.state.user && this.$store.state.user.room_type === 'private') {
        const {data: res} = await this.$axios({
          method: "get",
          url: "/user/delete",
          params: {
            account: this.$store.state.user.userinfo.account
          }
        })
        return res.code === 200;

      } else {
        console.log(this.$store.state.user.roomidently)
        const {data: res} = await this.$axios({
          method: "get",
          url: "/group/exit",
          params: {
            account: this.$store.state.user.roomidently
          }
        })
        return res.code === 200;
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