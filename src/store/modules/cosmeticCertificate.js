import CosmeticCertificate from "../../api/CosmeticCertificateAPI";

var initialState = {
    product_presentation: []
}

const state = JSON.parse(JSON.stringify(initialState))

const mutations = {
    SET_PRODUCT_PRESENTATION(state, presentation) {
        console.log("STORE: " + "##PRODUCT: " + JSON.stringify(presentation))
        state.product_presentation = presentation
    }
}

var actions = {
    GET_PRODUCT_PRESENTATION() {
        return new Promise((resolve, reject) => {
            new CosmeticCertificate(context.rootState.user_session.token).productPresentation((presentation, err) => {
                console.log("cosmetic certificate ")
                if (!err) {
                    console.log("GET_PRODUCT_PRESENTATION data: " + JSON.stringify(presentation))
                    context.commit('SET_PRODUCT_PRESENTATION', presentation)
                    resolve(presentation)
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