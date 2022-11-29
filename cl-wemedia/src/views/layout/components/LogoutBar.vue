<template>
  <div class="logout">
    <span class="user-name">欢迎用户:&nbsp&nbsp{{userName}}</span>
    <span class="split-line">| |</span>
    <span class="icon svg-icon"  @click="logout">退出
    </span>
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
      }).
      then(() => {
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
  width: 200px;
  position: fixed;
  left: 40px;
  top: 62px;
  display: flex;
  align-items: center;
  z-index: 1002;

  .user-avatar {
    width: 36px;
    height: 36px;
  }

  .user-name {
    margin-left: 6px;
    color: white;
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
