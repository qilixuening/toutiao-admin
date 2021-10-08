<template>
  <div class="comments-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table
        :data="comments"
        v-loading="loading"
        style="width: 100%"
        size="mini"
        stripe>
        <el-table-column
          label="标题"
          prop="title"
        >
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="评论权限"
          width="100"
        >
          <template slot-scope="scope">
            <el-tag
              size="medium"
              :type="statusInfo[scope.row.comment_status].type">
              {{ statusInfo[scope.row.comment_status].text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="operations"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.toggleLoading"
              @change="onToggleStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        layout="prev, pager, next"
        class="pagination"
        :total="totalCount"
        :page-size="pageSize"
        :disabled="loading"
        :current-page.sync="page"
        background
        @current-change="onPageChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getUserArticles, toggleArticleCommentStatus } from '@/api/articles.js'

export default {
  name: 'CommentsIndex',
  components: {},
  props: {},
  data: () => ({
    loading: false,
    totalCount: 500,
    pageSize: 10,
    page: 1,

    comments: [],

    statusInfo: {
      false: { text: '关闭', type: 'info' },
      true: { text: '开启', type: 'success' }
    }
  }),
  computed: {},
  watch: {},
  created () {
    this.loadComments()
  },
  mounted () {},
  methods: {
    loadComments () {
      this.loading = true

      getUserArticles({
        page: this.page,
        per_page: this.pageSize,
        response_type: 'comment'
      }).then(res => {
        this.loading = false

        const { results, total_count: totalCount } = res.data.data
        results.forEach(element => {
          element.toggleLoading = false
        })
        this.comments = results
        this.totalCount = totalCount
      })
    },

    onToggleStatus (comment) {
      comment.toggleLoading = true

      toggleArticleCommentStatus(comment.id, comment.comment_status).then(res => {
        comment.toggleLoading = false

        this.$message({
          type: 'success',
          message: '评论权限变更成功'
        })
      }).catch(() => {
        comment.toggleLoading = false
        comment.comment_status = !comment.comment_status

        this.$message({
          type: 'warning',
          message: '评论权限变更失败'
        })
      })
    },

    onPageChange () {
      this.loadComments()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
