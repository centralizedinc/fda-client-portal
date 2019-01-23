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
                                v-model="card_details.number"
                                :rules="[rules.required, rules.card_validity]">
                                <v-fade-transition slot="append">
                                    <v-progress-circular
                                        v-if="loading"
                                        size="24"
                                        color="info"
                                        indeterminate>
                                    </v-progress-circular>
                                    <img v-else :src="card_logo" alt="">
                                </v-fade-transition>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field 
                                label="*Expiration Month(MM)" 
                                mask="##" 
                                v-model="card_details.exp_month"
                                :rules="[rules.required, rules.expiry_validity]">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field 
                                label="*Expiration Year(YYYY)" 
                                mask="####" 
                                v-model="card_details.exp_year"
                                :rules="[rules.required, rules.expiry_validity]">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field 
                                label="*CVC" 
                                v-model="card_details.cvc"
                                :rules="[rules.required, rules.cvc_validity]">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field 
                                label="*Card Holder Full Name" 
                                v-model="card_details.name"
                                :rules="[rules.required]">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field 
                                label="*Email Address" 
                                v-model="card_details.email"
                                :rules="[rules.required]">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field 
                                label="*Address Line 1" 
                                v-model="card_details.address_line1"
                                :rules="[rules.required]">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field 
                                label="Address Line 2" 
                                v-model="card_details.address_line2">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field 
                                label="*City" 
                                v-model="card_details.address_city"
                                :rules="[rules.required]">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field 
                                label="*Region/State" 
                                v-model="card_details.state"
                                :rules="[rules.required]">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field 
                                label="*Zip Code" 
                                v-model="card_details.zip"
                                mask="#####"
                                :rules="[rules.required]">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs6>                                                                              
                        </v-flex>
                        <v-flex xs6>
                                <v-spacer></v-spacer>
                                <v-btn color="success" @click="submit">Submit</v-btn>
                            </v-flex>    
                    </v-layout>
                </v-container>
            </form-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data() {
            return {
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
                rules: {
                    required: value => !!value || "This is a required field",
                    card_validity: true,
                    expiry_validity: true,
                    cvc_validity: true
                }
            };
        },
        methods:{
            submit(){
                 this.$router.push('/app/payments/summary')
            }
        }
    };
</script>

<style>

</style>
