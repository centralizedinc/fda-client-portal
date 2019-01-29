// import setAuthToken from '@/axios-config.js'
// var jwt = require('jsonwebtoken')
import store from '../index'
import LicenseAPI from '../../api/LicenseApi';

const state = {
    LicenseAPI: null,
    licenses: []
}

const mutations = {
    API_INSTANCE(state, token) {
        state.LicenseAPI = new LicenseAPI(token);
    },
    SET_LICENSES(state, licenses) {
        // console.log('mutations licenses: ' + JSON.stringify(licenses))
        state.licenses = licenses;
    }
}

var actions = {
    SET_LICENSES(context) {
        if (!LicenseAPI)
            context.state.LicenseAPI.getLicenses((licenses, err) => {
                console.log('actions licenses: ' + JSON.stringify(licenses))
                if(!err){
                    context.commit('SET_LICENSES', licenses)
                } else {
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
