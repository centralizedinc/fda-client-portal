<template>
    <v-layout  row justify-center>
        <v-navigation-drawer id="nav" ref="nav" v-model="nav" hide-overlay width="350" app>
            <v-toolbar light>
                <span class="body-1 font-weight-light">Registration Process</span>
                <v-spacer></v-spacer>
                <v-btn flat icon @click="nav=false">
                <v-icon large >chevron_left</v-icon>
                </v-btn>
            </v-toolbar>
            <v-progress-linear style="top: -15px" height="3" :value="completion" ></v-progress-linear>            
            <v-tabs v-model="tab">
                <v-tab>
                    <span class="caption">STEPS</span>
                </v-tab>
                <v-tab>
                    <span class="caption">FEES</span>
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item>
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
                        <v-stepper-step :complete="e1 > 7" step="7">
                            <span id="step7" class="title font-weight-thin pa-1">Account Credentials <a href="#step7">#</a></span>
                            <span class="caption font-weight-thin pa-1">We will sent you an email with a confirmation link. Please check your email.</span>
                        </v-stepper-step>
                    </v-stepper> 
                </v-tab-item>
                <v-tab-item>
                       <v-data-table
                            :headers="[{text: 'Description', sortable:false}, {text: 'Amount', sortable:false}]"
                            :items="fees"
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
                </v-tab-item>
            </v-tabs-items>
                       
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
                    <v-btn color="primary" @click="next" :loading="loading">Next</v-btn>
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
            :is-final="isFinal" 
            @close="hideSummary"
            @accept="submit">
        </application-summary>
        <fab-button 
            @review="isFinal=false;showSummary=true" 
            @upload="$refs.file.click()"
            @save="saveTempFile" 
            :buttons="[{label:'Preview', icon:'search', action:'review'},{label:'Save and Continue Later', icon:'save', action:'save'}]" 
            :hide-default="true"></fab-button>       
        <a ref="link" href="" id="a" style="display:none">click here to download your file</a> 

        <v-dialog
            v-model="dialog"
            scrollable fullscreen 
            persistent :overlay="false"
            max-width="500px"
            transition="dialog-transition"
        >
            
        </v-dialog>       
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
        loading:false,
        total_amount:0,        
        fees:[],
        charges:null,
        tab:null,    
      form: {},
      account:{
          name:{}
      },
      e1: 1,
      nav: true,
      showSummary:false,
      isFinal:false,
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
      this.form = JSON.parse(JSON.stringify(this.$store.state.licenses.applicationForm)); 
      if(this.form.current_step){
          this.e1 = this.form.current_step;          
      }              
    },
    back(){
        this.e1--;
        if(this.e1 ==0){
            this.$router.push('/')
        }
    }, 
    next(){
        this.loading = true;
        var valid = this.$refs.curr_step.validate()
        if(valid && this.e1<7){
            this.tab =0;
            if(this.e1==1){
                //compute for Fees
                var details = {
                    productType: this.form.general_info.product_type,
                    primaryActivity: this.form.general_info.primary_activity,
                    declaredCapital: this.form.general_info.declared_capital,
                    appType: this.form.application_type
                };
                this.$store.dispatch("GET_FEES", details).then(result => {
                    console.log('GETTING FEES:' + JSON.stringify(result));
                    this.charges = result;
                    this.fees=[];
                    this.fees.push({
                        description: 'Application Fee',
                        amount: result.fee
                    })
                    this.fees.push({
                        description: 'LRF',
                        amount: result.lrf
                    })
                    this.fees.push({
                        description: 'Interest',
                        amount: result.interest
                    }),
                    this.fees.push({
                        description: 'Surcharge',
                        amount: result.surcharge
                    })
                    this.tab = 1;
                    this.total_amount = result.total
                    this.$notify({color:'primary',message:'Registration fee computed! For this application you will have to pay the amount of  ₱ ' + this.numberWithCommas(this.total_amount)})
                });
            }
            this.e1++;
            this.$vuetify.goTo(0)
            this.loading = false;
        }else if(valid && this.e1==7){
            this.tab =1;
            this.isFinal=true;
            this.showSummary = true
            this.$notify({message: 'This is the last step of the application process. Review your application details and make sure you have entered all values correctly. Once you clicked Submit, you won\'t be able to modify any of the data you have entered.', color:'primary'})
            this.loading = false;
        }else{
            this.$notifyError([{message:"Fill-up required fields."}])
            this.loading = false;
        }                              
    },
    hideSummary(){
        this.showSummary = false;
    },
    uploadFile(data) {
      this.formData = data.upload;
      this.uploadedFiles = data.uploadedFiles;
      
    },
    saveTempFile(){
        this.form.current_step = this.e1;
        var filename =  this.form.estab_details.establishment_name+"_"+(new Date()).getTime()+".fda";
        var content = new Buffer(JSON.stringify(this.form)).toString('base64')
        this.$refs.link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        this.$refs.link.setAttribute('download', filename);
        this.$refs.link.click();
        this.$notify({message: 'Saving your Application Details - ' + filename, color: 'primary'})        
    },
    submit(){
        this.loading = true;
        this.$store.dispatch("SAVE_NEW_LICENSE", {upload: this.formData, license: this.form, account: this.account})
        .then(result => {
            this.loading = false;
            if (result.success) {
                var message = "You have successfully applied a new license. In order for your application to be processed you have to pay the amount of ₱ " 
                            + this.numberWithCommas(this.charges.total)
                            + ". Kindly choose from one of our payment options available."
                this.$notify({
                message: message,
                color: "primary",
                icon: "check_circle"
                });  
                if(!this.charges){
                    this.$store.dispatch("GET_FEES", details).then(result => {
                        this.charges = result
                    })
                }              
                this.$store.commit('FEES', this.charges);
                this.$store.commit('NEW_APPLICATION')
                this.$router.push('/registration/pay')
            } else {
                this.$notifyError(result.errors);
            }
        })
        .catch(err => {
            this.loading = false;
            this.$notifyError(err);
        });
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
