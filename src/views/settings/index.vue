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
                :disabled="isDifferent"
                @click="changeUserProfile"
              >修改</el-button>
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
        <el-button
          type="primary"
          :loading="avatarLoading"
          @click="onAvatarReady"
        >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile, setUserProfile, setUserAvatar } from '@/api/user.js'
import globalBus from '@/utils/bus.js'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  name: 'SettingsIndex',
  components: {},
  props: {},
  data: () => ({
    loading: false,
    avatarLoading: false,

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
        { min: 1, max: 7, message: '昵称为1~7个字', trigger: 'blur' }
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

    userInitials: '',

    dialogVisible: false,
    previewAvatarUrl: '',

    cropper: undefined,

    disabled: true
  }),
  computed: {
    isDifferent () {
      return this.userInitials === JSON.stringify(this.user)
    }
  },
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {

    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data

        this.userInitials = JSON.stringify(this.user)
      })
    },

    changeUserProfile () {
      this.loading = true
      setUserProfile(this.user).then(res => {
        this.loading = false
        this.userInitials = JSON.stringify(this.user)

        globalBus.$emit('set-user-name', this.user.name)

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
          aspectRatio: 1,
          viewMode: 1,
          dragMode: 'none',
          modal: false,
          guides: false,
          rotatable: false,
          cropBoxResizable: false
        })
      } else {
        this.cropper.replace(this.previewAvatarUrl)
      }
    },

    onAvatarReady () {
      this.avatarLoading = true
      this.cropper.getCroppedCanvas().toBlob(blob => {
        const fd = new FormData()
        fd.append('photo', blob)

        setUserAvatar(fd).then(res => {
          this.avatarLoading = false
          this.dialogVisible = false

          this.user.photo = window.URL.createObjectURL(blob)
          this.userInitials = JSON.stringify(this.user)

          globalBus.$emit('set-user-photo', this.user.photo)
        }).catch(() => {
          this.avatarLoading = false
          this.$message({
            type: 'error',
            message: '上传失败，请重新提交！'
          })
        })
      })
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
