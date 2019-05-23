
import CetificateAPI from "../../api/CertificateApi";

const state = {
  certificate: [],
  form: null
};

const mutations = {
  SET_FORM(state, form) {
    state.form = form;
  }
};

var actions = {
  SAVE_CERTIFICATE(context, certificate) {
    return new CetificateAPI(context.rootState.user_session.token).saveLicenses(
      certificate
    );
  }
};

export default {
  state,
  mutations,
  actions
};