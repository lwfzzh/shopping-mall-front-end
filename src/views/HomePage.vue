<template>
  <el-container>
    <el-header style="height: 30px;"></el-header>
    <el-main style="height: 3000px;">
      <div style="display: flex;width: 1438px;height: 80px;">
        <el-image src="" style="width: 160px;height: 61px;"/>
        <div>
          <el-input v-bind="searchData.search" size="medium" type="text" style="min-width: 330px;">
            <el-button type="danger" size="mini" style="text-align: center;margin-top: 4px;width: 70px;height: 28px;color: #ffffff" @click="Search()" slot="suffix">搜索</el-button>
          </el-input>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      searchData: {
        search: ''
      }
    }
  },
  methods: {
    Search() {
      this.$feng.post('/search', this.searchData).then(res => {
        console.log(res);
      })
    }
  }
}
</script>

<style scoped>

</style>