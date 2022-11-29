<template>
  <div class="first">
    <h1 style="text-align: center">
      冲浪新闻欢迎您！
    </h1>
    <van-button
      class="register-btn"
      type="info" block
      @click="register"
    > 注册</van-button>
    <van-button
      class="login-btn"
      type="info" block
      @click="login"
    > 登录</van-button>
  </div>

  <h1>1123啊1<span></span></h1>
  <h1>1123啊1</h1>
  <h1>1123啊1</h1>
  <h1>1123啊1</h1>
</template>

<script>
export default {

  methods: {
    async login () {
      this.$router.replace({ path: '/login' })
    },
    async register(){
      this.$router.replace({ path: '/register' })

    }
}}
</script>

<style lang="scss" scoped>
.first{

.register-btn{
  top: 150px;
}
.login-btn{
  top: 400px;
}}
</style>
