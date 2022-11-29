  <template>
  <div>
    <search-tool  :changePage="searchArticle"  />
    <search-result
      ref="mySearchResult"
      :articleList="articleList"
      :total="total"
      :changePage="searchArticle"
      :pageSize="page.size"
      :currentPage="page.page"
      :deleteArticle="deleteArticle"
    />
  </div>
</template>

<script>
import SearchTool from './components/SearchTool.vue'
import SearchResult from './components/SearchResult.vue'
import { loadList,delData } from '@/api/news'
export default {
  name: 'ContentManage',
  data () {
    return {
      articleList: [],
      page: {
        page: 1,
        size: 10
      },
      Params: {},
      total: 0,
      host: '',
    }
  },
  mounted () {
    this.searchArticle()
  },
  components: { SearchTool, SearchResult },
  methods: {
    async searchArticle (e) {
      this.Params=e
      const result = await loadList({...this.page, ...this.Params})
      this.total = result.total
      this.articleList = result.data
    },
    async deleteArticle (Id) {
      const temp = await delData(Id)
      if (temp.code === 0) {
        this.$message({ type: 'success', message: '删除成功!' })
        this.searchArticle()
      } else {
        this.$message({ type: 'error', message: temp.errorMessage })
      }
    },

  }
}
</script>
