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
      component: MainLayout,
      children: [{
          path: '',
          name: 'Preface',
          component: () => import('@/views/Preface.vue'),
          beforeEnter: isAuthenticated
        }, {
          path: '/registration/new',
          name: 'Registration',
          component: () => import('@/views/registration/Register.vue')
        },
        {
          path: '/registration/pay',
          name: 'Payment',
          component: () => import('@/views/app/payment/PaymentSummary.vue')
        },
        {
          path: '/registration/existing',
          name: 'Registration with Existing License',
          component: () => import('@/views/registration/Existing.vue')
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
        },
        {
          path: '/result/certificate/:key',
          name: 'Certificate Result',
          component: () => import('@/views/CertificateResult.vue')
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
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/UserPortfolio.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'licenses',
          name: 'License to Operate',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/licenses/Licenses.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'licenses/view',
          name: 'View License Application',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/licenses/View.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'licenses/renew',
          name: 'Renewal License Application',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/licenses/Renew.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'licenses/variation',
          name: 'Variate License Application',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/licenses/Variation.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'licenses/pay',
          name: 'Pay License',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/payment/PaymentSummary.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'certificate/pay',
          name: 'Pay Certificate',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/payment/PaymentSummary.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'licenses/summary',
          name: 'License Summary',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/licenses/View.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'certificates',
          name: 'Product Registration',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/certificates/Certificates.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'certificates/renew',
          name: 'Renewal Certificate of Product Registration',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/certificates/Renew.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'certificates/apply',
          name: 'New Certificate of Product Registration',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/certificates/Apply.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'notification/cosmetic',
          name: 'ASEAN Cosmetic Notification ',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/notification/Apply.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'notification/toys',
          name: 'Toys and Childcare Articles Notification ',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/notification/ApplyToys.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'notification/apply',
          name: 'New Product Notification',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/notification/Apply.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'certificates/overview',
          name: 'Application Overview',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/certificates/AppOverview.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'certificates/variation',
          name: 'Application Amendment',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/certificates/Variation.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'payments',
          name: 'Payments',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/payment/Payment.vue'),
          // beforeEnter: isAuthorized
        },
        {
          path: 'payments/paylater',
          name: 'Pay Later',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/payment/PayLater.vue'),
          // beforeEnter: isAuthorized
        },

        {
          path: 'payments/creditcard',
          name: 'Credit Card Payment',
          beforeEnter: dropBreadcrumbs,
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
          path: 'settings/notification',
          name: 'Settings',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/Subscription.vue')
        },
        {
          path: 'logout',
          name: 'Logout',
          beforeEnter: dropBreadcrumbs,
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