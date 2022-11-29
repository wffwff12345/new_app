<template>
  <div>
    <van-nav-bar title="登录"
    left-arrow
    @click-left="$router.replace({path:'/first'})"/>
    <van-form
      :show-error="false"
      :show-error-message="false"
      @failed="onfailed"
      @submit="onLogin">
      <van-field
        v-model="user.name"
        left-icon="smile-o"
        placeholder="请输出账户名"
        :rules="formrules.name"
      />
      <van-field
        v-model="user.password"
        left-icon="closed-eye"
        placeholder="请输出密码"
        :rules="formrules.password"
      />
      <van-button
      class="login-btn"
      type="info" block
    > 登录</van-button>
    </van-form>

  </div>
</template>

<script>
import { loginByUsername } from '@/api/login'
import {Toast} from 'vant'
export default {
  components: {
  },
  props:{},
  data () {
    return {
        user:{
          name:'',
          password:''
        },
      formrules:{
          name:[
            {required:true,message:'请输入用户名'},
          ],
          password: [{required:true,message:'请输入密码'}]
      }
    }
  },
  computed:{},
  watch:{},
  created () {
  },
  mounted() {
  },
  methods:{
    onfailed(error){
      console.log('验证失败',error.errors)
      if(error.errors[0]){
        this.$toast({message:error.errors[0].message,
          position:'top'})
      }
      if(error.errors[1]){
        this.$toast({message:error.errors[1].message,
          position:'top'})}
      },
    async onLogin() {
      Toast.loading({
        message:'正在登录...',
        forbidClick:true,
         duration:0})
      const { password, name } = this.user
      const result = await loginByUsername(name,password)
      if (result.code === 0) {
        Toast.success('登录成功!')
        this.$router.replace({ path: '/home' })
      } else {
        Toast.fail(result.errorMessage)

      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
