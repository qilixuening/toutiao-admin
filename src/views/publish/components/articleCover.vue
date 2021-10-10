<template>
  <span>
    <i
      class="el-icon-plus"
      @click="dialogVisible=true"
    >
    </i>

    <el-dialog
      title="选择封面"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <el-tabs
        v-model="activeTab"
        type="card"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="素材"
          name="images"
        >素材管理页面
        </el-tab-pane>
        <el-tab-pane
          label="上传"
          name="upload"
        >上传页面
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>

export default {
  name: 'ArticleCover',
  components: {},
  props: {},
  data: () => ({
    dialogVisible: false,
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

    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="less" scoped>
  .el-icon-plus {
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
  .el-icon-plus:hover {
      color: #409EFF;
      border-color: #409EFF;
    }
</style>
