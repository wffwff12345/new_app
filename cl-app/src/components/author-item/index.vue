<template>
 <van-cell class="article-item"
 >
 <div slot="title"
      class="title van-multi-ellipsis--l3"
     @click="redirect">
 {{this.author.authorName}}
 </div>
 </van-cell>
</template>

<script>
/*import {getArticlebyname}  from '@/api/home'
import ArticleItem from '@/components/article-item'*/
export default {
  name: 'AuthorItem',
  components: {

  },
  props:{
    author:{
      type:Object,
      required:true
    }
  },
  data () {
    return {

    }
  },
  computed:{},
  watch:{},
  created () {
  },
  mounted() {
  },
  methods: {
    redirect:function (){
      this.$router.push({name:'focuslists',params:{authorName:this.author.authorName}})
    }
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
