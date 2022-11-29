<template>
<div class="article-list">
  <van-pull-refresh
    v-model="ispulldownloading"
    :success-text="refreshSuccess"
    :success-duration="1500"
    @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :immediate-check="true"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <article-item
      v-for="(article,index) in articles"
      :key="index"
      :article="article"
      />
    </van-list>
  </van-pull-refresh>
</div>
</template>
<script>
import {getArticles,getNewArticles} from '@/api/home'
import date from "../../../utils/date";
import ArticleItem from '@/components/article-item'
export default {
  name: 'article-list',
  components: {
    ArticleItem
  },
  props:{
    channel:{
      type:Object,
      required: true
    }
  },
  data () {
    return {
      articles: [],
      loading:false,
      finished:false,
      ispulldownloading:false,
      refreshSuccess:'',
      len:0
    }
  },
  computed:{},
  watch:{},
  created () {
  },
  mounted() {
  },
  methods:{
  async  onLoad (){
    const param={maxTime:0,minTime:new Date(),channelId:this.channel.id,size:100}
    const result= await getArticles(param)
    console.log(result)
    this.articles.push(...result.data)
    this.loading=false
    if (result.length){
    } else{
      this.finished=true
    }
  },
  async  onRefresh(){
      console.log('onRefresh')
      const param={maxTime:0,minTime:0,channelId:this.channel.id,size:100}
      const results= await getNewArticles(param)
      console.log(results)
      this.articles.unshift(...results.data)
      this.ispulldownloading=false
      //this.len=.length
      this.refreshSuccess= `更新了${results.data.length}条数据`
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
