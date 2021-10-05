<template>
  <div class="articles-container">

    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-form
        ref="queryForm"
        :model="query"
        label-width="40px"
        size="mini"
      >
        <el-form-item label="状态">
          <el-radio-group v-model="query.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select
            v-model="query.channel"
            placeholder="全部"
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
        <el-form-item label="日期">
          <el-date-picker
            v-model="query.dateRange"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            range-separator="至"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="loading"
            @click="loadUserArticles(1)"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共筛选到{{ totalCount }}条结果：</span>
      </div>

      <el-table
        :data="articles"
        v-loading="loading"
        style="width: 100%"
        size="mini"
        stripe>
        <el-table-column
          label="封面"
          width="100">
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              fit="cover"
              referrer-policy="strict-origin"
              :src="scope.row.cover.images[0]"
              lazy
            >
              <div slot="error">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间"
          width="200">
        </el-table-column>
        <el-table-column
          label="状态"
          width="150">
          <template slot-scope="scope">
            <el-tag
              size="medium"
              :type="statusInfo[scope.row.status].type">
              {{ statusInfo[scope.row.status].text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="operations"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="handleEdit(scope.$index, scope.row)">
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              :id="scope.row.id"
              @click="onDeleteArticle(scope.row.id)">
            </el-button>
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
import { getUserArticles, getChannels, deleteUserArticle } from '@/api/articles.js'

export default {
  name: 'ArticlesIndex',
  components: {},
  props: {},
  data: () => ({
    loading: true,

    articles: [],

    totalCount: 0,
    pageSize: 10,
    page: 1,
    query: {
      status: null,
      channel: null,
      dateRange: []
    },

    statusInfo: {
      0: { text: '草稿', type: 'info' },
      1: { text: '待审核', type: '' },
      2: { text: '审核通过', type: 'success' },
      3: { text: '审核失败', type: 'warning' },
      4: { text: '已删除', type: 'danger' }
    },

    channelInfo: []
  }),
  computed: {
    pubdateRange () {
      if (this.query.dateRange == null) {
        return []
      } else {
        return this.query.dateRange
      }
    }
  },
  watch: {},
  created () {
    this.loadUserArticles(1)
    this.loadChannels()
  },
  mounted () {},
  methods: {
    loadUserArticles (page = 1) {
      this.loading = true

      getUserArticles({
        page,
        per_page: this.pageSize,
        status: this.query.status,
        channel_id: this.query.channel,
        begin_pubdate: this.pubdateRange[0],
        end_pubdate: this.pubdateRange[1]
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount

        this.loading = false
      })
    },

    loadChannels () {
      getChannels().then(res => {
        this.channelInfo = res.data.data.channels
      })
    },

    handleEdit (index, row) {
      console.log(index, row)
    },

    onPageChange (page) {
      this.loadUserArticles(page)
    },

    onDeleteArticle (articleId) {
      this.$confirm('是否确定删除？', '删除提示', {
        conformButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUserArticle(articleId).then(res => {
          if (res.status === 204) {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.loadUserArticles(this.page)
          } else {
            this.$message({
              type: 'error',
              message: '删除失败！'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.filter-card {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
}
</style>
