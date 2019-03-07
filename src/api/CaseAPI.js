import axios from 'axios';

// axios.defaults.headers.common['access_token'] = store.state.user

export default class CaseAPI {
    constructor(token) {
        axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0';
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getLicenseCases() {
        return axios.get('lto-api/case');
    }

    getCertificateCases(cb) {
        cb();
        // axios.get('lto-api/case').then((result) => {
        //     cb(result.data.errors, result.data.model)
        // }).catch(err => {
        //     console.log('######getLicenseCases error :',err)
        //     cb(err)
        // })
    }

    submitCompliance(comply, cb){
        axios.post.apply('lto-api/case/comply', comply).then((result) => {
            cb(result.data.model)
        }).catch((err) => {
            cb(null, err)
        });
    }
}