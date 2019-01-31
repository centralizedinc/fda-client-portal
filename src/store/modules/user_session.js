// import setAuthToken from '@/axios-config.js'
// var jwt = require('jsonwebtoken')

import RegistrationAPI from "@/api/RegistrationAPI";

const state = {
  isAuthenticated: false,
  token: "sample_tokenssss",
  user: {},
  task: {},
  registration_details: {},
  REGISTRATION_API: null
};

const mutations = {
  LOGIN: function(state, payload) {
    state.user = payload.user;
    state.token = payload.token;
    state.isAuthenticated = true;
  },
  LOGOUT: function(state) {
    state.user = {};
    state.token = false;
    state.isAuthenticated = false;
  },
  CHECK_SESSION: function(state) {
    // var decoded = jwt.verify(state.token, 'D!m3 P0rt@l')
  },
  CURRENT_TASK: function(state, payload) {
    state.task = payload;
  },
  REGISTER: (state, payload) => {
    state.registration_details = payload;
  }
};

var actions = {
  // checkAdmin: (state, data) => {
  //   console.log('############ calling token: ' + JSON.stringify(state.state.user._id))
  //   var instance = setAuthToken(state.state.token)
  //   return instance.get('/api/users/isAdmin/' + state.state.user._id)
  // }

  REGISTER: (context, obj) => {
    console.log("calling REGISTER....")
    if (!context.state.RegistrationAPI) {
      context.state.RegistrationAPI = new RegistrationAPI();
    }
    context.state.RegistrationAPI.register(obj.user,(res, err) => {
      if (!err) {
        context.commit("REGISTER", res);
      } else {
        console.log(JSON.stringify(err));
        // console.log(JSON.stringify(obj.vm))
        obj.vm.$notify(err)
      }
    });
  }
};

export default {
  state,
  mutations,
  actions
};
