import axios from 'axios';

// axios.defaults.headers.common['access_token'] = store.state.user

export default class CertificateAPI {
    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    foodProduct(cb) {
        console.log("Food Certificates API!!!")
        axios.get('core/food/product')
          .then(result => {
              console.log("Food product result: " + JSON.stringify(result))
            if (result.data.success) {
              cb(result.data.model)
            }
          })
          .catch(err => {
            console.log(JSON.stringify(err));
            cb(null, err)
          });
      }

      foodCategory(cb) {
        console.log("Food Certificates API!!!")
        axios.get('core/food/category')
          .then(result => {
              console.log("Food category result: " + JSON.stringify(result))
            if (result.data.success) {
              cb(result.data.model)
            }
          })
          .catch(err => {
            console.log(JSON.stringify(err));
            cb(null, err)
          });
      }

      shelfLife(cb) {
        console.log("Food Certificates API!!!")
        axios.get('core/shelflife')
          .then(result => {
              console.log("shelf life result: " + JSON.stringify(result))
            if (result.data.success) {
              cb(result.data.model)
            }
          })
          .catch(err => {
            console.log(JSON.stringify(err));
            cb(null, err)
          });
      }



    
}