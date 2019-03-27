// import setAuthToken from '@/axios-config.js'
// var jwt = require('jsonwebtoken')

import RegistrationAPI from "@/api/RegistrationAPI";
import UserAPI from "@/api/UserAPI";
import PasswordApi from '../../api/PasswordAPI';
import ProductAPI from "../../api/ProductApi";

const state = {
  isAuthenticated: false,
  token: null,
  user: {},
  task: {},
  registration_details: {},
  admin_user: null
};

const mutations = {
  LOGIN: function (state, payload) {
    state.user = payload.user;
    state.token = payload.token;
    state.isAuthenticated = payload.isMatch;
    new UserAPI(payload.token);
    console.log("PAYLOAD: " + JSON.stringify(payload))
  },
  LOGOUT: function (state) {
    state.user = {};
    state.token = false;
    state.isAuthenticated = false;
  },
  CURRENT_TASK: function (state, payload) {
    state.task = payload;
  },
  REGISTER: (state, payload) => {
    state.registration_details = payload;
  },
  ADMIN: (state, payload) => {
    state.admin_user = payload
  },
  UPDATE_USER: (state, user) => {
    state.user = user;
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
  REGISTER: (context, account) => {
    return new Promise((resolve, reject) => {
      RegistrationAPI.register(account, (res, err) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      });
    })
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
          if (res.isConfirmed) context.commit('LOGIN', res);
          context.dispatch('GET_PRODUCT_REFERENCE')
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
    context.commit("CLEAR_DATA")
    context.commit('LOGOUT')
    context.commit('PICKUP_BREADCRUMBS')
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

  GET_ADMIN(context) {
    return new Promise((resolve, reject) => {
      console.log("get admin action")
      new UserAPI(context.rootState.user_session.token).getAdmin((err, admin) => {
        if (!err) {
          context.commit('ADMIN', admin)
          resolve(admin)
        } else {
          reject(err)
        }
      })
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