// import setAuthToken from '@/axios-config.js'
// var jwt = require('jsonwebtoken')
import LicenseAPI from "../../api/LicenseApi";
import CaseAPI from "../../api/CaseAPI";
import RegistrationAPI from "../../api/RegistrationAPI";

const state = {
  active_license: {},
  licenses: [],
  view_license: {},
  renewal_license: {},
  variation_license: {},
  details: {},
  form: null,
  uploaded: null,
  existingLicense: null,
  init_form: {
    current_task: "",
    user: "",
    action: "",
    created_by: "",
    date_created: "",
    application_type: "0",
    general_info: {
      product_type: "",
      primary_activity: "",
      declared_capital: "",
      addtl_activity: ""
    },
    estab_details: {
      establishment_name: "",
      establishment_owner: "",
      tin: "",
      email: "",
      landline: "",
      fax: "",
      mobile: "",
      products: [{
        prod_line: "",
        remarks: ""
      }]
    },
    address_list: [],
    auth_officer: {
      mail_add: {
        address: "",
        region: "",
        province: "",
        city: "",
        zipcode: ""
      },
      lastname: "",
      firstname: "",
      middlename: "",
      designation: "",
      email: "",
      tin: "",
      birthday: "",
      id_type: "",
      id_no: "",
      id_expiry: ""
    },
    qualified: [],
    uploaded_files: []
  },
  applicationForm: {},
  applicationAccount: {}
};

const mutations = {
  SET_LICENSES(state, licenses) {
    state.licenses = null;
    state.licenses = licenses;
  },
  SET_DETAILS(state, details) {
    state.details = details;
  },
  SET_RENEWAL(state, details) {
    state.renewal_license = details;
  },
  SET_VARIATION(state, details) {
    state.variation_license = details;
  },
  SET_FORM(state, form) {
    state.form = form;
  },
  UPLOADED_DATA(state, form) {
    state.uploaded = form;
  },
  VERIFIED_LICENSES(state, license) {
    state.existingLicense = license;
  },
  CLEAR_DATA(state) {
    state.licenses = [];
    state.renewal_license = {};
    state.variation_license = {};
    state.details = {};
    state.form = null;
    state.uploaded = null;
    state.existingLicense = null;
  },
  SET_VIEW_LICENSE(state, license) {
    state.view_license = license;
  },
  NEW_APPLICATION(state) {
    state.applicationForm = state.init_form;
    state.applicationAccount = {
      name: {}
    };
  },
  CONTINUE_APPLICATION(state, data) {
    state.applicationForm = data.form;
    state.applicationAccount = data.account;
  },
  SET_ACTIVE_LICENSE(state, data) {
    state.active_license = data;
  }
};

var actions = {
  GET_UNAPPROVED_LICENSES(context) {
    return new Promise((resolve, reject) => {
      new LicenseAPI(context.rootState.user_session.token).getUnapprovedLicense(
        (err, license) => {
          if (!err) {
            console.log("getUnapprovedLicense: " + JSON.stringify(license));
            resolve(license);
          } else {
            console.log(JSON.stringify(err));
            reject(err);
          }
        }
      );
    });
  },
  GET_LICENSES(context) {
    return new Promise((resolve, reject) => {
      new LicenseAPI(context.rootState.user_session.token).getLicenses(
        (err, licenses) => {
          if (!err) {
            console.log("license: " + JSON.stringify(licenses));
            context.commit("SET_LICENSES", licenses);
            resolve();
          } else {
            console.log(JSON.stringify(err));
            reject();
          }
        }
      );
    });
  },
  SAVE_LICENSES(context, license) {
    return new LicenseAPI(context.rootState.user_session.token).saveLicenses(
      license
    );
  },
  SAVE_EXISTING_LICENSES(context, license) {
    return new LicenseAPI(
      context.rootState.user_session.token
    ).saveExistingLicenses(license);
  },
  SAVE_MODIFY_LICENSES(context, license) {
    return new Promise((resolve, reject) => {
      new LicenseAPI(context.rootState.user_session.token).modifyLicenses(
        license,
        (licenses, err) => {
          if (!err) {
            console.log(
              "actions save modify licenses: " + JSON.stringify(licenses)
            );
            resolve();
          } else {
            console.log(
              "actions save modify licenses error: " + JSON.stringify(err)
            );
            reject();
          }
        }
      );
    });
  },
  VERIFY_LICENSES(context, license) {
    return new LicenseAPI(
      context.rootState.user_session.token
    ).verifyExistingLicenses(license);
  },
  GET_LICENSE_BY_ID(context, app_id) {
    return new LicenseAPI(context.rootState.user_session.token).getLicenseByID(
      app_id
    );
  },
  EXPIRY_LICENSES(context) {
    return new Promise((resolve, reject) => {
      console.log("expiry licenses entering action: ");
      new LicenseAPI(
        context.rootState.user_session.token
      ).applicationStatusLicenses((payable, err) => {
        if (!err) {
          console.log("verify licenses call back: " + JSON.stringify(payable));
          // context.commit('VERIFIED_LICENSES', verifiedLicense)

          resolve(payable);
        } else {
          console.log("verify licenses error: " + JSON.stringify(err));
          reject(err);
        }
      });
    });
  },
  APPLY_LICENSE(context, lic_data) {
    return new LicenseAPI(context.rootState.user_session.token).applyLicense(
      lic_data
    );
  },
  GET_ACTIVE_AND_CASES(context) {
    var token = context.rootState.user_session.token;
    if (token) {
      return new Promise((resolve, reject) => {
        var details = {};
        new LicenseAPI(token)
          .getActiveLicense()
          .then(result => {
            if (result.data.success) {
              details = result.data.model;
              return new CaseAPI(token).getLicenseCases();
            } else {
              reject(result.data.errors);
            }
          })
          .then(result => {
            if (result.data.success) {
              details.cases = result.data.model;
              context.commit("SET_DETAILS", details);
              resolve(details);
            } else {
              reject(result.data.errors);
            }
          })
          .catch(err => {
            console.log("err :", err);
            reject(err);
          });
      });
    }
  },
  VARIATE_LICENSE(context, form) {
    return new Promise((resolve, reject) => {
      new LicenseAPI(context.rootState.user_session.token)
        .variateLicense(form)
        .then(result => {
          resolve(result.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  GET_ACTIVE_LICENSE(context) {
    var token = context.rootState.user_session.token;
    if (token) {
      return new Promise((resolve, reject) => {
        new LicenseAPI(token)
          .getActiveLicense()
          .then(result => {
            this.commit(
              "SET_ACTIVE_LICENSE",
              result.data.model.license_details
            );
            resolve(result.data.model.license_details);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  SAVE_NEW_LICENSE(context, data) {
    return new LicenseAPI(
      context.rootState.user_session.token
    ).applyLicenseWithAccount(data);
  },
  EXISTING_LIC_REG(context, data) {
    return new LicenseAPI(
      context.rootState.user_session.token
    ).applyAccountForExistingLicense(data);
  },
  // Result of License Evaluation
  GET_RESULT_BY_KEY(context, key) {
    return new LicenseAPI().getResultByKey(key);
  },
  DOWNLOAD_PDF(context, url) {
    return new LicenseAPI(context.rootState.user_session.token).getDocument(
      url
    );
  },

  GENERATED_DOCUMENTS(context, data) {
    return new LicenseAPI(context.rootState.user_session.token).addDocuments(
      data.license,
      data.formData
    );
  }
};

export default {
  state,
  mutations,
  actions
};