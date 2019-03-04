import CaseAPI from '../../api/CaseAPI';

const state = {
    cases: []
}

const mutations = {
    SET_CASES(state, cases) {
        state.cases = cases;
    },
    CLEAR_CASES(state) {
        state.cases = [];
    }
}

var actions = {
    GET_CASES(context) {
        return new Promise((resolve, reject) => {
            new CaseAPI(context.rootState.user_session.token).getLicenseCases()
            .then((result) => {
                if (result.data.success) {
                    context.commit('SET_CASES', result.data.model);
                    resolve(result.data.model)
                } else {
                    console.log('GET_CASES err :', result.data.errors)
                    reject(result.data.errors)
                }    
            }).catch((err) => {
                console.log('err :', err);
                reject(err)
            });
        })
    }
}

export default {
    state,
    mutations,
    actions
}