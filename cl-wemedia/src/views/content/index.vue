  <template>
  <div ref="content">
    <search-tool  :changeParam="changeParam" :channel_list="channel_list" />
    <search-result
      ref="mySearchResult"
      :articleList="articleList"
      :total="total"
      :changePage="changePage"
      :changeSize="changeSize"
      :pageSize="Params.size"
      :currentPage="Params.page"
      :deleteArticles="deleteArticles"
    />
  </div>
</template>

<script>
import SearchTool from './components/SearchTool.vue'
import SearchResult from './components/SearchResult.vue'
import { deleteArticles, searchArticle} from '@/api/content'
import { getChannels } from '@/api/publish'
export default {
  name: 'ContentManage',
  data () {
    return {
      channel_list: [],
      articleList: [],
      total: 0,
      keyword: null,
      page: {
        page: 1,
        size: 10
      },
      Params: {
        page: 1,
        size: 10,
        keyword: '',
        channelId: null,
      }
    }
  },
  created () {
    const { keyword } = this.$route.query
    this.keyword = keyword
    this.getChannels()
    this.searchArticle()
  },
  components: {
    SearchTool,
    SearchResult
  },
  computed: {

  },
  methods: {
    changeParam:function (e) {
      this.Params.page = 1
      this.Params.channelId=e.channelId
      this.Params.keyword=e.keyword
      this.searchArticle()
    },
    async searchArticle () {
      const result = await searchArticle({ ...this.Params})
      this.total = result.total
      this.articleList = result.data
    },
    changePage: function (e) {
      this.Params.page = e.page
      this.searchArticle()
    },
    changeSize:function (e){
      this.Params.size = e.size
      this.searchArticle()
    },
    async deleteArticles (Id) {
      const temp = await deleteArticles(Id)
      if (temp.code === 0) {
        this.$message({ type: 'success', message: '删除成功!' })
        this.searchArticle()
      } else {
        this.$message({ type: 'error', message: temp.errorMessage })
      }
    },
    async getChannels () {
      const result = await getChannels()
      this.channel_list = result.data
    }
  }
}
</script>
