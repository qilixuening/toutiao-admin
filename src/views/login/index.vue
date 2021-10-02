<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="login-form"
      :model="user"
      :rules="loginFormRules"
    >
      <el-form-item prop="mobile">
        <el-input
          v-model="user.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="user.code"
          placeholder="请输入验证码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checked">
        <el-checkbox
          v-model="user.checked"
        >我已阅读并同意用户许可及隐私条款。</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          :loading="loginLoading"
          @click="onLogin('login-form')"
        >立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userLogin } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data: () => ({
    user: {
      mobile: '',
      code: '',
      checked: false
    },

    loginFormRules: {
      mobile: [
        { required: true, message: '手机号不能为空', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号无效', trigger: 'blur' },
        { pattern: /^\d+$/, message: '手机号只包含数字', trigger: 'change' }
      ],
      code: [
        { required: true, message: '验证码不能为空', trigger: 'blur' },
        { pattern: /^\d{6}$/, message: '验证码无效', trigger: 'blur' }
      ],
      checked: [
        {
          validator: (_, value, callback) => {
            if (!value) {
              callback(new Error('请阅读并同意用户协议'))
            } else {
              callback()
            }
          },
          trigger: 'change'
        }
      ]
    },

    loginLoading: false
  }),
  computed: {},
  watch: {},
  created () {},
  mounted () {},

  methods: {
    onLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        }
      })
    },

    login () {
      this.loginLoading = true
      userLogin(this.user).then(res => {
        this.$message({
          message: '登录成功！',
          type: 'success'
        })

        this.loginLoading = false

        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        console.log('登录失败\n', err)
        this.$message.error('登录失败，账号或验证码错误！')
        this.loginLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('./login-bg.jpg') no-repeat;
    background-size: cover;
    .login-form {
      background-color: #fff;
      padding: 50px;
      min-width: 200px;
      .login-btn {
        width: 100%;
      }
    }
  }
</style>
