<template>
    <v-layout  row justify-center>
        <v-navigation-drawer id="nav" v-model="nav" hide-overlay width="350" app>
            <v-toolbar light>
                <span class="body-1 font-weight-light">Registration Process</span>
                <v-spacer></v-spacer>
                <v-btn flat icon @click="nav=false">
                <v-icon large >chevron_left</v-icon>
                </v-btn>
            </v-toolbar>
            <v-progress-linear style="top: -15px" height="3" :value="completion" ></v-progress-linear>
            <v-stepper v-model="e1" vertical>
                <v-stepper-step :complete="e1 > 1" step="1">
                    <span class="title font-weight-thin pa-1">General Information</span>
                    <span class="caption font-weight-thin pa-1">Enter the license number of your Establishment's LTO.</span>
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step  :complete="e1 > 2" step="2">
                    <span class="title font-weight-thin pa-1">Establishment Details</span>
                    <span class="caption font-weight-thin pa-1">For single proprietorship reflect the name of the person indicated in the DTI registration certificate.</span>
                    <span class="caption font-weight-thin pa-1">For corporation, partnership or cooperative reflect the name of the corporation/partnership/cooperative as indicated in the SEC/CDA registration</span>
                    <span class="caption font-weight-thin pa-1">For government owned or controlled corporation reflect the name of the agency as indicated in the charter.</span>
                    
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 3" step="3">
                    <span class="title font-weight-thin pa-1">Establishment Address</span>
                    <span class="caption font-weight-thin pa-1">To make sure that we can still contact the establishment, please enter the company's qualified/authorized personnel</span>
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 4" step="4">
                    <span class="title font-weight-thin pa-1">Authorized Officer</span>
                    <span class="caption font-weight-thin pa-1">Please make sure that the ID number is matched to the ID selected</span>
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 5" step="5">
                    <span class="title font-weight-thin pa-1">Qualified Personnel</span>
                    <span class="caption font-weight-thin pa-1">We will sent you an email with a confirmation link. Please check your email.</span>
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 6" step="6">
                    <span class="title font-weight-thin pa-1">Document Upload</span>
                    <span class="caption font-weight-thin pa-1">We will sent you an email with a confirmation link. Please check your email.</span>
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step id="step2"  :complete="e1 > 7" step="7">
                    <span id="step2" class="title font-weight-thin pa-1">Account Credentials</span>
                    <span class="caption font-weight-thin pa-1">We will sent you an email with a confirmation link. Please check your email.</span>
                </v-stepper-step>
            </v-stepper>
        </v-navigation-drawer>
        <v-flex xs1 d-flex align-center align-content-center>
            <v-btn @click="back()" large flat icon color="primary">
                <v-icon x-large>chevron_left</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs10>
            <v-card>
                <v-card-title style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
                    <span class="headline font-weight-thin white--text">{{headers[e1-1]}} - Step {{e1}} of 7</span>
                    <v-spacer></v-spacer>
                    <v-progress-circular color="primary" :rotate="270" size="50" :value="completion">
                    <span class="caption">{{completion}}%</span>
                    </v-progress-circular>
                </v-card-title>
                <v-card-text>
                    <keep-alive>
                        <component :is="stepComponent" :form="form" :account="account" ref="curr_step" @upload="uploadFile"/>
                    </keep-alive>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn outline color="primary" @click="back">Cancel</v-btn>
                    <v-btn color="primary" @click="next">Next</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
         <v-flex xs1 d-flex align-center align-content-center>
            <v-btn @click="next()" large flat icon color="primary">
                <v-icon x-large>chevron_right</v-icon>
            </v-btn>
        </v-flex>
        <application-summary 
            :account="account" 
            :form="form" 
            :uploadedFiles="uploadedFiles"
            :show="showSummary" 
            @close="hideSummary"
            @accept="submit">
        </application-summary>
        <fab-button @review="showSummary=true" :buttons="[{label:'Review', icon:'file', action:'review'},{label:'Save', icon:'save', action:'save'}]" :hide-default="true"></fab-button>
        <payment-summary v-if="paymentDialog" :form="form"></payment-summary>
    </v-layout>
</template>

<script>
import GeneralInfo from "@/views/app/licenses/create/tabs/GeneralInfo.vue";
import ApplicationSummary from "@/views/registration/tabs/Summary.vue";
import FabButton from "@/components/FabButtons.vue"

export default {
  components: {
    "step1":GeneralInfo,
    //todo: create a loading component for async components...
    "step2":()=>({component:import('@/views/app/licenses/create/tabs/EstablishmentInfo.vue')}),
    "step3":()=>import('@/views/app/licenses/create/tabs/OfficeAddress.vue'),
    "step4":()=>import('@/views/app/licenses/create/tabs/AuthorizedOfficerDetails.vue'),
    "step5":()=>import('@/views/app/licenses/create/tabs/QualifiedPersonnel.vue'),
    "step6":()=>import('@/views/app/licenses/create/tabs/DocumentsUpload.vue'),
    "step7":()=>import("@/views/registration/tabs/Account.vue"),
    PaymentSummary:()=>import('@/views/app/payment/PaymentSummary.vue'),
    ApplicationSummary,
    FabButton
  },
  data() {
    return {     
      form: {},
      account:{},
      e1: 1,
      nav: true,
      showSummary:false,
      paymentDialog:false,
      headers:[
          'General Information',
           'Establishment Details',
           'Establishment Address',
           'Authorized Officer',
           'Qualified Personnel',
           'Document Upload',
           'Account Credentials'
        ],
    uploadedFiles:[]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.form = JSON.parse(JSON.stringify(this.$store.state.licenses.init_form));      
    },
    back(){
        this.e1--;
        if(this.e1 ==0){
            this.$router.push('/')
        }
    }, 
    next(){
        var valid = this.$refs.curr_step.validate()
        valid = true;
        if(valid && this.e1<7){
            this.e1++;
            this.$vuetify.goTo(0)
        }else if(valid && this.e1==7){
            this.showSummary = true
            this.$notify({message: 'This is the last step of the application process. Kindly review your application details and click on submit.', color:'primary'})
        }else{
            this.$notifyError([{message:"Fill-up required fields."}])
        }                                
    },
    hideSummary(){
        this.showSummary = false;
    },
    uploadFile(data) {
      this.formData = data.upload;
      this.uploadedFiles = data.uploadedFiles;
      
    },
    submit(){
        this.loading = false;
        this.paymentDialog = true;
        // this.$store.dispatch("SAVE_NEW_LICENSE", {upload: this.formData, license: this.form, account: this.account})
        // .then(result => {
        //     console.log("result :", result);
        //     this.loading = false;
        //     if (result.success) {
        //         this.$notify({
        //         message: "You have successfully applied a new license",
        //         color: "success",
        //         icon: "check_circle"
        //         });
        //         this.confirmDialog = false;
        //         this.showAppOverview = false;
        //         this.paymentDialog = true;
        //     } else {
        //         this.$notifyError(result.errors);
        //     }
        // })
        // .catch(err => {
        //     this.loading = false;
        //     this.$notifyError(err);
        // });
    }
  },
  watch:{
      e1(){
          if(!this.nav){
              this.nav = true;
          }
      }
  },
  computed:{
      completion(){
          return parseInt(((this.e1-1)/7)*100)
      },
      stepComponent(){
          return "step" +this.e1
      }
  }
};
</script>

<style>
</style>
