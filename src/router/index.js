import Vue from 'vue'
import VueRouter from 'vue-router'

// const isRunningLocally = process.env.NODE_ENV !== 'production'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})
