// import setAuthToken from '@/axios-config.js'
// var jwt = require('jsonwebtoken')
import LicenseAPI from '../../api/LicenseApi';

const state = {
    LicenseAPI: null,
    licenses: [],
    form: null,
    uploaded: null,
    existingLicense: null,
    isRenew: false
}

const mutations = {
    SET_LICENSES(state, licenses) {
        state.licenses = null;
        state.licenses = licenses;
    },
    SET_FORM(state, {
        form,
        isRenew
    }) {
        state.isRenew = isRenew ? isRenew : false;
        state.form = null;
        state.form = form;
        console.log("set form store mutation: " + JSON.stringify(state.form))
    },
    UPLOADED_DATA(state, form) {
        state.uploaded = form
    },
    VERIFIED_LICENSES(state, license) {
        state.existingLicense = license
    }
}

var actions = {
    // GET_UNASSIGNED(context) {
    //     if(context.rootState.user_session.token){
    //         return new Promise((resolve, reject) => {

    //         })
    //     }
    // },
    GET_UNAPPROVED_LICENSES(context) {
        return new Promise((resolve, reject) => {
            new LicenseAPI(context.rootState.user_session.token).getUnapprovedLicense((err, license) => {
                if (!err) {
                    console.log('getUnapprovedLicense: ' + JSON.stringify(license));
                    resolve(license)
                } else {
                    console.log(JSON.stringify(err))
                    reject(err)
                }
            })
        })
    },
    GET_LICENSES(context) {
        return new Promise((resolve, reject) => {
            new LicenseAPI(context.rootState.user_session.token).getLicenses((err, licenses) => {
                if (!err) {
                    console.log('license: ' + JSON.stringify(licenses));

                    context.commit('SET_LICENSES', licenses)
                    resolve()
                } else {
                    console.log(JSON.stringify(err))
                    reject()
                }
            })
        })
    },
    SAVE_LICENSES(context, license) {
        return new Promise((resolve, reject) => {
            new LicenseAPI(context.rootState.user_session.token).saveLicenses(license, (licenses, err) => {
                if (!err) {
                    console.log('actions save licenses store: ' + JSON.stringify(licenses))
                    context.commit('SET_FORM', licenses)
                    resolve()
                } else {
                    console.log("actions save licenses error: " + JSON.stringify(err))
                    reject()
                }
            })
        })
    },
    SAVE_MODIFY_LICENSES(context, license) {
        return new Promise((resolve, reject) => {
            new LicenseAPI(context.rootState.user_session.token).modifyLicenses(license, (licenses, err) => {
                if (!err) {
                    console.log('actions save modify licenses: ' + JSON.stringify(licenses))
                    resolve()
                } else {
                    console.log("actions save modify licenses error: " + JSON.stringify(err))
                    reject()
                }
            })
        })
    },
    UPLOAD_LICENSES(context, uploadData) {
        return new Promise((resolve, reject) => {
            new LicenseAPI(context.rootState.user_session.token).uploadLicenses(uploadData, (uploadedData, err) => {
                if (!err) {
                    context.commit('UPLOADED_DATA', uploadedData)
                    resolve(uploadedData)
                } else {
                    console.log(JSON.stringify(err))
                    reject(err)
                }
            })
        })
    },
    VERIFY_LICENSES(context, license) {
        return new Promise((resolve, reject) => {
            console.log("verify licenses entering action: " + JSON.stringify(license))
            new LicenseAPI(context.rootState.user_session.token).verifyExistingLicenses(license, (verifiedLicense, err) => {
                if (!err) {
                    console.log("verify licenses call back: " + JSON.stringify(verifiedLicense))
                    context.commit('VERIFIED_LICENSES', verifiedLicense)
                    resolve(verifiedLicense)
                } else {
                    console.log("verify licenses error: " + JSON.stringify(err))
                    reject(err)
                }
            })
        })
    },
    GET_LICENSE_BY_ID(context, {
        app_id,
        application_type
    }) {
        return new Promise((resolve, reject) => {
            new LicenseAPI(context.rootState.user_session.token).getLicenseByID(app_id, (err, license) => {
                if (!err) {
                    var isRenew = false;
                    if (application_type) {
                        license.application_type = application_type;
                        isRenew = application_type === 2;
                    }
                    context.commit('SET_FORM', {
                        form: license,
                        isRenew: isRenew
                    });
                    resolve(license)
                } else {
                    console.log('#####err GET_LICENSE_BY_ID :', err);
                    reject(err)
                }
            })
        })
    }
}

export default {
    state,
    mutations,
    actions
}