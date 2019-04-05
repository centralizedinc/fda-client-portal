import axios from 'axios';

export default class ReferenceAPI {
    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    static getIdTypes() {
        return axios.get('/core/identification')
    }

    static getDesignations() {
        return axios.get('/core/designation')
    }
}