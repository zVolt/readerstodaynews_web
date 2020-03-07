import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import PostPage from './pages/PostPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/category/:category_name',
      name: 'category',
      component: CategoryPage
    },
    {
      path: '/post/:slug',
      name: 'post_by_slug',
      component: PostPage
    },
    // {
    //   path: '/category/',
    //   name: 'categories',
    //   component: CategoriesPage
    //   component: () => import(/* webpackChunkName: "about" */ './pages/Home.vue')
    // }
  ]
})