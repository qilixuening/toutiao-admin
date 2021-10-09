<template>
  <el-container class="layout-container">
    <el-aside
      class="aside"
      width="auto"
    >
      <nav-aside
        class="nav-aside-menu"
        :is-collapsed="isCollapsed"
      ></nav-aside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i
            :class="foldingStatus"
            @click="toggleCollapsed"
          ></i>
          <span>欢迎进入个人空间</span>
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <img
              class="avatar"
              :src="user.photo"
              alt=""
            >
            <strong>{{ user.name }}</strong>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              class="el-icon-setting"
              @click.native="$router.push('/settings')"
            >个人设置</el-dropdown-item>
            <el-dropdown-item
              class="el-icon-circle-close"
              @click.native="onLogout"
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
import { getUserProfile } from '@/api/user.js'
import globalBus from '@/utils/bus.js'

export default {
  name: 'LayoutIndex',
  components: {
    NavAside
  },
  props: {},
  data: () => ({
    user: {},
    isCollapsed: false
  }),
  computed: {
    foldingStatus () {
      return {
        'el-icon-s-unfold': this.isCollapsed,
        'el-icon-s-fold': !this.isCollapsed
      }
    }
  },
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {
    globalBus.$on('set-user-name', (name) => {
      this.user.name = name
    })

    globalBus.$on('set-user-photo', (photo) => {
      this.user.photo = photo
    })
  },
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },

    toggleCollapsed () {
      this.isCollapsed = !this.isCollapsed
    },
    onLogout () {
      this.$confirm('是否确定退出？', '登出提示', {
        conformButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
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
      i {
        margin-right: 5px;
        cursor: pointer;
      }
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
