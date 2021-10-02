<template>
  <el-container class="layout-container">
    <el-aside
      class="aside"
      width="200px"
    >
      <nav-aside
        class="nav-aside-menu"
      ></nav-aside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i class="el-icon-s-fold"></i>
          <span>欢迎进入个人空间</span>
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <img
              class="avatar"
              src="https://tva3.sinaimg.cn/crop.0.0.799.799.1024/ed955329jw8f7lfpfzhblj20m80m7jtp.jpg"
              alt=""
            >
            <strong>某某用户</strong>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              class="el-icon-setting"
            >个人设置</el-dropdown-item>
            <el-dropdown-item
              class="el-icon-circle-close"
            >退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavAside from './components/aside.vue'

export default {
  name: 'LayoutIndex',
  components: {
    NavAside
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
  .layout-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    .aside {
        // background-color: #d3dce6;

        .nav-aside-menu {
          height: 100%;
        }
      }

    .header {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      .el-dropdown-link {
        cursor: pointer;
        color: gray;
        display: flex;
        align-items: center;
        .avatar {
          margin-right: 5px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
    }

    .main {
      background-color: #e9eef3;
    }
  }
</style>
