import CertificateAPI from "../../api/FoodCertificateApi";

const state = {
  food_product: [],
  food_category: [],
  shelf_life: [],
  source: [],
  product_specification: [],
  nutrition_information: [],
  nutrition_health_claims: [],
  vitamins: [],
  minerals: []
};

const mutations = {
  SET_FOOD_PRODUCT(state, product) {
    console.log("STORE:" + "##PRODUCT" + JSON.stringify(product) + "##STATE" + JSON.stringify(state))
    state.food_product = product;
  },
  SET_FOOD_CATEGORY(state, product) {
    state.food_category = product;
  },
  SET_SHELF_LIFE(state, product) {
    state.shelf_life = product;
  },
  SET_SOURCE(state, product) {
    state.source = product;
  },
  SET_PRODUCT_SPECIFICATION(state, product) {
    state.product_specification = product;
  },
  SET_NUTRITION_INFORMATION(state, product) {
    state.nutrition_information = product;
  },
  SET_NUTRITION_HEALTH_CLAIMS(state, product) {
    state.nutrition_health_claims = product;
  },
  SET_VITAMINS(state, product) {
    state.vitamins = product;
  },
  SET_MINERALS(state, product) {
    state.minerals = product;
  }
};

var actions = {
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
  },
  GET_SOURCE(context) {
    console.log("Food Certificates!!!")
    return new Promise((resolve, reject) => {
      new CertificateAPI(context.rootState.user_session.token).shelfLife((source, err) => {
        if (!err) {
          console.log("GET_SOURCE data: " + JSON.stringify(source))
          context.commit('SET_SOURCE', source)
          resolve(source)
        } else {
          reject(err)
        }
      })
    })
  },
  GET_PRODUCT_SPECIFICATION(context) {
    console.log("Food Certificates!!!")
    return new Promise((resolve, reject) => {
      new CertificateAPI(context.rootState.user_session.token).productSpecification((product_specification, err) => {
        if (!err) {
          console.log("GET_PRODUCT_SPECIFICATION data: " + JSON.stringify(product_specification))
          context.commit('SET_PRODUCT_SPECIFICATION', product_specification)
          resolve(product_specification)
        } else {
          reject(err)
        }
      })
    })
  },
  GET_NUTRITION_INFORMATION(context) {
    console.log("Food Certificates!!!")
    return new Promise((resolve, reject) => {
      new CertificateAPI(context.rootState.user_session.token).nutritionInformation((nutrition_information, err) => {
        if (!err) {
          console.log("GET_NUTRITION_INFORMATION data: " + JSON.stringify(nutrition_information))
          context.commit('SET_NUTRITION_INFORMATION', nutrition_information)
          resolve(nutrition_information)
        } else {
          reject(err)
        }
      })
    })
  },
  GET_NUTRITION_HEALTH_CLAIMS(context) {
    console.log("Food Certificates!!!")
    return new Promise((resolve, reject) => {
      new CertificateAPI(context.rootState.user_session.token).nutritionHealthClaims((nutrition_health_claims, err) => {
        if (!err) {
          console.log("GET_NUTRITION_HEALTH_CLAIMS data: " + JSON.stringify(nutrition_health_claims))
          context.commit('SET_NUTRITION_HEALTH_CLAIMS', nutrition_health_claims)
          resolve(nutrition_health_claims)
        } else {
          reject(err)
        }
      })
    })
  },
  GET_VITAMINS(context) {
    console.log("Food Certificates!!!")
    return new Promise((resolve, reject) => {
      new CertificateAPI(context.rootState.user_session.token).vitamins((vitamins, err) => {
        if (!err) {
          console.log("GET_VITAMINS data: " + JSON.stringify(vitamins))
          context.commit('SET_VITAMINS', vitamins)
          resolve(vitamins)
        } else {
          reject(err)
        }
      })
    })
  },
  GET_MINERALS(context) {
    console.log("Food Certificates!!!")
    return new Promise((resolve, reject) => {
      new CertificateAPI(context.rootState.user_session.token).minerals((minerals, err) => {
        if (!err) {
          console.log("GET_MINERALS data: " + JSON.stringify(minerals))
          context.commit('SET_MINERALS', minerals)
          resolve(minerals)
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