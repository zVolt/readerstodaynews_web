import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home'
import CategoriesPage from './pages/CategoriesPage'
import CategoryPage from './pages/CategoryPage'
import PostPage from './pages/PostPage'
import AboutPage from './pages/AboutPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Readers Today News',
        metaTags: [
          {
            name: 'description',
            content: 'home page of Readers Today News.'
          },
        ]
      },
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
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/categories/',
      name: 'categories',
      component: CategoriesPage
      // component: () => import(/* webpackChunkName: "about" */ './pages/Home.vue')
    }
  ]
})