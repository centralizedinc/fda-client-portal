<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" persistent width="900">
      <v-form v-model="valid">
        <v-card>
          <v-card-title style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
            <span class="headline font-weight-thin white--text">Validate Existing User</span>
            <v-spacer></v-spacer>
            <v-btn flat icon color="black" @click="$emit('close')">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-title>

          <v-stepper v-model="e1">
            <v-stepper-header class="stepHeader">
              <v-stepper-step :complete="e1 > 1" step="1">License Number</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">Establishment Information</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 3" step="3">Authorized Personnel</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="4">Create Login Credentials</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-text-field
                  box
                  v-model="form.license_no"
                  :rules="ltoRules"
                  :counter="13"
                  :mask="ltoNumber"
                  label="Enter existing License Number"
                  @keypress.enter="validateLicense"
                ></v-text-field>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="success" @click="validateLicense">Continue</v-btn>
                </v-card-actions>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-container grid-list-xs text-xs-justified>
                  <v-layout row wrap>
                    <v-flex xs8>
                      <v-text-field
                        required
                        :rules="genericRules"
                        label="Name of Establishment"
                        @keypress.enter="e1 = 3"
                        v-model="form.estab_details.establishment_name"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        required
                        name="name"
                        :counter="12"
                        :rules="genericRules"
                        label="TIN"
                        @keypress.enter="e1 = 3"
                        :mask="tin"
                        v-model="form.estab_details.tin"
                        id="id"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
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
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="error" @click="e1 = 1">Back</v-btn>
                  <v-btn flat color="success" @click="e1 = 3">Continue</v-btn>
                </v-card-actions>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-container grid-list-xs text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs4>
                      <v-text-field
                        required
                        :rules="nameRules"
                        label="Last Name"
                        v-model="form.auth_officer.lastname"
                        @keypress.enter="proceed"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        required
                        :rules="nameRules"
                        name="name"
                        v-model="form.auth_officer.firstname"
                        label="First Name"
                        id="id"
                        @keypress.enter="proceed"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        required
                        :rules="nameRules"
                        name="name"
                        label="Middle Name"
                        v-model="form.auth_officer.middlename"
                        id="id"
                        @keypress.enter="proceed"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs5>
                      <v-autocomplete
                        color="green darken-1"
                        :rules="genericRules"
                        v-model="form.auth_officer.designation"
                        :items="designation"
                        hide-no-data
                        hide-selected
                        label="Designation"
                        @keypress.enter="proceed"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs3>
                      <v-text-field
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
                    <v-flex xs4>
                      <v-text-field
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
                </v-container>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn flat color="error" @click="e1 = 2">Back</v-btn>
                  <v-btn block color="success" @click="proceed">Submit</v-btn>
                </v-card-actions>
              </v-stepper-content>

              <v-stepper-content step="4">
                <v-container grid-list-xs text-xs-center>
                  <v-layout row wrap>
                    <user-account
                      slot="acctInfo"
                      :account="account"
                      @keypress.enter="submitExisting"
                    ></user-account>
                  </v-layout>
                </v-container>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn block color="success" @click="submitExisting">Submit</v-btn>
                </v-card-actions>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  components: {
    UserAccount: () => import("../tabs/Account.vue")
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valid: false,
      e1: 0,
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
        "Head, Production"
      ],
      form: {
        license_no: "",
        estab_details: {
          establishment_name: "",
          establishment_owner: "",
          tin: ""
        },
        auth_officer: {
          lastname: "",
          firstname: "",
          middlename: "",
          designation: "",
          email: "",
          tin: "",
          birthday: ""
        }
      },
      account: {
        username: "",
        password: "",
        name: {}
      }
    };
  },
  methods: {
    validateLicense() {
      if (!this.form.license_no) {
        this.$notify({
          message: "Please enter a valid License Number",
          color: "error",
          icon: "error_outline"
        });
      } else {
        this.e1 = 2;
      }
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
    submitExisting() {
      this.$notify({
        message: "A confirmation email has been sent at",
        color: "warning",
        icon: "check_circle"
      });
      this.$router.push("/login");
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
