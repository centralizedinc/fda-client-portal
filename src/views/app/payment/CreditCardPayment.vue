<template>
  <v-layout row wrap>
    <v-flex xs12>
      <form-layout @submit="submit">
        <template slot="header-step-1">Credit Card Details</template>
        <v-container slot="content-step-1" grid-list-xl>
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
            <v-flex xs4>
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
              <v-text-field label="Address Line 2" v-model="full_details.card_details.address_line2"></v-text-field>
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
          <v-btn block color="success" @click="submit">Submit</v-btn>
        </v-card-actions>
      </form-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      card_logo: "",
      loading: false,
      full_details:{
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
        currency: "php",
        description: "",
        statement_descriptor: "",
        capture: true
        },
        transaction_details: {
          application_type: "",
          application: "",
          case_no: "",
          order_payment: {}
        }
      },
      rules: {
        required: value => !!value || "This is a required field",
        card_validity: true,
        expiry_validity: true,
        cvc_validity: true
      },
       gaps: [],
       cvc_max: 3,
       code_name: "CVC"
    };
  },
  watch:{
    "full_details.card_details.number": function(val){
      this.loading = true;
      this.card_logo = "";
      this.$store.state.payments.credit_card = "";
      if(val !== ""){
        this.$store.dispatch("VALIDATE_CREDIT_CARD", val).then(result=>{
          var creditCard = this.$store.state.payments.credit_card
          if(creditCard.isValid){
            console.log("####### credit card details: " + JSON.stringify(creditCard.isValid))
            this.loading = false;
            this.card_logo =
                  "https://fda-portal-user.herokuapp.com/assets/img/cc-icons/" +
                  creditCard.card.type +
                  ".png";
            this.gaps = creditCard.card.gaps;
            this.cvc_max = creditCard.card.code.size;
            this.code_name = creditCard.card.code.name;
          }
        })
      }else{
        this.loading = false
      }
    }
  },
  methods: {
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
        this.$store.dispatch("SAVE_PAYMENT", this.full_details).then(result =>{
          console.log("saved payment" + JSON.stringify(result.data))
        })
        this.$router.push("/app/payments/summary");
      } else {
        console.log("complete card details")
      }
    }
  }
};
</script>

<style>
</style>
