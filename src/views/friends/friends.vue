<template>
  <div class="im-friends">
    <div class="im-friends-line">
      <!--    头部-->
      <div class="im-friend-header">
      <span class="im-friends-img">
        <img :src="userinfo.userinfo.headpicture" alt="" class="image">
      </span>
        <span class="introduction">
          <ul class="left-1">
            <li>{{ userinfo.userinfo.username }}</li>
            <li>注册时间： {{ userinfo.userinfo.register_time }}</li>
          </ul>
      </span>
      </div>
      <div class="body">
        <ul class="base-info-content-show">
          <li>
            <div class="title">基本信息</div>
          </li>
          <li>
            <div class="content-show-l">账号</div>
            <div class="content-show-l">{{ userinfo.userinfo.account }}</div>
          </li>
          <li>
            <div class="content-show-l">用户名</div>
            <div class="content-show-l">{{ userinfo.userinfo.username }}</div>
          </li>
          <li>
            <div class="content-show-l">邮箱</div>
            <div class="content-show-l">{{ userinfo.userinfo.email }}</div>
          </li>
          <li>
            <div class="content-show-l">IP属地</div>
            <div class="content-show-l">湖北</div>
          </li>
          <li>
            <div class="content-show-l">用户状态</div>
            <div class="content-show-l">{{ userinfo.userinfo.use_status === 0 ? '正常' : '不正常' }}</div>
          </li>
          <li>
            <div class="content-show-l">注册时长</div>
            <div class="content-show-l">{{ time }}</div>
          </li>
        </ul>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "friends",
  data() {
    return {
      userinfo: [],
      time: 0
    }
  },
  mounted() {
    this.userinfo = this.$store.state.user
    this.time = Math.floor(((new Date() - new Date("2023-03-12 19:07:16").getTime()) / 1000 / 60 / 60 / 24)) + "天"
    // console.log((Math.floor((new Date() - new Date("2023-03-12 19:07:16").getTime())/1000/60/60/24)))
  }
}
</script>

<style lang="less" scoped>
.im-friends {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw; /* 设置宽度为屏幕宽度 */
  height: 100vh; /* 设置高度为屏幕高度 */
  background: url("/src/assets/login1.jpg") no-repeat;
  background-size: cover;
  color: #000000;
}

.im-friends .im-friends-line {
  width: 50%; /* 设置宽度为屏幕宽度 */
  height: 70%; /* 设置高度为屏幕高度 */
  background: rgba(255, 255, 255, 0);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.im-friends-line .im-friend-header {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: flex-start;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}

.im-friends-line .im-friend-header .im-friends-img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 100%;
}

.im-friends-line .im-friend-header .im-friends-img .image {
  position: relative;
  border-radius: 50%;
  border: 1px seashell solid;
  width: 100px;
  height: 100px;
}

.im-friends-line .im-friend-header .introduction {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 100%;
}

.im-friends-line .im-friend-header .introduction .left-1 {
  padding: 0;
  margin: 0;
  margin-top: 10px;
  list-style: none;
  width: 90%;
  height: 70%;
}

.im-friends-line .im-friend-header .introduction .left-1 li {
  padding: 5px;
}

.body {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70%;
}

.body .base-info-content-show {
  width: 80%;
  height: 90%;
  background: rgba(255, 255, 255, 0.5);
  list-style: none;
  border-radius: 10px;
}

.body .base-info-content-show .title {
  font-size: 20px;
  font-weight: 800;
  padding: 0;
  margin: 0;
}

.body .base-info-content-show li {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;
  font-weight: inherit;
}

.body .base-info-content-show li .content-show-l {
  padding: 10px;
  font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana, Roboto, Noto, Helvetica Neue, sans-serif !important;
}

</style>