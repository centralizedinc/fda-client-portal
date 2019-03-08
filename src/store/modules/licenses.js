// import setAuthToken from '@/axios-config.js'
// var jwt = require('jsonwebtoken')
import LicenseAPI from '../../api/LicenseApi';
import CaseAPI from '../../api/CaseAPI';

const state = {
    licenses: [],
    view_license: {},
    renewal_license: {},
    variation_license: {},
    details: {},
    form: null,
    uploaded: null,
    existingLicense: null
}

const mutations = {
    SET_LICENSES(state, licenses) {
        state.licenses = null;
        state.licenses = licenses;
    },
    SET_DETAILS(state, details) {
        state.details = details;
    },
    SET_RENEWAL(state, details) {
        state.renewal_license = details;
    },
    SET_VARIATION(state, details) {
        state.variation_license = details;
    },
    SET_FORM(state, form) {
        state.form = form;
    },
    UPLOADED_DATA(state, form) {
        state.uploaded = form
    },
    VERIFIED_LICENSES(state, license) {
        state.existingLicense = license
    },
    CLEAR_DATA(state) {
        state.licenses = []
        state.renewal_license = {}
        state.variation_license = {}
        state.details = {}
        state.form = null
        state.uploaded = null
        state.existingLicense = null
    },
    SET_VIEW_LICENSE(state, license) {
        state.view_license = license;
    }
}

var actions = {
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
                    resolve(licenses)
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
    GET_LICENSE_BY_ID(context, app_id) {
        return new LicenseAPI(context.rootState.user_session.token).getLicenseByID(app_id)
    },
    EXPIRY_LICENSES(context) {
        return new Promise((resolve, reject) => {
            console.log("expiry licenses entering action: ")
            new LicenseAPI(context.rootState.user_session.token).applicationStatusLicenses((payable, err) => {
                if (!err) {
                    console.log("verify licenses call back: " + JSON.stringify(payable))
                    // context.commit('VERIFIED_LICENSES', verifiedLicense)

                    resolve(payable)
                } else {
                    console.log("verify licenses error: " + JSON.stringify(err))
                    reject(err)
                }
            })
        })
    },
    APPLY_LICENSE(context, lic_data) {
        return new LicenseAPI(context.rootState.user_session.token).applyLicense(lic_data)
    },
    GET_ACTIVE_AND_CASES(context) {
        var token = context.rootState.user_session.token;
        if (token) {
            return new Promise((resolve, reject) => {
                var details = {};
                new LicenseAPI(token).getActiveLicense()
                    .then((result) => {
                        if (result.data.success) {
                            details = result.data.model;
                            return new CaseAPI(token).getLicenseCases()
                        } else {
                            reject(result.data.errors)
                        }
                    }).then((result) => {
                        if (result.data.success) {
                            details.cases = result.data.model;
                            context.commit('SET_DETAILS', details);
                            resolve(details);
                        } else {
                            reject(result.data.errors)
                        }
                    }).catch((err) => {
                        console.log('err :', err);
                        reject(err)
                    });
            })
        }
    },
    VARIATE_LICENSE(context, form) {
        return new Promise((resolve, reject) => {
            new LicenseAPI(context.rootState.user_session.token).variateLicense(form)
                .then((result) => {
                    resolve(result.data)
                }).catch((err) => {
                    reject(result.data.err)
                });
        })
    },
    GET_ACTIVE_LICENSE(context) {
        var token = context.rootState.user_session.token;
        if (token) {
            return new Promise((resolve, reject) => {
                new LicenseAPI(token).getActiveLicense().then((result) => {
                    resolve(result.data)
                }).catch((err) => {
                    reject(err)
                });
            })
        }
    }
}

export default {
    state,
    mutations,
    actions
}