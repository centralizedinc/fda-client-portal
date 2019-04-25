<template>
<v-layout row wrap>
    <v-layout row wrap v-if="showPayLater">
        <pay-later :form="app_form"></pay-later>
    </v-layout>

    <v-layout row wrap v-else-if="showCreditCard">
        <credit-card :form="app_form" @cancel="cancel"></credit-card>
    </v-layout>

    <v-flex xs12 v-else>
        <v-card>
            <v-card-title primary-title class="font-weight-light headline">Payment Summary</v-card-title>
            <v-container grid-list-xl>
                <v-layout row wrap align-center justify-center fill-height>
                    <!-- <v-flex xs6> -->
                    <v-flex xs6 v-if="fees_form.lrf != 0">
                        <label class="subheading">Application Fee:</label>
                    </v-flex>
                    <v-flex xs6 v-if="fees_form.lrf != 0">
                        <label class="subheading">₱ {{numberWithCommas(fees_form.fee)}}</label>
                    </v-flex>
                    <v-flex xs6>
                        <label class="subheading"># of year/s applied:</label>
                    </v-flex>
                    <v-flex xs6>
                        <label class="subheading">{{fees_form.yearsApplied}} years</label>
                    </v-flex>
                    <v-flex xs6>
                        <label class="subheading">Surcharge:</label>
                    </v-flex>
                    <v-flex xs6>
                        <label class="subheading">
                <label class="subheading">₱ {{numberWithCommas(fees_form.surcharge)}}</label>
                        <!-- <v-icon medium color="error">close</v-icon> -->
                        </label>
                    </v-flex>
                    <v-flex xs6>
                        <label class="subheading">Legal Research Fund (LRF):</label>
                    </v-flex>
                    <v-flex xs6>
                        <label class="subheading">₱ {{numberWithCommas(fees_form.lrf)}}</label>
                    </v-flex>
                    <v-flex xs6 v-if="fees_form.lrf != 0">
                        <label class="subheading" color="error">Total Payment Due:</label>
                    </v-flex>
                    <v-flex xs6 v-if="fees_form.lrf === 0">
                        <label class="subheading" color="error">Still Due:</label>
                    </v-flex>
                    <v-flex xs6>
                        <label class="subheading">₱ {{numberWithCommas(fees_form.total)}}</label>
                    </v-flex>

                </v-layout>
            </v-container>
            <v-divider></v-divider>
            <v-card-actions>

                <!-- speed dial -->
                <v-speed-dial v-model="fab" direction="right" open-on-hover transition="slide-x-transition" block>
                    <template v-slot:activator>
                        <v-tooltip top>
                            <v-btn slot="activator" v-model="fab" color="primary"> mode of payment 
                            </v-btn>Show mode of payment
                        </v-tooltip>
                    </template>
                    <v-tooltip top class="pa-1">
                        <v-btn slot="activator" dark color="fdaBlueGreen" @click="generatePDF">
                            FDAC
                        </v-btn>FDAC
                    </v-tooltip>
                    <v-tooltip top class="pa-1">
                        <v-btn slot="activator" dark @click="creditCard" color="fdaOrange">
                            Credit Card
                        </v-btn>Credit Card
                    </v-tooltip>
                    <v-tooltip top class="pa-1">
                        <v-btn slot="activator" dark @click="ecpay" color="fdaGold">
                            ECPay
                        </v-btn>ECPay
                    </v-tooltip>
                    <!-- pay later -->
                    <!-- <v-tooltip top class="pa-1">
                        <v-btn dark slot="activator" height="50px" class="font-weight-bold" color="fdaMed" @click="payLater" v-if="allow_paylater">Pay Later</v-btn> Pay Later
                    </v-tooltip> -->
                </v-speed-dial>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-flex>

    <!-- PayLater Dialog -->
    <!-- <v-dialog v-model="dialogPayLater" max-width="300px" transition="dialog-transition">
        <v-card>
            <v-toolbar dark color="primary" style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
                <span class="title font-weight-light">Confirmation</span>
            </v-toolbar>
            <v-card-text>
                <span class="font-weight-normal">You have chosen to pay later. Make sure to settle payment on or before the payment deadline to avoid charges. </span>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="dialogPayLater=false">Pay Now</v-btn>
                <v-btn color="primary" flat @click="$router.push('/')">Ok!</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog> -->

    <!-- FDAC Dialog -->
    <v-dialog v-model="cashierPayment" scrollable persistent transition="dialog-transition" max-width="500">
        <v-card>
            <v-toolbar dark color="fdaGreen" style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
                <span class="font-weight-light headline">Payment via FDAC</span>
                <v-spacer></v-spacer>
                <v-tooltip top>
                    <v-btn slot="activator" flat icon color="black" @click="$router.push('/')">
                        <i class="fas fa-times-circle fa-1x"></i>
                    </v-btn>Close
                </v-tooltip>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-flex xs12>
                    <p class="body-2">Order of Payment has been downloaded.</p>
                    <p>General Guidelines:</p>
                    <ol>
                        <li>Print the system generated Order of Payment</li>
                        <li>Proceed to the nearest FDA Action Center and present the Order of Payment</li>
                        <!-- <li>*Upload the receipt/confirmation in the Application Summary*</li> -->
                    </ol>
                    <div></div>
                    <p class="caption mt-2" style="color: grey; font-family:courier">Note: The payment of fee is not a guarantee that the application will be granted. The processing of the application will still be subject to the evaluation of the concerned FDA personnel and its compliance with the pertinent laws, rules and regulations</p>
                </v-flex>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn flat block color="error" @click="cashierPayment = false">close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- ecPay Dialog -->
    <v-dialog v-model="ecPayDialog" scrollable persistent transition="dialog-transition" max-width="500">
        <v-card>
            <v-toolbar dark color="fdaGreen" style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
                <span class="font-weight-light headline">Payment via ECPay</span>
                <v-spacer></v-spacer>
                <v-tooltip top>
                    <v-btn slot="activator" flat icon color="black" @click="ecPayDialog =false">
                        <i class="fas fa-times-circle fa-1x"></i>
                    </v-btn>Close
                </v-tooltip>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-flex xs12>
                    <p class="body-2">Your Reference Number has been downloaded.</p>
                    <p>General Guidelines:</p>
                    <ol>
                        <li>Print the system generated Reference Number</li>
                        <li>Reference number can only be used once. If you made a short payment by mistake, do not try to correct it by making another bills payment with the same reference number.</li>
                        <li>Amount is inclusive of convenience fee/ If you are paying for multiple reference numbers, pay separaely for each reference number. Only one (1) transaction per reference number.</li>
                    </ol>
                    <div></div>
                    <p class="caption mt-2" style="color: grey; font-family:courier">Note: The payment of fee is not a guarantee that the application will be granted. The processing of the application will still be subject to the evaluation of the concerned FDA personnel and its compliance with the pertinent laws, rules and regulations</p>
                </v-flex>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn flat block color="error" @click="$router.push('/')">close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-layout>
</template>

<script>
// import * as OrderOfPaymentGenerator from "./OrderOfPaymentGenerator";

export default {
  props: {
    form: {
      type: Object
    },
    case_holder: {
      type: Object
    },
    charges: {
      type: Object
    },
    allow_paylater: {
      type: Boolean,
      default: true
    }
  },
  components: {
    CreditCard: () => import("./CreditCardPayment.vue"),
    PayLater: () => import("./PayLater.vue")
  },
  data() {
    return {
      rates: {
        fee: 5000,
        lrf: 50
      },
      app_form: {},
      fees_form: {},
      case_form: {},
      cashierPayment: false,
      ecPayDialog: false,
      dialogPayLater: false,
      showCreditCard: false,
      showPayLater: false,
      dialogPayLater: false,
      fab: false
      // bancnetDialog: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log("FORM: " + JSON.stringify(this.$store.state.licenses.form));
      this.app_form = this.$store.state.licenses.form;
      this.form = this.$store.state.licenses.form;
      this.$store.dispatch("GET_ONE_CASE", this.form.case_no).then(result => {
        console.log("get onse case @ view: " + JSON.stringify(result));
        this.case_holder = result;
      });
      this.fees_form = this.charges
        ? this.charges
        : this.$store.state.payments.fee;
    },
    cancel() {
      this.showCreditCard = false;
      this.showPayLater = false;
    },
    // generatePDF() {
    //     this.cashierPayment = true;
    //     OrderOfPaymentGenerator.generateOrderOfPayment(
    //         this.app_form,
    //         this.fees_form
    //     );
    // },
    creditCard() {
      var summary = [];
      summary.push({
        description: "Application Fee",
        amount: this.fees_form.fee
      });
      summary.push({
        description: "LRF",
        amount: this.fees_form.lrf
      });
      summary.push({
        description: "Surcharge",
        amount: this.fees_form.surcharge
      });
      summary.push({
        description: "Remaining Balance",
        amount: this.fees_form.total
      });
      console.log("FORM: " + JSON.stringify(this.form));
      console.log("fees form data: " + JSON.stringify(this.fees_form));
      console.log("summary data: " + JSON.stringify(summary));
      this.$showCC({
        summary,
        case_no: this.form.case_no,
        application_type: this.form.application_type
      });
    },
    payLater() {
      this.dialogPayLater = true;
      // this.cashierPayment = false;
      // this.ecPayDialog = false;
      // this.showPayLater = true;
      // this.$router.push("/");
    },
    ecpay() {
      this.ecPayDialog = true;
      console.log("application fees: " + JSON.stringify(this.fees_form));
      console.log("application data: " + JSON.stringify(this.form));
      console.log("application case: " + JSON.stringify(this.case_holder));
      var full_details = {
        fees: this.fees_form,
        form: this.form,
        case: this.case_holder,
        mode_of_payment: 4
      };
      this.$store
        .dispatch("SAVE_TRANSACTION_PROVIDER", full_details)
        .then(result => {
          console.log(
            "this is ecpay save transaction provider data: " +
              JSON.stringify(result)
          );
          var ecpay_fee = 0;
          var details = {
            reference_number: result.third_party_ref_no,
            status: this.getPaymentStatus(result.payment_details.status),
            expiration: this.formatDt(this.case_holder.date_expiry),
            amount: this.formatCurrency(
              result.transaction_details.order_payment.total_amount
            ),
            con_fee: this.formatCurrency(ecpay_fee),
            total: this.formatCurrency(
              result.transaction_details.order_payment.total_amount + ecpay_fee
            )
          };
          console.log("ecpay data details: " + JSON.stringify(details));
          this.$download(details, "ECPAY", "ecpay-referenceno.pdf");
          return this.$upload(details, "ECPAY");
        })
        .then(blob => {
          console.log("upload start!!!!");
          var file = new File([blob], "ecpay-referenceno.pdf", {
            type: "application/pdf",
            lastModified: Date.now()
          });
          var fd = new FormData();
          console.log("ecpay upload files: " + JSON.stringify(file));
          fd.append("file", file);
          return this.$store.dispatch("GENERATED_DOCUMENTS", {
            license: this.$store.state.licenses.form,
            formData: fd
          });
        })
        .then(result => {
          this.$router.push("/app/payments");
          console.log("ecpay generated documents: ");
          this.$notify({
            message:
              "Your ECPay Reference Number is valid for 24 hours only. Please make sure to pay on time.",
            color: "success",
            icon: "check_circle",
            initialMargin: 100
          });
        })
        .catch(error => {
          this.$notifyError(err);
        });
    },
    generatePDF() {
      var details = {
        fees: this.fees_form,
        form: this.form,
        case: this.case_holder,
        mode_of_payment: 5
      };
      this.$store
        .dispatch("SAVE_TRANSACTION_PROVIDER", details)
        .then(result => {
          console.log(
            "this is fdac save transaction provider data: " +
              JSON.stringify(result)
          );

          console.log("this.fees_form: " + JSON.stringify(this.fees_form));
          console.log("this.app_form: " + JSON.stringify(this.app_form));
          this.cashierPayment = true;
          var full_details = {
            formDetails: this.app_form,
            paymentDetails: this.fees_form,
            officeAddress: this.app_form.address_list.find(data => {
              return data.type === "Head Office";
            })
          };

          full_details.formDetails.general_info.product_type = this.getProduct(
            full_details.formDetails.general_info.product_type
          );
          full_details.formDetails.general_info.primary_activity = this.getPrimary(
            full_details.formDetails.general_info.primary_activity
          );
          full_details.formDetails.general_info.declared_capital = this.getDeclared(
            full_details.formDetails.general_info.declared_capital
          );
          full_details.formDetails.auth_officer.mail_add.region = this.getRegionName(
            full_details.formDetails.auth_officer.mail_add.region
          );
          full_details.formDetails.auth_officer.mail_add.province = this.getProvinceName(
            full_details.formDetails.auth_officer.mail_add.province
          );
          full_details.formDetails.auth_officer.mail_add.city = this.getCityName(
            full_details.formDetails.auth_officer.mail_add.city
          );
          full_details.officeAddress.region = this.getRegionName(
            full_details.officeAddress.region
          );
          full_details.officeAddress.province = this.getProvinceName(
            full_details.officeAddress.province
          );
          full_details.officeAddress.city = this.getCityName(
            full_details.officeAddress.city
          );
          full_details.formDetails.application_type = this.getAppType(
            full_details.formDetails.application_type
          );
          full_details.console.log(
            "fulldetails data: " + JSON.stringify(full_details)
          );
          this.$download(full_details, "PAY", "FDAC.pdf");

          console.log(
            "application form data: " + JSON.stringify(this.app_form)
          );
          console.log("fees form data: " + JSON.stringify(this.fees_form));
        });
    }
  }
};
</script>

<style>
</style>
