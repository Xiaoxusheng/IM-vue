<template>
  <div class="user-input">
    <div class="change-list">
    <span class="icon_1">
       <el-tooltip class="item" content=" 发送图片" effect="dark" placement="top-start">
        <svg aria-hidden="true" class="icon" @click="setimg">
        <use xlink:href="#icon-Plus"></use>
        </svg>
    </el-tooltip>
    </span>
      <span class="icon_1">
      <svg aria-hidden="true" class="icon">
      <use xlink:href="#icon-biaoqingbao"></use>
      </svg></span>
      <span class="icon_1">
      <svg aria-hidden="true" class="icon">
      <use xlink:href="#icon-Plus"></use>
      </svg></span>
      <span class="icon_1"></span>
    </div>
    <div id="input-component" class="poper-input">
      <from>
        <input ref="inputs" v-model="message" autofocus name="输入框" type="text" @keydown.enter="sendmessage"></input>
      </from>
    </div>
    <div class="builtins">
      <button @click="sendmessage">发送</button>
    </div>

  </div>
</template>

<script>


export default {
  name: "input",
  data() {
    return {
      message: "",
      ws: "",
    }
  },
  methods: {
    sendmessage() {
      if (this.ws.readyState === 1 || this.$store.state.ws.readyState === 1) {
        console.log(this.$store.state.user.room_id,)
        if (!this.$store.state.user.room_id) {
          this.$message({
            type: "error",
            message: "选择好友！"
          })
          return
        }
        //发送消息
        if (this.ws.readyState === 1) {
          this.ws.send(JSON.stringify({
            "idently": localStorage.getItem("indently"),
            "room_idently": this.$store.state.user.room_id,
            "message": this.message,
            "room_type": this.$store.state.user.room_type,
            "message_type": "text",
            "message_time": new Date().toLocaleString()
          }))
          this.$store.commit("changsend", true)
        }
        console.log(this.ws.readyState === undefined)
        if (this.ws.readyState === undefined && this.$store.state.ws.readyState === 1) {
          this.$store.state.ws.send(JSON.stringify({
            "idently": localStorage.getItem("indently"),
            "room_idently": this.$store.state.user.room_id,
            "message": this.message,
            "room_type": this.$store.state.user.room_type,
            "message_type": "text",
            "message_time": new Date().toLocaleString()
          }))
          this.$store.commit("changsend", true)
        }
        this.message = ""
      } else {
        this.$notify({
          type: "error",
          message: "连接失败！重新连接！",
          title: "失败"
        })
      }
    },
    connect() {
      // 创建ws
      this.ws = new WebSocket('ws://127.0.0.1:8080/user/websocket?token=' + `${localStorage.getItem("token")}`);
      this.$store.commit("getws", this.ws)
      this.ws.onopen = () => {
        console.log('WebSocket连接成功');
        this.$notify({
          title: '成功',
          message: '连接成功',
          type: 'success',
          count: 0
        });
      }
      this.ws.onerror = (event) => {
        console.log(event);
      }
      this.ws.onmessage = (event) => {
        if (event.data) {
          this.$store.commit("getMessage", JSON.parse(event.data))
          console.log(event.data)
        }

      };
      this.ws.onclose = (event => {
        this.count++;
        //重连超过3次，返回
        if (this.count > 3) {
          return
        }
        setTimeout(this.connect, 10000); // 1秒后重连
        console.log("close");
      })
    },
    //发送图片
    setimg() {
      if (!this.$store.state.user.room_id) {
        this.$message({
          type: "error",
          message: "选择好友！"
        })
        return
      }
      const input = document.createElement('input');
      input.type = 'file';
      input.style.display = 'none';
      input.addEventListener('change', async () => {
        const file = input.files[0];
        const fileName = file.name; // 获取文件名
        const fileExtension = fileName.split('.').pop(); // 获取文件后缀
        const picturtypes = ["jpg", "png", "jpeg", "PNG", "JPG", "JPEG",]

        if (file) {
          let Picturename = ""
          for (let i = 0; i < 6; i++) {
            Picturename += Math.floor(Math.random() * 10)
          }
          const formData = new FormData();
          formData.append('file', file, Picturename + "." + fileExtension);
          // 使用axios或fetch等库发送文件上传请求
          const {data: res} = await this.$axios({
            method: "post",
            url: "/user/file",
            data: formData,
          })
          console.log(res.code)
          console.log('文件上传成功');
          if (res.code === 200) {
            if (this.ws.readyState === 1) {
              this.ws.send(JSON.stringify({
                "idently": localStorage.getItem("indently"),
                "room_idently": this.$store.state.user.room_id,
                "message": res.url,
                "room_type": this.$store.state.user.room_type,
                "message_type": picturtypes.includes(fileExtension) ? "picture" : "video"
              }))
              this.$store.commit("changsend", true)
            }
            if (this.ws.readyState === undefined && this.$store.state.ws.readyState === 1) {
              this.$store.state.ws.send(JSON.stringify({
                "idently": localStorage.getItem("indently"),
                "room_idently": this.$store.state.user.room_id,
                "message": res.url,
                "room_type": this.$store.state.user.room_type,
                "message_type": picturtypes.includes(fileExtension) ? "picture" : "video"
              }))
              this.$store.commit("changsend", true)
            }
          }
        }
      });
      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);

    },

  },
  mounted() {
    console.log(this.$store.state.ws.readyState)
    if (this.$store.state.ws.readyState === 1) {
      return
    }
    this.connect()
  },
}
</script>

<style lang="less" scoped>
.user-input {
  width: 100%;
  height: 25%;

}

.user-input .change-list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 20%;
  background-color: #F3E9E9F4;
}

.user-input .change-list .icon_1 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 30px;
}

.user-input .change-list .icon_1 .icon {
  height: 30px;
  width: 30px;
}

.user-input .poper-input {
  width: 100%;
  height: 60%;
}

.user-input .poper-input input {
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 10px;
  font-size: 18px;
  box-sizing: border-box;
  text-align: left;
  background: rgba(255, 255, 255, 0);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
}

.user-input .builtins {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 17%;

}

.user-input .builtins button {
  width: 65px;
  height: 100%;
  border: 0;
  background: rgba(255, 255, 255, 0);
  /*border-radius: 10px;*/
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);

}

</style>