import Vue from 'vue'
import Router from 'vue-router'
import UserLayout from '@/layout/UserLayout'
import MainLayout from '@/layout/MainLayout'

import store from "@/store";


Vue.use(Router)

function isAuthorized(to, from, next) {
  store.dispatch('CHECK_SESSION', store.state.user_session.user.username)
    .then(result => {
      if (result.status === 2) {
        //leaving breadcrumbs behind    
        store.commit('DROP_BREADCRUMBS', {
          name: to.name,
          href: to.path
        })
        next()
      } else {
        next("/app")
      }
    })
    .catch(err => {
      next("/app")
    })
}

function isAuthenticated(to, from, next) {
  console.log('isAuth: ' + store.state.user_session.isAuthenticated);

  if (store.state.user_session.isAuthenticated) {
    next('/app');
  } else {
    next()
  }
}

function isActiveSession(to, from, next) {
  if (!store.state.user_session.isAuthenticated) {
    next("/");
  } else {
    store.commit('DROP_BREADCRUMBS', {
      name: to.name,
      href: to.path
    })
    next();
  }
}

function dropBreadcrumbs(to, from, next) {
  store.commit('DROP_BREADCRUMBS', {
    name: to.name,
    href: to.path
  })
  next();
}



var router = new Router({
  routes: [{
      path: '/',
      name: 'Main',
      component: MainLayout,
      children: [{
          path: '',
          name: 'Preface',
          component: () => import('@/views/Preface.vue'),
          beforeEnter: isAuthenticated
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/Login.vue'),
          beforeEnter: isAuthenticated
        }, {
          path: '/registration/new',
          name: 'Registrations',
          component: () => import('@/views/registration/Create.vue')
        },
        {
          path: '/signup',
          name: 'Registration',
          component: () => import('@/views/Registration.vue')
        },
        {
          path: '/registration/existing',
          name: 'Registration of Existing License',
          component: () => import('@/views/registration/existing/Validate.vue')
        },
        {
          path: '/confirmation',
          name: 'Confirmation',
          component: () => import('@/views/Confirmation.vue')
        },
        {
          path: '/recovery',
          name: 'Account Recovery',
          component: () => import('@/views/Recovery.vue')
        },
        {
          path: '/password/reset/:token',
          name: 'Reset Password',
          component: () => import('@/views/app/passwordSettings/ResetPassword.vue')
        },
        {
          path: '/result/license/:key',
          name: 'License Result',
          component: () => import('@/views/LicenseResult.vue')
        }
      ]

    },
    {
      path: '/app',
      component: UserLayout,
      beforeEnter: isActiveSession,
      children: [{
          path: '',
          name: 'Dashboard',
          component: () => import('@/views/app/UserPortfolio.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'licenses',
          name: 'License to Operate',
          component: () => import('@/views/app/licenses/Licenses.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'licenses/apply',
          name: 'New License Application',
          component: () => import('@/views/app/licenses/Create.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'licenses/view',
          name: 'View License Application',
          component: () => import('@/views/app/licenses/View.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'licenses/renew',
          name: 'Renewal License Application',
          component: () => import('@/views/app/licenses/Renew.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'licenses/variation',
          name: 'Variate License Application',
          component: () => import('@/views/app/licenses/Variation.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'licenses/summary',
          name: 'License Summary',
          component: () => import('@/views/app/TempLicenseSummary.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'certificates',
          name: 'Certificate of Product Registration',
          component: () => import('@/views/app/certificates/Certificates.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'certificates/apply',
          name: 'New Certificate of Product Registration',
          component: () => import('@/views/app/certificates/Apply.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'notification',
          name: 'Product Notification',
          component: () => import('@/views/app/notification/Notification.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'notification/apply',
          name: 'New Product Notification',
          component: () => import('@/views/app/notification/Apply.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'payments',
          name: 'Payments',
          component: () => import('@/views/app/payment/Payment.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'payments/paylater',
          name: 'Pay Later',
          component: () => import('@/views/app/payment/PayLater.vue'),
          // beforeEnter: isAuthorized
        },

        {
          path: 'payments/creditcard',
          name: 'Credit Card Payment',
          component: () => import('@/views/app/payment/CreditCardPayment.vue'),
          // beforeEnter: isAuthorized
        },

        {
          path: 'profile',
          name: 'Profile',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/Profile.vue')
        },
        {
          path: 'password',
          name: 'Change Password',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/passwordSettings/ChangePassword.vue')
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


export default router