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
              <v-stepper-step editable :complete="e1 > 1" step="1">License Number</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step editable :complete="e1 > 2" step="2">Establishment Information</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step editable :complete="e1 > 3" step="3">Authorized Personnel</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-text-field box label="Enter existing license number" v-model="value"></v-text-field>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="success" @click="e1 = 2">Continue</v-btn>
                </v-card-actions>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-container grid-list-xs text-xs-justified>
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-text-field required label="Name of Establishment" v-model="value"></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field required name="name" label="Tax Identification Number" id="id"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <span
                        green--text
                        class="subheading font-weight-thin"
                        style="text-transform: uppercase"
                      >Establishment Owner</span>
                    </v-flex>
                    <v-flex xs12>
                      <v-layout row wrap>
                        <v-flex xs4>
                          <v-text-field required name="name" label="Last Name" id="id"></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                          <v-text-field required name="name" label="First Name" id="id"></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                          <v-text-field required name="name" label="Middle Name" id="id"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="success" @click="e1 = 3">Continue</v-btn>
                </v-card-actions>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-container grid-list-xs text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs4>
                      <v-text-field required :rules="nameRules" label="Last Name" v-model="value"></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        :rules="nameRules"
                        required
                        name="name"
                        label="First Name"
                        id="id"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        :rules="nameRules"
                        required
                        name="name"
                        label="Middle Name"
                        id="id"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        required
                        :rules="genericRules"
                        label="Designation"
                        v-model="value"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field required :rules="genericRules" name="name" label="TIN" id="id"></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field required name="name" :rules="emailRules" label="Email" id="id"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn flat block color="success" @click="$router.push('/signup')">Submit</v-btn>
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
    },
    data() {
      return {
        e1: 0,
        valid: false,
        nameRules: [
          v => !!v || "Name is required",
          v => v.length <= 10 || "Name must be less than 10 characters"
        ],
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+/.test(v) || "E-mail must be valid"
        ],
        genericRules: [v => !!v || "This is a required field"],
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
    }
  }
};
</script>

<style>
</style>
