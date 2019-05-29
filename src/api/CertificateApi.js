import axios from 'axios';

// axios.defaults.headers.common['access_token'] = store.state.user

export default class CertificateAPI {
    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    saveCertificate(data) {
        console.log("save licenses data: " + JSON.stringify(data))
        return axios.post('certificates/', data)
    }
    
    getCertificates(cb) {
        axios.get('certificates/')
          .then(result => {
            if (result.data.success) {
              cb(result.data.model)
            }
          })
          .catch(err => {
            console.log(JSON.stringify(err));
            cb(null, err)
          });
      }

    
}