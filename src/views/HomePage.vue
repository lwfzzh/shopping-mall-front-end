<template>
  <div>
    <el-menu
        mode="horizontal"
        @select="handleSelect"
        ref="menu"
        style="height: 40px;margin-top: -30px">
      <el-menu-item index="1" @click="login()"><span id="login" class="span"></span></el-menu-item>
      <el-menu-item index="2" style="width: 680px"><span class="span">免费注册</span></el-menu-item>
      <el-submenu index="3">
        <span slot="title" class="span">我的淘宝</span>
        <el-menu-item index="1-1"><span class="span">选项1</span></el-menu-item>
        <el-menu-item index="1-2"><span class="span">选项2</span></el-menu-item>
        <el-menu-item index="1-3"><span class="span">选项3</span></el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <span slot="title" class="span">购物车</span>
        <el-menu-item index="2-1"><span class="span">选项1</span></el-menu-item>
        <el-menu-item index="2-2"><span class="span">选项2</span></el-menu-item>
        <el-menu-item index="2-3"><span class="span">选项3</span></el-menu-item>
      </el-submenu>
      <el-menu-item index="5"><span class="span">收藏夹</span></el-menu-item>
    </el-menu>
  </div>
<!--    <el-main style="height: 3000px;">-->
<!--      <div style="display: flex;width: 1438px;height: 80px;">-->
<!--        <el-image src="" style="width: 160px;height: 61px;"/>-->
<!--        <div>-->
<!--          <el-input v-bind="searchData.search" size="medium" type="text" style="min-width: 330px;">-->
<!--            <el-button type="danger" size="mini" style="text-align: center;margin-top: 4px;width: 70px;height: 28px;color: #ffffff" @click="Search()" slot="suffix">搜索</el-button>-->
<!--          </el-input>-->
<!--        </div>-->
<!--      </div>-->
<!--    </el-main>-->
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      searchData: {
        search: ''
      },
      activeIndex: '1',
      activeIndex2: '1',
      loginStatus: '亲,请登录'
    }
  },
  mounted() {
    document.getElementById('login').innerText = this.loginStatus
  },
  methods: {
    Search() {
      this.$feng.post('/search', this.searchData).then(res => {
        console.log(res);
      })
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    login() {
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style>
  .span {
    font-size: 10px;
  }
  .el-menu--collapse .el-menu .el-submenu, .el-menu--popup{
    min-width: 80px!important;
    margin-left: 10px!important;
    margin-top: -15px!important;
  }
</style>