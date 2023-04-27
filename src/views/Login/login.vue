<template>
  <div class="el-icon">

    <div class="active">
      <h2 style="font-family: 宋体">在线聊天系统</h2>
      <el-form ref="ruleForm" :label-position="labelPosition" :model="ruleForm" :rules="rules" class="demo-ruleForm"
               label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" label="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item v-show=" this.radio==='1' " label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" label="邮箱" type="text"></el-input>
        </el-form-item>
        <el-form-item v-show=" this.radio!=='1' " label="验证码" prop="code">
          <el-input v-model="ruleForm.code" label="" type="text"></el-input>
        </el-form-item>

      </el-form>

      <div class="demo-ruleForm">
        <el-checkbox v-show=" this.radio!=='1' " v-model="remember">记住密码</el-checkbox>
        <el-radio v-model="radio" label="0">登录</el-radio>
        <el-radio v-model="radio" label="1">注册</el-radio>
        <el-button v-if=" this.radio==='1' " @click="resiger">注册</el-button>
        <el-button v-else @click="login">登录</el-button>
        <el-button v-show="this.radio!=='1' " @click="getcode">{{ title }}</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import qs from "qs"

export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        username: "",
        email: "",
        password: "",
        code: ""
      },
      labelPosition: "left",
      radio: "0",
      remember: false,
      title: "获取验证码",
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 8, message: '长度在 3 到 8 ', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, max: 10, message: '长度在 6 到 10 ', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
        ]
      }
    }
  },
  watch: {
    radio: function (newvalue, oldvalue) {
      this.ruleForm.username = ""
      this.ruleForm.password = ""

    }
  },
  methods: {
    async login() {
      if (this.ruleForm.username === "" && this.ruleForm.password === "") {
        // this.$message("用户名，密码不能为空");
        this.$message({
          message: "用户名，密码不能为空！",
          type: 'warning'
        });
        return
      }
      const {data: res} = await this.$axios({
        method: "post",
        url: "/user/login",
        data: qs.stringify({
          username: this.ruleForm.username,
          password: this.ruleForm.password,
          code: this.ruleForm.code
        })
      })
      if (res.code === 200) {
        localStorage.setItem("token", res.token)
        // 登录成功后根据是否记住密码保存信息到localStorage或者cookie中
        this.$message({
          message: res.msg,
          type: 'success'
        });
        if (this.remember) {
          localStorage.setItem('remember', 'true')
          localStorage.setItem('username', this.ruleForm.username)
          localStorage.setItem('password', this.ruleForm.password)
        } else {
          localStorage.removeItem('remember')
          localStorage.removeItem('username')
          localStorage.removeItem('password')
        }
        this.$router.replace("/home/chat/0")
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        });
      }
    },
    async resiger() {
      const {data: res} = await this.$axios({
        method: "post",
        url: "/user/register",
        data: qs.stringify({
          username: this.ruleForm.username,
          password: this.ruleForm.password,
          email: this.ruleForm.email
        })
      })
      if (res.code === 200) {
        this.$message({
          message: res.msg,
          type: 'success'
        });
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        });
      }
    },
    async getcode() {
      if (this.ruleForm.username === "" && this.ruleForm.password === "") {
        // this.$message("用户名，密码不能为空");
        this.$message({
          message: "用户名，密码不能为空！",
          type: 'warning'
        });
        return
      }
      const {data: res} = await this.$axios({
        method: "get",
        url: "/user/send_code",
        params: {
          username: this.ruleForm.username,
        }
      })
      if (res.code === 1) {
        this.$message.warning(res.msg)
        return
      }
      this.title = 60
      const tim = window.setInterval(() => {
        if (this.title > 0) {
          this.title--
        } else {
          this.title = "重新获取验证码"
          window.clearInterval(tim)
        }
      }, 1000)

    },
  },
  updated() {
    // console.log(this.radio)
  },
  mounted() {
    // 页面加载时从localStorage或者cookie中读取记住密码信息
    const remembers = localStorage.getItem('remember')
    if (remembers) {
      this.remember = true
      this.ruleForm.username = localStorage.getItem('username')
      this.ruleForm.password = localStorage.getItem('password')
    } else {
      this.ruleForm.username = ""
      this.ruleForm.password = ""
    }
  }
}
</script>

<style lang="less" scoped>
.el-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw; /* 设置宽度为屏幕宽度 */
  height: 100vh; /* 设置高度为屏幕高度 */
  background: url("/src/assets/login1.jpg") no-repeat;
  background-size: cover;
  color: #000000;
}

.el-icon .active {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 40%;
  background: rgba(255, 255, 255, 0);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  padding: 20px;
  margin-right: 40%;
  transition: all 0.3s ease;
}

.el-icon .active:hover {
  background: rgba(255, 255, 255, 0);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  transform: translatex(200px);
}

.el-icon .active .demo-ruleForm {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  color: #000000;
  width: 100%;
  height: 40%;
}

.el-icon .active .arrow {
  height: 11%;
}

</style>