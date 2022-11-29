<template>
  <div class="layout-container">
     <router-view/>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
     <!-- <van-tabbar-item icon="comment-o"  to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/videos">视频</van-tabbar-item>-->
      <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
//import { Sidebar, AppMain, Logoutbar } from './components'
//import emitter from '@/utils/event'

export default {
  name: 'Layout',
  components: {
  },
  props:{},
  data () {
    return {
      active:0
    }
  },
  computed:{},
  watch:{},
  created () {
    },
  mounted() {
  },
  methods:{
}
}
</script>
<style lang="scss" scoped>

</style>
