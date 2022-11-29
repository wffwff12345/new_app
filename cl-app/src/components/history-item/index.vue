<template>
 <van-cell class="article-item">
   <div slot="icon" @click="deletehistory(onearticle.id)">
     <van-icon class="icon" name="delete-o" />
   </div>
 <div slot="title"
      class="title van-multi-ellipsis--l3"
      @click="redirect(onearticle.id)"
      >
 {{onearticle.title}}
 </div>
 <div slot="label">
   <div class="cover-wrap"
        v-if="onearticle.layout===3"
     >
     <articleimage-list :itemes="formatImage(onearticle.images)"/>
   </div>
   <div class="label-wrap">
     作者:<span>{{onearticle.authorName}}</span>
     时间:<span>{{onearticle.publishTime | relativeTime}}</span>
   </div>
 </div>
   <van-image
     class="right-cover"
   v-if="onearticle.layout===1"
   fit="cover"
   width="116"
   height="73"
   :src="onearticle.images"
   />
 </van-cell>
</template>

<script>
import ArticleimageList from './components/articleimage-list'
import {getArticle}  from '@/api/home'
import JSONbig from "json-bigint";
export default {
  name: 'HistoryItem',
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
      itemes:{},
      onearticle:{}
    }
  },
  computed:{},
  watch:{},
  created () {
    this.loaddata()
  },
  mounted() {
  },
  methods: {
    async loaddata(){
      const id = JSONbig.parse(this.article.articleId)
      const result= await getArticle(id)
      this.onearticle=result.data
    },
    redirect:function (id){
      this.$router.replace({name:'article',params:{articleId:id}})
    },
    formatImage: function (img) {
      const itemes = img.split(",")
      return itemes
    },
    deletehistory:function (id){
      this.$emit('delete',{id:id})
    }
  }
}
</script>

<style lang="scss" scoped>
.article-item{
  .icon{
    margin-right: 10px;

  }
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
