import axios from 'axios';

// axios.defaults.headers.common['access_token'] = store.state.user

export default class CertificateAPI {
    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    productPresentation(cb) {
        axios.get('core/product/presentation')
            .then(result => {
                console.log("product presentation data: " + JSON.stringify(result))
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