<template>
  <div class="register">
    <van-nav-bar title="注册"
    left-arrow
    @click-left="$router.replace({path:'/first'})"/>
    <van-form
    :show-error="false"
    :show-error-message="false"
    @submit="onregister"
    @failed="onfailed">
      <van-field
        left-icon="smile-o"
        v-model="user.name"
        placeholder="请输出账户名"
        :rules="formrules.name"/>
      <van-field
        v-model="user.password"
        left-icon="closed-eye"
        placeholder="密码"
        :rules="formrules.password"/>
      <van-field
        left-icon="phone-circle-o"
        v-model="user.phone"
        placeholder="电话(11位)"
        :rules="formrules.phone"/>
      <van-field
        left-icon="contact"
        v-model="user.sex"
        placeholder="性别"
        :rules="formrules.sex"/>
    <van-button
      class="register-btn"
      type="info" block
    > 注册</van-button>
    </van-form>
  </div>
</template>

<script>
import { saveData } from '@/api/register'
import {Toast} from "vant";
export default {
  data () {
    return {
      user:{
        name:'',
        password:'',
        phone:'',
        sex:''
      },

      formrules:{
        name:[{required:true,message:'请输入用户名'}],
        password:[{required:true,message:'请输入密码'}],
        phone:[{required:true,message:'请输入电话'},
               {pattern:/^1[3|5|7|8|9]\d{9}$/,message: '手机号码格式错误'}
      ],
        sex:[{required:true,message:'请输入性别'},
          {pattern:/^['男' | '女']$/,message: '性别格式错误'}]
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
      console.log('验证失败',error)
      if(error.errors[0]){
        this.$toast({message:error.errors[0].message,
        position:'top'})
      }
      else if(error.errors[1]){
        this.$toast({message:error.errors[1].message,
          position:'top'})
      }
      else if(error.errors[2]){
        this.$toast({message:error.errors[2].message,
          position:'top'})
      }
      else if(error.errors[3]){
        this.$toast({message:error.errors[3].message,
          position:'top'})
      }
    },
    async onregister() {
      Toast.loading({
        message:'正在注册...',
        forbidClick:true,
        duration:0})
      const param={ name:this.user.name,password:this.user.password,phone:this.user.phone,sex:this.user.sex}
      const result = await saveData(param)
      if (result.code === 0) {
        Toast.success('注册成功!')
        this.$router.replace({ path: '/login' })
      } else {
        Toast.fail(result.errorMessage)

      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
