import type { Theme } from 'vitepress'
import OreUITheme from '../../../theme/index'
import HomePage from './components/HomePage.vue'

const DocsTheme: Theme = {
  extends: OreUITheme,
  async enhanceApp(ctx) {
    if (OreUITheme.enhanceApp) await OreUITheme.enhanceApp(ctx)
    ctx.app.component('HomePage', HomePage)
  }
}

export default DocsTheme
