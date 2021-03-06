// import setAuthToken from '@/axios-config.js'
// var jwt = require('jsonwebtoken')

import RegistrationAPI from "@/api/RegistrationAPI";
import UserAPI from "@/api/UserAPI";
import PasswordApi from '../../api/PasswordAPI';
import ProductAPI from "../../api/ProductApi";

var initialState = {
  isAuthenticated: false,
  token: null,
  user: {},
  task: {},
  registration_details: {}
};

const state = JSON.parse(JSON.stringify(initialState))

const mutations = {
  LOGIN: function (state, payload) {
    state.user = payload.user;
    state.token = payload.token;
    state.isAuthenticated = payload.isMatch;
    new UserAPI(payload.token);
  },
  CURRENT_TASK: function (state, payload) {
    state.task = payload;
  },
  REGISTER: (state, payload) => {
    state.registration_details = payload;
  },
  UPDATE_USER: (state, user) => {
    state.user = user;
  },
  CLEAR_DATA(state) {
    Object.keys(initialState).forEach(key => {
      state[key] = initialState[key]
    })
  }
};

var actions = {

  /**
   * @description check if the user session is valid or activated
   */
  CHECK_SESSION: (context, username) => {
    return new Promise((resolve, reject) => {
      UserAPI.verifyStatus(username, (result, err) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  /**
   * @description invoke Registration API
   */
  REGISTER: (context, new_license) => {
    return RegistrationAPI.register(new_license);
  },

  /**
   * @description email confirmation
   */
  CONFIRM: (context, key) => {
    return new Promise((resolve, reject) => {
      RegistrationAPI.confirm(key, (res, err) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  },

  /**
   * @description invoke LOGIN API
   */
  LOGIN: (context, credentials) => {
    return new Promise((resolve, reject) => {
      UserAPI.login(credentials, (res, err) => {
        if (!err) {
          if (res.isConfirmed && res.isMatch) {
            context.commit('LOGIN', res);
            context.dispatch('GET_PRODUCT_REFERENCE')
          }
          resolve(res)
        } else {
          console.log(JSON.stringify(err));
          reject(err)
        }
      })
    })
  },

  /**
   * @description remove user session and breadcrumbs history stored in cache
   */
  LOGOUT: (context) => {
    console.log('Logging out...');
    context.commit("CLEAR_DATA")
  },

  /**
   * @description send account recovery
   */
  FORGOT_PASSWORD: (context, email) => {
    return new Promise((resolve, reject) => {
      UserAPI.forgotPassword(email, (res, err) => {
        if (!err) {
          resolve(res)
        } else {
          console.log(JSON.stringify(err));
          reject(err)
        }
      })
    })
  },

  CONFIRM_ACCOUNT_RECOVERY: (context, key) => {
    return new Promise((resolve, reject) => {
      UserAPI.confirmAccountRecovery(key, (res, err) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  },

  /**
   * @description change user password
   */
  CHANGE_PASSWORD: function (context, account) {
    return new Promise((resolve, reject) => {
      console.log('Calling Change Password!')
      UserAPI.changePassword(account, (res, err) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  },

  UPDATE_ACCOUNT: (context, account) => {
    return new Promise((resolve, reject) => {
      UserAPI.updateAccount(account)
        .then((result) => {
          if (result.success) {
            context.commit('UPDATE_USER', result.model)
          }
          resolve(result)
        }).catch((err) => {
          reject(err)
        });
    })
  },

  REQUEST_RESET_PASSWORD(context, old_password) {
    return new PasswordApi(context.rootState.user_session.token)
      .requestResetPassword(old_password)
  },

  CONFIRM_RESET_PASSWORD(context, token) {
    return new PasswordApi(token).confirmResetPassword()
  },

  RESET_PASSWORD(context, account) {
    console.log('account :', account);
    return new PasswordApi().resetPassword(account)
  }
};

export default {
  state,
  mutations,
  actions
};