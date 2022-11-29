<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar"
      left-arrow
      @click-left="$router.back()">
      <van-button
      slot="title"
      icon="search"
      type="info"
      round
      size="small"
      class="search-btn"
      to="/search"
      >搜索</van-button>
    </van-nav-bar>
    <van-tabs
      class="channel-tabs"
      v-model:active="active">
      <!--<van-tab title="首页">内容 1</van-tab>-->
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <article-list :channel="channel"/>
      </van-tab>

    </van-tabs>
  </div>
</template>
<script>
import {getChannels} from '@/api/home'
import ArticleList from './components/article-list'
  export default {
    name: 'Home',
    components: {
      ArticleList
    },
    props:{
    },
    data () {
      return {
        active:0,
        channels:[]
      }
    },
    computed:{},
    watch:{},
    created () {
      this.loadChannels()
    },
    mounted() {
    },
    methods:{

    async  loadChannels(){
            const result=await getChannels()
            console.log(result)
            this.channels=result.data
            console.log(this.channels)
      }
    }
  }
</script>

<style lang="scss" scoped>
.home-container{
  .app-nav-bar{
  background-color: #2892ff;
  background-color: honeydew;
    color: black;
  }
 /deep/ .van-nav-bar__title{
    max-width: none;
  }
  .search-btn{
    width: 277px;
    height: 32px;
    border: none;
    background-color:#5babfb ;
    .van-icon{
      font-size: 16px;
    }
    .van-button__text{
      font-size: 14px;
    }
  }
  .channel-tabs{
     /deep/ .van-tab {
     /*border-right: 1px solid #edeff3;
     border-bottom: 1px solid #edeff3;*/
    }
    /deep/ .van-tabs__line{
      bottom: 20px;
      width: 15px !important;
      height: 3px;
      background-color: #3296fa;
    }
  }
}
</style>
