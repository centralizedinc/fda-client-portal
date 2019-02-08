import axios from 'axios';

// axios.defaults.headers.common['access_token'] = store.state.user

export default class PaymentAPI {
    constructor(token) {
        axios.defaults.baseURL = 'https://fda-services-payments.herokuapp.com';
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        // axios.defaults.headers.common['access_token'] = token;
    }

    creditCard(credit, cb){
        console.log("credit card api: " + JSON.stringify(credit))
        axios.post('payments/creditcard/validate/card', {
            cardNumber: credit
          }).then((result) => {
           cb(result.data.model)
        }).catch(err => {
            console.log('##########error save: ' + JSON.stringify(err))
            cb(null, err)
        })
    }

    savePayment(cardDetails, paymentDetials, transactionDetails, cb){
        axios.post('payments/',{cardDetails,paymentDetials, transactionDetails} ).then((result) => {
            cb(result.data.model)
         }).catch(err => {
             console.log('##########error save: ' + JSON.stringify(err))
             cb(null, err)
         })
    }


}