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

      source(cb) {
        console.log("Food Certificates API!!!")
        axios.get('core/source')
          .then(result => {
              console.log("source result: " + JSON.stringify(result))
            if (result.data.success) {
              cb(result.data.model)
            }
          })
          .catch(err => {
            console.log(JSON.stringify(err));
            cb(null, err)
          });
      }

      productSpecification(cb) {
        console.log("Food Certificates API!!!")
        axios.get('core/productSpecification')
          .then(result => {
              console.log("product specification result: " + JSON.stringify(result))
            if (result.data.success) {
              cb(result.data.model)
            }
          })
          .catch(err => {
            console.log(JSON.stringify(err));
            cb(null, err)
          });
      }

      nutritionInformation(cb) {
        console.log("Food Certificates API!!!")
        axios.get('core/notritionInformation')
          .then(result => {
              console.log("notrition information result: " + JSON.stringify(result))
            if (result.data.success) {
              cb(result.data.model)
            }
          })
          .catch(err => {
            console.log(JSON.stringify(err));
            cb(null, err)
          });
      }

      nutritionHealthClaims(cb) {
        console.log("Food Certificates API!!!")
        axios.get('core/nutritionHealthClaims')
          .then(result => {
              console.log("food health claim result: " + JSON.stringify(result))
            if (result.data.success) {
              cb(result.data.model)
            }
          })
          .catch(err => {
            console.log(JSON.stringify(err));
            cb(null, err)
          });
      }

      vitamins(cb) {
        console.log("Food Certificates API!!!")
        axios.get('core/vitamins')
          .then(result => {
              console.log("vitamins result: " + JSON.stringify(result))
            if (result.data.success) {
              cb(result.data.model)
            }
          })
          .catch(err => {
            console.log(JSON.stringify(err));
            cb(null, err)
          });
      }

      minerals(cb) {
        console.log("Food Certificates API!!!")
        axios.get('core/minerals')
          .then(result => {
              console.log("minerals result: " + JSON.stringify(result))
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