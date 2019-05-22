<template>
  <div>
    <v-layout row wrap v-if="invalid">
      <v-flex xs12>Invalid Request: 404 status code.</v-flex>
    </v-layout>
    <form-layout
      v-else
      :step="e1"
      :steps="7"
      @prev="prev"
      @next="next"
      @changePage="changePage"
      @submit="confirmDialog=true"
    >
      <template slot="header-step-1">
        Food Product Application Form
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-one slot="content-step-1" :form="form"></step-one>

      <template slot="header-step-2">
        Establishment Information
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-two slot="content-step-2" :form="form"></step-two>

      <template slot="header-step-3">Complete List of Ingredients</template>
      <step-three slot="content-step-3" :form="form"></step-three>

      <template slot="header-step-4">Product Specifications</template>
      <step-four slot="content-step-4" :form="form"></step-four>

      <template slot="header-step-5">Shelf Life and Other Information</template>
      <step-five slot="content-step-5" :form="form"></step-five>

      <template slot="header-step-6">Document Upload</template>
      <step-six slot="content-step-6" :form="form"></step-six>

      <template slot="header-step-7">Payment</template>
      <step-seven slot="content-step-7" :form="form"></step-seven>
    </form-layout>
  </div>
</template>

<script>
export default {
  components: {
    FormLayout: () => import("@/components/FormLayout"),
    StepOne: () => import("./create/tabs/FoodProductAppForm.vue"),
    StepTwo: () => import("./create/tabs/EstablishmentInfo.vue"),
    StepThree: () => import("./create/tabs/CompleteIngredients.vue"),
    StepFour: () => import("./create/tabs/ProductSpecs.vue"),
    StepFive: () => import("./create/tabs/Shelflife.vue"),
    StepSix: () => import("./create/tabs/DocumentUpload.vue"),
    StepSeven: () => import("./create/tabs/DocumentUpload.vue")
  },
  data: () => ({
    e1: 1,
    confirmDialog: false,
    showAppOverview: false,
    invalid: false,
    form: {
      application_type: "",
      food_appform: {
        product_type: "",
        category: "",
        brand_name: "",
        product_name: "",
        company_name: "",
        address: "",
        region: "",
        lto_no: "",
        lto_validity: "",
        no_of_yrs: "",
        contact_info: {
          email: "",
          telephone: "",
          fax: "",
          mobile: ""
        }
      },
      estab_info: {
        company_activity: "",
        source_type: "",
        origin_country: "",
        source: "",
        supplier_name: "",
        supplier_address: "",
        manufacturer_name: "",
        manufacturer_address: ""
      },
      ingredients: {
        name: ""
      }
    }
  }),
  created() {
    console.log("created porps: " + JSON.stringify(this.form));
  },

  methods: {
    close() {
      this.showAppOverview = false;
      this.confirmDialog = true;
    },
    prev() {
      this.e1--;
    },
    next() {
      this.e1++;
    },
    changePage(val) {
      this.e1 = val;
    }
  }
};
</script>

<style>
</style>
