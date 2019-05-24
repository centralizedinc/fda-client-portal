
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
    console.log("action certificate data: " + JSON.stringify(certificate))
    return new CetificateAPI(context.rootState.user_session.token).saveCertificate(
      certificate
    );
  }
};

export default {
  state,
  mutations,
  actions
};