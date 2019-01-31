// import setAuthToken from '@/axios-config.js'
// var jwt = require('jsonwebtoken')
import store from '../index'
import LicenseAPI from '../../api/LicenseApi';

const state = {
    LicenseAPI: null,
    licenses: [],
    newLicense: []
}

const mutations = {
    SET_LICENSES(state, licenses) {
        // console.log('mutations licenses: ' + JSON.stringify(licenses))
        state.licenses = licenses;
    },
    SAVE_LICENSES(state, licenses){
        state.newLicense =licenses
    }
}

var actions = {
    GET_LICENSES(context) {
        // if (context.rootState.user_session.token){
            new LicenseAPI(context.rootState.user_session.token).getLicenses((licenses, err) => {
                console.log('actions licenses: ' + JSON.stringify(licenses))
                if(!err){
                    console.log('actions licenses: ' + JSON.stringify(licenses))
                    context.commit('SET_LICENSES', licenses)
                } else {
                    console.log(JSON.stringify(err))
                }
            })
        // }
    },
    SAVE_LICENSES(context, license){
        // console.log("Save context!!!" + JSON.stringify(context))
        console.log("Save licenses!!!" + JSON.stringify(license))
        new LicenseAPI(context.rootState.user_session.token).saveLicenses(license, (licenses, err) => {
            if(!err){
                console.log('actions save licenses: ' + JSON.stringify(licenses))
            }else{
                console.log("actions save licenses error: " + JSON.stringify(err))
            }          
        })
    }
}

export default {
    state,
    mutations,
    actions
}
