import Vue from 'vue'
import Router from 'vue-router'
import UserLayout from '@/layout/UserLayout'
import MainLayout from '@/layout/MainLayout'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Main',
      component: MainLayout,
      children: [{
        path: '',
        name: 'Login',
        component: () => import('@/views/Login.vue')
      }]

    },
    {
      path: '/app',
      component: UserLayout,
      children: [{
          path: '',
          name: 'Dashboard',
          component: () => import('@/views/app/UserPortfolio.vue')
        },
        {
          path: 'licenses',
          name: 'License to Operate',
          component: () => import('@/views/app/licenses/Licenses.vue')
        },
        {
          path: 'licenses/apply',
          name: 'New License Application',
          component: () => import('@/views/app/licenses/Create.vue')
        },
        {
          path: 'certificates',
          name: 'Certificate of Product Registration',
          component: () => import('@/views/app/certificates/Certificates.vue')
        },
        {
          path: 'certificates/apply',
          name: 'New Certificate of Product Registration',
          component: () => import('@/views/app/certificates/Apply.vue')
        },
        {
          path: 'notification',
          name: 'Product Notification',
          component: () => import('@/views/app/notification/Notification.vue')
        },
        {
          path: 'notification/apply',
          name: 'New Product Notification',
          component: () => import('@/views/app/notification/Apply.vue')
        },
        {
          path: 'payments',
          name: 'Payments',
          component: () => import('@/views/app/UserPortfolio.vue')
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('@/views/app/UserPortfolio.vue')
        },
        {
          path: 'password',
          name: 'Password',
          component: () => import('@/views/app/UserPortfolio.vue')
        },
        {
          path: 'logout',
          name: 'Logout',
          component: () => import('@/views/app/UserPortfolio.vue')
        },
      ]

    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})