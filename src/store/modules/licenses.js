// import setAuthToken from '@/axios-config.js'
// var jwt = require('jsonwebtoken')
import store from '../index'
import LicenseAPI from '../../api/LicenseApi';
import { resolve } from 'url';

const state = {
    LicenseAPI: null,
    licenses: [],
    productType: [],
    primaryActivity: [],
    secondaryActivity: [],
    additional: [],
    declared: []
}

const mutations = {
    SET_LICENSES(state, licenses) {
        // console.log('mutations licenses: ' + JSON.stringify(licenses))
        state.licenses = licenses;
    },
    SET_PRODUCT_TYPE(state, licenses){
        state.productType = licenses;
        
        console.log("commited data to state product type: " + JSON.stringify(state.productType))
    },
    SET_PRIMARY_ACTIVITY(state, productType){
        state.primaryActivity = productType;
    },
    SET_SECONDARY_ACTIVITY(state, primaryActivity){
        state.secondaryActivity = primaryActivity;
    },
    SET_ADDITIONAL(state, primaryActivity){
        state.additional = primaryActivity;
    },
    SET_DECLARED(state, primaryActivity){
        state.declared = primaryActivity;
    },
}

var actions = {
    GET_UNASSIGNED(context) {
        if(context.rootState.user_session.token){
            return new Promise((resolve, reject) => {
                
            })
        }
    },
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
    SAVE_LICENSES(context, license){
        new LicenseAPI(context.rootState.user_session.token).saveLicenses(license, (licenses, err) => {
            if(!err){
                console.log('actions save licenses: ' + JSON.stringify(licenses))
            }else{
                console.log("actions save licenses error: " + JSON.stringify(err))
            }          
        })
    },
    GET_PRODUCT_TYPE(context) {
        return new Promise((resolve, reject) => {
            new LicenseAPI(context.rootState.user_session.token).productType((productType, err) => {
                console.log("product type data store!!!!!!: " + JSON.stringify(productType))
                if(!err){
                    context.commit('SET_PRODUCT_TYPE', productType)
                    resolve()
                }else{
                    console.log(JSON.stringify(err))
                    reject(err)
                }
            })
        })
        
    },
    GET_PRIMARY_ACTIVITY(context) {
        new LicenseAPI(context.rootState.user_session.token).primary(product, (productType, err) => {
            console.log("product type data store!!!!!!: " + JSON.stringify(productType))
            if(!err){
                context.commit('SET_PRIMARY_ACTIVITY', productType)
            }else{
                console.log(JSON.stringify(err))
            }
        })
    },
    GET_SECONDARY_ACTIVITY(context) {
        new LicenseAPI(context.rootState.user_session.token).secondary(primaryActivity, (primaryActivity, err) => {
            console.log("product type data store!!!!!!: " + JSON.stringify(primaryActivity))
            if(!err){
                context.commit('SET_SECONDARY_ACTIVITY', primaryActivity)
            }else{
                console.log(JSON.stringify(err))
            }
        })
    },
    GET_SECONDARY_ACTIVITY(context) {
        new LicenseAPI(context.rootState.user_session.token).secondary(primaryActivity, (primaryActivity, err) => {
            console.log("product type data store!!!!!!: " + JSON.stringify(primaryActivity))
            if(!err){
                context.commit('SET_SECONDARY_ACTIVITY', primaryActivity)
            }else{
                console.log(JSON.stringify(err))
            }
        })
    },
    GET_ADDITIONAL(context) {
        new LicenseAPI(context.rootState.user_session.token).additional(primaryActivity, (primaryActivity, err) => {
            console.log("product type data store!!!!!!: " + JSON.stringify(primaryActivity))
            if(!err){
                context.commit('SET_ADDITIONAL', primaryActivity)
            }else{
                console.log(JSON.stringify(err))
            }
        })
    },
    GET_DECLARED(context) {
        new LicenseAPI(context.rootState.user_session.token).declared(primaryActivity, (primaryActivity, err) => {
            console.log("product type data store!!!!!!: " + JSON.stringify(primaryActivity))
            if(!err){
                context.commit('SET_DECLARED', primaryActivity)
            }else{
                console.log(JSON.stringify(err))
            }
        })
    },
    
}

export default {
    state,
    mutations,
    actions
}
