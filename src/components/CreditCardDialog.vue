<template>  
  <v-layout row justify-center>
    <v-dialog scrollable
    v-model="show"     
    persistent
    max-width="60%"
    transition="dialog-transition"
>
      <v-card>
          <v-toolbar dark color="primary" style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
             <span class="font-weight-light headline">Payment via Credit Card</span>
          </v-toolbar>
          <v-card-text> 
            <v-layout row wrap>
              <v-flex xs12 md4>
                <v-layout row wrap>
                  <v-flex xs12>
                    <span class="font-weight-thin">Payment Summary</span>
                  <v-divider></v-divider>
                  </v-flex>
                  <v-data-table
                    :headers="[{text: 'Description', sortable:false}, {text: 'Amount', sortable:false}]"
                    :items="payment_summary"
                    hide-actions
                  >
                    <template slot="items" slot-scope="props">
                    <td>{{ props.item.description }}</td>
                    <td>₱ {{ numberWithCommas (props.item.amount) }}</td>
                    </template>
                    <template slot="footer">
                    <td >Total</td>
                    <td class="font-weight-bold" >₱ {{ numberWithCommas(total_amount) }}</td> 
                  </template>
                  </v-data-table> 
                  <span class="pt-5 mt-5 caption primary--text">Note: For credit card transactions, an additional Php20.00 will be charged for convenience fee.</span>                 
                </v-layout>                                      
              </v-flex>
              <v-flex xs1 pl-4>
                <v-divider vertical></v-divider>
              </v-flex>
              <v-flex xs12 md7>
                <v-form ref="form" v-model="valid">                      
                  <v-layout row wrap>
                    <v-flex xs12>
                      <span class="font-weight-thin">Card Details</span>
                      <v-divider></v-divider>
                    </v-flex>            
                    <v-flex xs12 md8 pa-1>
                      <v-text-field
                        label="*Credit Card Number"
                        mask="####-####-####-####"
                        v-model="full_details.card_details.number"
                        outline
                        :rules="[rules.required, rules.card_validity]"
                      >
                        <v-fade-transition slot="append">
                          <v-progress-circular v-if="loading_cc" size="24" color="info" indeterminate></v-progress-circular>
                          <img v-else :src="card_logo" alt>
                        </v-fade-transition>
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 md4 pa-1>
                      <v-text-field outline
                        label="*CVC"
                        v-model="full_details.card_details.cvc"
                        mask="###"
                        :loading="loading_cvc"
                        :rules="[rules.required, rules.cvc_validity]"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6 pa-1>
                      <v-text-field outline
                        label="*Cardholder"
                        v-model="full_details.card_details.name"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6 pa-1>
                      <v-menu 
                        v-model="expiry_menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px">
                        <template v-slot:activator="{ on }">
                          <v-text-field outline
                            v-model="expiry_date"
                            label="Date Expiry"
                            append-icon="event"
                            color="green darken-1"
                            :rules="[rules.required]"
                            readonly
                            v-on="on">
                          </v-text-field>
                        </template>
                        <v-date-picker 
                          v-model="dateFormatted"
                          color="green darken-1"
                          type="month"
                          no-title
                          scrollable
                          @input="expiry_menu=false"
                          :min="new Date().toISOString().substr(0, 10)">
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12>
                      <span class="font-weight-thin">Contact Details</span>
                      <v-divider></v-divider>
                    </v-flex>            
                    <v-flex xs12 pa-1>
                      <v-text-field
                      outline
                        label="*Email Address"
                        v-model="full_details.card_details.email"
                        :rules="[rules.required, rules.email]"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 pa-1>
                      <v-textarea outline
                        label="*Address"
                        v-model="full_details.card_details.address_line1"
                        :rules="[rules.required]"
                      ></v-textarea>
                    </v-flex>
                    <!-- <v-flex xs12>
                      <v-text-field
                        label="Address Line 2"
                        v-model="full_details.card_details.address_line2"
                      ></v-text-field>
                    </v-flex> -->
                    <v-flex xs12 pa-1>
                      <v-autocomplete
                        outline
                        color="green darken-1"
                        v-model="full_details.card_details.region"
                        :items="regions"
                        item-text="name"
                        item-value="_id"
                        hide-no-data
                        hide-selected
                        label="Region"
                        :rules="[rules.required]"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs12 pa-1>
                      <v-autocomplete
                        outline
                        color="green darken-1"
                        v-model="full_details.card_details.province"
                        :items="getProvinces"
                        item-text="name"
                        item-value="_id"
                        :disabled="!full_details.card_details.region"
                        hide-no-data
                        hide-selected
                        label="Province"
                        :rules="[rules.required]"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs12 pa-1>
                      <v-autocomplete
                      outline
                        color="green darken-1"
                        v-model="full_details.card_details.city"
                        :items="getCities"
                        item-text="name"
                        item-value="_id"
                        :disabled="!full_details.card_details.province"
                        hide-no-data
                        hide-selected
                        label="City / Town"
                        :rules="[rules.required]"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs12 pa-1>
                      <v-text-field
                      outline
                        label="*Zip Code"
                        v-model="full_details.card_details.zip"
                        mask="####"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-flex>
                    
                  </v-layout>
                  </v-form>
              </v-flex>
            </v-layout>                     
          
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-layout row wrap>
            <v-flex xs12>
              <span class="caption">Powered by:</span>
              
            </v-flex>
            <v-flex xs12>
              <a href="https://magpie.im/" target="_blank"><v-img position="left left" contain height="30" src="https://magpie.im/assets/images/magpie-logo-outlines.svg"></v-img></a>
              <a href="https://magpie.im/" target="_blank" class="caption font-weight-bold">Magpie.IM Pte. Ltd.</a>
              
              
            </v-flex>
          </v-layout> 
                
          <v-spacer></v-spacer>
          <v-btn color="secondary" :disabled="isLoading" outline @click="hide()">Cancel</v-btn>          
          <v-btn color="primary" :disabled="isLoading" :loading="isLoading" @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  
</template>

<script>
import images from "./cards.js";
export default {
  props: ["form"],
  data() {
    return {
      isLoading: false,
      total_amount: 0,
      valid: true,
      card_logo: "",
      loading_cc: false,
      loading_cvc: false,
      date: new Date().toISOString().substr(0, 7),
      menu1: false,
      expiry: "",
      expiry_menu: false,
      regions: [],
      provinces: [],
      cities: [],
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
          region: "",
          province: "",
          city: "",
          zip: ""
        },
        payment_details: {
          amount: 0,
          mode_of_payment: 0,
          currency: "₱",
          description: "",
          statement_descriptor: "",
          capture: true
        },
        transaction_details: {
          application_type: "",
          application: 0,
          case_no: "",
          order_payment: {}
        }
      },
      payment_details: {
        amount: 0,
        currency: "₱",
        description: "",
        statement_descriptor: "",
        capture: true
      },
      transaction_details: {
        application_type: "",
        application: 0,
        case_no: "",
        order_payment: {}
      },
      rules: {
        required: value => !!value || "This is a required field",
        card_validity: v => v.length > 12 || "Invalid Card Number",
        expiry_validity: v => true || "Invalid Expiration Date",
        cvc_validity: v => v.length === 3 || "Invalid CVV",
        email: value => this.checkEmail(value) || "Invalid email"
      },
      gaps: [],
      cvc_max: 3,
      code_name: "CVC",
      dateFormatted: null,
      expiry_date: null,
      loading_expiry: false
    };
  },
  watch: {
    dateFormatted(val) {
      this.expiry_date = this.parseDate(val);
    },
    "full_details.card_details.number": function(val) {
      this.loading_cc = true;
      this.card_logo = null;
      this.$store.state.payments.credit_card = "";
      this.rules.card_validity = val.length > 12 || "Invalid Card Number";
      if (val !== "" && val.length > 12) {
        this.$store.dispatch("VALIDATE_CREDIT_CARD", val).then(result => {
          var creditCard = this.$store.state.payments.credit_card;
          this.rules.card_validity =
            creditCard.isValid || "Invalid Card Number";
          if (creditCard.isValid) {
            this.card_logo = images[creditCard.card.type];
            this.$notify({
              message:
                "You entered a " + creditCard.card.type + " credit card number",
              color: "success",
              icon: "check_circle",
              initialMargin: 100
            });
            this.loading_cc = false;
            this.gaps = creditCard.card.gaps;
            this.cvc_max = creditCard.card.code.size;
            this.code_name = creditCard.card.code.name;
          } else {
            this.loading_cc = false;
            this.$notify({
              message: "Enter valid credit card number",
              color: "warning",
              initialMargin: 100
            });
          }
        });
      } else {
        this.loading_cc = false;
      }
    },
    "full_details.card_details.cvc": function(val) {
      this.loading_cvc = true;
      this.$store.state.payments.cvv = "";
      this.rules.cvc_validity = val.length === 3 || "Invalid CVC";
      if (val !== "" && val.length == 3) {
        this.$store.dispatch("VALIDATE_CVV", val).then(result => {
          var cvv = this.$store.state.payments.cvv;
          this.rules.cvc_validity = cvv.isValid || "Invalid CVC";
          if (cvv.isValid) {
            this.$notify({
              message: "Valid CVC number",
              color: "success",
              icon: "check_circle",
              initialMargin: 100
            });
          } else {
            this.$notify({
              message: "Enter valid CVC number",
              color: "warning",
              initialMargin: 100
            });
          }
          this.loading_cvc = false;
        });
      } else {
        this.loading_cvc = false;
      }
    }
  },
  created() {
    //initial
    this.full_details.card_details.email = this.$store.state.user_session.user.email;
    this.$store.dispatch("GET_PLACES_REFERENCE").then(locations => {
      if (locations) {
        this.regions = locations.regions;
        this.provinces = locations.provinces;
        this.cities = locations.cities;
      }
    });
  },
  computed: {
    getProvinces() {
      return this.findProvinces(this.full_details.card_details.region);
    },
    getCities() {
      return this.findCities(this.full_details.card_details.province);
    },
    show() {
      return this.$store.state.payments.showCCDialog;
    },
    payment_summary() {
      var details = this.$store.state.payments.payment_details.summary;
      this.total_amount = 0;
      for (var i = 0; i < details.length; i++) {
        this.total_amount = this.total_amount + details[i].amount;
      }
      return details;
    }
  },
  methods: {
    hide() {
      this.$hideCC();
    },
    parseDate(date) {
      if (!date) return null;
      const [year, month] = date.split("-");
      this.full_details.card_details.exp_month = `${month}`;
      this.full_details.card_details.exp_year = `${year}`;
      this.checkExpiry(month, year);
      return `${month}/${year}`;
    },
    checkExpiry(month, year) {
      this.loading_expiry = true;
      var expiry = { month, year };
      this.$store
        .dispatch("VALIDATE_EXPIRATION_DATE", expiry)
        .then(result => {
          this.loading_expiry = false;
          if (result.data.success) {
            this.rules.expiry_validity =
              result.data.model.isValid || "Invalid Date Expiry";
            if (result.data.model.isValid) {
              this.$notify({
                message: "Valid Date Expiry",
                color: "success",
                icon: "check_circle",
                initialMargin: 100
              });
            } else {
              this.$notify({
                message: "Enter valid date expiry",
                color: "warning",
                initialMargin: 100
              });
            }
          } else {
            this.$notifyError(result.data.errors);
          }
        })
        .catch(err => {
          this.$notifyError(err);
          this.loading_expiry = false;
        });
    },
    submit() {
      //validate form
      this.$refs.form.validate();
      if (this.valid) {
        this.isLoading = true;
        var paymentFee = this.$store.state.payments.fee;
        this.full_details.payment_details.amount = paymentFee.total;
        this.full_details.payment_details.description = paymentFee.description;
        this.full_details.transaction_details.application_type = this.$store.state.payments.payment_details.application_type;
        this.full_details.transaction_details.case_no = this.$store.state.payments.payment_details.case_no;
        this.full_details.transaction_details.user_id = this.$store.state.user_session.user._id;
        this.full_details.transaction_details.order_payment.penalty =
          paymentFee.surcharge;
        this.$store
          .dispatch("SAVE_PAYMENT", this.full_details)
          .then(result => {
            this.isLoading = false;
            var details = {
              case_no: this.$store.state.payments.payment_details.case_no,
              fee: this.numberWithCommas(paymentFee.fee),
              lrf: this.numberWithCommas(paymentFee.lrf),
              penalty: this.numberWithCommas(
                parseFloat(paymentFee.surcharge) +
                  parseFloat(paymentFee.interest)
              ),
              total: this.numberWithCommas(paymentFee.total),
              amount: this.numberWithCommas(paymentFee.total),
              remaining_balance: "0.00"
            };

            this.$download(details, "RCPT","fda-receipt.pdf");
            // this.$router.push("/app/payments");
            // this.$hideCC();
            // this.$notify({
            //   message:
            //     "Payment success! The official receipt was sent to your email (" +
            //     this.full_details.card_details.email +
            //     ")",
            //   color: "success",
            //   icon: "check_circle",
            //   initialMargin: 100
            // });
            return this.$upload(details, "RCPT")
          })
          .then(blob=>{
            var file = new File([blob], 'fda-receipt.pdf', {type: 'application/pdf', lastModified: Date.now()});
            var fd = new FormData();
            fd.append("file", file );

            return this.$store.dispatch('GENERATED_DOCUMENTS', {license:this.$store.state.licenses.form, formData:fd})
            
          })
          .then(result=>{
            this.$router.push("/app/payments");
            this.$hideCC();
            this.$notify({
              message:
                "Thank you! We have received your payment.",
              color: "success",
              icon: "check_circle",
              initialMargin: 100
            });
          })
          .catch(err => {
            this.isLoading = false;
            this.$hideCC();
            console.log("ERROR: " + err);
            this.$notifyError(err);
          });
        // this.$router.push("/app/payments/summary");
      } else {
        this.isLoading = false;
        this.$notify({
          message: "Please enter all fields & correctly",
          color: "warning",
          initialMargin: 100
        });
      }
    }
  }
};
</script>

<style>
</style>
