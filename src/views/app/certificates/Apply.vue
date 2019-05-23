<template>
  <div>
    <v-layout row wrap v-if="invalid">
      <v-flex xs12>Invalid Request: 404 status code.</v-flex>
    </v-layout>
    <form-layout
      v-else
      :step="e1"
      :steps="10"
      @prev="prev"
      @next="next"
      @changePage="changePage"
      @submit="save"
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
      <step-one slot="content-step-1" :form="cert_form"></step-one>

      <template slot="header-step-2">
        Establishment Information
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-two slot="content-step-2" :form="cert_form"></step-two>

      <template slot="header-step-3">Complete List of Ingredients</template>
      <step-three slot="content-step-3" :form="cert_form"></step-three>

      <template slot="header-step-4">Product Specifications</template>
      <step-four slot="content-step-4" :form="cert_form"></step-four>

      <template slot="header-step-5">Shelf Life and Other Information</template>
      <step-five slot="content-step-5" :form="cert_form"></step-five>

      <template slot="header-step-6">Nutrition Information</template>
      <step-six slot="content-step-6" :form="cert_form"></step-six>

      <template slot="header-step-7">Nutrition Health Claims</template>
      <step-seven slot="content-step-7" :form="cert_form"></step-seven>

      <template slot="header-step-8">Documentary Upload</template>
      <step-eight slot="content-step-8" :form="cert_form"></step-eight>

      <template slot="header-step-9">Input Document</template>
      <step-nine slot="content-step-9" :form="cert_form"></step-nine>

      <template slot="header-step-10">Amendment</template>
      <step-ten slot="content-step-10" :form="cert_form"></step-ten>

      <template slot="header-step-11">Payment</template>
      <step-eleven slot="content-step-11" :form="cert_form"></step-eleven>
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
    StepSix: () => import("./create/tabs/NutritionInfo.vue"),
    StepSeven: () => import("./create/tabs/NutritionHealthClaims.vue"),
    StepEight: () => import("./create/tabs/DocumentaryRequirements.vue"),
    StepNine: () => import("./create/tabs/InputDocument.vue"),
    StepTen: () => import("./create/tabs/Amendment.vue"),
    StepEleven: () => import("./create/tabs/Amendment.vue")
  },
  data: () => ({
    e1: 1,
    confirmDialog: false,
    showAppOverview: false,
    invalid: false,
    cert_form: {
     food_product:{
          type:"",
          categorization: "",
          brand_name: "",
          product_name: "",
          company: "",
          address: {},
          license_no: "",
          license_validity: "",
          years_applied: 0,
          contacts: []
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
    },
    save(){
      this.confirmDialog=true
      console.log("submit clicked: " + JSON.stringify(this.cert_form))
      this.$store.dispatch('SAVE_CERTIFICATE', this.cert_form)
    }
  }
};
</script>

<style>
</style>
