<template>
  <span>
    <el-image
      class="upload-span"
      fit="cover"
      :src="value"
      @click.native="dialogVisible=true"
    >
      <div slot="placeholder">
        <i class="el-icon-loading"></i>
      </div>
      <div slot="error">
        <i class="el-icon-plus"></i>
      </div>
    </el-image>

    <el-dialog
      title="选择封面"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <el-tabs
        v-model="activeTab"
        type="card"
        @tab-click="tabClick"
      >
        <el-tab-pane
          label="素材"
          name="images"
        >
          <image-list
            ref="imageList"
            :isShowUpload="false"
            :isShowBar="false"
            :ratio="2"
            @input="onSelected"
          >
          </image-list>
        </el-tab-pane>
        <el-tab-pane
          label="上传"
          name="upload"
        >
          <input
            type="file"
            ref="imgFile"
            @change="onFileChange"
          >
          <img
            src=""
            ref="imgUpload"
            width="200px"
          >
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :disabled="coverPreparing"
          @click="onCoverConfirm"
        >确定
        </el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
import { uploadImage } from '@/api/images/'
import ImageList from '@/components/imageList.vue'

export default {
  name: 'ArticleCover',
  components: {
    ImageList
  },
  props: ['value'],
  data: () => ({
    dialogVisible: false,
    coverPreparing: true,
    activeTab: 'images'
  }),
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },

    tabClick (tab, event) {
      this.coverPreparing = true
    },

    onFileChange () {
      const blob = window.URL.createObjectURL(this.$refs.imgFile.files[0])
      this.$refs.imgUpload.src = blob
      this.coverPreparing = false
    },

    onSelected (select) {
      this.coverPreparing = (select === null)
    },

    onCoverConfirm () {
      if (this.activeTab === 'upload') {
        const file = this.$refs.imgFile.files[0]
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          this.coverPreparing = true
          this.dialogVisible = false

          this.$emit('input', res.data.data.url)
        })
      } else {
        this.dialogVisible = false
        const index = this.$refs.imageList.selected
        this.$emit('input', this.$refs.imageList.images[index].url)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .upload-span {
    width: 100px;
    height: 100px;
    margin: 10px 10px 0 0;
    border-radius: 5px;
    border: 1px dashed lightgray;
    color: lightgray;
    text-align: center;
    line-height: 100px;
    font-size: 24px;
    cursor: pointer;
  }
  .upload-span:hover {
      color: #409EFF;
      border-color: #409EFF;
    }
</style>
