<template>
  <div class="icon-Searchs">
    <div class="grid-content ">
      <input v-model="input" type="text" @input="querySearchAsync">
    </div>
    <div class="grid-content ">
      <button class="el-buttons" @click="querySearchAsync">搜索</button>
    </div>
    <!--      <el-col :span="16">-->
    <!--        <div class="grid-content bg-purple">-->

    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col :span="8" offset="0">-->
    <!--        <div class="grid-content bg-purple-light">-->
    <!--          <el-button>默认按钮</el-button>-->
    <!--        </div>-->
    <!--      </el-col>-->
  </div>
</template>

<script>
import Input from "@/views/middle/userinput";

export default {
  name: "seach",
  components: {Input},
  data() {
    return {
      restaurants: [],
      input: ""
    };
  },
  methods: {
    loadAll() {
      return [
        {"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"},
        {"value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号"},
        {"value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"},
        {"value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6"},
        {"value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号"},

      ];
    },
    querySearchAsync(e) {
      console.log(e.target.value)
      console.log(this.$store.state.friends)
      this.$store.state.friends.forEach(i => {
        // console.log(i.userinfo)
        if (i.userinfo.username === (e.target.value)) {
          this.$store.commit('getUsername', i)
          this.$router.push("/home/chat/" + i.userinfo.username)
          this.input = ""
        }
      })

    },

  },
  mounted() {
    this.restaurants = this.loadAll();
  }

}

</script>

<style lang="less" scoped>
.icon-Searchs {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  width: 100%;
  height: 5%;
  padding: 10px;
}

.icon-Searchs .grid-content {
  height: 80%;
  background: rgba(255, 255, 255, 0);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.icon-Searchs .grid-content input {
  border: none;
  height: 100%;
  border-radius: 10px;

}

.icon-Searchs .grid-content button {
  height: 100%;
  width: 50px;
  background-color: #ffffff;
  border: none;
  border-radius: 10px;
}

.icon-Searchs .grid-content button:hover {
  background-color: #333;
  color: #fffdef;
}

/*.icon-Searchs .el-input .el-autocomplete {*/
/*  border: 0;*/
/*  width: 85%;*/
/*}*/

/*.icon-Searchs .el-button el-button--primary el-button--small {*/
/*  height: 100%;*/
/*}*/
</style>