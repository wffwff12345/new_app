<template>
  <section class="filter">
    <div class="filter-container">
      <el-form ref="form" :inline="true">
        <el-col>
          <el-form-item label="请输入新闻关键字：">
            <el-input v-model="keyword"
                      clearable
                      placeholder="新闻标题关键字"
                      @change="queryData" />
          </el-form-item>
        </el-col>
      </el-form>
    </div>
  </section>
</template>
<script>

export default {
  props: ['changePage'],
  data () {
    return {
      keyword: '',
      date: null
    }
  },
  methods: {
    queryData () {
      const params = {
        title: this.keyword.trim() ? this.keyword.trim() : null,
      }
      this.changePage && this.changePage(params)
    },
  }
}
</script>
<style lang="scss" scoped>
.filter {
  height: 250px;
}
</style>
