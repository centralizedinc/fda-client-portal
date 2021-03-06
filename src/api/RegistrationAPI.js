import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
// axios.defaults.headers.common['access_token'] = store.state.user

export default class RegistrationAPI {

  /**
   * 
   * @param {UserModel} user 
   * @param {Function} cb 
   */
  static register(new_license) {
    return axios.post("public/accounts/register", new_license)
  };

  /**
   * 
   * @param {Object} data
   * @param {Function} cb 
   */
  saveLicenses(data) {
    return axios.post("public/accounts/register", data)
  };

  /**
   * 
   * @param {String} key 
   * @param {Function} cb 
   */
  static confirm(data, cb) {
    console.log('key' + JSON.stringify(data))
    axios
      .get("public/accounts/register/confirm?key=" + data.key+(data.params?"&params=" +data.params :""))
      .then(result => {
        if (result.data.success) {
          cb(result.data.model)
        } else {
          cb(null, result.data.errors)
        }
      })
      .catch(err => {
        cb(null, err)
      })
  }

}