<template>
  <div class="first">
    <div class="container">
      <div style="padding-top: 400px;padding-left: 100px">
        <button @click="register" style="float: left;"class="b1" >注册</button>
      </div>
      <div style="top:400px;padding-right: 100px">
        <button @click="login" style="float: right;"class="b2">登录</button></div>
    </div>
  </div>
</template>

<script>
export default {

  methods: {
    async login () {
      this.$router.replace({ path: '/login' })
    },
    async register(){
      this.$router.replace({ path: '/register/index'})

    }
}}
</script>

<style lang="scss" scoped>
$input-height: 60px;

.first {
  background-image: url('../../assets/6.jpg');
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    background-image: url('../../assets/6.jpg');
    background-size: cover;
    width: 800px;
    height: 700px;
    padding-top: 40px;

    img {
      display: block;
      margin: 0 auto;
    }
  }
  .b1{
    background: #3bd396;
    color:white;
    font-size: 20px;
    padding: 30px 50px;
    border: none;

  }
  .b2{
    circle:1;
    background: #3bd396;
    color:white;
    font-size: 20px;
    padding: 30px 50px;
    border: none;

  }
}

</style>
