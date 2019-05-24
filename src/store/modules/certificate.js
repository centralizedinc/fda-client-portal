
import CetificateAPI from "../../api/CertificateApi";

const state = {
  certificate: [],
  form: null,
  init_form: {
    general_info: {
      application_type: {
          type: String,
          default: 0
          /**
           * Initial - 0
           * Amendment - 1
           * Renewal - 2
           * Reapplication - 3
           */
      },
      for_ammendment_renewal: {
          product_certificate: {
              type: String
          },
          registration: {
              type: String
          },
          date_issued: {
              type: Date,
              default: new Date()
          },
          date_validity: {
              type: Date
          }
      },
      for_reapplication: {
          doctracker_no: {
              type: String
          },
          email: {
              type: String
          }
      }
  },

  food_product: {
      type: {
          type: String
      },
      categorization: {
          type: String
      },
      brand_name: {
          type: String
      },
      product_name: {
          type: String
      },
      company: {
          type: String
      },
      address: {
          type: Object
      },
      license_no: {
          type: String
      },
      license_validity: {
          type: Date
      },
      years_applied: {
          type: Number
      },
      contacts: {
          type: Array
      }
  },

  establisment_info: {
      activity: {
          type: String
      },
      type: {
          type: String
      },
      origin_country: {
          type: Array
      },
      directly_source: {
          type: Boolean
      },
      manufacturer_name: {
          type: String
      },
      manufacturer_address: {
          type: String
      },
      supplier_name: {
          type: String
      },
      supplier_address: {
          type: String
      }
  },

  ingredients: {
      type: Array
  },

  product_specification: {
      physical: {
          color: {
              type: String
          },
          odor: {
              type: String
          },
          taste: {
              type: String
          },
          texture: {
              type: String
          },
          form: {
              type: String
          }
      },
      chemical: [{
          parameter: {
              type: String
          },
          specification: {
              type: String
          }
      }],
      microbiological: [{
          parameter: {
              type: String
          },
          specification: {
              type: String
          }
      }]
  },

  shelf: {
      packaging_material: {
          type: String
      },
      description: {
          type: String
      },
      storage_requirements: {
          type: String
      },
      food_material: {
          type: String
      },
      allergen_source: {
          type: String
      },
      lot_code_interpretation: {
          type: String
      },
      date: {
          type: Date
      }
  },

  nutrition_info: {
      serving_size: {
          type: String
      },
      serving_per_pack: {
          type: Number
      },
      servings: [{
          type: {
              type: String
          },
          amount_per_serving: {
              type: String
          },
          percent: {
              type: String
          }
      }]
  },

  claims: {
      nutrition: {
          type: Array
      },
      health: {
          type: Array
      }
  },

  documentary: {
      product_label_images: {
          type: Array
      },
      commercial_product_images: {
          type: Array
      },
      for_export: {
          type: Boolean
      },
      purchase_request_notarized: {
          type: Array
      },
      has_claims: {
          type: Boolean
      },
      substantiate_claims: {
          type: Array
      },
      has_on_label: {
          type: Boolean
      }
  },

  for_ammendment: {
      brand_name: {
          type: String
      },
      product_name: {
          type: String
      },
      company_name: {
          type: String
      },
      supplier_name: {
          type: String
      },
      supplier_address: {
          type: String
      },
      packaging_material: {
          type: String
      },
      product_commercial: {
          type: String
      },
      shelf_life: {
          type: String
      },
      packaging_design: {
          type: Array
      }
  }
  }
};

const mutations = {
  SET_FORM(state, form) {
    state.form = form;
  }
};

var actions = {
  SAVE_CERTIFICATE(context, certificate) {
    console.log("action certificate data: " + JSON.stringify(certificate))
    return new CetificateAPI(context.rootState.user_session.token).saveCertificate(
      certificate
    );
  }
};

export default {
  state,
  mutations,
  actions
};