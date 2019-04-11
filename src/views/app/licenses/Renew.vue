<template>
  <v-layout align-start justify-start column fill-height>
    <payment-summary v-if="paymentDialog" :form="form" :charges="charges"></payment-summary>
    <v-card v-else width="calc(100% - 0px">
      <v-card-text>
        <v-layout align-start justify-start row fill-height>
          <v-flex xs3 mr-5 mt-3 pt-3 pr-5>
            <v-item-group v-model="window" class="shrink mr-5" mandatory tag="v-flex">
              <v-item v-for="n in title" :key="n">
                <div class="mr-5 pr-5" left slot-scope="{ active, toggle }">
                  <v-btn class="text-align: left" ripple flat @click="toggle">
                    <v-icon>mdi-record</v-icon>
                    {{n}}
                  </v-btn>
                </div>
              </v-item>
            </v-item-group>
          </v-flex>
          <v-layout align-start justify-start row fill-height>
            <v-flex xs12 pl-2>
              <v-window
                v-model="window"
                class="elevation-5 mt-3"
                style="border-radius: 8px"
                vertical
              >
                <v-window-item v-for="n in title" :key="n">
                  <v-layout align-start justify-start row fill-height>
                    <v-flex>
                      <v-card flat>
                        <v-card-text>
                          <v-layout align-center justify-center fill-height mb-3>
                            <v-avatar class="mr-3" color="grey">
                              <img src="https://i.postimg.cc/L6Z0cZk3/vue-logo.png" alt="FDA">
                            </v-avatar>

                            <strong class="title text-transform: uppercase">{{ n }}</strong>
                            <v-spacer></v-spacer>
                            <v-btn icon>
                              <v-icon>mdi-account</v-icon>
                            </v-btn>
                          </v-layout>
                          <v-divider></v-divider>

                          <!-- Summary-->
                          <v-card flat v-show="window===0">
                            <v-container grid-list-md text-xs-left>
                              <app-summary :form="form"></app-summary>
                            </v-container>
                          </v-card>

                          <!-- Data -->
                          <v-card flat v-show="window===1">
                            <v-container grid-list-md text-xs-left>
                              <app-data :form="form"></app-data>
                            </v-container>
                          </v-card>

                          <!-- Uploaded Documents -->
                          <v-card flat v-show="window===2">
                            <v-container grid-list-md text-xs-left>
                              <documents-upload :form="form" @upload="uploadFile"></documents-upload>
                            </v-container>
                          </v-card>

                          <!-- Output Documents -->
                          <v-card flat v-show="window===3">
                            <v-container grid-list-md text-xs-left>
                              <output-docs :form="form"></output-docs>
                            </v-container>
                          </v-card>

                          <!-- Application History -->
                          <!-- <v-card flat v-show="window===4">
                            <v-container grid-list-md text-xs-left>
                              <app-history :form="form"></app-history>
                            </v-container>
                          </v-card> -->
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-window-item>
              </v-window>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="success" @click="confirmDialog=true">Continue</v-btn>
      </v-card-actions>

      <!-- Confirmation -->
      <v-dialog
        v-model="confirmDialog"
        persistent
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-toolbar
            dark
            color="fdaGreen"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >
            <span class="font-weight-light title">Note</span>
          </v-toolbar>
          <v-card-text>Once you clicked Submit, you won't be able to modify any of the data you have entered.</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn flat color="secondary" outline @click="confirmDialog=false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="apply">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-layout>
</template>

<script>
import appOverviewTabs from "./appoverview/tabs";


const tabsComponents = Object.assign(
  {
    PaymentSummary: () => import("../payment/PaymentSummary.vue"),
    // AddToListDialog: () => import('@/views/registration/tabs/AddToListDialog.vue'),
    AuthorizedOfficerDetails: () => import('@/views/registration/tabs/AuthorizedOfficerDetails.vue'),
    // ConfirmDialog: () => import('@/view/registration/tabs/ConfirmDialog.vue'),
    DocumentsUpload: () => import('@/views/registration/tabs/DocumentsUpload.vue'),
    EstablishmentInfo: () => import('@/views/registration/tabs/EstablishmentInfo.vue'),
    GeneralInfo: () => import('@/views/registration/tabs/GeneralInfo.vue'),
    OfficeAddress: () => import('@/views/registration/tabs/OfficeAddress.vue'),
    QualifiedPersonnel: () => import('@/views/registration/tabs/QualifiedPersonnel.vue')
  },
  Object.assign(appOverviewTabs)
);

export default {
  components: tabsComponents,
  data() {
    return {
      form: {},
      window: 0,
      title: [
        "Summary",
        "Application Data",
        "Uploaded Files",
        "Output Documents",
        "History"
      ],
      formData: null,
      confirmDialog: false,
      paymentDialog: false,
      charges: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      var old_form = this.$store.state.licenses.renewal_license;
      this.form = {
        application_type: 2,
        general_info: old_form.general_info,
        estab_details: old_form.estab_details,
        addresses: old_form.addresses,
        auth_officer: old_form.auth_officer,
        qualified: old_form.qualified,
        uploaded_files: old_form.uploaded_files,
        isEncoded: old_form.isEncoded,
        encoder: old_form.encoder,
        base_license: old_form.base_license
      };
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
                "Successfully applied a Renewal License with Case No.: " +
                result.model.case_details.case_no,
              color: "success",
              icon: "check_circle"
            });
            this.$store.commit("SET_FORM", result.model);
            this.confirmDialog = false; 
            //get fees 
            var details = {
                productType: this.form.general_info.product_type,
                primaryActivity: this.form.general_info.primary_activity,
                declaredCapital: this.form.general_info.declared_capital,
                appType: this.form.application_type
              }; 
              console.log('DETAILS: '+JSON.stringify(details))         
            return this.$store.dispatch("GET_FEES", details)
          } else {
            this.$notifyError(result.errors);
          }
        })
        .then(payment_fees=>{
          this.charges = result;
          this.paymentDialog = true;
        })
        .catch(err => {
          console.log("ERROR: " + err);
          this.$notifyError(err);
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
        console.log("load fees renew: " + JSON.stringify(details));
        this.$store.dispatch("GET_FEES", details).then(result => {
          this.charges = result;
          console.log(
            "charges data payment details: " + JSON.stringify(this.charges)
          );
        });
      }
    }
  }
};
</script>

<style>
</style>
