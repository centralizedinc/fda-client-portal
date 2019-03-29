import axios from 'axios';

// axios.defaults.headers.common['access_token'] = store.state.user

export default class LicenseAPI {
    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getLicenses(cb) {
        axios.get('lto-api/').then((result) => {
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            console.log('######getLicenses error :', err)
            cb(err)
        })
    }

    getActiveLicense() {
        return axios.get('lto-api/active')
    }

    getLicenseByID(id) {
        return axios.get('lto-api/' + id)
    }

    getLicenseTasks() {
        return axios.get('lto-api/task')
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

    uploadLicenses(formData) {
        return axios.post('lto-api/upload/', formData)
    }

    updateLicenseByID(id, license) {
        return axios.post('lto-api/' + id, license)
    }

    saveLicenses(data) {
        return axios.post('lto-api/', data.license)
    }

    applyLicense(lic_data) {
        var saved_license = {};
        var lic_case = {}
        return new Promise((resolve, reject) => {
            axios.post('lto-api/', lic_data.license)
                // Save License Application first
                .then(result1 => {
                    console.log("RESULT SAVING LICENSE: " + JSON.stringify(result1.data))
                    if (result1.data.success) {
                        lic_case = result1.data;
                        saved_license = result1.data.model.license;
                        return axios.post('documents/uploads?account_id=' + saved_license.case_no, lic_data.upload)
                    } else {
                        resolve(result1.data)
                    }
                })
                // upload file attachments to AWS S3
                .then(result2 => {
                    console.log("RESULT UPLOADING FILES: " + JSON.stringify(result2.data))
                    var files = result2.data.model
                    saved_license.uploaded_files = files;
                    if (result2.data.success) {
                        return axios.post('lto-api/' + saved_license._id, saved_license)
                    } else {
                        resolve(result2.data)
                    }

                })
                // update license application merging uploaded files
                .then(result3 => {
                    console.log("RESULT UPDATING LICENSE: " + JSON.stringify(result3.data))
                    lic_case.license = result3.data.model;
                    resolve(lic_case)

                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    applyLicenseWithAccount(lic_data) {
        var saved_license = {};
        var lic_case = {}
        return new Promise((resolve, reject) => {
            axios.post('public/accounts/register/', {
                    license: lic_data.license,
                    account: lic_data.account
                })
                // Save License Application first
                .then(result1 => {
                    console.log("RESULT SAVING LICENSE: " + JSON.stringify(result1.data))
                    if (result1.data.success) {
                        lic_case = result1.data.model;
                        saved_license = result1.data.model.application.license;
                        return axios.post('documents/uploads?account_id=' + saved_license.case_no, lic_data.upload)
                    } else {
                        resolve(result1.data)
                    }
                })
                // upload file attachments to AWS S3
                .then(result2 => {
                    console.log("RESULT UPLOADING FILES: " + JSON.stringify(result2.data))
                    var files = result2.data.model
                    saved_license.uploaded_files = files;
                    if (result2.data.success) {
                        return axios.post('lto-api/' + saved_license._id, saved_license)
                    } else {
                        resolve(result2.data)
                    }

                })
                // update license application merging uploaded files
                .then(result3 => {
                    console.log("RESULT UPDATING LICENSE: " + JSON.stringify(result3.data))
                    lic_case.success = true;
                    lic_case.application.license = result3.data.model;
                    resolve(lic_case)

                })
                .catch(err => {
                    reject(err)
                })
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
        console.log("api existing licenses: " + JSON.stringify(licenses))
        axios.get('lto-api/verify/', licenses).then((result) => {
            cb(result.data.model)
        }).catch(err => {
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
        axios.get('lto-api/case/unassigned').then((result) => {
            cb(result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    variateLicense(form) {
        return axios.post('lto-api/variation', form);
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