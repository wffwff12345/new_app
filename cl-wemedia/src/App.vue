<template>
  <el-scrollbar style="height:100%">
    <div id="app">
      <router-view/>
    </div>
  </el-scrollbar>
</template>
<script>
export default {
  mounted () {
    document.title = '冲浪新闻网自媒体端'
  }
}
</script>

<style lang="scss">
@import '@/scss/element-variables.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $--color-text-primary;
  font-size: $--font-size-base;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

body .el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>
