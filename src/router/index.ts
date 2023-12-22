// Composables
import { ValidateUser } from '@/components/utils/ValidateUser'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        beforeEnter: async (to, from) => ValidateUser(),
        component: () => import('@/components/Sidebar.vue'),
        children: [
          // {
          //   path: '',
          //   name: 'Home',
          //   component: () => import('@/views/Home.vue'),
          // },
          {
            path: '/produk',
            name: 'Product',
            component: () => import('@/views/Product.vue')
          },
          {
            path: '/transaksi',
            name: 'Transaction',
            component: () => import('@/views/Transaction.vue')
          },
        ]
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
