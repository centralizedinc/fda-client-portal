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
            new CaseAPI(context.rootState.user_session.token).getLicenseCases((err, cases) => {
                if (!err) {
                    context.commit('SET_CASES', cases);
                    resolve(cases)
                } else {
                    console.log('GET_CASES err :', err)
                    reject(err)
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