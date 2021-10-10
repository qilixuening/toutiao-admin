<template>
  <div class="publish-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.query.id ? '编辑' : '发布' }}文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-form
        ref="pubForm"
        :model="form"
        :rules="formRules"
        label-width="60px"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="form.title">
          </el-input>
        </el-form-item>
        <el-form-item label="正文" prop="content">
          <el-tiptap
            height="400px"
            placeholder="请在此输入内容"
            lang="zh"
            :extensions="extensions"
            v-model="form.content">
          </el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="form.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="form.cover.type > 0">
            <article-cover
              v-for="(cover, i) in form.cover.type"
              :key="cover"
              v-model="form.cover.images[i]"
            >
            </article-cover>
          </div>

        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select
            v-model="form.channel_id"
            placeholder="请选择"
          >
            <el-option
              :label="ch.name"
              :value="+ch.id"
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
import {
  getChannels,
  publishArticle,
  getArticle,
  updateArticle
} from '@/api/articles.js'

import { uploadImage } from '@/api/images.js'
import ArticleCover from './components/articleCover'

import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Link,
  Image,
  CodeBlock,
  Blockquote,
  TextAlign,
  Indent,
  HorizontalRule,
  Fullscreen
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'

export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap,
    ArticleCover
  },
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

    formRules: {
      title: [
        { required: true, message: '标题不能为空', trigger: 'change' },
        { min: 5, max: 30, message: '标题长度为5~30个字符', trigger: 'blur' }
      ],
      content: [
        { required: true, message: '正文内容不能为空', trigger: 'blur' },
        {
          validator: (_, value, callback) => {
            if (value === '<p></p>') {
              callback(new Error('正文内容不能为空'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }
      ],
      channel_id: [
        { required: true, message: '请选择文章所属频道' }
      ]
    },

    channelInfo: [],

    extensions: [
      new Doc(),
      new Text(),
      new Paragraph(),
      new Heading({ level: 3 }),
      new Bold(),
      new Underline(),
      new Italic(),
      new Strike(),
      new ListItem(),
      new BulletList(),
      new OrderedList(),
      new Link(),
      new Image({
        uploadRequest (file) {
          const fd = new FormData()
          fd.append('image', file)
          return uploadImage(fd).then(res => res.data.data.url)
        }
      }),
      new CodeBlock(),
      new Blockquote(),
      new TextAlign({ bubble: true, menubar: false }),
      new Indent(),
      new HorizontalRule(),
      new Fullscreen()
    ]
  }),
  computed: {},
  watch: {},
  created () {
    this.loadChannels()

    if (this.$route.query.id) {
      this.LoadArticle()
    }
  },
  mounted () {},
  methods: {
    loadChannels () {
      getChannels().then(res => {
        this.channelInfo = res.data.data.channels
      })
    },

    onImageSelected (index, url) {
      this.form.cover.images[index] = url
    },

    onSubmit (isDraft = false) {
      this.$refs.pubForm.validate(valid => {
        if (!valid) return

        // 如果是发布文章，那么封面数据的图片地址数组长度应该变更为实际图片的数量
        if (this.form.cover.type > 0) {
          this.form.cover.images.length = this.form.cover.type
        } else {
          this.form.cover.images.length = 0
        }

        this.loading = true

        const articleId = this.$route.query.id
        if (articleId) {
          updateArticle(articleId, this.form, isDraft).then(res => {
            this.$message({
              type: 'success',
              message: isDraft ? '变更已存入草稿' : '修改成功'
            })
            this.$router.push('/articles')
          })
        } else {
          publishArticle(this.form, isDraft).then(res => {
            this.$message({
              type: 'success',
              message: isDraft ? '已存为草稿' : '发布成功'
            })
            this.$router.push('/articles')
          })
        }
        this.loading = false
      })
    },

    LoadArticle () {
      getArticle(this.$route.query.id).then(res => {
        this.form = res.data.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
