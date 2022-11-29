<template>
  <div class="register">
    <van-form
    :show-error="false"
    :show-error-message="false"
    @submit="oneditor"
    @failed="onfailed">
      <van-field
        left-icon="smile-o"
        readonly >
        {{this.userName}}
      </van-field>
      <van-field
        v-model="user.password"
        left-icon="closed-eye"
        placeholder="密码"
        :rules="formrules.password"/>
      <van-field
        left-icon="phone-circle-o"
        v-model="user.phone"
        placeholder="电话"
        :rules="formrules.phone"/>
      <van-field
        left-icon="contact"
        v-model="user.sex"
        placeholder="性别"
        :rules="formrules.sex"/>
    <van-button
      class="register-btn"
      type="info" block
    > 确定</van-button>
    </van-form>
  </div>
</template>

<script>
import { editorData } from '@/api/editor'
import {Toast} from "vant";
export default {
  name: 'editor',
  components: {
  },
  props:{
    userName:String
  },
  data () {
    return {
      user:{
        name:'',
        password:'',
        phone:'',
        sex:''
      },

      formrules:{
        password:[{required:true,message:'请输入密码'}],
        phone:[{required:true,message:'请输入电话'},
               {pattern:/^1[3|5|7|8|9]\d{9}$/,message: '手机号码格式错误'}//正则表达式
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
    async oneditor() {
      Toast.loading({
        message:'正在修改...',
        forbidClick:true,
        duration:0})
      const param={ name:this.userName,password:this.user.password,phone:this.user.phone,sex:this.user.sex}
      const result = await editorData(param)
      if (result.code === 0) {
        Toast.success('修改成功!')
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
