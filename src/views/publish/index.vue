<template>
  <div class="publish-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-form
        ref="form"
        :model="form"
        label-width="40px"
      >
        <el-form-item label="标题">
          <el-input
            v-model="form.title">
          </el-input>
        </el-form-item>
        <el-form-item label="正文">
          <el-input
            type="textarea"
            v-model="form.content">
          </el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select
            v-model="form.channel_id"
            placeholder="请选择"
          >
            <el-option
              :label="ch.name"
              :value="ch.id"
              v-for="ch in channelInfo"
              :key="ch.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="loading"
            @click="onSubmit(false)"
          >发布</el-button>
          <el-button
            :disabled="loading"
            @click="onSubmit(true)"
          >存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getChannels, publishArticle } from '@/api/articles.js'

export default {
  name: 'PublishIndex',
  components: {},
  props: {},
  data: () => ({
    loading: false,

    form: {
      title: '',
      content: '',
      cover: {
        type: 0,
        images: []
      },
      channel_id: null
    },

    channelInfo: []
  }),
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    loadChannels () {
      getChannels().then(res => {
        this.channelInfo = res.data.data.channels
      })
    },

    onSubmit (isCraft = false) {
      this.loading = true

      publishArticle(this.form, isCraft).then(res => {
        this.$message({
          type: 'success',
          message: isCraft ? '已存为草稿' : '发布成功'
        })
      })

      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
