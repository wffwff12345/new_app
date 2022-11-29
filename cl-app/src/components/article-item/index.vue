<template>
 <van-cell class="article-item"
           :to="{
           name:'article',
           params:{
             articleId:article.id
           }
           }"
 >
 <div slot="title"
      class="title van-multi-ellipsis--l3">
 {{article.title}}
 </div>
 <div slot="label">
   <div class="cover-wrap"
        v-if="article.layout===3"
     >
     <articleimage-list :itemes="formatImage(article.images)"/>
   </div>
   <div class="label-wrap">
     作者:<span>{{article.authorName}}</span>
     时间:<span>{{article.publishTime | relativeTime}}</span>
   </div>
 </div>
   <van-image
     class="right-cover"
   v-if="article.layout===1"
   fit="cover"
   width="116"
   height="73"
   :src="article.images"
   />
 </van-cell>
</template>

<script>
import ArticleimageList from './components/articleimage-list'
//import { loginByUsername } from '@/api/login'
export default {
  name: 'ArticleItem',
  components: {
    ArticleimageList
  },
  props:{
    article:{
      type:Object,
      required:true
    }
  },
  data () {
    return {
      item:String,
      key:Number,
      itemes:{}
    }
  },
  computed:{},
  watch:{},
  created () {
  },
  mounted() {
  },
  methods: {
    formatImage: function (img) {
      const itemes = img.split(",")
      return itemes
    },
  }
}
</script>

<style lang="scss" scoped>
.article-item{
  .title{
    font-size: 16px;
    color:#3a3a3a;
  }
  /deep/ .van-cell__value{
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .right-cover{
    width: 116px;
    height: 73px;
  }
  /*.cover-wrap{
    padding:15px 0px;
    display: flex;
    .cover-wrap-item{
      flex:1;
      height: 73px;
      &:not(:last-child){
        padding-right: 4px;
      }
      .cover-item{
        width: 100%;
        height: 73px;
      }
    }
  }*/
  .label-wrap{
    margin-top: 20px;
    font-size: 11px;
    color: #b4b4b4;
  }
  .label-wrap span{
    margin-right: 12px;
  }
}
</style>
