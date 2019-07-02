import PlacesApi from '../../api/PlacesApi';

var initialState = {
    regions: [],
    provinces: [],
    city: [],
    origin: [],
}

const state = JSON.parse(JSON.stringify(initialState))

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
    },

    // SET SOURCE OF ORIGIN
    SET_ORIGIN(state, data) {
        state.origin = data
    },
    CLEAR_DATA(state) {
      Object.keys(initialState).forEach(key => {
        state[key] = initialState[key]
      })
    }
}

var actions = {

    GET_PLACES_REFERENCE(context) {
        const placesAPI = new PlacesApi(context.rootState.user_session.token);
        var locations = {};
        return new Promise((resolve, reject) => {

            if(context.state.regions && context.state.regions.length >0
                && context.state.provinces && context.state.provinces.length >0
                && context.state.city && context.state.city.length >0){
                    resolve({
                        regions:context.state.regions,
                        provinces: context.state.provinces,
                        cities: context.state.city
                    })
            }else{
                placesAPI.getRegions()
                .then(regions => {
                    if (regions.data.success) {
                        locations.regions = regions.data.model;
                        context.commit('SET_REGION', regions.data.model)
                        return placesAPI.getProvinces()
                    } else {
                        resolve(null)
                    }
                })
                .then(provinces => {
                    if (provinces.data.success) {
                        locations.provinces = provinces.data.model;
                        context.commit('SET_PROVINCE', provinces.data.model)
                        return placesAPI.getCities()
                    } else {
                        resolve(null)
                    }
                })
                .then(cities => {
                    if (cities.data.success) {
                        locations.cities = cities.data.model
                        context.commit('SET_CITY', cities.data.model)
                        resolve(locations)
                    } else {
                        resolve(null)
                    }
                })
                .catch(err => {
                    reject(err)
                })
            }            
        })
    },

    // REGION
    GET_REGION(context) {
        return new Promise((resolve, reject) => {
            new PlacesApi(context.rootState.user_session.token).getRegion((err, data) => {
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
    GET_PROVINCE(context, regionId) {
        return new Promise((resolve, reject) => {
            new PlacesApi(context.rootState.user_session.token).getProvince(regionId, (err, data) => {
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
    GET_CITY(context, provinceId) {
        return new Promise((resolve, reject) => {
            new PlacesApi(context.rootState.user_session.token).getCity(provinceId, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_CITY', data)
                    resolve(data)
                }
            })
        })
    },
    //COUNTRY OF ORIGIN
    GET_ORIGIN(context) {
        return new Promise((resolve, reject) => {
            new PlacesApi(context.rootState.user_session.token).origin((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_ORIGIN', data)
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