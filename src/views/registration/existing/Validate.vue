<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" width="650" persistent>
      <v-form v-model="valid">
        <v-card>
          <v-card-title style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
            <span class="headline font-weight-thin white--text">Validate User</span>
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
              <v-stepper-step step="3">Authorized Personnel</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-text-field
                  box
                  v-model="form.license_no"
                  :rules="ltoRules"
                  :counter="13"
                  :mask="ltoNumber"
                >"Enter existing license number"></v-text-field>
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
                      <v-text-field required :rules="genericRules" label="Name of Establishment"></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        required
                        name="name"
                        :counter="12"
                        :rules="genericRules"
                        label="TIN"
                        :mask="tin"
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
                      <v-text-field required :rules="nameRules" label="Last Name"></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        required
                        :rules="nameRules"
                        name="name"
                        label="First Name"
                        id="id"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        required
                        :rules="nameRules"
                        name="name"
                        label="Middle Name"
                        id="id"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field required :rules="genericRules" label="Designation"></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        required
                        :rules="genericRules"
                        name="name"
                        :counter="12"
                        :mask="tin"
                        label="TIN"
                        id="id"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field required :rules="emailRules" name="name" label="Email" id="id"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="error" @click="e1 = 2">Back</v-btn>
                  <v-btn flat color="success" @click="$router.push('/signup')">Submit</v-btn>
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
      genericRules: [v => !!v || "This field is required"],
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
      }
    };
  },
  methods: {
    validateLicense() {
      if (!this.form.license_no || this.form.license_no.length < 13) {
        this.$notify({
          message: "Please enter valid License Number",
          color: "error",
          icon: "error_outline"
        });
      } else {
        this.e1 = 2;
      }
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
