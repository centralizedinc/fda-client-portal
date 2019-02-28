<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title class="display-1">Credit Card Details</v-card-title>
        <v-container grid-list-xl>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                label="*Credit Card Number"
                mask="####-####-####-####"
                v-model="full_details.card_details.number"
                :rules="[rules.required, rules.card_validity]"
              >
                <v-fade-transition slot="append">
                  <v-progress-circular v-if="loading" size="24" color="info" indeterminate></v-progress-circular>
                  <img v-else :src="card_logo" alt>
                </v-fade-transition>
              </v-text-field>
            </v-flex>
            <!-- <v-flex xs4>
              <v-text-field
                label="*Expiration Month(MM)"
                mask="##"
                v-model="full_details.card_details.exp_month"
                :rules="[rules.required, rules.expiry_validity]"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                label="*Expiration Year(YYYY)"
                mask="####"
                v-model="full_details.card_details.exp_year"
                :rules="[rules.required, rules.expiry_validity]"
              ></v-text-field>
            </v-flex>-->
            <!-- ---------------------------------- -->
            <v-flex xs8>
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="dateFormatted"
                  label="Date"
                  persistent-hint
                  prepend-icon="event"
                  @blur="date = parseDate(dateFormatted)"
                ></v-text-field>
                <v-date-picker
                  v-model="date"
                  no-title
                  @input="menu1 = false"
                  type="month"
                  :min="new Date().toISOString().substr(0, 10)"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                label="*CVC"
                v-model="full_details.card_details.cvc"
                :rules="[rules.required, rules.cvc_validity]"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="*Card Holder Full Name"
                v-model="full_details.card_details.name"
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="*Email Address"
                v-model="full_details.card_details.email"
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="*Address Line 1"
                v-model="full_details.card_details.address_line1"
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Address Line 2"
                v-model="full_details.card_details.address_line2"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="*City"
                v-model="full_details.card_details.address_city"
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="*Region/State"
                v-model="full_details.card_details.state"
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="*Zip Code"
                v-model="full_details.card_details.zip"
                mask="#####"
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="error" @click="$emit('cancel')">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import images from "./cards.js";
export default {
  props: ["form"],
  data() {
    return {
      card_logo: "",
      loading: false,
      date: new Date().toISOString().substr(0, 7),
      menu1: false,
      expiry: "",
      full_details: {
        card_details: {
          number: "",
          exp_month: "",
          exp_year: "",
          cvc: "",
          name: "",
          email: "",
          address_line1: "",
          address_line2: "",
          address_city: "",
          state: "",
          zip: ""
        },
        payment_details: {
          amount: 0,
          currency: "Php",
          description: "",
          statement_descriptor: "",
          capture: true
        },
        transaction_details: {
          application_type: "",
          application: "License",
          case_no: "",
          order_payment: {}
        }
      },
      rules: {
        required: value => !!value || "This is a required field",
        card_validity: value => this.loading || "Invalid Credit Card Number"
        // expiry_validity: value2 => !!this.loading2 || "Invalid Expiration Date",
        // cvc_validity: value3 => this.loading3 === true || "Invalid CVV"
      },
      gaps: [],
      cvc_max: 3,
      code_name: "CVC"
    };
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
    "full_details.card_details.number": function(val) {
      console.log("validate credit card number");
      this.loading = true;
      this.card_logo = null;
      this.$store.state.payments.credit_card = "";
      if (val !== "") {
        this.$store.dispatch("VALIDATE_CREDIT_CARD", val).then(result => {
          var creditCard = this.$store.state.payments.credit_card;
          if (creditCard.isValid) {
            console.log(
              "####### credit card details: " +
                JSON.stringify(creditCard.isValid)
            );
            this.card_logo = images[creditCard.card.type];
            console.log("test logo: " + JSON.stringify(creditCard.card.type));
            this.loading = false;
            this.gaps = creditCard.card.gaps;
            this.cvc_max = creditCard.card.code.size;
            this.code_name = creditCard.card.code.name;
          } else {
            this.loading = true;
          }
        });
      }
    },
    "full_details.card_details.cvc": function(val) {
      // this.loading3 = true;
      this.$store.state.payments.cvv = "";
      if (val !== "") {
        console.log("cvv number data: " + JSON.stringify(val));
        this.$store.dispatch("VALIDATE_CVV", val).then(result => {
          var cvv = this.$store.state.payments.cvv;
          if (cvv.isValid) {
            console.log(
              "####### cvv/cvc details: " + JSON.stringify(cvv.isValid)
            );
            // this.loading3 = false;
          }
        });
      } else {
        // this.loading3 = false
      }
    }
  },
  created() {
    console.log("creadit card payment form data: " + JSON.stringify(this.form));
    
    
    
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month] = date.split("-");
      this.full_details.card_details.exp_month = `${month}`;
      this.full_details.card_details.exp_year = `${year}`;
      console.log(
        "expiry: " +
          this.full_details.card_details.exp_month +
          "/" +
          this.full_details.card_details.exp_year
      );
      return `${month}/${year}`;
    },
    isEmpty(str) {
      return !str || str === null || str === "";
    },
    isEmptyStrings(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (this.isEmpty(arr[i])) {
          return true;
        }
      }
      return false;
    },
    submit() {
      console.log("submit: " + JSON.stringify(this.full_details));
      if (
        !this.isEmptyStrings([
          this.full_details.card_details.number,
          this.full_details.card_details.exp_month,
          this.full_details.card_details.exp_year,
          this.full_details.card_details.cvc,
          this.full_details.card_details.name,
          this.full_details.card_details.email,
          this.full_details.card_details.address_line1,
          this.full_details.card_details.address_city,
          this.full_details.card_details.state,
          this.full_details.card_details.zip
        ])
      ) {
        var paymentFee = this.$store.state.payments.fee
    this.full_details.payment_details.amount = paymentFee.fee
    this.full_details.payment_details.description = paymentFee.description
    this.full_details.transaction_details.application_type = this.form.application_type
    this.full_details.transaction_details.case_no = this.form.case_no
    this.full_details.transaction_details.order_payment.penalty = 200
    console.log("creadit card payment charges data: " + JSON.stringify(paymentFee.fee));
    console.log("full details: " + JSON.stringify(this.full_details))

        this.$store.dispatch("SAVE_PAYMENT", this.full_details).then(result => {
          console.log("saved payment " + JSON.stringify(result));
          // this.$router.push("/");
        })
        .catch(err=>{
        console.log('ERROR: '+ err)
        this.$notifyError(err)        
      })
        // this.$router.push("/app/payments/summary");
      }
    }
  }
};
</script>

<style>
</style>
