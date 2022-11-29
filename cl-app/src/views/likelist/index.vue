<template>
  <div class="searchresult">
    <van-nav-bar
      class="app-nav-bar"
      title="喜欢的新闻"
      left-arrow
      @click-left="$router.replace({path:'/my'})"
    />
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <article-item
        v-for="(article,index) in list"
        :key="index"
        :article="article"
      />
    </van-list>
  </div>
</template>

<script>
import {Toast} from "vant";
import ArticleItem from '@/components/article-item'
import {getArticlebylike}  from '@/api/home'
export default {
  name: 'LikeResult',
  components: {
    ArticleItem
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
      const data=await getArticlebylike({
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
        this.finished=true
      }
      console.log('likelist')
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
