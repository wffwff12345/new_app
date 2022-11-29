<template>
  <div class="register">
    <div class="container">
      <el-button class="rt" @click="onback" type="success" style="text-align: center" round>返回
      </el-button>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="register-ruleForm">
        <el-form-item prop="name" class="name-input-box">
        <el-input
          type="text"
          v-model="ruleForm.name"
          autocomplete="off"
          placeholder="请输入账户名"
          prefix-icon="el-icon-user"
        ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="password-input-box">
          <el-input
            autocomplete="off"
            type="text"
            v-model="ruleForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-key"
          ></el-input>
        </el-form-item>
        <el-form-item prop="nickname" class="nickname-input-box">
          <el-input
            autocomplete="off"
            type="text"
            v-model="ruleForm.nickname"
            placeholder="请输入昵称"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone" class="phone-input-box">
          <el-input
            autocomplete="off"
            type="text"
            v-model="ruleForm.phone"
            placeholder="请输入电话号码"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email" class="email-input-box">
          <el-input
            type="text"
            autocomplete="off"
            v-model="ruleForm.email"
            placeholder="请输入邮箱"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="signAgreement" class="signagreement-input-box">
          <el-checkbox v-model="ruleForm.signAgreement">我已阅读并同意&nbsp;用户协议&nbsp;和&nbsp;隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item class="registerBtn">
          <el-button type="success" @click="submitForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { saveData } from '@/api/register'
export default {
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入登录用户名'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }

    var validatenickName= (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入昵称'))
      } else {
        callback()
      }
    }
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入号码'))
      } else {
        callback()
      }
    }
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        callback()
      }
    }
    var validateSignAgreement = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请阅读并同意协议'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        password: '',
        nickname: '',
        phone: '',
        email: '',
        signAgreement: true
      },
      rules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        nickname:[
          { validator: validatenickName, trigger: 'blur' }
          ],
        phone:[
          {validator: validatePhone, trigger: 'blur'},
          {pattern:/^1[3|5|7|8|9]\d{9}$/,message: '手机号码格式错误',trigger: 'blur'}
          ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        signAgreement: [
          { validator: validateSignAgreement, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onback(){
      this.$router.replace({path:'/first/index'})
    },
    async submitForm () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const param= {
            name:this.ruleForm.name,
            password:this.ruleForm.password,
            nickname:this.ruleForm.nickname,
            phone:this.ruleForm.phone,
            email:this.ruleForm.email}

          const result = await saveData(param)
          if (result.code === 0) {
            this.$router.replace({ path: '/login' })
          } else {
            this.$message({
              message: result.errorMessage,
              type: 'error'
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$input-height: 60px;

.register {
  background-image: url('../../assets/1.jpg');
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
    .rt{background-color: #fedcae}
    img {
      display: block;
      margin: 0 auto;
    }
  }

  .register-ruleForm {
    padding: 25px 52px 0 53px;

    .name-input-box,
    .signagreement-input-box {
      margin-bottom: 20px;
    }


    .nickname-input-box{
      margin-bottom: 25px;

    }
    .email-input-box{
      margin-bottom: 25px;

    }
    .password-input-box {
      margin-bottom: 20px;
    }
    .phone-input-box
    {margin-bottom: 25px;
    }
    /deep/ .el-input__inner {
      height: $input-height;
      padding-left: 70px;
      line-height: $input-height;
    }

    /deep/ .el-input__icon {
      width: 66px;
      height: $input-height;
      font-size: 28px;
      line-height: $input-height;
    }
    .registerBtn {
      /deep/ .el-button {
        width: 100%;
        height: auto;
        padding: 20px 20px;
        font-size: 28px;
        border: none;
      }
    }
  }
}
</style>
