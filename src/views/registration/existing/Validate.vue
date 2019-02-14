<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card>
                <v-toolbar dark color="primary" style="background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%); box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5)">
                    <span class="font-weight-light title">Menu</span>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-text-field name="name" label="Existing License" id="id"></v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary">
                        Variation
                    </v-btn>
                    <v-btn color="primary">
                        Renew
                    </v-btn>
                    <v-btn color="primary">
                        Certificate
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
            <!-- ------------------------------------------------------------------------------------------------- -->
            <!-- <v-card>
                                <v-toolbar dark color="primary" style="background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%); box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5)">
                                    <span class="font-weight-light title">Modify</span>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                                Please check things to modify
                                <v-checkbox v-model="selected" label="Product Line" value="0"></v-checkbox>
                                <v-checkbox v-model="selected" label="Primary Activity" value="1"></v-checkbox>
                                <v-checkbox v-model="selected" label="Additional Activity" value="2"></v-checkbox>
                                <v-checkbox v-model="selected" label="Establishment Name" value="3"></v-checkbox>
                                <v-checkbox v-model="selected" label="Establishment Owner" value="4"></v-checkbox>
                                <v-checkbox v-model="selected" label="Office Address" value="5"></v-checkbox>
                                <v-checkbox v-model="selected" label="Qualified Personel" value="6"></v-checkbox>
                                <v-card-actions>
                                    <v-btn color="success">Sumbit</v-btn>
                                </v-card-actions>
                            </v-card> -->
            <!-- ----------------------------------------------------------------------------------------------- -->
            <v-card>
                <v-toolbar dark color="primary" style="background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%); box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5)">
                    <span class="font-weight-light title">Validation</span>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-text-field color="green darken-1" required label="License No." v-model="form.license_no"></v-text-field>
                <v-divider></v-divider>
                <v-text-field color="green darken-1" required label="Name of Establishment" v-model="form.estab_details.establishment_name"></v-text-field>
                <v-text-field color="green darken-1" label="Establishment Owner" required v-model="form.estab_details.establishment_owner"></v-text-field>
                <v-text-field color="green darken-1" :mask="tin" label="TIN Number" hint="Establishment's registered Tax Identification Number" class="input-group--focused" v-model="form.estab_details.tin"></v-text-field>
                <v-divider></v-divider>
                <v-flex xs12>
                    <v-text-field color="green darken-1" label="Last Name" v-model="form.auth_officer.lastname"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field color="green darken-1" label="First Name" v-model="form.auth_officer.firstname"></v-text-field>
                    <v-flex xs12>
                        <v-text-field color="green darken-1" label="Middle Name" v-model="form.auth_officer.middlename"></v-text-field>
                    </v-flex>
                </v-flex>
                <v-flex xs12>
                    <v-autocomplete color="green darken-1" v-model="form.auth_officer.designation" :items="designation" hide-no-data hide-selected label="Designation"></v-autocomplete>
                </v-flex>
                <v-flex xs12>
                    <v-text-field color="green darken-1" label="Email Address" v-model="form.auth_officer.email"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field color="green darken-1" label="TIN Number" v-model="form.auth_officer.tin"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-menu ref="menu2" :close-on-content-click="false" v-model="menu2" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                        <v-text-field color="green darken-1" slot="activator" v-model="form.auth_officer.birthday" label="Birthday" prepend-icon="event" readonly></v-text-field>
                        <v-date-picker ref="picker2" v-model="form.auth_officer.birthday" :max="new Date().toISOString().substr(0, 10)" min="1950-01-01" @input="$refs.menu2.save(form.auth_officer.birthday)"></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="success">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data() {
            return {
                menu2: false,
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
            }
        },
        watch: {
    menu2(val) {
      val && this.$nextTick(() => (this.$refs.picker2.activePicker = "YEAR"));
    }
  }
    }
</script>

<style>

</style>
