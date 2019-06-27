import TaskApi from '../../api/TaskApi';
import LicenseAPI from '../../api/LicenseApi';

var initialState = {
    tasks: []
}

const state = JSON.parse(JSON.stringify(initialState))

const mutations = {
    SET_TASKS(state, task) {
        state.tasks = task;
    },
    CLEAR_DATA(state) {
      Object.keys(initialState).forEach(key => {
        state[key] = initialState[key]
      })
    }
}

var actions = {
    GET_TASKS(context) {
        return new Promise((resolve, reject) => {
            new LicenseAPI(context.rootState.user_session.token).getLicenseTasks()
                .then((result) => {
                    if (result.data.success) {
                        context.commit('SET_TASKS', result.data.model)
                        resolve(result.data.model)
                    } else {
                        reject(result.data.errors)
                    }
                }).catch((err) => {
                    console.log("get tasks err :", err)
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