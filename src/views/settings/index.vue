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
            ref="userSettings"
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
            <el-form-item label="个人简介" prop="intro">
              <el-input
                type="textarea"
                v-model="user.intro">
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
                :loading="loading"
                @click="changeUserProfile"
              >保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="4" :offset="2">
          <el-avatar
            shape="square"
            fit="cover"
            :src="user.photo"
            :size="150"
            @click.native="$refs.avatarFile.click()"
          ></el-avatar>
          <div>点击修改头像</div>
          <input
            type="file"
            ref="avatarFile"
            hidden
            @change="onFileChange"
          >
        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      title="编辑头像"
      append-to-body
      :visible.sync="dialogVisible"
      @opened="onDialogOpened"
    >
      <div class="crop-box">
        <img
          class="crop-image"
          ref="cropImage"
          :src="previewAvatarUrl"
        >
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile, setUserProfile } from '@/api/user.js'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  loading: false,

  name: 'SettingsIndex',
  components: {},
  props: {},
  data: () => ({
    loading: false,

    user: {
      id: '',
      mobile: '',
      name: '',
      intro: '',
      email: '',
      photo: ''
    },

    formRules: {
      name: [
        { required: true, message: '昵称不能为空', trigger: 'change' },
        { min: 3, max: 10, message: '昵称为3~10个字符', trigger: 'blur' }
      ],
      intro: [
        { required: true, message: '请输入个人简介', trigger: 'change' },
        { max: 200, message: '个人简介不超过200字', trigger: 'blur' }
      ],
      email: [
        { required: true, message: '请填写邮箱地址', trigger: 'change' },
        { pattern: /^[\d\w]+@.+\.\w+$/, message: '邮箱格式错误', trigger: 'blur' }
      ]
    },

    dialogVisible: false,
    previewAvatarUrl: '',

    cropper: undefined
  }),
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {

    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },

    changeUserProfile () {
      this.loading = true
      setUserProfile(this.user).then(res => {
        this.loading = true
        this.$message({
          type: 'success',
          message: '个人信息修改成功'
        })
      })
    },

    onFileChange () {
      const avatarFile = this.$refs.avatarFile.files[0]
      this.previewAvatarUrl = window.URL.createObjectURL(avatarFile)

      this.dialogVisible = true

      this.$refs.avatarFile.value = ''
    },

    onDialogOpened () {
      if (!this.cropper) {
        this.cropper = new Cropper(this.$refs.cropImage, {
          aspectRatio: 16 / 9,
          crop (event) {
            console.log(event.detail.x)
            console.log(event.detail.y)
            console.log(event.detail.width)
            console.log(event.detail.height)
            console.log(event.detail.rotate)
            console.log(event.detail.scaleX)
            console.log(event.detail.scaleY)
          }
        })
      } else {
        this.cropper.replace(this.previewAvatarUrl)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .crop-box {
    width: 90%;
    .crop-image {
      display: block;
      max-width: 100%;
      max-height: 400px;
    }
  }
</style>
