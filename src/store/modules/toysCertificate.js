import ToysCertificateAPI from "../../api/ToysCertificateAPI";

var initialState = {
    toys_exemption: []
}

const state = JSON.parse(JSON.stringify(initialState))

const mutations = {
    SET_TOYS_EXEMPTION(state, exemption) {
        console.log("STORE: " + "##TOYS: " + JSON.stringify(exemption))
        state.toys_exemption = exemption
    }
}

var actions = {
    GET_TOYS_EXEMPTION() {
        return new Promise((resolve, reject) => {
            new ToysCertificateAPI(context.rootState.user_session.token).toyExemption((exemption, err) => {
                if (!err) {
                    console.log("GET_TOYS_EXEMPTION data: " + JSON.stringify(exemption))
                    context.commit('SET_PRODUCT_PRESENTATION', exemption)
                    resolve(exemption)
                } else {
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