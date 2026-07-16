import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import MarkRead from './components/MarkRead.vue'
import ProgressBoard from './components/ProgressBoard.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册为全局组件，md 里可直接 <MarkRead /> / <ProgressBoard /> 使用
    app.component('MarkRead', MarkRead)
    app.component('ProgressBoard', ProgressBoard)
  },
} satisfies Theme
