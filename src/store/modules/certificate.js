import CetificateAPI from "../../api/CertificateApi";
import CaseAPI from '../../api/CaseAPI'; 

const state = {
  certificates: [],
  cases: [],
  form: null,
  init_form: {
    general_info: {
      application_type: 0,
      for_ammendment_renewal: {
          product_certificate: "",
          registration: "",
          date_issued: "",
          date_validity: ""
      },
      for_reapplication: {
          doctracker_no: "",
          email: ""
      }
  },

        food_product: {
            type: "",
            categorization: "",
            brand_name: "",
            product_name: "",
            company: "",
            address: "",
            license_no: "",
            license_validity: "",
            years_applied: 0,
            contacts: []
        },

        establisment_info: {
            activity: "",
            type: "",
            origin_country: [],
            directly_source: false,
            manufacturer_name: "",
            manufacturer_address: "",
            supplier_name: "",
            supplier_address: ""
        },

        ingredients: [],

        product_specification: {
            physical: {
                color: "",
                odor: "",
                taste: "",
                texture: "",
                form: ""
            },
            chemical: [{
                parameter: "",
                specification: ""
            }],
            microbiological: [{
                parameter: "",
                specification: ""
            }]
        },

        shelf: {
            packaging_material: "",
            description: "",
            storage_requirements: "",
            food_material: "",
            allergen_source: "",
            lot_code_interpretation: "",
            date: ""
        },

        nutrition_info: {
            serving_size: "",
            serving_per_pack: 0,
            servings: [{
                type: "",
                amount_per_serving: "",
                percent: ""
            }]
        },

        claims: {
            nutrition: [],
            health: []
        },

        documentary: {
            product_label_images: [],
            commercial_product_images: [],
            for_export: false,
            purchase_request_notarized: [],
            has_claims: false,
            substantiate_claims: [],
            has_on_label: false
        },

        for_ammendment: {
            brand_name: "",
            product_name: "",
            company_name: "",
            supplier_name: "",
            supplier_address: "",
            packaging_material: "",
            product_commercial: "",
            shelf_life: "",
            packaging_design: []
        }
    }
};

const mutations = {
  SET_FORM(state, form) {
    state.form = form;
  },
  SET_CERTIFICATE(state, certificates) {
    state.certificates = certificates;
},
SET_COMPLY(state, cases) {
    state.complied = cases;
},
};

var actions = {
  SAVE_CERTIFICATE(context, certificate) {
    return new Promise((resolve, reject) => {
    // console.log("action certificate data: " + JSON.stringify(certificate))
    // new CetificateAPI(context.rootState.user_session.token).saveCertificate(
    // //   certificate
    // ).then((result) =>{
    //     console.log("save certificate data: " + JSON.stringify(result))
    //     // var CaseApi = new CaseAPI(context.rootState.user_session.token);
    //     // CaseApi.uploadFile(comply)
    // })
    return new CetificateAPI(context.rootState.user_session.token).applyCertificate(
        certificate
      );
    })
  },
  GET_CERTIFICATE(context) {
    return new Promise((resolve, reject) => {
        new CetificateAPI(context.rootState.user_session.token).getCertificates((certificate, err) => {
            if (!err) {
                context.commit('SET_CERTIFICATE', certificate)
                resolve(certificate)
            } else {
                reject(err)
            }
        })
    })
    },
    GET_COMPLY_CERTIFICATE(context){
      return new Promise((resolve, reject) => {
            new CetificateAPI(context.rootState.user_session.token).getComplyCertificate()
                .then((result) => {
                     
                    context.commit('SET_COMPLY', result.data.model);
                    resolve(result.data)
                }).catch((err) => {
                    reject(err)
                });
        })  
    },
    SAVE_COMPLY_CERTIFICATE(context, comply) {
        return new Promise((resolve, reject) => {
            console.log("SAVE_COMPLY_CERTIFICATE store")
            var CaseApi = new CaseAPI(context.rootState.user_session.token);
            CaseApi.uploadFile(comply)
                .then((result) => {
                    var files = result.data.model
                    console.log('SAVE_COMPLY_CERTIFICATE files : '+ JSON.stringify(files));
                    var compliance = {
                        case_id: comply.case_id,
                        remarks: comply.remarks,
                        files: files
                    }
                    console.log("compliance data: " + JSON.stringify(compliance))
                    return new CetificateAPI(context.rootState.user_session.token).submitComplianceCertificate(compliance)
                }).then((result1) => {
                    console.log('result :' + JSON.stringify(result1));
                    resolve(result1.data)
                })
                .catch((err) => {
                    reject(err)
                });
        })
    }
};

export default {
    state,
    mutations,
    actions
};