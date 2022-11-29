<template>
  <div class="searchresult">
    <van-nav-bar
      class="app-nav-bar"
      title="关注的作者"
      left-arrow
      @click-left="$router.replace({path:'/my'})"
    />
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <author-item
        v-for="(author,index) in list"
        :key="index"
        :author="author"
      />
    </van-list>
  </div>
</template>

<script>
import {Toast} from "vant";
import AuthorItem from '@/components/author-item'
import {getAuthorbyfocus}  from '@/api/home'
export default {
  name: 'LikeResult',
  components: {
    AuthorItem
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
      const data=await getAuthorbyfocus({
        page:this.page,
        size:this.size,
      })
      console.log(data)
      if (data.code!==0){
        Toast.fail(data.errorMessage)
      }
      const result=data.data
      this.list.push(...result)
      this.loading=false
      if (data.length){
      } else{
        console.log(this.list)
        this.finished=true
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
