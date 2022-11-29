<template>
  <div class="searchresult">
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
import {getArticlebycondition}  from '@/api/home'
export default {
  name: 'SearchResult',
  components: {
    ArticleItem
  },
  props:{
    searchText:{
       type:String,
       required:true
    }
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
    const data=await getArticlebycondition({
     page:this.page,
     size:this.size,
     title:this.searchText
    })
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
      }
    }
  }
</script>

<style lang="scss" scoped>
.searchresult{
  position: fixed;
  left: 0px;
  right: 0px;
  top: 55px;
  bottom: 0px;
  overflow-y: auto;
}
</style>
