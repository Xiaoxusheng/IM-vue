<template>
  <div v-show="visible" class="add-friend-modal">
    <div class="modal-mask" @click="close"></div>
    <div class="modal-container">
      <h3 class="modal-title">{{ title }}</h3>
      <div class="modal-body">
        <form @submit.prevent=" rule">
          <div class="form-group">
            <label for="name" style="font-size: 16px">账号</label>
            <input id="name" v-model.trim="account" required type="text">
          </div>
          <div class="form-group">
            <label for="name">类型</label>
            <input id="email1" v-model="check" required type="radio" value="1">群聊
            <input id="email2" v-model="check" required type="radio" value="2">好友
          </div>
          <p class="chat-p">{{ msg }}</p>
          <div class="form-group">
            <button type="submit">发送添加好友请求</button>
            <button type="button" @click="close">取消</button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      account: '',
      check: '',
      msg: "请选择类型"
    }
  },
  //监听check
  watch: {
    check: function (newval, oldval) {
      if (newval) {
        this.msg = ""
      }
    }
  },

  methods: {
    rule() {
      if (this.check && this.account.length === 7 && /^\d+$/.test(this.account)) {
        this.submit()
      } else if (this.account.length !== 7) {
        this.msg = "账号长度为7位"
      } else if (!/^\d+$/.test(this.account)) {
        this.msg = "账号类型为数字"
      }
    },

    async submit() {
      if (this.check === "2") {
        const {data: res} = await this.$axios({
          method: "get",
          url: "/user/join",
          params: {
            account: this.account
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
      } else {
        const {data: res} = await this.$axios({
          method: "get",
          url: "/group/join",
          params: {
            room_id: this.account
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
      }
      this.check = ""
      this.account = ""
      this.close()
    },
    close() {
      this.$store.state.show = false
    }
  }
}
</script>

<style>
.add-friend-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;

}

.modal-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal-container {
  width: 500px;
  background-color: #fffdef;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 999;
}

.chat-p {
  color: red;
}

.modal-title {
  margin: 0;
  padding: 20px;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid #ccc;
}

.modal-body {
  padding: 20px;
}

.form-group {

  margin-bottom: 20px;
}


label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

input,
textarea {
  max-width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
}

.form-group button {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
}

.form-group button[type="submit"] {
  background-color: #4caf50;
  color: #fff;
}

.form-group button[type="button"] {
  background-color: #ccc;
  color: #fff;
}
</style>