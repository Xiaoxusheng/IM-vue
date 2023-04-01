<template>
  <div class="icon-Searchs">
    <el-row :gutter="10">
      <el-col :lg="9" :md="8" :sm="6" :xl="16" :xs="4">
        <div class="grid-content bg-purple-light">
          <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
          ></el-autocomplete>
        </div>
      </el-col>
      <el-col :lg="4.5" :md="4" :push=2 :sm="3" :xl="8" :xs="2">
        <div class="grid-content bg-purple-light">
          <el-button class="el-button" icon="el-icon-search">搜索</el-button>
        </div>
      </el-col>
      <!--      <el-col :span="16">-->
      <!--        <div class="grid-content bg-purple">-->

      <!--        </div>-->
      <!--      </el-col>-->
      <!--      <el-col :span="8" offset="0">-->
      <!--        <div class="grid-content bg-purple-light">-->
      <!--          <el-button>默认按钮</el-button>-->
      <!--        </div>-->
      <!--      </el-col>-->
    </el-row>
  </div>
</template>

<script>
export default {
  name: "seach",
  data() {
    return {
      restaurants: [],
      state: '',
      timeout: null
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
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }

}

</script>

<style lang="less" scoped>
.icon-Searchs {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 5%;
}

.icon-Searchs .grid-content bg-purple-light {

  background: rgba(255, 255, 255, 0);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
}

/*.icon-Searchs .el-input {*/
/*  height: 100%;*/
/*  width: 100%;*/
/*}*/

/*.icon-Searchs .el-input .el-autocomplete {*/
/*  border: 0;*/
/*  width: 85%;*/
/*}*/

/*.icon-Searchs .el-button el-button--primary el-button--small {*/
/*  height: 100%;*/
/*}*/
</style>