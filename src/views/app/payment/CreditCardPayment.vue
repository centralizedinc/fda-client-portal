<template>
    <v-layout row wrap>
    
    
    
        <v-flex xs12>
    
    
    
            <v-card>
    
    
    
                <v-card-title class="display-1">Credit Card Details</v-card-title>
    
    
    
                <v-container grid-list-xl>
    
    
    
                    <v-form ref="form" v-model="valid">
    
    
    
    
    
    
    
    
    
    
    
                        <v-layout row wrap>
    
    
    
                            <v-flex xs12>
    
    
    
                                <v-text-field label="*Credit Card Number" mask="####-####-####-####" v-model="full_details.card_details.number" :rules="[rules.required, rules.card_validity]">
    
    
    
                                    <v-fade-transition slot="append">
    
    
    
                                        <v-progress-circular v-if="loading_cc" size="24" color="info" indeterminate></v-progress-circular>
    
    
    
                                        <img v-else :src="card_logo" alt>
    
    
    
                                    </v-fade-transition>
    
    
    
                                </v-text-field>
    
    
    
                            </v-flex>
    
    
    
                            <v-flex xs8>
    
    
    
                                <v-menu v-model="expiry_menu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
    
    
    
                                    <template v-slot:activator="{ on }">
    
        
    
                          <v-text-field
    
        
    
                            v-model="expiry_date"
    
        
    
                            label="Date Expiry"
    
        
    
                            prepend-icon="event"
    
        
    
                            :rules="[rules.required]"
    
        
    
                            readonly
    
        
    
                            v-on="on">
    
        
    
                          </v-text-field>
</template>
                <v-date-picker
                  v-model="dateFormatted"
                  type="month"
                  no-title
                  scrollable
                  @input="expiry_menu=false"
                  :min="new Date().toISOString().substr(0, 10)">
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                label="*CVC"
                v-model="full_details.card_details.cvc"
                mask="###"
                :loading="loading_cvc"
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
                :rules="[rules.required, rules.email]"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="*Address Line 1"
                v-model="full_details.card_details.address_line1"
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex>
            <!-- <v-flex xs12>
              <v-text-field
                label="Address Line 2"
                v-model="full_details.card_details.address_line2"
              ></v-text-field>
            </v-flex> -->
            <v-flex xs12 md6 pa-2>
              <v-autocomplete
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
            <v-flex xs12 md6 pa-2>
              <v-autocomplete
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
            <v-flex xs12 md6 pa-2>
              <v-autocomplete
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
            <v-flex xs12 md6>
              <v-text-field
                label="*Zip Code"
                v-model="full_details.card_details.zip"
                mask="#####"
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex>
            
          </v-layout>
          </v-form>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="secondary" outline @click="$emit('cancel')">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submit">Submit</v-btn>
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
                            message: "You entered a " + creditCard.card.type + " credit card number",
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
        console.log("creadit card payment form data: " + JSON.stringify(this.form));
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
        }
    },
    methods: {
        //   getProvinces() {
        //   this.$store
        //     .dispatch("GET_PROVINCE", this.form.addresses.office.region)
        //     .then(result => {
        //       this.provinces = this.$store.state.places.provinces;
        //       return this.$store.dispatch("GET_REGION");
        //     })
        //     .then(result => {
        //       // GET region data
        //       this.regions = this.$store.state.places.regions;
        //     });
        // },
        // getCities() {
        //   this.$store
        //     .dispatch("GET_CITY", this.form.addresses.office.city)
        //     .then(result => {
        //       this.cities = this.$store.state.places.city;
        //       return this.$store.dispatch("GET_PROVINCE");
        //     })
        //     .then(result => {
        //       // GET CITIES data
        //       this.provinces = this.$store.state.places.provinces;
        //     });
        // },
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
            //validate form
            this.$refs.form.validate();
            if (this.valid) {
                var paymentFee = this.$store.state.payments.fee;
                console.log("payment fee data: " + JSON.stringify(paymentFee));
                this.full_details.payment_details.amount = paymentFee.total;
                this.full_details.payment_details.description = paymentFee.description;
                this.full_details.transaction_details.application_type = this.form.application_type;
                this.full_details.transaction_details.case_no = this.form.case_no;
                this.full_details.transaction_details.user_id = this.$store.state.user_session.user._id;
                this.full_details.transaction_details.order_payment.penalty =
                    paymentFee.surcharge;
                console.log(
                    "creadit card payment charges data: " +
                    JSON.stringify(paymentFee.total)
                );
                console.log("full details: " + JSON.stringify(this.full_details));
                this.$store
                    .dispatch("SAVE_PAYMENT", this.full_details)
                    .then(result => {
                        console.log("saved payment " + JSON.stringify(result));

                        // Print receipt
                        var details = {
                            date_issue: formatDate(result.date_created),
                            case_no: this.form.case_no,
                            fee: `₱ ${this.numberWithCommas(paymentFee.fee)}`,
                            lrf: `₱ ${this.numberWithCommas(paymentFee.lrf)}`,
                            penalty: `₱ ${this.numberWithCommas(
                parseFloat(paymentFee.surcharge) +
                  parseFloat(paymentFee.interest)
              )}`,
                            total: `₱ ${this.numberWithCommas(paymentFee.total)}`,
                            amount: `₱ ${this.numberWithCommas(paymentFee.total)}`,
                            remaining_balance: "₱ 0.00"
                        };

                        this.$print(details, "RCPT");
                        this.$router.push("/");
                        this.$notify({
                            message: "Payment success",
                            color: "success",
                            icon: "check_circle",
                            initialMargin: 100
                        });
                    })
                    .catch(err => {
                        console.log("ERROR: " + err);
                        this.$notifyError(err);
                    });
                // this.$router.push("/app/payments/summary");
            } else {
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
