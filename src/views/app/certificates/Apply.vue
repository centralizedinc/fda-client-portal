<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-progress-linear :value="completion" color="primary" background-color="primary"></v-progress-linear>
        <v-stepper v-model="e6" vertical>
          <v-stepper-step :complete="e6 > 1" step="1" editable>
            Food Product Application
            <small>Fill out all necessary information</small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-card flat class="mb-5" height="auto">
              <step-one :form="cert_form"></step-one>
            </v-card>
            <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 2" step="2" editable>
            Establishment Information
            <small>Select the corresponding company activity/activities</small>
          </v-stepper-step>
          <v-stepper-content step="2">
            <v-card flat class="mb-5" height="auto">
              <step-two :form="cert_form"></step-two>
            </v-card>
            <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 3" step="3" editable>
            Complete List of Ingredients
            <small>Please indicate one ingredient per data entry.</small>
          </v-stepper-step>
          <v-stepper-content step="3">
            <v-card flat class="mb-5" height="auto">
              <step-three :form="cert_form"></step-three>
            </v-card>
            <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 4" step="4" editable>
            Product Specifications
            <small>Ensure the completeness and accuracy of the details for the parameters and specifications in coherence with FDA Standards (eg, Philippine National Standards, Administrative Orders, and other relevant issuances)</small>
          </v-stepper-step>
          <v-stepper-content step="4">
            <v-card flat class="mb-5" height="auto">
              <step-four :form="cert_form"></step-four>
            </v-card>
            <v-btn color="primary" @click="e6 = 5">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 5" step="5" editable>
            Shelf Life and Other information
            <small>The length of time that a commodity may be stored without becoming unfit for use, consumption, or sale.</small>
          </v-stepper-step>
          <v-stepper-content step="5">
            <v-card flat class="mb-5" height="auto">
              <step-five :form="cert_form"></step-five>
            </v-card>
            <v-btn color="primary" @click="e6 = 6">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 6" step="6" editable>
            Nutrition Information
            <small>Vitamins and Minerals shall be declared as applicable to product claims</small>
          </v-stepper-step>
          <v-stepper-content step="6">
            <v-card flat class="mb-5" height="auto">
              <step-six :form="cert_form"></step-six>
            </v-card>
            <v-btn color="primary" @click="e6 = 7">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 7" step="7" editable>
            Nutrition Health Claims
            <small>Select which to claim. Add new if necessary.</small>
          </v-stepper-step>
          <v-stepper-content step="7">
            <v-card flat class="mb-5" height="auto">
              <step-seven :form="cert_form"></step-seven>
            </v-card>
            <v-btn color="primary" @click="e6 = 8">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 8" step="8" editable>
            Document Upload
            <small>Please upload documents to determine conformance to the standard/s of product identity. For food supplement (if applicable), please upload safety data (e.g. LD50 toxicity tests). For the list of standards or issuances (e.g. PNS, Codex standards, FDA Issuances, local or international standards) please refer to the CFRR Product Registration Manual of Procedure/ Handbook.</small>
          </v-stepper-step>
          <v-stepper-content step="8">
            <v-card flat class="mb-5" height="auto">
              <step-eight :form="cert_form"></step-eight>
            </v-card>
            <v-btn color="primary" @click="e6 = 9">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step step="9" :complete="e6 > 9">
            Payment
            <small>We will sent you an email with a confirmation link. Please check your email.</small>
          </v-stepper-step>
          <v-stepper-content step="9">
            <v-card flat class="mb-5" height="auto">
              <step-nine :form="cert_form"></step-nine>
            </v-card>
            <v-btn color="primary" @click="save">Submit</v-btn>
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FoodProductAppForm from "./create/tabs/FoodProductAppForm";
import EstablishmentInfo from "./create/tabs/EstablishmentInfo";
import CompleteIngredients from "./create/tabs/CompleteIngredients";
import ProductSpecs from "./create/tabs/ProductSpecs";
import Shelflife from "./create/tabs/Shelflife";
import NutritionInfo from "./create/tabs/NutritionInfo";
import NutritionHealthClaims from "./create/tabs/NutritionHealthClaims";
import DocumentaryRequirements from "./create/tabs/DocumentaryRequirements";
import Payment from "./create/tabs/DocumentaryRequirements";

export default {
  components: {
    stepOne: () => ({
      component: import("./create/tabs/FoodProductAppForm")
    }),
    stepTwo: () => ({
      component: import("./create/tabs/EstablishmentInfo")
    }),
    stepThree: () => ({
      component: import("./create/tabs/CompleteIngredients")
    }),
    stepFour: () => ({
      component: import("./create/tabs/ProductSpecs")
    }),
    stepFive: () => ({
      component: import("./create/tabs/Shelflife")
    }),
    stepSix: () => ({
      component: import("./create/tabs/NutritionInfo")
    }),
    stepSeven: () => ({
      component: import("./create/tabs/NutritionHealthClaims")
    }),
    stepEight: () => ({
      component: import("./create/tabs/DocumentaryRequirements")
    }),
    stepNine: () => ({
      component: import("./create/tabs/DocumentaryRequirements")
    })
  },
  data: () => ({
    e6: 1,
    confirmDialog: false,
    cert_form: {
      //   general_info: {
      //     application_type: 0,
      //     for_ammendment_renewal: {
      //         product_certificate: "",
      //         registration: "",
      //         date_issued: "",
      //         date_validity: ""
      //     },
      //     for_reapplication: {
      //         doctracker_no: "",
      //         email: ""
      //     }
      // },

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
      // object nalang contact
      contacts: {}
  },
  // change to establishment
  establisment_info: {
      activity: "",
      type: "",
      // change country origin to string
      origin_country: "",
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
        chemical: [
          {
            parameter: "",
            specification: ""
          }
        ],
        microbiological: [
          {
            parameter: "",
            specification: ""
          }
        ]
      },

  shelf: {
      // add shelf type
      type: "", 
      packaging_material: "",
      description: "",
      storage_requirements: "",
      food_material: "",
      allergen_source: "",
      lot_code_interpretation: "",
      // add declaration date
      declaration_date: "",
      date: ""
  },

      nutrition_info: {
        serving_size: "",
        serving_per_pack: 0,
        servings: [
          {
            type: "",
            amount_per_serving: "",
            percent: ""
          }
        ]
      },

      // change claims to array nalang
      claims: [],

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
      },
      documents: []
    }
  }),
  created() {
    console.log("apply created");
    this.init();
  },

  methods: {
    init() {
      //       console.log("this.$store.state.certificate.init_form: " + JSON.stringify(this.$store.state.certificate.init_form));
      // this.cert_form = this.$store.state.certificate.init_form
      //     console.log("created porps: " + JSON.stringify(this.cert_form));

      console.log("apply certificates");
      this.$store
        .dispatch("GET_FOOD_PRODUCT")
        .then(result => {
          return this.$store.dispatch("GET_FOOD_CATEGORY");
        })
        .then(result => {
          return this.$store.dispatch("GET_REGION");
        })
        .then(result => {
          return this.$store.dispatch("GET_SHELF_LIFE");
        })
        .catch(err => {
          this.$notifyError(err);
        });
    },
    save() {
      this.showAppOverview = false;
      this.confirmDialog = true;
      console.log("submit clicked: " + JSON.stringify(this.cert_form));
      this.$store.dispatch("SAVE_CERTIFICATE", this.cert_form);
    }
  },
  computed: {
    completion() {
      console.log("completion this is e1: " + JSON.stringify(this.e1));
      console.log(
        "completion parse int: " +
          JSON.stringify(parseInt(((this.e6 - 1) / 7) * 100))
      );
      return parseInt(((this.e6 - 1) / 9) * 100);
    }
  }
};
</script>

<style>
</style>
