<template>
  <div class="settings-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="16">
          <el-form
            ref="pubForm"
            label-width="100px"
            :model="user"
            :rules="formRules"
          >
            <el-form-item label="用户编号" prop="id">
              <el-input
                disabled
                v-model="user.id">
              </el-input>
            </el-form-item>
            <el-form-item label="注册手机号" prop="mobile">
              <el-input
                disabled
                v-model="user.mobile">
              </el-input>
            </el-form-item>
            <el-form-item label="个人昵称" prop="name">
              <el-input
                v-model="user.name">
              </el-input>
            </el-form-item>
            <el-form-item label="个人简介" prop="information">
              <el-input
                type="textarea"
                v-model="user.infomation">
              </el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="user.email">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                :disabled="loading"
                @click="onSubmit"
              >保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-avatar
            shape="square"
            fit="cover"
            src="http://toutiao-img.itheima.net/Fu5XVuSymYYPbEvp5iuHXyiKC2X5"
            :size="150"
          ></el-avatar>
          <div>点击修改头像</div>
        </el-col>

      </el-row>

    </el-card>
  </div>
</template>

<script>

export default {
  name: 'SettingsIndex',
  components: {},
  props: {},
  data: () => ({
    loading: false,

    user: {
      id: '12345',
      mobile: '13911111111',
      name: '',
      information: '',
      email: ''
    },

    formRules: {
      name: [
        { required: true, message: '昵称不能为空', trigger: 'change' },
        { min: 3, max: 10, message: '昵称为3~10个字符', trigger: 'blur' }
      ],
      information: [
        { required: true, message: '请输入个人简介', trigger: 'change' },
        { max: 200, message: '个人简介不超过200字', trigger: 'blur' }
      ],
      email: [
        { required: true, message: '请填写邮箱地址', trigger: 'change' },
        { pattern: /^[\d\w]+@.+\.\w+$/, message: '邮箱格式错误', trigger: 'blur' }
      ]
    }
  }),
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit () {

    }
  }
}
</script>

<style lang="less" scoped>
</style>
