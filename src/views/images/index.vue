<template>
  <div class="images-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <image-list>
      </image-list>
    </el-card>
  </div>
</template>

<script>
import ImageList from '@/components/imageList.vue'

export default {
  name: 'ImagesIndex',
  components: {
    ImageList
  },
  props: {},
  data: () => ({

  }),
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
