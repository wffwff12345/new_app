<template>
  <section class="filter">
    <div class="filter-container">
      <el-form ref="form" :inline="true">
        <el-form-item label="频道名称：">
          <el-input
            v-model="name"
            placeholder="请输入频道名称"
            class="filter-item"
            clearable
            @change="queryData"
          />
        </el-form-item>
      </el-form>
    </div>
    <el-button type="success"  @click="addData">增加频道</el-button>
  </section>
</template>

<script>
export default {
  props: ['changeParam', 'addData'],
  data () {
    return {
      name: ''
    }
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
