
import CertificateAPI from "../../api/FoodCertificateApi";

const state = {
    food_product: [],
    food_category: [],
    shelf_life: [],
    source: [],
    product_specification: [],
    physical_parameter: [],
    nutrition_information: [],
    nutrition_health_claims: [],
    vitamins: [],
    minerals: [],
    company_activity: []
};

const mutations = {
  SET_FOOD_PRODUCT(state, food_product) {
    console.log("STORE:" + "##PRODUCT" + JSON.stringify(food_product))
    state.food_product = food_product;
  },
  SET_FOOD_CATEGORY(state, food_category) {
    console.log("STORE:" + "##CATEGORY" + JSON.stringify(food_category))
    state.food_category = food_category;
  },
  SET_SHELF_LIFE(state, shelf_life) {
    console.log("STORE:" + "##SHELF LIFE" + JSON.stringify(shelf_life))
    state.shelf_life = shelf_life;
  },
  SET_SOURCE(state, source) {
    console.log("STORE:" + "##SOURCE" + JSON.stringify(source))
    state.source = source;
  },
  SET_PRODUCT_SPECIFICATION(state, product_specification) {
    console.log("STORE:" + "##PRODUCT SPECIFICATION" + JSON.stringify(product_specification))
    state.product_specification = product_specification;
  },
  SET_PHYSICAL_PARAMETER(state, physical_parameter) {
    console.log("STORE:" + "##PHYSICAL PARAMETER" + JSON.stringify(physical_parameter))
    state.physical_parameter = physical_parameter;
  },
  SET_NUTRITION_INFORMATION(state, nutrition_information) {
    console.log("STORE:" + "##NUTRITION INFORMATION" + JSON.stringify(nutrition_information))
    state.nutrition_information = nutrition_information;
  },
  SET_NUTRITION_HEALTH_CLAIMS(state, nutrition_health_claims) {
    console.log("STORE:" + "##HEALTH CLAIMS" + JSON.stringify(nutrition_health_claims))
    state.nutrition_health_claims = nutrition_health_claims;
  },
  SET_VITAMINS(state, vitamins) { 
    console.log("STORE:" + "##VITAMINS" + JSON.stringify(vitamins))
    state.vitamins = vitamins;
  },
  SET_MINERALS(state, minerals) {
    console.log("STORE:" + "##MINERALS" + JSON.stringify(minerals))
    state.minerals = minerals;
  },
  SET_COMPANY_ACTIVITY(state, company_activity) {
    console.log("STORE:" + "##COMPANY ACTIVITY" + JSON.stringify(company_activity))
    state.company_activity = company_activity;
  }
};

var actions = {
  GET_FOOD_PRODUCT(context) {
    console.log("Food Certificates!!!")
    return new Promise((resolve, reject) => {
        new CertificateAPI(context.rootState.user_session.token).foodProduct((food_product, err) => {
            if (!err) {
                console.log("GET_FOOD_PRODUCT data: " + JSON.stringify(food_product))
                context.commit('SET_FOOD_PRODUCT', food_product)
                resolve(food_product)
            } else {
                reject(err)
            }
        })
    })
  },
  GET_FOOD_CATEGORY(context) {
    console.log("Food Certificates!!!")
    return new Promise((resolve, reject) => {
        new CertificateAPI(context.rootState.user_session.token).foodCategory((food_category, err) => {
            if (!err) {
                console.log("GET_FOOD_CATEGORY data: " + JSON.stringify(food_category))
                context.commit('SET_FOOD_CATEGORY', food_category)
                resolve(food_category)
            } else {
                reject(err)
            }
        })
    })
  },
  GET_SHELF_LIFE(context) {
    console.log("Food Certificates!!!")
    return new Promise((resolve, reject) => {
        new CertificateAPI(context.rootState.user_session.token).shelfLife((shelf_life, err) => {
            if (!err) {
                console.log("GET_SHELF_LIFE data: " + JSON.stringify(shelf_life))
                context.commit('SET_SHELF_LIFE', shelf_life)
                resolve(shelf_life)
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
  GET_PHYSICAL_PARAMETER(context) {
    console.log("Food Certificates!!!")
    return new Promise((resolve, reject) => {
        new CertificateAPI(context.rootState.user_session.token).physicalParameter((physical_parameter, err) => {
            if (!err) {
                console.log("GET_PHYSICAL_PARAMETER data: " + JSON.stringify(physical_parameter))
                context.commit('SET_PHYSICAL_PARAMETER', physical_parameter)
                resolve(physical_parameter)
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
  },
  GET_COMPANY_ACTIVITY(context) {
    console.log("Food Certificates!!!")
    return new Promise((resolve, reject) => {
        new CertificateAPI(context.rootState.user_session.token).companyActivity((company_activity, err) => {
            if (!err) {
                console.log("GET_COMPANY_ACTIVITY data: " + JSON.stringify(company_activity))
                context.commit('SET_COMPANY_ACTIVITY', company_activity)
                resolve(company_activity)
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