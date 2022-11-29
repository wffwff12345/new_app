<template>
  <div class="logout">
    <span class="user-name">{{userName}}</span>
    <span class="split-line">| |</span>
    <span class="icon svg-icon"  @click="logout">退出</span>
  </div>
</template>

<script>
import { getUser, clearUser } from '@/utils/store'
import emitter from '@/utils/event'
export default {
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.user = getUser()
    emitter.$on('userChange', () => {
      this.user = getUser()
    })
  },
  computed: {
    userName () {
      return this.user.name ? this.user.name : '未登录'
    }
  },
  methods: {
    logout () {
      this.$confirm('确认要退出登录吗？', {
        confirmButtonText: '确定',
        confirmButtonClass: 'el-button--danger',
        cancelButtonText: '取消',
        cancelButtonClass: 'el-button--warning'
      }).then(() => {
        clearUser()
        this.$router.replace({ path: '/login' })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消退出' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/element-variables.scss';

.logout {
  width: 100px;
  position: fixed;
  left: 60px;
  top: 62px;
  display: flex;
  align-items: center;
  z-index: 1002;


  .user-name {
    color: white;
    margin-left: 6px;
    ;
  }

  .split-line {

    margin-left: 12px;
    color: white;
  }

  .svg-icon {
    width: 40px;
    height: 20px;
    margin-top: 3px;
    margin-left: 12px;
    color: white;
    vertical-align: middle;
    cursor: pointer;
  }
}
</style>
