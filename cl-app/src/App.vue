<template>
    <div id="app" >
      <keep-alive :include="['Layout']">
        <router-view/>
      </keep-alive>
    </div>
</template>
<script>
export default {
  mounted () {
    document.title = '欢迎登陆冲浪新闻'
  }
}
</script>

<style lang="scss">
@import '@/scss/element-variables.scss';
html{
  height: 100%;
}
#app {
  height: 100%;

}
</style>
