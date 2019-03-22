import axios from 'axios';

export default class TaskApi {
    constructor(token) {
        axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0/secured/accounts';
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    requestResetPassword(old_password) {
        return axios.post('/password/request', {
            old_password
        })
    }

    confirmResetPassword() {
        return axios.get('/password')
    }

    resetPassword(account) {
        console.log('account2 :', account);
        return axios.post('/password', account)
    }
}