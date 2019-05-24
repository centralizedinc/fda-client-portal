/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {      
    },
    registered (registration) {
      //check for updates every 1hr
      setInterval(() => {registration.update()}, 1000 * 60 * 60);
      //check permission
      console.log('Notification.permission', Notification.permission)
      checkNotificationPermission(registration)

    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated (registration) {
      console.log('New content is available; please refresh.')
      document.dispatchEvent(new CustomEvent('swUpdated', { detail: registration }));
    },
    offline (registration) {
      console.log('No internet connection found. App is running in offline mode.')
      document.dispatchEvent(new CustomEvent('swOffline', { detail: registration }));
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}

function checkNotificationPermission(registration){
  if(!Notification.permission || Notification.permission === 'default'){ 
    Notification.requestPermission(result => {
      console.log('result from permission question', result);
      if(Notification.permission === 'granted'){
        sendWelcomeNofitication(registration)
      }
    })
  } 
}

function sendWelcomeNofitication(registration){
  registration.showNotification('FDA Portal v3.0', {
    body: 'You are now subscribed to FDA Portal Notifications',
    icon: '/img/icons/vue-logo.png'
  });
}
