import PlacesApi from '../../api/PlacesApi';

const state = {
    regions: [],
    provinces: [],
    city: []

}

const mutations = {
    //SET REGION
    SET_REGION(state, data) {
        state.regions = data
    },
    //SET PROVINCE
    SET_PROVINCE(state, data) {
        state.provinces = data
    },
    //SET CITY
    SET_CITY(state, data) {
        state.city = data
    }
}

var actions = {
    // REGION
    GET_REGION(context) {
        return new Promise((resolve, reject) => {
            new RegionType(context.rootState.user_session.token).getRegion((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_REGION', data)
                    resolve(data)
                }
            })
        })
    },
    //PROVINCE
    GET_PROVINCE(context) {
        return new Promise((resolve, reject) => {
            new RegionType(context.rootState.user_session.token).getProvince((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_PROVINCE', data)
                    resolve(data)
                }
            })
        })
    },
    //CITY
    GET_CITY(context) {
        return new Promise((resolve, reject) => {
            new RegionType(context.rootState.user_session.token).getCity((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_CITY', data)
                    resolve(data)
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