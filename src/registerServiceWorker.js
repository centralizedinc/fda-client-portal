/* eslint-disable no-console */

import { register } from 'register-service-worker'
import axios from 'axios'

/**
 * Global PWA variables
 */

const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

window.fda_pwa = {
  
  applicationServerKey:urlB64ToUint8Array('BBNvP5Z_RO8RnvXMAKHJQC-WUHxF36L2-oxlXbL9-OxdJsEpUK3Ed67KVXwMydf5QvpM8vxfNsDdTaCG0CoQ_Ro'),
  isSubscribed:false,
  subscription: {},
  registration:{},
  /**
   * 
   * @param {*} registration 
   */
  checkSubscription(registration) {
    registration.pushManager.getSubscription()
      .then((subscription) => {
        console.log("subsription", JSON.stringify(subscription))
        this.subscription = subscription;
        this.registration = registration;
        this.isSubscribed = !(subscription === null)
    })
  },
  /**
   * 
   * @param {String} account_id 
   */
  askPermission(account_id){
    console.log('permission: ', Notification.permission )
    if(!Notification.permission || Notification.permission === 'default'){ 
      Notification.requestPermission(result => {
        console.log('result from permission question', result);
        if(Notification.permission === 'granted'){
          this.subscribe(account_id)
        }
      })
    } 
  },
  /**
   * 
   */
  subscribe(account_id){
    const options = {applicationServerKey:this.applicationServerKey, userVisibleOnly: true}
    this.registration.pushManager.subscribe(options)
      .then(subscription=>{
        console.log('subscription: ', JSON.stringify(subscription))
        var details = {subscription, account_id}
        return axios.post(process.env.VUE_APP_API_BASE_URI + '/notify-api/subscriptions/subscribe',details)               
      })
      .then(result=>{
        console.log(JSON.stringify(result.data))
        this.sendWelcomeNofitication()
      })
      .catch(error=>{
        console.error('error: ',error)
      })
  },
  /**
   * 
   */
  sendWelcomeNofitication(){
    this.registration.showNotification('FDA Portal v3.0', {
      body: 'You are now subscribed to FDA Portal Notifications',
      icon: '/img/icons/vue-logo.png'
    });
  }
}

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {      
    },
    registered (registration) {
      //check for updates every 1hr
      setInterval(() => {registration.update()}, 1000 * 60 * 60);
      //check permission
      window.fda_pwa.checkSubscription(registration)
      // console.log('Notification.permission', Notification.permission)
      // checkNotificationPermission(registration)

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

