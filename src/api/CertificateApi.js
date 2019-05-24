import axios from 'axios';

// axios.defaults.headers.common['access_token'] = store.state.user

export default class LicenseAPI {
    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    saveCertificate(data) {
        console.log("save licenses data: " + JSON.stringify(data))
        return axios.post('certificates/', data)
    }

    
}