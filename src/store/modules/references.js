import ReferenceAPI from '../../api/ReferenceAPI';

var initialState = {
    id_types: [],
    designations: []
}

const state = JSON.parse(JSON.stringify(initialState))

const mutations = {
    INITIALIZE(state, token) {
        new ReferenceAPI(token);
        console.log("Reference API initialize");
        console.time('test')
    },
    SET_ID_TYPES(state, data) {
        state.id_types = data;
    },
    SET_DESIGNATIONS(state, data) {
        state.designations = data;
    },
    CLEAR_DATA(state) {
      Object.keys(initialState).forEach(key => {
        state[key] = initialState[key]
      })
    }
}

var actions = {
    GET_REFERENCES(context, refresh) {
        context.commit('INITIALIZE', context.rootState.user_session.token)
        return new Promise((resolve, reject) => {
            if (!refresh &&
                context.state.id_types && context.state.id_types.length > 0 &&
                context.state.designations && context.state.designations.length > 0) {
                resolve({
                    id_types: context.state.id_types,
                    designations: context.state.designations
                })
            } else {
                var references = {};
                ReferenceAPI.getIdTypes()
                    .then((result) => {
                        if (result.data.success) {
                            context.commit('SET_ID_TYPES', result.data.model)
                            references.id_types = result.data.model;
                            return ReferenceAPI.getDesignations()
                        } else {
                            reject(result.data.errors)
                        }
                    })
                    .then((result) => {
                        if (result.data.success) {
                            context.commit('SET_DESIGNATIONS', result.data.model)
                            references.designations = result.data.model;
                            resolve(references)
                        } else {
                            reject(result.data.errors)
                        }
                    })
                    .catch((err) => {
                        reject(err)
                    });

            }
        })
    }
}

export default {
    state,
    mutations,
    actions
}