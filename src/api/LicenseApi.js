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
        axios.get('lto-api/').then((result) => {
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
        axios.post('lto-api/', licenses).then((result) => {
            console.log("post licenses: " + JSON.stringify(result.data));
           
        }).catch(err => {
            console.log('##########error save: ' + JSON.stringify(err))
            cb(null, err)
        })
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