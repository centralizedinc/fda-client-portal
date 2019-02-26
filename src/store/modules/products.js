import ProductApi from '../../api/ProductApi';

const state = {
    productType: [],
    primaryActivity: [],
    secondaryActivity: [],
    additional: [],
    declared: [],
    declaredCapital: [],
    prod_line: []
}

const mutations = {
    SET_PRODUCT_TYPE(state, licenses) {
        state.productType = licenses;
    },
    SET_PRIMARY_ACTIVITY(state, productType) {
        state.primaryActivity = productType;
    },
    SET_SECONDARY_ACTIVITY(state, primaryActivity) {
        state.secondaryActivity = primaryActivity;
    },
    SET_ADDITIONAL(state, primaryActivity) {
        state.additional = primaryActivity;
    },
    SET_DECLARED(state, primaryActivity) {
        state.declared = primaryActivity;
    },
    SET_ALL_DECLARED(state, declaredCapital) {
        state.declaredCapital = declaredCapital;
    },
    SET_PROD_LINE(state, productType) {

        state.prod_line = productType;
    }
}

var actions = {
    GET_PRODUCT_TYPE(context) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).productType((productType, err) => {
                if (!err) {
                    context.commit('SET_PRODUCT_TYPE', productType)
                    resolve()
                } else {
                    reject(err)
                }
            })
        })

    },
    GET_PRIMARY_ACTIVITY(context, product) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).primary(product, (productType, err) => {
                if (!err) {
                    context.commit('SET_PRIMARY_ACTIVITY', productType)
                    resolve()
                } else {
                    reject(err)
                }
            })
        })
    },
    GET_SECONDARY_ACTIVITY(context, primaryActivity) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).secondary(primaryActivity, (primaryActivity, err) => {
                if (!err) {
                    context.commit('SET_SECONDARY_ACTIVITY', primaryActivity)
                    resolve();
                } else {
                    reject();
                }
            })
        })
    },
    GET_ADDITIONAL(context, primaryActivity) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).additional(primaryActivity, (primaryActivity, err) => {
                if (!err) {
                    context.commit('SET_ADDITIONAL', primaryActivity)
                    resolve();
                } else {
                    reject()
                }
            })
        })
    },
    GET_DECLARED(context, primaryActivity) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).declared(primaryActivity, (primaryActivity, err) => {
                if (!err) {
                    context.commit('SET_DECLARED', primaryActivity)
                    resolve()
                } else {
                    reject()
                }
            })
        })
    },
    GET_ALL_DECLARED(context) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).getDeclared((declaredCapital, err) => {
                if (!err) {
                    context.commit('SET_ALL_DECLARED', declaredCapital)
                    resolve()
                } else {
                    reject()
                }
            })
        })
    },
    GET_PROD_LINE(context) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).prodline((productType, err) => {
                if (!err) {

                    context.commit('SET_PROD_LINE', productType)
                    resolve(productType)
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