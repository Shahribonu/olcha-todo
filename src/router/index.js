import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/TodoApp.vue'
import MainPage from '../views/MainPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage
    },
  
    {
      path: '/project/:projectId',
      name: 'project',
      component: HomeView,
      props: true, 
    },
  ]
})

export default router
