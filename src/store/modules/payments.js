import PaymentAPI from '../../api/PaymentApi';


const state = {
    credit_card: null
}

const mutations = {
    CREDIT_CARD(state, form){
        state.credit_card = form
    }
}

var actions = {
    VALIDATE_CREDIT_CARD(context, creditCard){
        return new Promise((resolve, reject) => {
            console.log("validate credit card store: " + JSON.stringify(creditCard))
            new PaymentAPI(context.rootState.user_session.token).creditCard(creditCard,(credit, err) =>{
                if(!err){
                    context.commit('CREDIT_CARD', credit)
                    resolve()
                }else{
                    console.log(JSON.stringify(err))
                    reject()
                }
            })
        })
    },
    SAVE_PAYMENT(context, cardDetails, paymentDetials, transactionDetails){
        new PaymentAPI(context.rootState.user_session.token).saveLicenses(cardDetails, paymentDetials, transactionDetails,(details, err) => {
            if(!err){
                console.log('actions save licenses: ' + JSON.stringify(details))
            }else{
                console.log("actions save licenses error: " + JSON.stringify(err))
            }          
        })
    }
    
}

export default {
    state,
    mutations,
    actions
}
