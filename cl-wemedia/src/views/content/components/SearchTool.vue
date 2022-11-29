<template>
  <section class="filter">
    <div class="filter-container">
      <el-form ref="form" :inline="true">
          <el-form-item label="请输入文章标题关键字：">
            <el-input v-model="keyword"  style="width: 179px;" clearable @change="queryData" />
          </el-form-item>
          <el-form-item label="请选择频道：">
            <el-select v-model="channelId" placeholder=" " style="width: 179px;height: 200px" @change="queryData">
              <el-option
                v-for="item in channel_list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        <el-form-item>
          <el-button round size="small" @click="publish"> 发布文章</el-button>
        </el-form-item>
      </el-form>
      </div>
  </section>
</template>
<script>

export default {
  props: ['changeParam', 'channel_list'],
  data () {
    return {
      keyword: '',
      statusList: [
        { label: null, value: '全部' },
        { label: 1, value: '待审核' },
        { label: 2, value: '审核失败' },
        { label: 3, value: '人工审核' },
        { label: 4, value: '审核通过' },
        { label: 5, value: '发布'}
      ],
      status: null,
      channelId: null, // 频道id
      date: null
    }
  },
  methods: {
    publish(){
      this.$router.replace({path:'/article/publish'})
    },
    queryData () {
      const params = {
        keyword: this.keyword.trim() ? this.keyword.trim() : null,
        channelId: this.channelId,
      }
      this.changeParam && this.changeParam(params)
    },
  }
}
</script>
<style lang="scss" scoped>
.filter {
  height: 250px;
}
</style>
