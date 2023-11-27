import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '../views/layout/MainLayout.vue'
import useUserStore from '@/stores/user.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'club',
          name: 'club',
          component: () => import('../views/ClubView.vue')
        }
      ],
      meta: {
        needAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        needAuth: false
      }
    }
  ]
})

router.beforeEach((to) => {
  const userStore = useUserStore()

  if (to.meta.needAuth && !userStore.token) {
    return { name: 'login' }
  }

  if (to.name === 'login' && userStore.token) {
    return { name: 'home' }
  }
})

export default router
