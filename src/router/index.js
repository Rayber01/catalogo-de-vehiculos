import { createRouter, createWebHistory } from 'vue-router'
import GalleryView from '../views/GalleryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Galería',
      component: GalleryView
    },
    {
      path: '/car/:id',
      name: 'Vista',
      component: () => import('../views/CarView.vue')
    }
  ]
})

export default router
