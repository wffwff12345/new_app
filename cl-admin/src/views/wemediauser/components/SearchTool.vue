<template>
  <section class="filter">
    <div class="filter-container" >
      <el-form ref="form" :inline="true">
        <el-form-item label="自媒体用户名称：">
          <el-input
            v-model="name"
            placeholder="请输入自媒体用户名称"
            class="filter-item"
            clearable
            @change="queryData"
          />
        </el-form-item>
        <el-button type="success" icon="el-icon-circle-plus-outline" @click="addData">增加自媒体用户</el-button>
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
<style lang="scss" scoped>
@import '@/scss/element-variables.scss';


</style>
