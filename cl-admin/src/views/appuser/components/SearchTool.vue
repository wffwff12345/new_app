<template>
  <section class="filter">
    <div class="filter-container">
      <el-form ref="form" :inline="true">
        <el-form-item label="App用户名称：">
          <el-input
            v-model="name"
            placeholder="请输入App用户名称"
            class="filter-item"
            clearable
            @change="queryData"
          />
        </el-form-item>
        <el-button type="success" icon="el-icon-circle-plus-outline" @click="addData">增加app用户</el-button>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  props: ['changeParam','addData'],
  data () {
    return {
      name: ''}
  },
  methods: {
    queryData () {
      const params = {
        name: ''
      }

      if (this.name) {
        params.name = this.name
      }

      this.changeParam(params)
    }
  }
}
</script>
