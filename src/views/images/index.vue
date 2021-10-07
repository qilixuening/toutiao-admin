<template>
  <div class="images-container">
        <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-radio-group
        style="padding-bottom: 20px"
        v-model="isFavorite"
        size="mini"
        @change="loadUserImages">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button
        style="float: right"
        type="success"
        size="mini"
        icon="el-icon-upload"
        @click="ShowUploadDialog"
      >上传素材</el-button>

      <el-row :gutter="10">
        <el-col
          :xs="12"
          :sm="8"
          :md="6"
          :lg="4"
          :xl="3"
          v-for="img in images"
          :key="img.id"
        >
          <el-image
            style="height: 200px"
            :src="img.url"
            fit="cover"
          >
          </el-image>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      title="上传图片"
      width="400px"
      :append-to-body="true"
      :visible.sync="isShowUploadDialog"
      :before-close="onClosingDialog"
    >
      <el-upload
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        multiple
        :on-success="onUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getUserImages } from '@/api/images'
export default {
  name: 'ImagesIndex',
  components: {},
  props: {},
  data: () => ({
    isFavorite: false,
    isShowUploadDialog: false,
    uploadHeaders: {
      Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('user')).token}`
    },

    images: []
  }),
  computed: {},
  watch: {},
  created () {
    this.loadUserImages()
  },
  mounted () {},
  methods: {
    loadUserImages () {
      getUserImages({
        collect: this.isFavorite
      }).then(res => {
        this.images = res.data.data.results
      })
    },

    ShowUploadDialog () {
      this.isShowUploadDialog = true
    },

    onUploadSuccess () {
      this.loadUserImages()
      this.isShowUploadDialog = false
    },

    onClosingDialog (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang="less" scoped>
</style>
