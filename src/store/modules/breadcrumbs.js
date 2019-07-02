var initialState = {
  navigation: []
}

const state = JSON.parse(JSON.stringify(initialState))

const mutations = {
  DROP_BREADCRUMBS: function (state, payload) {
    var index = state.navigation.map(e => e.name).indexOf(payload.name);
    if (index > -1) {
      state.navigation.splice(index + 1, state.navigation.length)
    } else {
      state.navigation.push(payload)
    }
  },

  PICKUP_BREADCRUMBS: function (state, payload) {
    //remove all
    state.navigation = []
  },
  CLEAR_DATA(state) {
    Object.keys(initialState).forEach(key => {
      state[key] = initialState[key]
    })
  }
}


export default {
  state,
  mutations
};