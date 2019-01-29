<template>
    <v-layout row wrap>
        <v-flex xs12 md3 pa-2>
            <v-toolbar dark color="primary">
                <span class="subheading font-weight-light">Steps</span>
                <v-spacer></v-spacer>
                <v-btn flat icon>
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-stepper v-model="step_curr" vertical>
                <v-stepper-step step="1">
                Company Details
                </v-stepper-step>
                <v-stepper-content step="1">
                </v-stepper-content>

                <v-stepper-step step="2">
                Office Address
                </v-stepper-step>
                <v-stepper-content step="2">
                </v-stepper-content>

                <v-stepper-step step="3">
                Authorized Personnel
                </v-stepper-step>
                <v-stepper-content step="3">
                </v-stepper-content>

                <v-stepper-step step="4">
                Identity Proof
                </v-stepper-step>
                <v-stepper-content step="4">
                </v-stepper-content>

                <v-stepper-step step="5">
                Account Details
                </v-stepper-step>
                <v-stepper-content step="5">
                </v-stepper-content>
            </v-stepper>
        </v-flex>
        <v-flex xs12 md6 pa-2>
            <!-- Step 1 -->            
            <v-card>
                <v-toolbar dark color="primary">
                    <span class="subheading font-weight-normal">{{steps_headers[step_curr-1]}}</span>
                </v-toolbar>
                <v-progress-linear color="warning" :indeterminate="false" :value="progress" class="ma-0" height="5"></v-progress-linear>
                <v-card-text>
                   <!-- <transition name="fade"> -->
                    <v-form v-if="step_curr===1" key="step1">
                        <v-text-field class="subheading font-weight-light"
                            name="name"
                            label="Name of Establishment"
                            id="id"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="Establishment Owner"
                            id="id"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="TIN"
                            mask="###-###-###-###"
                            id="id"
                            counter="12"
                        ></v-text-field>
                    </v-form>

                    <v-form v-if="step_curr===2" key="step2">
                        <v-text-field class="subheading font-weight-light"
                            name="name"
                            label="Address"
                            id="id"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="Region"
                            id="id"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="Province"
                            id="id"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="City/Town"
                            id="id"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="Zip Code"
                            id="id"
                        ></v-text-field>
                    </v-form>

                    <v-form v-else-if="step_curr===3" key="step3">
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="Last Name"
                            id="id"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="First Name"
                            id="id"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="Middle Name"
                            id="id"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="Designation"
                            id="id"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="TIN"
                            id="id"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="Email Address"
                            id="id"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="Phone Number"
                            id="id"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="Mobile Number"
                            id="id"
                        ></v-text-field>
                    </v-form>

                    <v-form v-else-if="step_curr===4" key="step4">
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="Government ID"
                            id="id"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="ID Number"
                            id="id"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="Expiry Date"
                            placeholder="mm/dd/yyyy"
                            id="id"
                        ></v-text-field>
                        
                    </v-form>

                    <v-form v-else-if="step_curr===5" key="step5">
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="Username"
                            id="id"
                        ></v-text-field>
                        <v-text-field
                            name="name"
                            label="Password"
                            :append-icon="value ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (value = !value)"
                            :type="value ? 'password' : 'text'"
                        ></v-text-field>
                        <v-text-field
                            name="name"
                            label="Confirm Passowrd"
                            :append-icon="value ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (value = !value)"
                            :type="value ? 'password' : 'text'"
                        ></v-text-field> 
                        <vue-recaptcha sitekey="6LfrdI0UAAAAANxiZliLI7Gtv7j1QjOXCZcX2EfJ">
                            <!-- <button>Click me</button> -->
                        </vue-recaptcha>
                        
                        
                                              
                    </v-form>
                   <!-- </transition> -->
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                     <v-btn color="secondary" outline @click="back">Back</v-btn>
                    <v-btn color="primary" @click="next">Next</v-btn>
                </v-card-actions>
            </v-card>
           
        </v-flex>
        <v-flex xs12 md3 pa-2>
            <v-toolbar dark color="secondary">
                <span class="subheading font-weight-light">Help</span>
                <v-spacer></v-spacer>
                <v-btn flat icon>
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card>
                <v-card-text>
                    <p>Provide us the Establishment Details</p>
                    <p>Avoid using numbers on Establishment Owner Field</p>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
export default {
    components: { VueRecaptcha },
    data(){
        return{
            step_curr:1,
            progress:0,
            steps_headers:[
                "Company Details",
                "Office Address",
                "Authorized Personnel",
                "Identity Proof",
                "Account Details"
            ]
        }
    },
    methods:{
        init(){

        },
        next(){
            this.step_curr++;
            this.progress = this.progress + 20;
        },
        back(){
            this.step_curr--;
            this.progress = this.progress - 20;
        }
    }
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transition: opacity .5s;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
