// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// 导入视频播放组件
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

const app = createApp(App)

app.use(createPinia())
app.use(VueVideoPlayer)


app.mount('#app')
