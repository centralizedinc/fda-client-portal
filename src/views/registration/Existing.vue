<template>
  <v-layout row justify-center>
      <v-navigation-drawer v-model="nav" hide-overlay width="300" app>
        <v-toolbar >
          <span class="body-1 font-weight-light primary--text">Registration Process</span>
          <v-spacer></v-spacer>
          <v-btn flat icon @click="nav=false">
            <v-icon >chevron_left</v-icon>
          </v-btn>
        </v-toolbar>
        <v-stepper v-model="e1" vertical>
          <v-stepper-step :complete="e1 > 1" step="1">
            <span class="title font-weight-thin pa-1">License Number</span>
            <span class="caption font-weight-thin pa-1">Enter the license number of your Establishment's LTO.</span>
            </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2">
            <span class="title font-weight-thin pa-1">Establishment Details</span>
            <span class="caption font-weight-thin pa-1">We need the Name and the Owner's Name of the registered establishment.</span>
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 3" step="3">
            <span class="title font-weight-thin pa-1">Qualified Personnel</span>
            <span class="caption font-weight-thin pa-1">To make sure that we can still contact the establishment, please enter the company's qualified/authorized personnel</span>
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 4" step="4">
            <span class="title font-weight-thin pa-1">Account Credentials</span>
            <span class="caption font-weight-thin pa-1">Enter your username and password</span>
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="5">
            <span class="title font-weight-thin pa-1">Confirm Email</span>
            <span class="caption font-weight-thin pa-1">We will sent you an email with a confirmation link. Please check your email.</span>
          </v-stepper-step>
        </v-stepper>
      </v-navigation-drawer>
      <v-flex xs1 d-flex align-center align-content-center>
        <v-btn @click="back()" large flat icon color="primary">
          <v-icon x-large>chevron_left</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 md10  mt-3>                    
        <v-card>
          <v-card-title style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
            <span class="headline font-weight-thin white--text">{{headers[e1-1]}} - Step {{e1}} of 5</span>
            <v-spacer></v-spacer>
            <v-progress-circular color="primary" :rotate="270" size="50" :value="completion">
              <span class="caption">{{completion}}%</span>
            </v-progress-circular>
          </v-card-title>
          <!-- <v-progress-linear style="margin:0" height="1px" :indeterminate="true"></v-progress-linear> -->
          <v-card-text>                      
            <v-stepper v-model="e1">
              <v-stepper-items>
                <v-stepper-content step="1">  
                  <v-form ref="step1">
                    <v-text-field
                      outline
                      v-model="form.license_no"
                      :rules="ltoRules"
                      :counter="13"
                      :mask="ltoNumber"
                      label="Enter existing License Number"
                      @keypress.enter="validateLicense"
                    ></v-text-field>
                  </v-form> 
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-form ref="step2">
                    <v-container grid-list-xs text-xs-justified>
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-text-field
                            outline
                            required
                            :rules="genericRules"
                            label="Name of Establishment"
                            @keypress.enter="e1 = 3"
                            v-model="form.estab_details.establishment_name"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field
                            outline
                            required
                            :rules="nameRules"
                            name="name"
                            label="Establishment Owner"
                            id="id"
                            @keypress.enter="e1 = 3"
                            v-model="form.estab_details.establishment_owner"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>                  
                  </v-form>
                </v-stepper-content>

                <v-stepper-content step="3">
                  <v-container grid-list-xs text-xs-center>
                    <v-form ref="step3">                                      
                      <v-layout row wrap>
                        <v-flex xs12 md4 pa-1>
                          <v-text-field
                            outline
                            required
                            :rules="nameRules"
                            label="Last Name"
                            v-model="form.auth_officer.lastname"
                            @keypress.enter="proceed"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 pa-1>
                          <v-text-field
                            outline
                            required
                            :rules="nameRules"
                            name="name"
                            v-model="form.auth_officer.firstname"
                            label="First Name"
                            id="id"
                            @keypress.enter="proceed"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 pa-1>
                          <v-text-field
                            outline
                            required
                            :rules="nameRules"
                            name="name"
                            label="Middle Name"
                            v-model="form.auth_officer.middlename"
                            id="id"
                            @keypress.enter="proceed"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-select
                            :items="designation"
                            outline
                            required
                            :rules="genericRules"
                            name="name"
                            v-model="form.auth_officer.designation"
                            label="Designation"
                            id="id"                      
                          ></v-select>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field
                            outline
                            required
                            :rules="genericRules"
                            name="name"
                            v-model="form.auth_officer.tin"
                            :counter="12"
                            :mask="tin"
                            label="TIN"
                            id="id"
                            @keypress.enter="proceed"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field
                            outline
                            required
                            v-model="form.auth_officer.email"
                            :rules="emailRules"
                            name="name"
                            label="Email"
                            id="id"
                            @keypress.enter="proceed"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-container>
                </v-stepper-content>

                <v-stepper-content step="4">
                  <v-card-text>
                    <v-form ref="step4">                                      
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-text-field 
                            outline 
                            label="Username" 
                            v-model="account.username">
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field
                            outline
                            label="Password"
                            v-model="account.password"
                            :append-icon="show_pass ? 'visibility_off' : 'visibility'"
                            :append-icon-cb="() => (show_pass = !show_pass)"
                            :type="show_pass ? 'password' : 'text'"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field
                            outline
                            label="Confirm Password"
                            v-model="confirm_password"
                            :append-icon="show_conf_pass ? 'visibility_off' : 'visibility'"
                            :append-icon-cb="() => (show_conf_pass = !show_conf_pass)"
                            :type="show_conf_pass ? 'password' : 'text'"
                          ></v-text-field>
                        </v-flex>
                        </v-layout>
                      </v-form>
                  </v-card-text>
                </v-stepper-content>

                <v-stepper-content step="5">
                  <v-card-text>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <span class="headline font-weight-bold pa-1">Success!</span>
                        <div class="pa-2 title font-weight-thin">We have sent you an email confirmation. Please check your email to confirm you account.</div>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outline color="primary"  @click="back()">Back</v-btn>
            <v-btn  color="primary" :loading="isLoading" @click="next()">Next</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs1 d-flex align-center align-content-center>
            <v-btn @click="next()" large flat icon color="primary">
                <v-icon x-large>chevron_right</v-icon>
            </v-btn>
        </v-flex>
    <!-- </v-dialog> -->
  </v-layout>
</template>

<script>
export default {
  components: {
    UserAccount: () => import("@/views/registration/tabs/Account.vue")
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show_pass:true,
      show_conf_pass: true,
      confirm_password:"",
      isLoading:false,
      nav:true,
      valid: false,
      e1: 1,
      tin: "###-###-###-###",
      ltoNumber: "#############",

      ltoRules: [
        v => !!v || "License number is required",
        v => v.length <= 13 || "License number must be 13 characters"
      ],
      nameRules: [v => !!v || "Name is required"],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      genericRules: [v => !!v || "This is a required field"],
      designation: [
        "Owner (for sole proprietorships)",
        "CEO/ President/ General Manager",
        "Head, Quality Assurance/ Control",
        "Head, Regulatory Affairs",
        "Head, Production",
        "Company Pharmacist"
      ],
      existing_form: {},
      orig_form:{},
      form: {
        general_info: {
          product_type: "",
          primary_activity: "",
          declared_capital: "",
          addtl_activity: ""
        },
        license_no: "",
        estab_details: {
          establishment_name: "",
          establishment_owner: ""
          // tin: ""
        },
        auth_officer: {
          lastname: "",
          firstname: "",
          middlename: "",
          fullname: "",
          designation: "",
          email: "",
          tin: ""
        },
        qualified: []
      },
      account: {
        username: "",
        password: "",
        email: "",
        name: {}
      },
      headers:[
        "License Number",
        "Establishment Details",
        "Qualified Personnel",
        "Account Credentials",
        "Confirm Email"
      ]
    };
  },
  watch:{
    e1(){      
      if(!this.nav){
        this.nav=true        
      }
    }
  },
  computed:{
    completion(){
      return (((this.e1-1)/5)*100)
    }
  },
  methods: {
    back(){
      var step = this.e1-1
      if(step==0){
          confirm('You are about to exit the registration process.')
              && this.$router.push('/')
      }else{
          this.e1--
      }
    },
    next(){
      var valid = true;
      this.isLoading = true;
      switch (this.e1){
        case 1:
          this.$refs.step1.validate()?
          this.e1++:this.$notifyError([{message: "Fill-up required fields"}]);
          this.isLoading = false;
          break;
        case 2:
          this.$refs.step2.validate()?
          this.e1++:this.$notifyError([{message: "Fill-up required fields"}]);
          this.isLoading = false;
          break;
        case 3:
          this.validateExisting()
          .then(result=>{
            if(result){
              this.e1++
            }
          }) 
          break;                   
        case 4:
          this.saveExisting()
          .then(result=>{
            if(result){
              this.e1++
            }
          })
          break;
        case 5:
          this.$router.push('/')
      }     
      this.$vuetify.goTo(0) 
    },
    proceed() {
      if (this.form.license_no.length < 13) {
        this.$notify({
          message: "Please enter a valid License Number",
          color: "error",
          icon: "error_outline"
        });
        this.e1 = 1;
      } else {
        this.$notify({
          message:
            "Form submitted succesfully. Now, create your username and password for your login credentials",
          color: "success",
          icon: "check_circle"
        });
        this.e1 = 4;
      }
    },
    validateExisting() {
      return new Promise((resolve, reject)=>{
        if(this.$refs.step3.validate()){       
          this.form.auth_officer.fullname =this.form.auth_officer.lastname +", " +this.form.auth_officer.firstname +" " +this.form.auth_officer.middlename;      
          this.$store.dispatch("VERIFY_LICENSES", this.form)
            .then(result => {
              console.log(JSON.stringify(result))
              this.isLoading=false;     
                if(result.data.model){        
                  this.$notify({message: "License details found", color: "success", icon: "check_circle"});
                  this.orig_form = result.data.model;
                  resolve(true);
                }else{
                  this.$notifyError([{message:'License not found! Please check your details', color: "warning", icon: "error_outline"}])
                  resolve(false);
                }        
              })
              .catch(err=>{
                this.isLoading=false;
                this.$notifyError(err)
                resolve(false);
              })
            }else{
              this.$notifyError([{message: 'Fill-up required fields'}])
              resolve(false);
            }
          })
      
      
    },
    saveExisting() { 
      return new Promise((resolve, reject)=>{
          if(this.$refs.step4.validate()){
            this.orig_form._id = null;
            this.orig_form.is_existing = true;   
            this.account.name = {
              first:this.form.orig_form.firstname,
              middle:this.form.orig_form.middlename,
              last:this.form.orig_form.lastname
            }
            var reg_details = {license: this.orig_form,account: this.account}
            console.log(JSON.stringify(reg_details))
            this.$store.dispatch("EXISTING_LIC_REG", reg_details)
                .then(result => {
                  this.isLoading=false;
                  if(result.data.success){
                    this.$notify({
                      message: "Account Registration completed.",
                      color: "success",
                      icon: "check_circle"
                    });
                    resolve(true)
                  }else{                    
                    this.$notifyError(result.data.errors)
                    resolve(false)
                  }
                
              })
              .catch(err => {
                console.log("error in uploading files: " + err);
                this.isLoading=false;
                resolve(false)        
              });
          }else{
            this.$notifyError([{message: "Fill-up required fields"}])
            resolve(false)
          }
      })
      // this.orig_form.auth_officer.email = "abalita@centralizedinc.com"  
      
    }
  }
};
</script>

<style>
.v-stepper__step__step .v-icon {
  font-size: 10px;
  color: white;
}
</style>
