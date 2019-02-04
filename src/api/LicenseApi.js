import axios from 'axios';

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0';
// axios.defaults.headers.common['access_token'] = store.state.user

export default class LicenseAPI {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        // axios.defaults.headers.common['access_token'] = token;
    }

    getLicenses(cb) {
        console.log('apis');
        axios.get('lto-api/').then((result) => {
            console.log('get licenses: ' + JSON.stringify(result.data));
            if (result.data.success) {
                cb(result.data.model)
            } else {
                cb(null, result.data.errors)
            }
        }).catch(err => {
            console.log('##########error: ' + JSON.stringify(err))
            cb(null, err)
        })
    }

    saveLicenses(licenses, cb) {
        console.log('apis save' + JSON.stringify(licenses))
        axios.post('lto-api/', licenses).then((result) => {
            console.log("licenses: " + JSON.stringify(result));
            console.log("post licenses: " + JSON.stringify(result.data));
           
        }).catch(err => {
            console.log('##########error save: ' + JSON.stringify(err))
            cb(null, err)
        })
    }

    productType(cb) {
        axios.get('lto-api/resource/product_type')
        .then(result => {
            console.log("product type License API result dat model: " + JSON.stringify(result.data.model));
            if (result.data.success) {
              cb(result.data.model)
            }
          })
          .catch(err => {
            console.log(JSON.stringify(err));
            cb(null, err)
          });
    }

    primary(productType, cb) {
        axios.get("lto-api/resource/primary/", productType)
        .then(result => {
          if (result.data.success) {
            cb(result.data.model)
          }
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    }

    secondary(primary, cb) {
        axios.get("lto-api/resource/secondary/", primary)
        .then(result => {
          if (result.data.success) {
            cb(result.data.model)
          }
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    }

    additional(primary, cb) {
        axios.get("lto-api/resource/additional/", primary)
        .then(result => {
          if (result.data.success) {
            cb(result.data.model)
          }
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    }

    declared(primary, cb) {
        axios.get("lto-api/resource/declared/", primary)
        .then(result => {
          if (result.data.success) {
            cb(result.data.model)
          }
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    }
}

// module.exports = LicenseAPI
// export default {
//     getLicenses(cb) {
//         axios.get('lto-api/').then(result => {
//             console.log(JSON.stringify(result.data));
//             if (result.data.success) {
//                 cb(result.data.model)
//             } else {
//                 cb()
//             }
//         });
//     }
// }