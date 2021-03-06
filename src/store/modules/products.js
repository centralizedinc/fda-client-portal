import ProductApi from '../../api/ProductApi';

var initialState = {
    productType: [],
    primaryActivity: [],
    secondaryActivity: [],
    additional: [],
    declared: [],
    declaredCapital: [],
    prod_line: []
}

const state = JSON.parse(JSON.stringify(initialState))

const mutations = {
    SET_PRODUCT_TYPE(state, productType) {
        state.productType = productType;
    },
    SET_PRIMARY_ACTIVITY(state, primaryActivity) {
        state.primaryActivity = primaryActivity;
    },
    SET_SECONDARY_ACTIVITY(state, secondaryActivity) {
        state.secondaryActivity = secondaryActivity;
    },
    SET_ADDITIONAL(state, additional) {
        state.additional = additional;
    },
    SET_DECLARED(state, declared) {
        state.declared = declared;
    },
    SET_ALL_DECLARED(state, declaredCapital) {
        state.declaredCapital = declaredCapital;
    },
    SET_PROD_LINE(state, prod_line) {
        state.prod_line = prod_line;
    },
    CLEAR_DATA(state) {
      Object.keys(initialState).forEach(key => {
        state[key] = initialState[key]
      })
    }
}

var actions = {
    GET_PRODUCT_REFERENCE(context, refresh) {
        const ProductAPI = new ProductApi(context.rootState.user_session.token);
        var products = {};
        return new Promise((resolve, reject) => {
            //check if it is already loaded
            if (!refresh &&
                context.state.productType && context.state.productType.length > 0 &&
                context.state.primaryActivity && context.state.primaryActivity.length > 0 &&
                context.state.additional && context.state.additional.length > 0 &&
                context.state.declared && context.state.declared.length > 0 &&
                context.state.prod_line && context.state.prod_line.length > 0) {
                resolve({
                    product_type: context.state.productType,
                    primary: context.state.primaryActivity,
                    additional: context.state.additional,
                    declared: context.state.declared,
                    prod_line: context.state.prod_line
                })
            } else {
                ProductAPI.getProductType()
                    .then((result) => {
                        if (result.data.success) {
                            products.product_type = result.data.model;
                            context.commit("SET_PRODUCT_TYPE", result.data.model);
                            return ProductAPI.getPrimary()
                        } else {
                            reject(result.data.errors);
                        }
                    })
                    .then((result) => {
                        if (result.data.success) {
                            products.primary = result.data.model;
                            context.commit("SET_PRIMARY_ACTIVITY", result.data.model);
                            return ProductAPI.getAdditional()
                        } else {
                            reject(result.data.errors);
                        }
                    })
                    .then((result) => {
                        if (result.data.success) {
                            products.additional = result.data.model;
                            context.commit("SET_ADDITIONAL", result.data.model);
                            return ProductAPI.getDeclaredCapital()
                        } else {
                            reject(result.data.errors);
                        }
                    })
                    .then((result) => {
                        if (result.data.success) {
                            products.declared = result.data.model;
                            context.commit("SET_DECLARED", result.data.model);
                            return ProductAPI.getProductLine()
                        } else {
                            reject(result.data.errors);
                        }
                    })
                    .then((result) => {
                        if (result.data.success) {
                            products.prod_line = result.data.model;
                            context.commit("SET_PROD_LINE", result.data.model);
                            console.log('products :', products);
                            resolve(products)
                        } else {
                            reject(result.data.errors);
                        }
                    })
                    .catch((err) => {
                        console.log('err in getting products references :', err);
                        reject(err);
                    });
            }
        })
    },
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