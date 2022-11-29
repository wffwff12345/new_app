<template>
  <div class="a">
    <Editor ref="editor" :title="title" :submitSuccess="submitSuccess"/>
    <search-tool :changeParam="changeParam" :addData="addData" />
    <search-result
      ref='mySearchResult'
      :list="list"
      :total="total"
      :editData="editData"
      :changePage="changePage"
      :changeSize="changeSize"
      :pageSize="params.size"
      :currentPage="params.page"
      :submitSuccess="submitSuccess"
      />
  </div>
</template>

<script>
import SearchTool from './components/SearchTool'
import SearchResult from './components/SearchResult'
import Editor from './components/CommEditor'
import { loadList } from '@/api/wemediauser'
export default {
  name: 'Manager',
  data () {
    return {
      params: {
        name: '',
        page: 1,
        size: 10
      },
      total: 0,
      host: '',
      list: [],
      title: ''
    }
  },
  mounted () {
    this.loadData()
  },
  components: { SearchTool, SearchResult, Editor },
  methods: {
    // 编辑数据
    editData: function (item) {
      this.title = '编辑数据'
      this.$refs.editor.edit(JSON.parse(JSON.stringify(item)))
    },
    // 新增数据
    addData: function (item) {
      this.title = '新增自媒体用户'
      this.$refs.editor.add()
    },

    submitSuccess: function () {
      this.loadData()
    },
    changeParam: function (e) {
      this.params.page = 1
      this.params.name = e.name
      this.loadData()
    },
    changePage: function (e) {
      this.params.page = e.page
      this.loadData()
    },
    changeSize:function (e){
      this.params.size = e.size
      this.loadData()
    },
    async loadData () {
      const res = await loadList({ ...this.params })
      if (res.code === 0) {
        this.list = res.data
        this.total = res.total
      } else {
        this.$message({ type: 'error', message: res.errorMessage })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/scss/element-variables.scss';


</style>
