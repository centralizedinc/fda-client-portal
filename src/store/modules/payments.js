import PaymentAPI from '../../api/PaymentApi';


const state = {
    credit_card: null,
    cvv: null,
    expiry: null,
    fee: null,
    payment_details: {
        summary: []
    },
    showCCDialog: false
}

const mutations = {
    CREDIT_CARD(state, form) {
        state.credit_card = form
    },
    CVV(state, form) {
        state.cvv = form
    },
    EXPIRY(state, form) {
        state.expiry = form
    },
    FEES(state, charges) {
        state.fee = charges
    },
    CLEAR_DATA(state) {
        state.credit_card = null
        state.cvv = null
        state.expiry = null
        state.fee = null
    },
    SET_PAYMENT_HISTORY(state, payments) {
        state.payment_history = payments
    },
    SHOW_CC_DIALOG(state, payment_details) {
        state.payment_details = payment_details
        state.showCCDialog = true;
    },
    HIDE_CC_DIALOG(state) {
        state.payment_details = {
            summary: []
        }
        state.showCCDialog = false;
    }
}

var actions = {
    FIND_PAYMENTS(context, user_id) {

    },
    VALIDATE_CREDIT_CARD(context, creditCard) {
        return new Promise((resolve, reject) => {
            new PaymentAPI(context.rootState.user_session.token).creditCard(creditCard, (credit, err) => {
                if (!err) {
                    context.commit('CREDIT_CARD', credit)
                    resolve()
                } else {
                    console.log(JSON.stringify(err))
                    reject()
                }
            })
        })
    },
    VALIDATE_CVV(context, cvv) {
        return new Promise((resolve, reject) => {
            new PaymentAPI(context.rootState.user_session.token).cvv(cvv, (credit, err) => {
                if (!err) {
                    context.commit('CVV', credit)
                    resolve()
                } else {
                    console.log(JSON.stringify(err))
                    reject()
                }
            })
        })
    },
    VALIDATE_EXPIRATION_DATE(context, expirationDate) {
        return new PaymentAPI(context.rootState.user_session.token).expirationDate(expirationDate);
    },
    GET_FEES(context, fees) {
        return new Promise((resolve, reject) => {
            console.log("entering mutation GET_FEES: " + JSON.stringify(fees))
            new PaymentAPI(context.rootState.user_session.token).feesDetails(fees, (fee, err) => {
                if (!err) {
                    console.log("returning mutation GET_FEES: " + JSON.stringify(fee))
                    context.commit('FEES', fee)
                    resolve(fee)
                } else {
                    console.log(JSON.stringify(err))
                    reject(err)
                }
            })
        })
    },
    SAVE_PAYMENT(context, fullDetails) {
        return new Promise((resolve, reject) => {
            console.log("save payment store actions" + JSON.stringify(fullDetails))

            new PaymentAPI(context.rootState.user_session.token).savePayment(fullDetails, (details, err) => {
                if (!err) {
                    console.log('actions save licenses: ' + JSON.stringify(details))
                    resolve(details)
                } else {
                    console.log("actions save licenses error: " + JSON.stringify(err))
                    reject(err)
                }
            })
        })
    }
}

export default {
    state,
    mutations,
    actions
}