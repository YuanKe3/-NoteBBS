import App from './App'
import { createSSRApp } from 'vue'
import store from './store/index.js'
import uviewPlus from '@/uni_modules/uview-plus'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store).use(uviewPlus)
  return {
    app
  }
}