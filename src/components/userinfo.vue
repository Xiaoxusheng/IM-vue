<template>
  <div class="cl_hover">
    <div class="get_hover">
      <!--头部-->
      <div class="box-card-header ">
     <span class="images" @mouseleave="hideIcon" @mouseover="showIcon">
       <img :src="userinfo.data.headpicture" alt="" class="image">
        <svg v-if="showUploadIcon" aria-hidden="true" class="icon" @click="uploadImage">
          <use xlink:href="#icon-Profile"></use>
          </svg>
     </span>
        <span class="introduction">
          <ul class="left-1">
            <li>{{ userinfo.data.username }}</li>
            <li>注册时间： {{ userinfo.data.register_time }}</li>
          </ul>
        </span>
      </div>
      <!--  内容   -->
      <div class="box-card-content">
        <ul class="base-info-content-show">
          <li>
            <div class="title">基本信息</div>
          </li>
          <li>
            <div class="content-show-l">账号</div>
            <div class="content-show-l">{{ userinfo.data.account }}</div>
          </li>
          <li>
            <div class="content-show-l">用户名</div>
            <div class="content-show-l">{{ userinfo.data.username }}</div>
          </li>
          <li>
            <div class="content-show-l">邮箱</div>
            <div class="content-show-l">{{ userinfo.data.email }}</div>
          </li>
          <li>
            <div class="content-show-l">IP地址</div>
            <div class="content-show-l">{{ userinfo.ip }}</div>
          </li>
          <li>
            <div class="content-show-l">用户ID</div>
            <div class="content-show-l">{{ userinfo.data.indently }}</div>
          </li>
          <li>
            <div class="content-show-l">用户状态</div>
            <div class="content-show-l">{{ userinfo.data.use_status === 0 ? '正常' : '不正常' }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "userinfo",
  data() {
    return {
      userinfo: [],
      showUploadIcon: false
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
        console.log(res.data.data)
        this.userinfo = res.data
      } else {
      }
    },
    showIcon() {
      this.showUploadIcon = true;
    },
    hideIcon() {
      this.showUploadIcon = false;
    },
    uploadImage() {
      let input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async e => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async e => {
          this.image = e.target.result;
        }
        let fomData = new FormData()
        fomData.append("HeadPicture", file)
        const {data: res} = await this.$axios({
          method: post,
          url: "/user/SetHeadPicture",
          data: {fomData}
        })
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.msg,
          })
        }
      }
      input.click();
    }
  },
  created() {
    this.getinfo()
  }
}
</script>

<style lang="less" scoped>
.cl_hover {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw; /* 设置宽度为屏幕宽度 */
  height: 100vh; /* 设置高度为屏幕高度 */
  background: url("/src/assets/login1.jpg") no-repeat;
  background-size: cover;
  color: #000000;
}

.cl_hover .get_hover {
  width: 50%; /* 设置宽度为屏幕宽度 */
  height: 70%; /* 设置高度为屏幕高度 */
  background: rgba(255, 255, 255, 0);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

/*头部区域*/
.box-card-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 30%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}

.box-card-header .images {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 100%;
}

.box-card-header .images .image {
  position: relative;
  border-radius: 50%;
  border: 1px seashell solid;
  width: 100px;
  height: 100px;
}

.box-card-header .images .icon {
  position: absolute;
  content: " ";
  left: 28.4%;
  top: 24%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.box-card-header .introduction {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;
}

.box-card-header .introduction .left-1 {
  padding: 0;
  margin: 0;
  margin-top: 10px;
  list-style: none;
  width: 90%;
  height: 80%;
}

.box-card-header .introduction .left-1 li {
  font-size: inherit;
  padding: 10px;
}

.box-card-header .introduction .left-1:nth-child(1) {
  font-size: large;
}


/*主要内容*/
.box-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70%;
}

.box-card-content .base-info-content-show {
  width: 80%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  list-style: none;
  border-radius: 10px;
}

.box-card-content .base-info-content-show .title {
  font-size: 20px;
  font-weight: 800;
  padding: 0;
  margin: 0;
}

.box-card-content .base-info-content-show li {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;
  font-weight: inherit;
}

.box-card-content .base-info-content-show li .content-show-l {
  padding: 10px;
  font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana, Roboto, Noto, Helvetica Neue, sans-serif !important;
}


</style>