<template>
  <div class="image-list-container">
    <el-radio-group
      style="padding-bottom: 20px"
      v-model="isFavorite"
      size="mini"
      @change="loadUserImages(1)">
      <el-radio-button :label="false">全部</el-radio-button>
      <el-radio-button :label="true">收藏</el-radio-button>
    </el-radio-group>
    <el-button
      v-if="isShowUpload"
      style="float: right"
      type="success"
      size="mini"
      icon="el-icon-upload"
      @click="ShowUploadDialog"
    >上传素材</el-button>

    <el-row :gutter="10">
      <el-col
        class="img-box"
        :xs="12*ratio"
        :sm="8*ratio"
        :md="6*ratio"
        :lg="4*ratio"
        :xl="3*ratio"
        v-for="(img, index) in images"
        :key="img.id"
        @click.native="onSelectCover(index)"
      >
        <el-image
          style="height: 200px; width: 100%"
          :src="img.url"
          fit="cover"
          lazy
        >
        </el-image>
        <div
          v-if="isShowBar"
          class="img-bar"
        >
          <el-button
            class="op-button"
            type="plain"
            circle
            :icon="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            :loading="img.loading"
            @click="onAlterImageInfo(img)"
          >
          </el-button>
          <el-button
            class="op-button"
            type="plain"
            icon="el-icon-delete"
            circle
            :loading="img.loading"
            @click="onDeleteImage(img)"
          >
          </el-button>
        </div>
        <div v-else-if="selected===index"
          class="img-radio"
        >
          <i class="el-icon-success"></i>
        </div>
      </el-col>
    </el-row>

    <el-pagination
      class="pagination"
      layout="prev, pager, next"
      background
      :total="totalCount"
      :page-size="pageSize/ratio"
      :disabled="loading"
      :current-page.sync="page"
      @current-change="onPageChange"
    >
    </el-pagination>

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
import { getUserImages, alterImageInfo, deleteImage } from '@/api/images'
export default {
  name: 'ImageList',
  components: {},
  props: {
    isShowUpload: {
      type: Boolean,
      default: true
    },
    isShowBar: {
      type: Boolean,
      default: true
    },
    ratio: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    loading: false,

    isFavorite: false,
    isShowUploadDialog: false,
    uploadHeaders: {
      Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('user')).token}`
    },

    page: 1,
    pageSize: 24,
    totalCount: 0,

    images: [],

    selected: null
  }),
  computed: {},
  watch: {},
  created () {
    this.loadUserImages()
  },
  mounted () {},
  methods: {
    loadUserImages (page = 1) {
      this.loading = true

      this.selected = null
      this.$emit('input', this.selected)

      this.page = page
      getUserImages({
        collect: this.isFavorite,
        page,
        per_page: this.pageSize / this.ratio
      }).then(res => {
        const ret = res.data.data.results
        ret.forEach(img => {
          img.loading = false
        })
        this.images = ret
        this.totalCount = res.data.data.total_count
      })

      this.loading = false
    },

    ShowUploadDialog () {
      this.isShowUploadDialog = true
    },

    onUploadSuccess () {
      this.loadUserImages()

      this.$message({
        type: 'success',
        message: '上传成功！'
      })
      this.isShowUploadDialog = false
    },

    onClosingDialog (done) {
      this.$confirm('是否暂停上传？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },

    onPageChange (page) {
      this.loadUserImages(page)
    },

    onAlterImageInfo (img) {
      img.loading = true
      alterImageInfo(img.id, !img.is_collected).then(res => {
        img.loading = false
        img.is_collected = !img.is_collected
      })
    },

    onDeleteImage (img) {
      img.loading = true
      deleteImage(img.id).then(res => {
        this.loadUserImages(this.page)
      })
    },

    onSelectCover (index) {
      this.selected = index
      this.$emit('input', this.selected)
    }
  }
}
</script>

<style lang="less" scoped>
  .img-box {
    position: relative;
    margin: 3px 0;

    .img-bar {
      height: 24px;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 3px;
      left: 5px;
      right: 5px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      .op-button {
        padding: 0;
        background: none;
        border: none;
        font-size: 18px;
        color: rgb(235, 233, 233);
      }
    }

    .img-radio {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      font-size: 40px;
      color: #67C23A;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
  }

  .pagination {
    margin-top: 20px;
  }
</style>
