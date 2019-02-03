// import setAuthToken from '@/axios-config.js'
// var jwt = require('jsonwebtoken')
import store from '../index'
import LicenseAPI from '../../api/LicenseApi';

const state = {
    LicenseAPI: null,
    licenses: [],
    productType: []
}

const mutations = {
    SET_LICENSES(state, licenses) {
        // console.log('mutations licenses: ' + JSON.stringify(licenses))
        state.licenses = licenses;
    },
    SET_PRODUCT_TYPE(state, licenses){
        licenses.forEach(element => {
            state.productType.push(element);
        });
        
        console.log("commited data to state product type: " + JSON.stringify(state.productType))
    }
}

var actions = {
    GET_LICENSES(context) {
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
    GET_PRODUCT_TYPE(context) {
        new LicenseAPI(context.rootState.user_session.token).productType((productType, err) => {
            console.log("product type data store!!!!!!: " + JSON.stringify(productType))
            if(!err){
                context.commit('SET_PRODUCT_TYPE', productType)
            }else{
                console.log(JSON.stringify(err))
            }
        })
    },
    SAVE_LICENSES(context, license){
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
