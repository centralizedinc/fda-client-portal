import axios from 'axios';

// axios.defaults.headers.common['access_token'] = store.state.user

export default class LicenseAPI {
    constructor(token) {
        axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0';
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getLicenses(cb) {
        axios.get('lto-api/').then((result) => {
            console.log('get licenses: ' + JSON.stringify(result));

            if (result.data.success) {
                cb(result.data.model)
            } else {
                cb(result.data.errors)
            }
        }).catch(err => {
            console.log('##########error: ' + JSON.stringify(err))
            cb(err)
        })
    }

    getUnapprovedLicense(cb) {
        axios.get('lto-api/unapproved/').then((result) => {
            console.log('getUnapprovedLicense: ' + JSON.stringify(result));
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            console.log('##########error: ' + JSON.stringify(err))
            cb(err)
        })
    }

    uploadLicenses(licenses, cb) {
        axios.post('lto-api/upload/', licenses).then((result) => {
            console.log("post licenses: " + JSON.stringify(result.data));
            cb(result.data.model)
        }).catch(err => {
            console.log('##########error save uploadLicenses: ' + JSON.stringify(err))
            cb(err)
        })
    }

    saveLicenses(licenses, cb) {
        console.log('actions save licenses api: ' + JSON.stringify(licenses))
        axios.post('lto-api/', licenses).then((result) => {
            console.log("post licenses: " + JSON.stringify(result.data.model));
            cb(result.data.model)
        }).catch(err => {
            console.log('##########error save saveLicenses: ' + JSON.stringify(err))
            cb(err)
        })
    }

    modifyLicenses(licenses, cb) {
        console.log('actions save modify licenses: ' + JSON.stringify(licenses))
        axios.post('lto-api/claim', licenses).then((result) => {
            console.log("post  claim licenses: " + JSON.stringify(result.data.model));
            cb(result.data.model)
        }).catch(err => {
            console.log('##########error save modifyLicenses: ' + JSON.stringify(err))
            cb(err)
        })
    }


    verifyExistingLicenses(licenses, cb) {
        console.log("api existing licenses: " +JSON.stringify(licenses))
        axios.post('lto-api/verify/existing/license', licenses).then((result) => {
            cb(result.data.model)
        }).catch(err =>{
            cb(err)
        })
    }

    applicationStatusLicenses(cb) {
        // axios.get('lto-api/case/'+licenses).then((result)=>{    
        //     cb(result.data.model)
        // }).catch(err =>{
        //     cb(err)
        // })
        console.log("applicationStatusLicenses")
        axios.get('lto-api/case/unassigned').then((result)=>{    
            cb(result.data.model)
        }).catch(err =>{
            cb(err)
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