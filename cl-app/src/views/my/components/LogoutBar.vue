<template>
  <div class="container">
    <van-cell  class="tuichu" title="退出登录"
               @click="onlogout"/>
  </div>
</template>

<script>
import {Toast} from "vant";
import { getUser, clearUser } from '@/utils/store'
import emitter from '@/utils/event'
export default {
  name: 'layout',
  components: {
  },
  props:{},
  data () {
    return {
    }
  },
  created () {

  },
  computed: {

  },
    methods:{
      onlogout(){
        this.$dialog.confirm({
          title: '退出提示',
          message:
            '确认退出吗？'
        }).then(() => {
          Toast.success('正在退出!')
          clearUser() // 退出前要清除掉用户的信息
          this.$router.replace({ path: '/login' })
        }).catch(() => {
          Toast.fail('取消退出!')
        })
      }
    }

}
</script>

<style lang="scss" scoped>
@import '@/scss/element-variables.scss';

.container{
  .tuichu{
    text-align: center;
    color: #d86262;
  }
}
</style>
