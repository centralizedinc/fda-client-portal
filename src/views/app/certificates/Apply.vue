<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-progress-linear :value="completion" color="primary" background-color="primary"></v-progress-linear>
        <v-stepper v-model="e6" vertical>
          <v-stepper-step :complete="e6 > 1" step="1">
            Food Product Application
            <small>Fill out all necessary information</small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-card flat class="mb-5" height="auto">
              <step-one
                :form="cert_form"
                @next="next"
              ></step-one>
            </v-card>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 2" step="2">
            Establishment Information
            <small>Select the corresponding company activity/activities</small>
          </v-stepper-step>
          <v-stepper-content step="2">
            <v-card flat class="mb-5" height="auto">
              <step-two
                :form="cert_form"
                @next="next"
              ></step-two>
            </v-card>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 3" step="3">
            Complete List of Ingredients
            <small>Please indicate one ingredient per data entry.</small>
          </v-stepper-step>
          <v-stepper-content step="3">
            <v-card flat class="mb-5" height="auto">
              <step-three @next="next" :form="cert_form"></step-three>
            </v-card>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 4" step="4">
            Product Specifications
            <small>Ensure the completeness and accuracy of the details for the parameters and specifications in coherence with FDA Standards (eg, Philippine National Standards, Administrative Orders, and other relevant issuances)</small>
          </v-stepper-step>
          <v-stepper-content step="4">
            <v-card flat class="mb-5" height="auto">
              <step-four
                :form="cert_form"
                @next="next"
              ></step-four>
            </v-card>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 5" step="5">
            Shelf Life and Other information
            <small>The length of time that a commodity may be stored without becoming unfit for use, consumption, or sale.</small>
          </v-stepper-step>
          <v-stepper-content step="5">
            <v-card flat class="mb-5" height="auto">
              <step-five @next="next" :form="cert_form" :shelfLifeType="shelf_life"></step-five>
            </v-card>
          </v-stepper-content>

          <v-stepper-step @click="proceed(6)" :complete="e6> 6" v-if="typ" step="6">
            Nutrition Information
            <small>Vitamins and Minerals shall be declared as applicable to product claims.</small>
            <small>Click the table to input the corresponding fields and hit enter or save.</small>
          </v-stepper-step>
          <v-stepper-content step="6">
            <v-card flat class="mb-5" height="auto">
              <step-six
                :form="cert_form"
                @next="next"
              ></step-six>
            </v-card>
          </v-stepper-content>

          <v-stepper-step @click="proceed(7)" :complete="e6 > 7" v-if="typ" step="7">
            Nutrition Health Claims
            <small>Select which to claim. Add new if necessary.</small>
          </v-stepper-step>
          <v-stepper-content step="7">
            <v-card flat class="mb-5" height="auto">
              <step-seven
                @next="next"
                :form="cert_form"
              ></step-seven>
            </v-card>
          </v-stepper-content>

          <v-stepper-step @click="proceed(8)" :complete="e6 > 8" :step="8 - stp">
            Document Upload
            <small>Please upload documents to determine conformance to the standard/s of product identity. For food supplement (if applicable), please upload safety data (e.g. LD50 toxicity tests). For the list of standards or issuances (e.g. PNS, Codex standards, FDA Issuances, local or international standards) please refer to the CFRR Product Registration Manual of Procedure/ Handbook.</small>
          </v-stepper-step>
          <v-stepper-content step="8">
            <v-card flat class="mb-5" height="auto">
              <step-eight :form="cert_form"></step-eight>
            </v-card>
            <v-btn color="primary" @click="save">Submit</v-btn>
            <!-- <v-btn color="primary" @click="e6 = 9">Continue</v-btn> -->
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>

          <!-- <v-stepper-step step="9" :complete="e6 > 9">
            Payment
            <small>We will sent you an email with a confirmation link. Please check your email.</small>
          </v-stepper-step>-->
          <!-- <v-stepper-content step="9">
            <v-card flat class="mb-5" height="auto">
              <step-nine :form="cert_form"></step-nine>
            </v-card>
            <v-btn color="primary" @click="save">Submit</v-btn>
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>-->
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
    })
    // stepNine: () => ({
    //   component: import("./create/tabs/DocumentaryRequirements")
    // })
  },
  data: () => ({
    e6: 1,
    loading: false,
    stp: 0,
    typ: true,
    total_amount: 0,
    confirmDialog: false,
    shelf_life: [],
    cert_form: {
      case_type: 1,
      certificate_type: 0,
      case_no: "",
      application_type: 0,
      certificate_type: 0,
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
        region: "",
        license_no: "",
        license_validity: "",
        years_applied: 0,
        // object nalang contact
        contacts: {}
      },
      // change to establishment
      establishment_info: {
        activity: "",
        type: "",
        // change country origin to string
        origin_country: "",
        directly_source: null,
        manufacturer_name: "",
        manufacturer_address: "",
        supplier_name: "",
        supplier_address: ""
      },

      ingredients: [],

      product_specification: [
        //   {
        //   type: "",
        //   parameter: "",
        //   specification: ""
        // }
      ],

      shelf: {
        // add shelf_type
        shelf_type: "",
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
          // {
          //   type: "",
          //   kind: "",
          //   amount_per_serving: "",
          //   percent: ""
          // }
        ]
      },

      // change claims to array nalang
      claims: [
        {
          claim: "",
          desc: ""
        }
      ],

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
      uploaded_files: [
        //     {
        //     file_type: "",
        //     originalname: "",
        //     mimetype: "",
        //     contentType: "",
        //     location: "",
        //     key: ""
        // }
      ],
      output_files: []
    }
  }),
  created() {
    console.log("apply created");
    this.init();
  },

  methods: {
    init() {
      this.shelf_life = this.deepCopy(this.$store.state.foodCertificate.shelf_life);

      console.log(
        "active license data: " + JSON.stringify(this.active_license)
      );
      this.active_license.address_list.forEach(add => {
        if (add.type == 0) {
          this.cert_form.food_product.address = add.address;
          this.cert_form.food_product.region = add.region;
        }

      });
      this.cert_form.case_no = this.active_license.case_no;
      this.cert_form.food_product.company = this.active_license.estab_details.establishment_name;

      this.cert_form.food_product.license_no = this.active_license.license_no;

      this.cert_form.food_product.license_validity = this.active_license.license_expiry;

      this.cert_form.food_product.contacts.email = this.active_license.estab_details.email;

      this.cert_form.food_product.contacts.fax = this.active_license.estab_details.fax;

      this.cert_form.food_product.contacts.landline = this.active_license.estab_details.landline;

      this.cert_form.food_product.contacts.mobile = this.active_license.estab_details.mobile;

      //       console.log("this.$store.state.certificate.init_form: " + JSON.stringify(this.$store.state.certificate.init_form));
      // this.cert_form = this.$store.state.certificate.init_form
      //     console.log("created porps: " + JSON.stringify(this.cert_form));

      console.log("apply certificates");

      // if (this.cert_form.certificate_type === 0) {
      // this.loadFoodReferences();
      // } else if (this.cert_form.certificate_type === 1) {
      //   this.loadToysReferences();
      // } else if (this.cert_form.certificate_type === 2) {
      //   this.loadCosmeticsReferences();
      // }
    },
    loadFoodReferences() {
      console.log("load food references:");
      this.shelf_life = this.$store.state.foodCertificate.shelf_life;

      this.source = this.$store.state.foodCertificate.source;

      this.active_license.address_list.forEach(add => {
        if (add.type == 0) {
          this.cert_form.food_product.address = add.address;
          this.cert_form.food_product.region = add.region;
        }
      });
      this.cert_form.food_product.company = this.active_license.estab_details.establishment_name;

      this.cert_form.food_product.license_no = this.active_license.license_no;

      this.cert_form.food_product.license_validity = this.active_license.license_expiry;

      this.cert_form.food_product.contacts.email = this.active_license.estab_details.email;

      this.cert_form.food_product.contacts.fax = this.active_license.estab_details.fax;

      this.cert_form.food_product.contacts.landline = this.active_license.estab_details.landline;

      this.cert_form.food_product.contacts.mobile = this.active_license.estab_details.mobile;
    },
    // loadToysReferences() {
    //   console.log("load toys references");
    //   this.active_license.address_list.forEach(add => {
    //     if (add.type == 0) {
    //       this.cert_form.toy_certificate.establishment_info.address =
    //         add.address;
    //       this.cert_form.toy_certificate.establishment_info.region = add.region;
    //     }
    //   });
    //   this.cert_form.toy_certificate.establishment_info.company = this.active_license.estab_details.establishment_name;

    //   this.cert_form.toy_certificate.establishment_info.license_no = this.active_license.license_no;

    //   this.cert_form.toy_certificate.establishment_info.license_validity = this.active_license.license_expiry;

    //   this.cert_form.toy_certificate.establishment_info.contact_info = [
    //     {
    //       type: 0,
    //       details: this.active_license.estab_details.email
    //     },
    //     {
    //       type: 1,
    //       details: this.active_license.estab_details.mobile
    //     },
    //     {
    //       type: 2,
    //       details: this.active_license.estab_details.landline
    //     },
    //     {
    //       type: 3,
    //       details: this.active_license.estab_details.fax
    //     }
    //   ];
    // },
    // loadCosmeticsReferences() {
    //   console.log("load cosmetic references");
    //   this.active_license.address_list.forEach(add => {
    //     if (add.type == 0) {
    //       this.cert_form.cosmetic_certificate.establishment_info.address =
    //         add.address;
    //       this.cert_form.cosmetic_certificate.establishment_info.region =
    //         add.region;
    //     }
    //   });
    //   this.cert_form.cosmetic_certificate.establishment_info.company = this.active_license.estab_details.establishment_name;

    //   this.cert_form.cosmetic_certificate.establishment_info.license_no = this.active_license.license_no;

    //   this.cert_form.cosmetic_certificate.establishment_info.license_validity = this.active_license.license_expiry;

    //   this.cert_form.cosmetic_certificate.establishment_info.contact_info = [
    //     {
    //       type: 0,
    //       details: this.active_license.estab_details.email
    //     },
    //     {
    //       type: 1,
    //       details: this.active_license.estab_details.mobile
    //     },
    //     {
    //       type: 2,
    //       details: this.active_license.estab_details.landline
    //     },
    //     {
    //       type: 3,
    //       details: this.active_license.estab_details.fax
    //     }
    //   ];
    // },
    back() {
      this.e1--;
      if (this.e1 == 0) {
        this.$router.push("/");
      }
      this.tab = 0;
    },
    proceed(step) {
      console.log("procced");
      if (this.$refs.curr_step.validate()) {
        this.e1 = step;
      } else {
        this.$notifyError([{ message: "Fill-up required fields." }]);
      }
    },
    next(page) {
      this.e6 = page;
      var type = this.foodProductType(this.cert_form.food_product.type);
      console.log("next type data: " + JSON.stringify(type));
      if (type.name == "Raw Material") {
        this.stp = 2;
        this.typ = false;
      } else {
        this.stp = 0;
        this.typ = true;
      }
    },
    save() {
      this.showAppOverview = false;
      this.confirmDialog = true;

      console.log(
        "submit clicked: " + JSON.stringify(this.cert_form)
      );
      // this.$store
      //   .dispatch("SAVE_CERTIFICATE", this.cert_form)
      //   .then(result => {
      //     console.log("save certificate result: " + JSON.stringify(result));
      //     var payDetails = {
      //       application_type: 0,
      //       product_type: this.cert_form.food_product.type
      //     };
      //     return this.$store.dispatch("GET_CERTIFICATE_FEES", payDetails);
      //   })
      var payDetails = {
        application_type: 0,
        product_type: this.cert_form.food_product.type
      };
      this.$store.dispatch("GET_CERTIFICATE_FEES", payDetails).then(result => {
        console.log("get certificate fees: " + JSON.stringify(result));
        this.fees = [];
        this.fees.push({
          description: "Application Fee",
          amount: result.fee
        });
        this.fees.push({
          description: "LRF",
          amount: result.lrf
        });
        this.fees.push({
          description: "Interest",
          amount: result.interest
        }),
          this.fees.push({
            description: "Surcharge",
            amount: result.surcharge
          });
        this.total_amount =
          result.fee + result.lrf + result.interest + result.surcharge;
        this.$store.commit("SET_VIEW_CERTIFICATE", this.cert_form);
        this.$store.commit("SET_FORM", this.cert_form);
        this.$router.push("/app/certificates/overview");
        this.$notify({
          color: "success",
          message:
            "Registration fee computed! For this application you will have to pay the amount of  ₱ " +
            this.numberWithCommas(this.total_amount)
        });
      });
    }
  },
  computed: {
    completion() {
      console.log("completion this is e1: " + JSON.stringify(this.e1));
      console.log(
        "completion parse int: " +
          JSON.stringify(parseInt(((this.e6 - 1) / 7) * 100))
      );
      // if(this.foodProductType(this.cert_form.food_product.type).name == "Raw Material" && this.e6 == 6 || this.e6 == 7)
      //   this.e6 = 8

      return parseInt(((this.e6 - 1) / 9) * 100);
    },
    active_license() {
      console.log(
        "ACTIVE LICENSE : ",
        this.$store.state.licenses.active_license
      );
      return this.$store.state.licenses.active_license;
    }
  }
};
</script>

<style>
</style>
