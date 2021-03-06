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
        axios.get('core/specifications')
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

      physicalParameter(cb) {
        console.log("Food Certificates API!!!")
        axios.get('core/physicalReference')
          .then(result => {
              console.log("physical parameter result: " + JSON.stringify(result))
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
        axios.get('core/nutrition')
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
        axios.get('core/health')
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

      companyActivity(cb) {
        console.log("Food Certificates API!!!")
        axios.get('core/company/activity')
          .then(result => {
              console.log("company activity result: " + JSON.stringify(result))
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