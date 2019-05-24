if (workbox) {
    console.log(`Workbox is loaded`);    
    workbox.precaching.precacheAndRoute(self.__precacheManifest);
  } 
  else {
    console.log(`Workbox didn't load`);
  }
  
  self.addEventListener('push', function(ev) {
    var data = ev.data.text();
    if(!data){
        data = ev.data.json()
    }
    self.registration.showNotification(data.title, {
      body: 'Hello, World!',
      icon: '/img/icons/vue-logo.png'
    });
  });
  
  self.addEventListener('message', (e) => {
    if (!e.data) {
      return;
    }
  
    switch (e.data) {
      case 'skipWaiting':
        self.skipWaiting();
        break;
      default:
        // NOOP
        break;
    }
  });
  
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