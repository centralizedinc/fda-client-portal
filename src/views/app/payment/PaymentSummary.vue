<template>
  <v-layout row wrap>
    <v-layout row wrap v-if="showPayLater">
      <pay-later :form="app_form"></pay-later>
    </v-layout>

    <v-layout row wrap v-else-if="showCreditCard">
      <credit-card :form="app_form" @cancel="cancel"></credit-card>
    </v-layout>

    <v-flex xs12 v-else>
      <v-card flat>
        <v-card-title primary-title class="font-weight-light headline">Payment Summary</v-card-title>
        <v-container grid-list-xl>
          <v-card flat>
            <v-layout align-center justify-center row fill-height>
              <v-flex xs6>
                <v-flex xs12>
                  <label class="subheading">Application Fee:</label>
                </v-flex>
                <v-flex xs12>
                  <label class="subheading"># of year/s applied:</label>
                </v-flex>
                <v-flex xs12>
                  <label class="subheading">Surcharge:</label>
                </v-flex>
                <v-flex xs12>
                  <label class="subheading">Legal Research Fund (LRF):</label>
                </v-flex>
                <v-flex xs12>
                  <label class="subheading" color="error">Total Payment Due:</label>
                </v-flex>
              </v-flex>

              <v-flex xs5>
                <v-flex xs12>
                  <label class="subheading">Php {{fees_form.fee}}</label>
                </v-flex>
                <v-flex xs12>
                  <label class="subheading">{{fees_form.yearsApplied}}</label>
                </v-flex>
                <v-flex xs12>
                  <label class="subheading">
                    <v-icon medium color="error">close</v-icon>
                  </label>
                </v-flex>
                <v-flex xs12>
                  <label class="subheading">Php {{fees_form.lrf}}</label>
                </v-flex>
                <v-flex xs12>
                  <label class="subheading">{{fees_form.total}}</label>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-card>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <!-- <v-spacer></v-spacer>

          <v-flex>
            <v-btn class="font-weight-light" color="success" @click="generatePDF">FDAC</v-btn>
          </v-flex>-->
          <!-- <v-flex>
            <v-btn class="font-weight-light" color="success">VFS Payment</v-btn>
          </v-flex>-->
          <v-spacer></v-spacer>
          <v-flex>
            <v-btn class="font-weight-light" color="success" @click="creditCard">Credit Card</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex>
            <v-btn class="font-weight-light" color="success" @click="ecPay">ECPay</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-btn
            class="font-weight-light"
            color="success"
            @click="payLater"
            v-if="allow_paylater"
          >Pay Later</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>

      <v-dialog
        v-model="cashierPayment"
        scrollable
        persistent
        transition="dialog-transition"
        max-width="500"
      >
        <v-card>
          <v-toolbar
            color="fdaGreen"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >
            <span class="font-weight-light headline">FDA Cashier/Bank</span>

            <v-spacer></v-spacer>
            <v-tooltip top>
              <v-btn slot="activator" flat icon color="black" @click="cashierPayment =false">
                <i class="fas fa-times-circle"></i>
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
                <li>Proceed to any Landbank of the Philippines branch or nearest FDA Action Center and present the Order of Payment</li>
                <li>*Upload the receipt/confirmation in the Application Summary*</li>
              </ol>
              <div></div>
              <p
                class="caption mt-2"
                style="color: grey; font-family:courier"
              >Note: The payment of fee is not a guarantee that the application will be granted. The processing of the application will still be subject to the evaluation of the concerned FDA personnel and its compliance with the pertinent laws, rules and regulations</p>
            </v-flex>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn flat block color="error" @click="finalStep =false">close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="ecPayDialog"
        scrollable
        persistent
        transition="dialog-transition"
        max-width="500"
      >
        <v-card>
          <v-toolbar
            color="fdaGreen"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >
            <span class="font-weight-light headline">ECPay</span>

            <v-spacer></v-spacer>
            <v-tooltip top>
              <v-btn slot="activator" flat icon color="black" @click="ecPayDialog =false">
                <i class="fas fa-times-circle"></i>
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
              <p
                class="caption mt-2"
                style="color: grey; font-family:courier"
              >Note: The payment of fee is not a guarantee that the application will be granted. The processing of the application will still be subject to the evaluation of the concerned FDA personnel and its compliance with the pertinent laws, rules and regulations</p>
            </v-flex>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn flat block color="error" @click="ecPayDialog =false">close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import * as OrderOfPaymentGenerator from "./OrderOfPaymentGenerator";

export default {
  props: {
    form: {
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
      cashierPayment: false,
      ecPayDialog: false,
      showCreditCard: false,
      showPayLater: false
      // bancnetDialog: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.app_form = this.form ? this.form : this.$store.state.licenses.form;
      console.log("Welcome to payment summary");
      this.fees_form = this.charges ? this.charges : this.$store.state.payments.fee
    },
    cancel() {
      this.showCreditCard = false;
      this.showPayLater = false;
    },
    generatePDF() {
      this.cashierPayment = true;
      OrderOfPaymentGenerator.generateOrderOfPayment(this.app_form, this.fees_form);
    },
    creditCard() {
      this.cashierPayment = false;
      this.ecPayDialog = false;
      this.showCreditCard = true;
      // this.$router.push("/app/payments/creditcard");
    },
    payLater() {
      this.cashierPayment = false;
      this.ecPayDialog = false;
      this.showPayLater = true;
      // this.$router.push("/app/payments/paylater");
    },
    ecPay() {
      // this.ecPayDialog = true;
      var full_details = {
        formDetails: this.app_form,
        paymentDetails: this.fees_form
      }
      full_details.formDetails.general_info.product_type = this.getProduct(full_details.formDetails.general_info.product_type) 
      full_details.formDetails.general_info.primary_activity = this.getPrimary(full_details.formDetails.general_info.primary_activity)
      full_details.formDetails.general_info.declared_capital = this.getDeclared(full_details.formDetails.general_info.declared_capital)
      full_details.formDetails.addresses.region = this.getRegionName(full_details.formDetails.addresses.region)
      full_details.formDetails.addresses.province = this.getProvinceName(full_details.formDetails.addresses.province)
      full_details.formDetails.addresses.city = this.getCityName(full_details.formDetails.addresses.city)
      full_details.formDetails.application_type = this.getAppType(full_details.formDetails.application_type)
      console.log("fulldetails data: " + JSON.stringify(full_details))
      this.$print(full_details, "PAY");
console.log("application form data: " + JSON.stringify(this.app_form))
console.log("fees form data: " + JSON.stringify(this.fees_form))
      OrderOfPaymentGenerator.generateOrderOfPayment(this.app_form, this.fees_form);
    }
  }
};
</script>

<style>
</style>
