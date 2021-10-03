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
        ref="form"
        :model="form"
        label-width="40px"
        size="mini"
      >
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select
            v-model="form.region"
            placeholder="请选择频道"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共筛选到n条结果：</span>
      </div>

      <el-table
        :data="articles"
        style="width: 100%"
        size="mini"
        stripe>
        <el-table-column
          prop="coverrrrr"
          label="封面">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
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
              @click="handleDelete(scope.$index, scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        layout="prev, pager, next"
        class="pagination"
        :total="1000"
        background
      >
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
import { getUserArticles } from '@/api/articles.js'

export default {
  name: 'ArticlesIndex',
  components: {},
  props: {},
  data: () => ({
    form: {
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    },

    articles: [],

    statusInfo: {
      0: { text: '草稿', type: 'info' },
      1: { text: '待审核', type: '' },
      2: { text: '审核通过', type: 'success' },
      3: { text: '审核失败', type: 'warning' },
      4: { text: '已删除', type: 'danger' }
    }
  }),
  computed: {},
  watch: {},
  created () {
    this.loadUserArticles()
  },
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },

    loadUserArticles () {
      getUserArticles().then(res => {
        this.articles = res.data.data.results
      })
    },

    handleEdit (index, row) {
      console.log(index, row)
    },

    handleDelete (index, row) {
      console.log(index, row)
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
