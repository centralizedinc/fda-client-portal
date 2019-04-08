import axios from 'axios';

// axios.defaults.headers.common['access_token'] = store.state.user

export default class PaymentAPI {
    constructor(token) {
        // axios.defaults.baseURL = 'https://fda-services-payments.herokuapp.com';
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    creditCard(creditCardNumber, cb) {
        axios.post('payments/creditcard/validate/card', {
            cardNumber: creditCardNumber
        }).then((result) => {
            cb(result.data.model)
        }).catch(err => {
            console.log('##########error save creditCard: ' + JSON.stringify(err))
            cb(null, err)
        })
    }

    cvv(cvvNumber, cb) {
        axios.post('payments/creditcard/validate/cvv', {
            cvv: cvvNumber
        }).then((result) => {
            cb(result.data.model)
        }).catch(err => {
            console.log('##########error save cvv: ' + JSON.stringify(err))
            cb(null, err)
        })
    }

    expirationDate(expiry) {
        return axios.post('payments/creditcard/validate/expiry', {
            expiry
        })
    }

    feesDetails(details, cb) {
        console.log("feesDetails entering api: " + JSON.stringify(details))
        axios.post('payments/rates/compute', {
            productType: details.productType,
            primaryActivity: details.primaryActivity,
            declaredCapital: details.declaredCapital,
            appType: details.appType
        }).then((result) => {
            console.log("feesDetails data return api: " + JSON.stringify(result.data.model))
            cb(result.data.model)
        }).catch(err => {
            console.log("feesDetails error return api: " + JSON.stringify(err))
            cb(null, err)
        })
    }

    savePayment(fullDetails, cb) {
        console.log("save payments details: " + JSON.stringify(fullDetails))
        axios.post('payments/', {
            card_details: fullDetails.card_details,
            payment_details: fullDetails.payment_details,
            transaction_details: fullDetails.transaction_details
        }).then((result) => {
            console.log("post save payment details: " + JSON.stringify(result.data.model))
            cb(result.data.model)
        }).catch(err => {
            console.log('##########error save savePayment: ' + JSON.stringify(err))
            cb(null, err)
        })
    }

    saveTransaction(details, cb) {
        console.log("details data: " + JSON.stringify(details))
        axios.post('payments/transactions/initiate',{
            payment_details: {
                total_amount: details.fees.total
            },
            transaction_details: {
                application_type: details.fees.appType,
                application: 0,
                case_no: details.case.case_no,
                // user_id: ,
                order_payment: {
                    fee: details.fees.fee,
                    lrf: details.fees.lrf,
                    penalty: details.fees.penalty,
                    total_amount: details.fees.total_amount,
                    reamrks: details.fees.reamrks
                }
        }
    }).then((result) => {
            cb(result.data.model)
        }).catch(err => {
            cb(null, err)
        })
    }

    getPayments(user_id){
        return axios.get('payments/client/'+user_id)
    }



}