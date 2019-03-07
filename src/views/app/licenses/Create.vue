<template>
  <div>
    <v-layout row wrap v-if="invalid">
      <v-flex xs12>Invalid Request: 404 status code.</v-flex>
    </v-layout>
    <payment-summary
      v-else-if="paymentDialog"
      @close="confirmDialog=false"
      :form="form"
      :charges="charges"
    ></payment-summary>
    <form-layout
      v-show="!ecpayDialog"
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
            <i class="fas fa-question fa-lg"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-one slot="content-step-1" :form="form"></step-one>
      <template slot="header-step-2">Establishment Information
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-two slot="content-step-2" :form="form"></step-two>
      <template slot="header-step-3">Office Address
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-three slot="content-step-3" :form="form"></step-three>
      <template slot="header-step-4">Authorized Officer Details
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-four slot="content-step-4" :form="form"></step-four>
      <template slot="header-step-5">Qualified Personnel
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-five slot="content-step-5" :form="form"></step-five>
      <template slot="header-step-6">Documents Upload
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg"></i>
          </v-btn>Get Help
        </v-tooltip>
      </template>
      <step-six slot="content-step-6" :form="form" @upload="uploadFile" style="width: 100%"></step-six>
    </form-layout>
    <confirm-to-review-app
      :show="confirmDialog"
      @close="confirmDialog=false"
      @submit="apply"
      @overview="confirmDialog = false ; showAppOverview = true"
    ></confirm-to-review-app>
    <application-overview :show="showAppOverview" @close="close">
      <app-summary slot="appsummary" :form="form"></app-summary>
      <app-data slot="appdata" :form="form"></app-data>
      <uploaded-files slot="uploadedfiles" :form="form"></uploaded-files>
      <output-docs slot="outputdocs" :form="form"></output-docs>
      <app-history slot="apphistory" :form="form"></app-history>
      <payment slot="paymentdetails" :form="form" :charges="charges"></payment>
    </application-overview>
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
    ecpayDialog: false,

    paymentDialog: false,
    showAppOverview: false,
    invalid: false,
    charges: {},
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
      ],
      formData: null
    }
  }),
  created() {
    this.init();
  },
  // watch: {
  //   form(){
  //     this.editedForm = this.form;
  //     console.log("form updated: " + JSON.stringify(this.editedForm))
  //   }
  // },
  methods: {
    init() {
      this.$store
        .dispatch("GET_PRODUCT_REFERENCE")
        .then(result => {
          if (
            this.$store.state.licenses.form &&
            this.$store.state.licenses.form._id &&
            this.$store.state.licenses.form.application_type === 1
          ) {
            this.form = this.$store.state.licenses.form;
            this.$store.state.licenses.form = "";
          } else if (
            this.$store.state.licenses.form &&
            this.$store.state.licenses.form._id &&
            this.$store.state.licenses.form.application_type === 2
          ) {
            this.form = this.$store.state.licenses.form;
            this.$store.state.licenses.form = "";
          } else {
            this.form.application_type = 0;
          }
        })
        .catch(err => {
          console.log("loading products error: " + err);
        });
    },
    load_primaries(product_id) {
      this.$store.dispatch("GET_PRIMARY_ACTIVITY", product_id);
    },
    load_productline() {
      this.$store.dispatch("GET_PROD_LINE");
    },
    load_references(primary_id) {
      console.log("despatch declared capital0");
      this.$store
        .dispatch("GET_SECONDARY_ACTIVITY", primary_id)
        .then(result => {
          console.log("despatch declared capital1");
          return this.$store.dispatch("GET_ADDITIONAL", primary_id);
        })
        .then(result => {
          console.log("despatch declared capital2");
          return this.$store.dispatch("GET_ALL_DECLARED");
        })
        // .then(result => {
        //   console.log("despatch declared capital2")
        //   return this.$store.dispatch("GET_DECLARED", primary_id);
        // })
        .catch(err => {
          console.log("loading references: " + err);
        });
    },
    load_fees() {
      if (
        this.form.general_info.product_type !== null &&
        this.form.general_info.primary_activity !== null &&
        // this.form.general_info.declared_capital !== null &&
        this.form.application_type !== null
      ) {
        var details = {
          productType: this.form.general_info.product_type,
          primaryActivity: this.form.general_info.primary_activity,
          declaredCapital: this.form.general_info.declared_capital,
          appType: this.form.application_type
        };
        console.log("load fees new license: " + JSON.stringify(details));
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
      if (this.e1 === 6) this.load_fees();
    },
    submit() {
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
          return this.$store.dispatch("SAVE_LICENSES", this.form);
        })
        .then(result => {
          this.$notify({
            message: "You have successfully applied a new license",
            color: "success",
            icon: "check_circle"
          });
          this.confirmDialog = false;
          this.showAppOverview = false;
          this.paymentDialog = true;

          // var details = {
          //   apptype: this.form.application_type,
          //   productType: this.form.general_info.product_type,
          //   primaryActivity: this.form.general_info.primary_activity,
          //   declaredCapital: this.form.general_info.declared_capital,
          //   date_expiry: this.form.date_expiry

          // }
          // return this.$store.dispatch("BILLS_PAYMENT", )
        })
        .catch(err => {
          console.log("error in uploading files: " + err);
        });
    },

    uploadFile(upload) {
      this.formData = upload;
    },
    apply() {
      this.$store
        .dispatch("APPLY_LICENSE", {
          license: this.form,
          upload: this.formData
        })
        .then(result => {
          if (result.success) {
            this.$notify({
              message:
                "Successfully applied a new License with Case No.: " +
                result.model.case_details.case_no,
              color: "primary"
            });
            this.$store.commit("SET_FORM", result.model);
            this.confirmDialog = false;
            this.showAppOverview = false;
            this.paymentDialog = true;
          } else {
            this.$notifyError(result.errors);
          }
        })
        .catch(err => {
          console.log("ERROR: " + err);
          this.$notifyError(err);
        });
    }
  }
};
</script>

<style>
</style>
