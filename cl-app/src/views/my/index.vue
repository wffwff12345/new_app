<template>
  <div class="my-container">
   <van-cell-group class="my-info">
     <van-cell
     center
     class="base-info"
     :border="false">
       <van-image
         class="avatar"
         slot="icon"
         round
         fit="cover"
         src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
       />
       <div
         class="name"
         slot="title">
         {{userName}}
       </div>
       <van-button
         class="update"
        size="small"
         round
         :to="{
           name:'editor',
           params:{
             userName:userName
           }
           }"
        >
         编辑资料
       </van-button>
     </van-cell>
     <van-grid :border="false" class="data-info">
       <van-grid-item class="data-info-item"  >
         <div slot="text" class="text-wrap1"  >
           <div class="count">{{ this.focuscount }}</div>
           <div class="text"@click="focuslist" >关注</div>
         </div>
       </van-grid-item>
       <van-grid-item class="data-info-item"   >
         <div slot="text" class="text-wrap2" >
           <div class="count">{{this.likecount}}</div>
          <div class="text" @click="likelist">喜欢
          </div>
         </div>
       </van-grid-item>
     </van-grid>
   </van-cell-group>
    <van-cell title="历史" is-link :to="{
           name:'historylist'}"></van-cell>
     <logoutbar />
  </div>
</template>

<script>
import { getUser } from '@/utils/store'
import { Logoutbar } from './components'
import {number,focusnumber} from '@/api/home'
import emitter from '@/utils/event'
import {editorData} from '@/api/register'


export default {
  name: 'my',
  components: {
    Logoutbar,

    },
  props:{},
  watch:{},
  data () {
    return {
      collapse: false,
      user: {},
      likecount:0,
      focuscount:0
    }
  },
  created () {
    this.user = getUser()
    this.loadnumber()
    this.loadfocusnumber()
  },
  computed: {userName () {
      return this.user.name ? this.user.name : '未登录'
    }
  },
  methods:{
    async loadnumber() {
    const b=await number()
    this.likecount=b.data
    },
    async loadfocusnumber() {
      const b=await focusnumber()
      this.focuscount=b.data
    },
    focuslist:function (){
      this.$router.replace({path:'/focuslist'})
    },
    likelist:function (){
    this.$router.replace({path:'/likelist'})
    }
}}
</script>

<style lang="scss" scoped>
.my-container{
.my-info{
  background-color: #4da4ff;
  .base-info{
    box-sizing:border-box ;
    height: 115px;
    background-color: unset;
    padding-top: 38px;
    padding-bottom:11px;
    .avatar{
      box-sizing: border-box;
      height: 66px;
      width: 66px;
      border: 1px solid #fff;
      margin-right: 11px;
    }
    .name{
      color: #fffdef;
      font-size: 15px;
    }
    .update{
      height: 30px;
      font-size: 10px;
      color: #666666;
    }
  }
  .data-info{
    .data-info-item{
      height: 65px;
      color: #fffdef;
      .text-wrap1{
        float: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      .count{
        font-size: 18px;
      }
      .text{
        width: 30px;
        text-align: center;
        font-size: 11px;
      }
    }
      .text-wrap2{
        margin-left: 220px;
        float: right;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .count{
          font-size: 18px;
        }
        .text{
          width: 30px;
          text-align: center;
          font-size: 11px;
        }
      }
  }
  }

  /deep/ .van-grid-item__content{
    background-color: unset;
  }
}
/deep/.nar-grid{
  .nar-grid-item{
    height: 70px;

  }
}

  .mb-4{
   margin-bottom: 4px;
  }
}
</style>
