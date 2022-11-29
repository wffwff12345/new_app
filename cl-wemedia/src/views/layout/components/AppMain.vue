<template>
  <div class="app-main">
   <!-- <transition name="fade-transform" mode="out-in">-->
      <router-view />
    <!--</transition>-->
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/element-variables.scss';

.app-main {
  //background-color: #2c3e50;

  position: relative;
  width: 100%;
  min-height: calc(100vh - 80px);
  // padding: 32px 30px 38px 29px;
  //overflow: hidden;
  box-shadow:0px 0px 30px 30px rgba(30,30,50,0.05);
  border-radius:30px;
}
</style>
