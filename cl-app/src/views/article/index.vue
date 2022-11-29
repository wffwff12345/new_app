<template>
  <div class="article-container">
  <van-nav-bar
  class="app-nav-bar"
  title="新闻详情"
  left-arrow
  @click-left="$router.back()"
  />
  <h1 class="title">
   {{article.title}}
  </h1>
    <van-cell center class="user-info">
      <div  slot="title" class="name">{{article.authorName}}</div>
      <van-image
      slot="icon"
      class="avatar"
      fit="cover"
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      round
      />
      <div slot="label" class="pubdate">
        {{ article.publishTime |relativeTime }}
      </div>
      <div>
        <van-button
          :type="this.ac.isFocused ? 'danger':'warning'"
          round
          center
          size="small"
          width="30"
        @click="onfocus"
        >
          {{this.ac.isFocused ? '取消':''}}关注
        </van-button>
      </div>
    </van-cell>
    <van-cell
      v-for="(i,index) in this.items"
      :key="index"
    >
      <articlecontent-list :item="i"/>
    </van-cell>
  <div class="article-bottom">
    <van-button
      class="commment-btn"
      round
      center
      width="70"
      @click="iscomment=true">
      写评论
    </van-button>
    <van-icon
    :color="this.ad.isLike ?'orange':'blue' "
    :name="this.ad.isLike ? 'like' :'like-o' "
    @click="onlike"
    />
  </div>
    <van-popup
      v-model="iscomment"
      position="center"
      style="width: 360px;height: 200px"
    >
      <post-comment :articleId="articleId"
                    @post-success="onsuccess"/>
    </van-popup>
    <div class="return">
      <!--<van-icon size="100px" name="minus" />-->
<!--
      <van-divider hairline content-position="center"/>
-->
    </div>
  </div>

</template>

<script>
import PostComment from './components/post-comment'
import './github-markdown.css'
import {getArticleInfo,addAPPARTICLE,getAPPARTICLE,like,cancellike,
  focus,cancelfocus,getfocus,addfocus,addhistory} from '@/api/home'
import JSONbig from 'json-bigint'
import ArticlecontentList from './components/articlecontent-list'
//import { loginByUsername } from '@/api/login'
export default {
  name: 'article',
  components: {
    ArticlecontentList,
    PostComment
  },
  props: {
    articleId:
      {
        type: [String, Number, Object],
        required: true
      }
  },
  data() {
    return {
      article: {},
      name:'',
      content: [],
      imageHeight: {},
      itemes: {},
      items: {},
      iscomment: false,
      like:{},
      ad:{},
      ac:{},
      gt:{}
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle()
    this.just()
    this.just2()
    this.history()
  },
  mounted() {

  },
  methods: {
    async loadArticle() {
      const id = JSONbig.parse(this.articleId)
      const data = await getArticleInfo(id)
      console.log(data)
      console.log(data.data)
      console.log(data.data.config)
      console.log(data.data.content)
      this.article = data.data.config
      this.name=this.article.authorName
      console.log(data.data.content.content)
      const tf = JSON.parse(data.data.content.content)
      this.items = tf
      console.log(this.items)
      console.log(this.items.length)
    },
    onsuccess() {
      this.iscomment = false
    },
  async just(){
    const bb = JSONbig.parse(this.articleId)
    const ress = await getAPPARTICLE(bb)
    console.log(ress)
    if (ress.data==null){
      this.w1()
    }else{
    this.ad=ress.data}
  },
  async w1(){
    const cc = JSONbig.parse(this.articleId)
    const res = await addAPPARTICLE(cc)
    this.ad=res.data
    console.log(this.ad)
  },
    async onlike() {
      this.$toast.loading(
        {
          message:'操作中...',
          forbidClick:true
        }
      )
      const id = JSONbig.parse(this.articleId)
      if (this.ad.isLike) {
        await cancellike(id)
      }
      else{
        await like(id)
      }
      this.ad.isLike=!this.ad.isLike
      this.$toast.success(`${this.ad.isLike ? '':'取消'}喜欢操作成功`)
    },
    async history(){
      const dd = JSONbig.parse(this.articleId)
      const res = await addhistory(dd)
      this.gt=res.data
      console.log(this.gt)
    },
    async just2(){
      const bb = JSONbig.parse(this.articleId)
      const ress = await getfocus(bb)
      console.log('ress')
      console.log(ress)
      console.log('ress')
      if (ress.data==null){
        this.w2()
      }else{
        this.ac=ress.data
        console.log(this.ac)
        console.log('ac')
        console.log(this.ac.isFocused)
      }
    },
    async w2(){
      const cc = JSONbig.parse(this.articleId)
      const res = await addfocus(cc)
      this.ac=res.data
      console.log(this.ac)
    },
    async onfocus() {
      this.$toast.loading(
        {
          message:'操作中...',
          forbidClick:true
        }
      )
      const id = JSONbig.parse(this.articleId)
      if (this.ac.isFocused) {
        await cancelfocus(id)
      }
      else{
        await focus(id)
      }
      this.ac.isFocused=!this.ac.isFocused
      this.$toast.success(`${this.ac.isFocused ? '':'取消'}关注成功`)
    },

}


}
</script>

<style lang="scss" scoped>
.article-container{
  //background-color: #fffdef;
  .app-nav-bar{
    background-color: #5babfb;}
  .title{
    text-align:center;
    font-size: 20px;
    color: black;
    padding-top: 14px;
    background-color: #fff;
    margin: 0;
  }
  .van-cell{
    //background-color: honeydew;
    border: 0px;

  }
  .user-info{
    .avatar{
      width: 35px;
      height: 35px;
      margin-right: 8px;
    }
    .name{
      font-size: 12px;
      color: #333333;
    }
    .pubdate{
      font-size:11px ;
      color: #b4b4b4;
    }
  }

  .markdown-body{
    padding: 0px;
    background-color: white;
  }
  .van-cell__value--alone{
    text-align: center;
  }
  .van-icon{
    /deep/.van-icon-star-o:before{
      padding: 20px;
    }
    /deep/.van-icon-star:before{
      padding: 20px;
    }
}
  .article-bottom{
    padding: 15px;
    margin-top: 290px;
  }
  /deep/.van-button--small {
    /* text-align: center; */
    /* display: flex; */
    /* top: 10px; */
    /* left: 20px; */
    height: 32px;
    width: 25%;
    /* padding: 20px; */
    font-size: 12px;
  }
}
</style>
