
import CertificateAPI from "../../api/FoodCertificateApi";

const state = {
    food_product: null,
    food_category: null,
    shelf_life: null
};

const mutations = {
  SET_FOOD_PRODUCT(state, product) {
    state.food_product = product;
  },
  SET_FOOD_CATEGORY(state, product) {
    state.food_category = product;
  },
  SET_SHELF_LIFE(state, product) {
    state.shelf_life = product;
  }
};

var actions = {
    GET_FOOD_CERT(){
        return new Promise((resolve, reject) => {
            new CertificateAPI(context.rootState.user_session.token).foodProduct((foodProduct, err) => {
                if (!err) {
                    console.log("GET_FOOD_PRODUCT data: " + JSON.stringify(foodProduct))
                    context.commit('SET_FOOD_PRODUCT', foodProduct)
                    resolve(foodProduct)
                } else {
                    reject(err)
                }
            })
        })
    },
  GET_FOOD_PRODUCT(context) {
    console.log("Food Certificates!!!")
    return new Promise((resolve, reject) => {
        new CertificateAPI(context.rootState.user_session.token).foodProduct((foodProduct, err) => {
            if (!err) {
                console.log("GET_FOOD_PRODUCT data: " + JSON.stringify(foodProduct))
                context.commit('SET_FOOD_PRODUCT', foodProduct)
                resolve(foodProduct)
            } else {
                reject(err)
            }
        })
    })
  },
  GET_FOOD_CATEGORY(context) {
    console.log("Food Certificates!!!")
    return new Promise((resolve, reject) => {
        new CertificateAPI(context.rootState.user_session.token).foodCategory((foodCategory, err) => {
            if (!err) {
                console.log("GET_FOOD_CATEGORY data: " + JSON.stringify(foodCategory))
                context.commit('SET_FOOD_CATEGORY', foodCategory)
                resolve(foodCategory)
            } else {
                reject(err)
            }
        })
    })
  },
  GET_SHELF_LIFE(context) {
    console.log("Food Certificates!!!")
    return new Promise((resolve, reject) => {
        new CertificateAPI(context.rootState.user_session.token).shelfLife((shelfLife, err) => {
            if (!err) {
                console.log("GET_SHELF_LIFE data: " + JSON.stringify(shelfLife))
                context.commit('SET_SHELF_LIFE', shelfLife)
                resolve(shelfLife)
            } else {
                reject(err)
            }
        })
    })
  }
};

export default {
  state,
  mutations,
  actions
};