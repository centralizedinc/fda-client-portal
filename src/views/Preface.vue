<template>
<div>
  <v-container grid-list-md text-xs-left>
    <v-layout row wrap>
      <v-flex xs12 md6 pa-1>
        <v-card class="tCard pa-3 elevation-10">
          <v-img :src="require('@/assets/FDA.png')" aspect-ratio="2.75"></v-img>
          <v-card-text
            class="subheading black--text"
          >This FDA Portal version 3.0 allows users to complete entire registration and application online. Apply and submit License and Certificates, upload documents, pay online through debit or credit card and wait for the approval from FDA. Track, view and get notified on the status of application in the dashboard. New license application requires one time registration to access the portal.</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md5 ml-5 pa-2>
        <v-card>
          <v-toolbar
            dark
            color="primary"
            style="background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%); box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5)"
          >
            <span class="font-weight-light title">Login</span>
            <v-spacer></v-spacer>
            <!-- <v-btn flat color="white">REGISTER</v-btn> -->
          </v-toolbar>
          <v-divider></v-divider>
          <v-form class="mt-4 login" @submit.prevent="login" ref="form" v-model="isFormValid">
            <v-card-text>
              <v-text-field
                outline
                label="Email/Username"
                @keypress.enter="login"
                v-model="credentials.username"
                color="primary"
                autocomplete="username"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                outline
                name="name"
                label="Enter your password"
                min="8"
                @keypress.enter="login"
                :append-icon="value ? 'visibility_off' : 'visibility'"
                @click:append="() => (value = !value)"
                :type="value ? 'password' : 'text'"
                v-model="credentials.password"
                color="primary"
                autocomplete="current-password"
                :rules="[rules.required]"
              ></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <!-- <v-btn
                outline
                color="primary"
                class="caption font-weight-light"
                @click="signup()"
              >Sign-up</v-btn>-->
              <v-btn
                block
                large
                color="primary"
                :loading="loading"
                :disabled="loading"
                type="submit"
                class="caption font-weight-light"
              >Login</v-btn>
            </v-card-actions>
            <v-btn
              flat
              block
              color="primary"
              class="caption font-weight-light"
              @click.native="dialog =true"
            >Forgot Password?</v-btn>
          </v-form>
        </v-card>
      </v-flex>
      <v-dialog v-model="dialog" persistent max-width="400px" transition="dialog-transition">
        <v-card>
          <v-toolbar
            dark
            color="fdaGreen"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >
            <span class="font-weight-thin headline">Forgot Password</span>
            <v-spacer></v-spacer>
            <v-btn flat icon @click.native="dialog=false">
              <v-icon>fas fa-times-circle fa-1x</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <span
              class="subheading font-weight-thin"
            >Enter your email address to recover your account.</span>
            <v-text-field
              class="font-weight-thin"
              @keypress.enter="forgot_password"
              outline
              v-model="email"
              label="Email Address"
            ></v-text-field>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              outline
              color="secondary"
              class="caption font-weight-light"
              @click.native="dialog =false"
            >Cancel</v-btn>
            <v-btn
              color="success"
              class="caption font-weight-light"
              :disabled="loading2"
              :loading="loading2"
              @click="forgot_password"
            >Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-divider inset class="mt-4"></v-divider>
      
      <v-container grid-list-md text-xs-center>
        
        <v-layout row wrap justify-center>
          <undertaking-dialog
            :show="showDialog"
            @proceed="launchAppForm"
            @close="showDialog = false"
          ></undertaking-dialog>

          <!-- buttons for existing license -->
          <a href="#signup"></a>
          <v-flex xs6 md4 pa-2 id="signup">
            <v-card
              class="cardButton"
              color="fdaGold"
              @click="redirect(1)"
              hover
              ripple
              style="background: linear-gradient(180deg, #E9EDCF, #B5C25A)"
            >
              <v-card-text>
                <v-spacer></v-spacer>
                <v-tooltip top>
                  <v-icon class="pt-4" slot="activator" color="primary">fas fa-file-contract fa-4x</v-icon>
                </v-tooltip>
                <v-spacer></v-spacer>
                <v-flex xs12 md12>
                  <span
                    class="headline font-weight-thin text-xs-center"
                    color="primary"
                    style="text-transform: uppercase"
                  >Existing License</span>
                  <h1
                    class="caption"
                  >Applicants with existing license that needs login credentials to access FDA Portal 3.0</h1>
                </v-flex>
              </v-card-text>
              <!-- <existing-user :show="validationDialog" @close="validationDialog=false"></existing-user> -->
            </v-card>
          </v-flex>

          <!-- button for new license -->
          <v-flex xs6 md4 pa-2>
            
            <v-card
              class="cardButton"
              style="background: linear-gradient(180deg, #EFF1E3, #CAD0A0)"
              color="fdaTan"
              hover
              ripple
              @click="redirect(0)"
            >
              <v-card-text>
                <v-spacer></v-spacer>
                <v-tooltip top>
                  <v-icon class="pt-4" slot="activator" color="primary">fas fa-plus fa-4x</v-icon>
                </v-tooltip>
                <v-spacer></v-spacer>
                <v-flex xs12 md12>
                  <span
                    class="headline font-weight-thin text-xs-center"
                    style="text-transform: uppercase"
                  >New License</span>
                  <h1
                    class="caption"
                  >New license application requires registration to have full access of FDA Portal 3.0.</h1>
                </v-flex>
              </v-card-text>
              <!-- <existing-user :show="validationDialog" @close="validationDialog=false"></existing-user> -->
            </v-card>
          </v-flex>

          <v-flex xs6 md4 pa-2>
            
            <v-card
              class="cardButton"
              style="background: linear-gradient(180deg, #EFF1E3, #CAD0A0)"
              color="fdaTan"
              hover
              ripple
              @click="redirect(2)"
            >
              <v-card-text>
                <v-spacer></v-spacer>
                <v-tooltip top>
                  <v-icon class="pt-4" slot="activator" color="primary">fas fa-file-upload fa-4x</v-icon>
                </v-tooltip>
                <v-spacer></v-spacer>
                <v-flex xs12 md12>
                  <span
                    class="headline font-weight-thin text-xs-center"
                    style="text-transform: uppercase"
                  >Continue your Application</span>
                  <h1
                    class="caption"
                  >Upload your <b>*.fda</b> file to continue your license application</h1>
                </v-flex>
              </v-card-text>
              <!-- <existing-user :show="validationDialog" @close="validationDialog=false"></existing-user> -->
            </v-card>
          </v-flex>

          <v-divider inset class="mt-4"></v-divider>          
        </v-layout>
      </v-container>
    </v-layout>
    
  </v-container>
  <input style="display:none"
                ref="file"
              type="file"
              @change="onFilePicked"
              accept=".fda"
            >
  </div>
</template>

<script>
export default {
  components: {
    UndertakingDialog: () => import("../components/UndertakingDialog")
  },
  props: ["account"],
  data: () => ({
    isFormValid:true,
    showDialog: false,
    selected_index: -1,
    validationDialog: false,
    value: true,
    credentials: {},
    loading: false,
    loading2: false,
    dialog: false,
    email: "",
    rules: {
      required: value => !!value || "This field is required"
    }
  }),
  methods: {    
    login() {
      this.$refs.form.validate()
      if(this.isFormValid){
        this.loading = true;
        this.$store
          .dispatch("LOGIN", this.credentials)
          .then(res => {
            this.loading = false;
            if (res.isMatch && res.isConfirmed) {
              console.log("RESULT: " + JSON.stringify(res));
              if (res.user.status === 2) {
                this.$notify({
                  message: "Welcome " + res.user.username + "!",
                  color: "success",
                  icon: "check_circle"
                });
              } else {
                this.$notify({
                  message:
                    "Welcome " +
                    res.user.username +
                    "! You have limited access since your account is not yet activated.",
                  color: "success",
                  icon: "check_circle"
                });
              }
              this.$router.push("/app");
            } else if (!res.isConfirmed) {
              this.$notify({
                message: "Please confirm your account at " + res.user.email,
                color: "warning",
                icon: "error_outline"
              });
            } else {
              this.credentials.password = "";
              this.$notify({
                message: "Invalid User Credentials",
                color: "warning",
                icon: "error_outline"
              });
            }
          })
          .catch(err => {
            this.loading = false;
            this.$notify({
              message: "Oops! Something went wrong. Please try again.",
              color: "error",
              icon: "error_outline"
            });
          });
      }
    },
    signup() {
      this.$router.push("/signup");
    },
    forgot_password() {
      this.loading2 = true;
      this.$store
        .dispatch("FORGOT_PASSWORD", this.email)
        .then(res => {
          this.loading2 = false;
          this.dialog = false;
          this.$notify({
            message:
              "We have received your request for account recovery. Please check your email (" +
              this.email +
              ") in order to proceed.",
            color: "success"
          });
        })
        .catch(err => {
          this.loading2 = false;
          this.dialog = false;
          this.$notify({
            message:
              "Could not associate your email (" +
              this.email +
              ") to any user account.",
            color: "error"
          });
        });
    },
    redirect(index) {
      this.selected_index = index;
      this.showDialog = true;
    },
    launchAppForm() {
      this.showDialog = false;
      if (this.selected_index === 0) {
        this.$store.commit('NEW_APPLICATION')
        this.$router.push("/registration/new");
      } else if (this.selected_index === 1) {
        // this.validationDialog = true;
        this.$router.push("/registration/existing");
      }else if(this.selected_index === 2){
        this.$refs.file.click();

      }
    },
    onFilePicked(e){
        var files = e.target.files;
        var reader = new FileReader();
        var vue = this;
        reader.addEventListener('load', function (e) {
            var decoded = new Buffer(e.target.result, 'base64')
            vue.$store.commit('CONTINUE_APPLICATION', JSON.parse(decoded))
            vue.$router.push("/registration/new")
            vue.$notify({message:'Welcome back! Let us continue where you left off.', color:'success'})
            // console.log(JSON.stringify(this.form))
        });

        reader.readAsBinaryString(files[0]);
    }
  }
};
</script>

<style>
.tCard {
  background-color: transparent !important;
  box-shadow: none !important;
}

.cardButton {
  -webkit-box-reflect: below 6px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(10%, transparent), to(rgba(250, 250, 250, 0.1))) !important;
  border-radius: 8px !important;
  height: calc(100% - 30px) !important;
  border: none;
  position: relative;
  margin: 10px 1px;
  line-height: 1.42857;
  text-transform: uppercase;
  letter-spacing: 0;
  will-change: box-shadow, transform;
}
</style>
