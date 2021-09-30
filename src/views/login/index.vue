<template>
  <div class="login-container">
    <el-form class="login-form" ref="form" :model="user">
      <el-form-item>
        <el-input
          v-model="user.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="user.code"
          placeholder="请输入验证码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox
          v-model="checked"
        >我已阅读并同意<a href="#">用户许可及隐私条款</a>。</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          :loading="loginLoading"
          @click="onLogin"
        >立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: '',
        loginLoading: false
      },
      checked: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      const user = this.user
      this.loginLoading = true
      request({
        method: 'POST',
        url: 'mp/v1_0/authorizations',
        data: user
      }).then(res => {
        console.log(res)

        this.$message({
          message: '登录成功！',
          type: 'success'
        })

        this.loginLoading = false
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
