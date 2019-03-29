<template>
  <div>
    <!-- <v-tooltip top>
      <v-btn slot="activator" flat top right icon color="error" @click="navDialog = true">
        <v-icon>fas fa-times fa-2x</v-icon>
      </v-btn>Close this page
    </v-tooltip>-->
    <payment-summary v-if="paymentDialog" :form="form"></payment-summary>
    <form-layout
      v-else
      :step="e1"
      :steps="7"
      @prev="prev"
      @next="next"
      @changePage="changePage"
      @submit="confirmDialog=true"
      submitText="Continue"
    >
      <template slot="header-step-1">
        General Information
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
      <template slot="header-step-3">
        Office Address
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg"></i>
          </v-btn>Select the the Region, Province, City and Zip Code accordingly
        </v-tooltip>
      </template>
      <step-three slot="content-step-3" :form="form"></step-three>
      <template slot="header-step-4">
        Authorized Officer Details
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-four slot="content-step-4" :form="form"></step-four>
      <template slot="header-step-5">
        Qualified Personnel
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-five slot="content-step-5" :form="form"></step-five>
      <template slot="header-step-6">
        Documents Upload
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-six slot="content-step-6" :form="form" @upload="uploadFile" style="width: 100%"></step-six>
      <template slot="header-step-7">
        Account Info
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-seven slot="content-step-7" :account="account"></step-seven>
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
      <payment slot="paymentdetails" :form="form" :charges="charges"></payment>
    </application-overview>
    <v-btn
      dark
      @click="navDialog = true"
      block
      style="text-transform: uppercase"
      class="text--primary"
      color="warning"
    >Apply later</v-btn>

    <!-- confirm navigation -->
    <v-dialog v-model="navDialog" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-toolbar
          color="fdaGreen"
          style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
        >
          <span class="font-weight-light headline">Confirm Navigation</span>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <v-btn slot="activator" flat icon color="black" @click="navDialog = false">
              <v-icon>fas fa-times-circle fa-1x</v-icon>
            </v-btn>Close
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>The changes you made will be lost if you navigate away from this page.</v-flex>
            <v-flex xs12>Are you sure you want to leave this page?</v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outline color="success" @click="navDialog = false">Stay on this Page</v-btn>
          <v-btn color="success" @click="$router.push('/')">Leave this Page</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import tabscomponents from "./tabs";

export default {
  components: tabscomponents,
  data: () => ({
    e1: 1,
    navDialog: false,
    confirmDialog: false,
    paymentDialog: false,
    showAppOverview: false,
    form: {
      current_task: "",
      user: "",
      action: "",
      created_by: "",
      date_created: "",
      application_type: "0",
      general_info: {
        product_type: "",
        primary_activity: "",
        declared_capital: "",
        addtl_activity: ""
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
      qualified: [],
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
    },
    account: {
      username: "",
      password: "",
      name: {}
    },
    formData: {},
    charges: {}
  }),
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store
        .dispatch("GET_PRODUCT_REFERENCE")
        .then(result => {
          this.form.application_type = 0;
        })
        .catch(err => {
          console.log("loading products error: " + err);
        });
    },
    load_fees() {
      var details = {};
      if (
        this.form.general_info.product_type !== null &&
        this.form.general_info.primary_activity !== null &&
        // this.form.general_info.declared_capital !== null &&
        this.form.application_type !== null
      ) {
        details = {
          productType: this.form.general_info.product_type,
          primaryActivity: this.form.general_info.primary_activity,
          declaredCapital: this.form.general_info.declared_capital,
          appType: this.form.application_type
        };
        console.log("load fees create: " + JSON.stringify(details));
        this.$store.dispatch("GET_FEES", details).then(result => {
          this.charges = result;
          console.log(
            "charges data payment details: " + JSON.stringify(this.charges)
          );
        });
      }
    },
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
      if (this.e1 === 7) this.load_fees();
    },
    uploadFile(upload) {
      this.formData = upload;
    },
    submit() {
      console.log("##### form: " + JSON.stringify(this.form));
      console.log("##### account: " + JSON.stringify(this.account));
      var files = this.form.uploaded_files;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        if (files[i].file) {
          formData.append("lto", files[i].file, files[i].file["name"]);
        }
      }
      this.$store
        .dispatch("UPLOAD_LICENSES", formData)
        .then(files => {
          this.form.uploaded_files = files;
          return this.$store.dispatch("REGISTER", {
            license: this.form,
            account: this.account
          });
        })
        .then(result => {
          console.log(
            "RESULT CREATE NEW ##################: " + JSON.stringify(result)
          );
          this.$notify({
            message: "You have successfully applied a new license",
            color: "success",
            icon: "check_circle"
          });
          this.confirmDialog = false;
          this.showAppOverview = false;
          this.paymentDialog = true;
        })
        .catch(err => {
          console.log("error in uploading files: " + err);
        });
    }
  }
};
</script>

<style>
</style>
