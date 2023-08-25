import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist  from 'pinia-plugin-persistedstate'
import App from './App.vue'
import Index from './components/index.vue'
import Nodes from './components/nodes.vue'
import Orders from './components/order.vue'
import Login from './components/login.vue'
import Cart from './components/cart.vue'
import Profile from './components/profile.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {createRouter,createWebHashHistory } from 'vue-router'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const routes = [
  { path: '/cart', component:Cart},
  { path: '/index', component:Index},
  { path: '/nodes', component:Nodes},
  { path: '/orders', component:Orders},
  { path: '/profile', component:Profile},
  { path: '/login', component:Login},
  { path: '/', component:Profile},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia);
app.use(router);
app.mount('#app');
