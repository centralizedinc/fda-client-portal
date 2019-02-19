// import setAuthToken from '@/axios-config.js'
// var jwt = require('jsonwebtoken')
import store from '../index'
import LicenseAPI from '../../api/LicenseApi';
import {
    resolve
} from 'url';

const state = {
    LicenseAPI: null,
    licenses: [],
    form: null,
    uploaded: null,
    existingLicense: null
}

const mutations = {
    SET_LICENSES(state, licenses) {
        state.licenses = null;
        state.licenses = licenses;
    },
    SET_FORM(state, form) {
        state.form = null;
        state.form = form;
        console.log("set form store mutation: " + JSON.stringify(state.form))
    },
    UPLOADED_DATA(state, form) {
        state.uploaded = form
    },
    VERIFIED_LICENSES(state, license){
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
            new LicenseAPI(context.rootState.user_session.token).getUnapprovedLicense((license, err) => {
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
            new LicenseAPI(context.rootState.user_session.token).getLicenses((licenses, err) => {
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
    VERIFY_LICENSES(context, license){
        return new Promise((resolve, reject) => {
            console.log("verify licenses entering action: " + JSON.stringify(license))
            new LicenseAPI(context.rootState.user_session.token).verifyExistingLicenses(license, (verifiedLicense, err) => {
                if (!err) {
                    console.log("verify licenses call back: " + JSON.stringify(verifiedLicense))
                    context.commit('VERIFIED_LICENSES', verifiedLicense)
                    resolve(verifiedLicense)
                } else {
                    console.log("verify licenses error: "+JSON.stringify(err))
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