// import setAuthToken from '@/axios-config.js'
// var jwt = require('jsonwebtoken')
import store from '../index'
import LicenseAPI from '../../api/LicenseApi';
import { resolve } from 'url';

const state = {
    LicenseAPI: null,
    licenses: [],
    form: null,
    uploaded: null
}

const mutations = {
    SET_LICENSES(state, licenses) {
        state.licenses = licenses;
    },
    SET_FORM(state, form){
        state.form = form
    },
    UPLOADED_DATA(state,form){
        state.uploaded = form
    }
}

var actions = {
    // GET_UNASSIGNED(context) {
    //     if(context.rootState.user_session.token){
    //         return new Promise((resolve, reject) => {
                
    //         })
    //     }
    // },
    GET_LICENSES(context) {
            new LicenseAPI(context.rootState.user_session.token).getLicenses((licenses, err) => {
                if(!err){
                    context.commit('SET_LICENSES', licenses)
                } else {
                    console.log(JSON.stringify(err))
                }
            })
    },
    SAVE_LICENSES(context, license){
        new LicenseAPI(context.rootState.user_session.token).saveLicenses(license,(licenses, err) => {
            if(!err){
                console.log('actions save licenses: ' + JSON.stringify(licenses))
            }else{
                console.log("actions save licenses error: " + JSON.stringify(err))
            }          
        })
    },
    UPLOAD_LICENSES(context, uploadData){
        new LicenseAPI(context.rootState.user_session.token).uploadLicenses(uploadData,(uploadedData, err) =>{
            if(!err){
                context.commit('UPLOADED_DATA', uploadedData)
            }else{
                console.log(JSON.stringify(err))
            }
        })
    }
    
}

export default {
    state,
    mutations,
    actions
}
