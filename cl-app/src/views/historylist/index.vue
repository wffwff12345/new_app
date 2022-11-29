<template>
  <div class="searchresult">
    <van-nav-bar
      class="app-nav-bar"
      title="历史新闻"
      left-arrow
      @click-left="$router.replace({path:'/my'})"
    />
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <history-item
        v-for="(article,index) in this.list"
        :key="index"
        :article="article"
        @delete="deletehistory"
      />
    </van-list>
  </div>
</template>

<script>
import {Toast} from "vant";
import HistoryItem from '@/components/history-item'
import {getHistoryArticles,deletehistory}  from '@/api/home'
import JSONbig from "json-bigint";
export default {
  name: 'LikeResult',
  components: {
    HistoryItem
  },
  props:{
  },
  data () {
    return {
      list: [],
      loading:false,
      finished:false,
      page:1,
      size:100
    }
  },
  computed:{},
  watch:{},
  created () {
  },
  mounted() {
  },
  methods:{
    async onLoad(){
      const data=await getHistoryArticles({
        page:this.page,
        size:this.size,
      })
      console.log(data)
      if (data.code!==0){
        Toast.fail(data.errorMessage)
      }
      console.log(data)
      const result=data.data
      console.log(result)
      this.list.push(...result)
      this.loading=false
      if (data.length){
      } else{
        console.log('list')
        console.log(this.list)
        this.finished=true
      }
      console.log('historylist')
    },
    async deletehistory(data){
      const id = JSONbig.parse(data.id)
      const result= await deletehistory(id)
      if (result.code === 0) {
        Toast.success('已清除记录!')
        this.list=[]
        this.onLoad()
      } else {
        Toast.fail(result.errorMessage)

      }
    }
  }
}
</script>

<style lang="scss" scoped>
.searchresult{
  /*position: fixed;
  left: 0px;
  right: 0px;
  top: 55px;
  bottom: 0px;
  overflow-y: auto;*/
  .app-nav-bar{
    background-color: #2892ff;
    background-color: honeydew;
    color: black;
  }
  /deep/ .van-nav-bar__title{
    max-width: none;
  }
}
</style>
