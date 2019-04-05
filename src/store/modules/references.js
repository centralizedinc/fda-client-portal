import ReferenceAPI from '../../api/ReferenceAPI';

const state = {
    id_types: [],
    designations: []
}

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
    CLEAR_REFERENCES(state) {
        state.id_types = [];
        state.designations = [];
    }
}

var actions = {
    GET_ID_TYPES(context) {
        return ReferenceAPI.getIdTypes()
    },
    GET_DESIGNATIONS(context) {
        return ReferenceAPI.getDesignations()
    }
}

export default {
    state,
    mutations,
    actions
}