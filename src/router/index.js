import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Details from '@/views/Details'
import Products from '@/views/Products'
import NotFound from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/index', component: Index },
  { path: '/details/:lid', component: Details, props: true },
  { path: '/products/:kw', component: Products, props: true },
  { path: '/*', component: NotFound }
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'themeColor'
})

export default router
