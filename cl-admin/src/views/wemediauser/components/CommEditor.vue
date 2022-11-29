<template>
  <el-dialog ref="dialog" :title="title" :visible.sync="dialogFormVisible" width="442px">
    <el-form :model="form" :rules="rules" ref="commForm" :inline="true">
      <el-form-item prop="name" label="用户名称：">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入账户名称"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="登录密码：">
        <el-input v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="nickname"label="用户昵称：">
        <el-input v-model="form.nickname" autocomplete="off" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机号：">
        <el-input v-model="form.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱：">
        <el-input v-model="form.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="warning" @click="dialogFormVisible = false">取消</el-button>
      <el-button type="success" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { saveData,} from '@/api/wemediauser'

export default {
  name: 'commn-editor',
  props: ['title', 'submitSuccess'],
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
        callback(new Error('请输入电话号码'))
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
    return {
      disable: false,
      model: 'add',
      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {
        name: '',
        password: '',
        nickname: '',
        phone: '',
        email: ''
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
        ]
      },
      stateList: [
        { label: true, value: '有效' },
        { label: false, value: '无效' }
      ]
    }
  },
  methods: {
    add: function () {
      this.dialogFormVisible = true
      this.model = 'add'
    },
    edit: function (item) {
      this.dialogFormVisible = true
      this.form = item
      this.model = 'edit'
    },
    submit: function () {
      this.$refs.commForm.validate(async (valid) => {
        if (valid) {
          if (this.model === 'add') {
            this.saveuser()
          } else {
            this.updateser()
          }
        } else {
          return false
        }
      })
    },
    async saveuser () {
      const param= {
        name:this.form.name,
        password:this.form.password,
        nickname:this.form.nickname,
        phone:this.form.phone,
        email:this.form.email}
      const res = await saveData(param)
      if (res.code === 0) {
        this.dialogFormVisible = false
        this.submitSuccess()
        this.form={
            name: '',
            password: '',
            nickname: '',
            phone: '',
            email: ''
        }
        this.$message({ type: 'success', message: '操作成功！' })
      } else {
        this.$message({ type: 'error', message: res.errorMessage })
      }
    },
    /*async updateChannel () {
      const param = {
        id: this.form.id,
        name: this.form.name,
        status: this.form.status,
        description: this.form.description,
        ord: this.form.ord
      }
      const res = await updateData(param)

      if (res.code === 0) {
        this.dialogFormVisible = false
        this.submitSuccess()
        this.$message({ type: 'success', message: '操作成功！' })
      } else {
        this.$message({ type: 'error', message: res.errorMessage })
      }
    }*/
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/element-variables.scss';
// TODO: 这里再想想
/deep/ .el-dialog__body {
  padding: 30px;
}

.el-form-item {
  margin-bottom: 20px;
}

/deep/ .el-form-item__label {
  color: $--color-text-primary;
}
</style>
