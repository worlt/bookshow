import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/components/Home/LoginNet.vue')
  },


  {
    path: '/Home',
    name: 'Home',
    component: () => import('@/components/Home/Index.vue')
  },

  {
    path: '/LiteraTure',
    name: 'LiteraTure',
    component: () => import('@/components/BookClassify/LiteraTure.vue')
  },

  {
    path: '/NaturalScience',
    name: 'NaturalScience',
    component: () => import('@/components/BookClassify/NaturalScience.vue')
  },

  {
    path: '/ComputerScience',
    name: 'ComputerScience',
    component: () => import('@/components/BookClassify/ComputerScience.vue')
  },

  {
    path: '/ChemistrY',
    name: 'ChemistrY',
    component: () => import('@/components/BookClassify/ChemistrY.vue')
  },

  {
    path: '/Book/',
    name: 'Book',
    component: () => import('@/components/Home/BookDetails.vue')
  },

  {
    path: '/Author/',
    name: 'Author',
    component: () => import('@/components/Author/AuthorDetails.vue')
  },

  {
    path: '/AllAuthor/',
    name: 'AllAuthor',
    component: () => import('@/components/Author/Authors.vue')
  },


]

const router = new VueRouter({
  routes
})

export default router
