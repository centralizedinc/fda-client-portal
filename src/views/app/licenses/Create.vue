<template>
  <div>
    <v-layout row wrap v-if="invalid">
      <v-flex xs12>Invalid Request: 404 status code.</v-flex>
    </v-layout>
    <form-layout
      v-show="!paymentDialog"
      v-else
      :step="e1"
      :steps="6"
      @prev="prev"
      @next="next"
      @changePage="changePage"
      @submit="confirmDialog=true"
    >
      <template slot="header-step-1">General Information
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg fa-spin"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-one slot="content-step-1" :form="form"></step-one>
      <template slot="header-step-2">Establishment Information
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg fa-spin"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-two slot="content-step-2" :form="form"></step-two>
      <template slot="header-step-3">Office Address
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg fa-spin"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-three slot="content-step-3" :form="form"></step-three>
      <template slot="header-step-4">Authorized Officer Details
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg fa-spin"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-four slot="content-step-4" :form="form"></step-four>
      <template slot="header-step-5">Qualified Personnel
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg fa-spin"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-five slot="content-step-5" :form="form"></step-five>
      <template slot="header-step-6">Documents Upload
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg fa-spin"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-six slot="content-step-6" :form="form"></step-six>
    </form-layout>
    <confirm-to-review-app
      :show="confirmDialog"
      @close="confirmDialog=false"
      @submit="submit"
      @overview="dialog = false ; showAppOverview = true"
    ></confirm-to-review-app>
    <application-overview :form="form" :show="showAppOverview" @close="close">
      <app-summary slot="appsummary" :form="form"></app-summary>
      <app-data slot="appdata" :form="form"></app-data>
      <uploaded-files slot="uploadedfiles" :form="form"></uploaded-files>
      <output-docs slot="outputdocs" :form="form"></output-docs>
      <app-history slot="apphistory" :form="form"></app-history>
      <payment slot="paymentdetails" :form="form"></payment>
    </application-overview>
    <payment-summary v-show="paymentDialog" @close="confirmDialog=false"></payment-summary>
  </div>
</template>

<script>
export default {
  components: {
    FormLayout: () => import("@/components/FormLayout"),
    ApplicationOverview: () => import("@/components/ApplicationOverview.vue"),
    ConfirmToReviewApp: () => import("./create/tabs/ConfirmDialog.vue"),
    StepOne: () => import("./create/tabs/GeneralInfo.vue"),
    StepTwo: () => import("./create/tabs/EstablishmentInfo.vue"),
    StepThree: () => import("./create/tabs/OfficeAddress.vue"),
    StepFour: () => import("./create/tabs/AuthorizedOfficerDetails.vue"),
    StepFive: () => import("./create/tabs/QualifiedPersonnel.vue"),
    StepSix: () => import("./create/tabs/DocumentsUpload.vue"),
    AppSummary: () => import("./appoverview/tabs/AppSummary.vue"),
    AppData: () => import("./appoverview/tabs/Data.vue"),
    UploadedFiles: () => import("./appoverview/tabs/Files.vue"),
    OutputDocs: () => import("./appoverview/tabs/OutputDocs.vue"),
    AppHistory: () => import("./appoverview/tabs/AppHistory.vue"),
    Payment: () => import("./appoverview/tabs/PaymentDetails.vue"),
    PaymentSummary: () => import("../payment/PaymentSummary.vue")
  },
  data: () => ({
    e1: 1,
    confirmDialog: false,
    paymentDialog: false,
    showAppOverview: false,
    invalid: false,
    form: {
      current_task: "",
      user: "",
      action: "",
      created_by: "",
      date_created: "",
      application_type: "",
      general_info: {
        product_type: "",
        primary_activity: "",
        declared_capital: ""
      },
      estab_details: {
        establishment_name: "",
        establishment_owner: "",
        tin: "",
        email: "",
        landline: "",
        fax: "",
        mobile: "",
        products: [
          {
            prod_line: "",
            remarks: ""
          }
        ]
      },
      addresses: {
        office: {
          address: "",
          region: "",
          province: "",
          city: "",
          zipcode: "",
          location: ""
        },
        warehouse: [],
        plant: {
          address: "",
          region: "",
          province: "",
          city: "",
          zipcode: ""
        }
      },
      auth_officer: {
        mail_add: {
          address: "",
          region: "",
          province: "",
          city: "",
          zipcode: ""
        },
        lastname: "",
        firstname: "",
        middlename: "",
        designation: "",
        email: "",
        tin: "",
        birthday: "",
        id_type: "",
        id_no: "",
        id_expiry: ""
      },
      qualified_personnel: [],
      uploaded_files: [
        {
          purpose: "Proof of Business Name Registration",
          file_name: "",
          file: null
        },
        {
          purpose: "Site Master File",
          file_name: "",
          file: null
        },
        {
          purpose: "Risk Management Plan",
          file_name: "",
          file: null
        },
        {
          purpose: "Licensing Seminar Certificate",
          file_name: "",
          file: null
        },
        {
          purpose: "PRC ID",
          file_name: "",
          file: null
        }
      ]
    }
  }),
  created() {
    console.log("created porps: " + JSON.stringify(this.form));
  },
  // watch: {
  //   form(){
  //     this.editedForm = this.form;
  //     console.log("form updated: " + JSON.stringify(this.editedForm))
  //   }
  // },
  methods: {
    close() {
      this.showAppOverview = false;
      this.confirmDialog = true;
    },
    prev() {
      console.log("next is clicked!!! ");
      this.e1--;
    },
    next() {
      console.log("next is clicked!!! ");
      this.e1++;
    },
    changePage(val) {
      console.log("change page value: " + JSON.stringify(val));
      this.e1 = val;
      this.editedForm = this.form;
      console.log("form updated: " + JSON.stringify(this.editedForm));
    },
    submit() {
      this.paymentDialog = true;
      this.confirmDialog = false;
      console.log("#########submit: " + JSON.stringify(this.form));
      this.$store.dispatch("SAVE_LICENSES", this.form);
    }
  }
};
</script>

<style>
</style>
