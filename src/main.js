import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.less'

// 加载ElementUI组件库
import ElementUI from 'element-ui'
// 加载ElementUI组件库样式
import 'element-ui/lib/theme-chalk/index.css'
// 全局注册ElementUI组件库
Vue.use(ElementUI)

// 全局注册Element-tiptap富文本编辑器
// import { ElementTiptapPlugin } from 'element-tiptap'
// import 'element-tiptap/lib/index.css'
// Vue.use(ElementTiptapPlugin, {
//   lang: 'zh'
// })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
