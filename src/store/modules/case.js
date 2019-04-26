import CaseAPI from '../../api/CaseAPI';

const state = {
    cases: [],
    complied: [],
    view_case: {},
    active_case_activities: []
    // getCase: {}
}

const mutations = {
    SET_CASES(state, cases) {
        state.cases = cases;
    },
    SET_COMPLY(state, cases) {
        state.complied = cases;
    },
    CLEAR_DATA(state) {
        state.cases = [];
    },
    SET_VIEW_CASE(state, case_details) {
        state.view_case = case_details
    },
    SET_ACTIVE_ACTIVITIES(state, activities) {
        state.active_case_activities = activities;
    }
    // SET_ONE_CASE(state, cases){
    //     state.getCase = cases;
    // }
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
    },
    GET_ONE_CASE(context, case_no) {
        return new Promise((resolve, reject) => {
            new CaseAPI(context.rootState.user_session.token).getCaseByCaseNumber(case_no)
                .then((result) => {
                    if (result.data.success) {
                        // context.commit('SET_ONE_CASE', result.data.model);
                        resolve(result.data.model)
                    } else {
                        console.log('SET_ONE_CASE err :', result.data.errors)
                        reject(result.data.errors)
                    }
                }).catch((err) => {
                    console.log('err :', err);
                    reject(err)
                });
        })
    },
    GET_COMPLY(context) {
        return new Promise((resolve, reject) => {
            new CaseAPI(context.rootState.user_session.token).getComply()
                .then((result) => {
                    if (result.data.success) context.commit('SET_COMPLY', result.data.model);
                    resolve(result.data)
                }).catch((err) => {
                    reject(err)
                });
        })
    },
    SAVE_COMPLY(context, comply) {
        return new Promise((resolve, reject) => {
            var CaseApi = new CaseAPI(context.rootState.user_session.token);
            CaseApi.uploadFile(comply)
                .then((result) => {
                    var files = result.data.model
                    console.log('files :', files);
                    var compliance = {
                        case_id: comply.case_id,
                        remarks: comply.remarks,
                        files: files
                    }
                    return CaseApi.submitCompliance(compliance)
                }).then((result) => {
                    console.log('result :', result);
                    resolve(result.data)
                })
                .catch((err) => {
                    reject(err)
                });
        })
    },
    GET_ACTIVITIES(context, refresh) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                if (refresh ||
                    !context.state.active_case_activities ||
                    context.state.active_case_activities.length === 0) {
                    new CaseAPI(context.rootState.user_session.token)
                        .getActivities()
                        .then((result) => {
                            if (result.data.success) {
                                context.commit('SET_ACTIVE_ACTIVITIES', result.data.model);
                                resolve(result.data.model)
                            } else reject(result.data.errors)
                        }).catch((err) => {
                            console.log('GET_ACTIVITIES err :', err);
                            reject(err)
                        });
                } else {
                    resolve(context.state.active_case_activities)
                }
            })
        }
    }
}

export default {
    state,
    mutations,
    actions
}