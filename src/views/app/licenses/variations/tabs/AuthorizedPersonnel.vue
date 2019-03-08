<template>
    <v-layout row wrap>
        <v-flex xs12 class="text-xs-center headline">
            Authorized Personnel
        </v-flex>

        <v-flex xs12>
            <span class="body-1">Old Value</span>: <span class="body-2">{{existingForm.auth_officer.lastname}}</span>
            <v-text-field
                label="Last Name"
                box :rules="[rules.required]"
                v-model="updatedForm.auth_officer.lastname">
            </v-text-field>
        </v-flex>
        <v-divider></v-divider>

        <v-flex xs12>
            <span class="body-1">Old Value</span>: <span class="body-2">{{existingForm.auth_officer.firstname}}</span>
            <v-text-field
                label="First Name"
                box :rules="[rules.required]"
                v-model="updatedForm.auth_officer.firstname"
            ></v-text-field>
        </v-flex>
        <v-divider></v-divider>

        <v-flex xs12>
            <span class="body-1">Old Value</span>: <span class="body-2">{{existingForm.auth_officer.middlename}}</span>
            <v-text-field
                label="Middle Name"
                box :rules="[rules.required]"
                v-model="updatedForm.auth_officer.middlename"
            ></v-text-field>
        </v-flex>
        <v-divider></v-divider>
        
        <v-flex xs12>
            <span class="body-1">Old Value</span>: <span class="body-2">{{existingForm.auth_officer.birthday}}</span>
            <v-menu
                ref="menu2"
                :close-on-content-click="false"
                v-model="menu2"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px">
                <v-text-field
                    color="green darken-1"
                    slot="activator"
                    v-model="updatedForm.auth_officer.birthday"
                    label="Birthday"
                    box
                    prepend-icon="event"
                    readonly>
                </v-text-field>
                <v-date-picker
                    ref="picker2"
                    v-model="updatedForm.auth_officer.birthday"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @input="$refs.menu2.save(updatedForm.auth_officer.birthday)">
                </v-date-picker>
            </v-menu>
        </v-flex>
        <v-divider></v-divider>
        
        <v-flex xs12>
            <span class="body-1">Old Value</span>: <span class="body-2">{{existingForm.auth_officer.designation}}</span>
            <v-autocomplete
                color="green darken-1"
                :rules="[rules.required]"
                v-model="updatedForm.auth_officer.designation"
                :items="designation"
                hide-no-data box
                hide-selected
                label="Designation"
            ></v-autocomplete>
        </v-flex>
        <v-divider></v-divider>
        
        <v-flex xs12>
            <span class="body-1">Old Value</span>: <span class="body-2">{{existingForm.auth_officer.email}}</span>
            <v-text-field
                label="Email"
                box :rules="[rules.required, rules.email]"
                v-model="updatedForm.auth_officer.email"
            ></v-text-field>
        </v-flex>
        <v-divider></v-divider>

        <v-flex xs12>
            <span class="body-1">Old Value</span>: <span class="body-2">{{existingForm.auth_officer.tin}}</span>
            <v-text-field
                color="green darken-1"
                label="TIN"
                hint="Tax Identification Number"
                :rules="[rules.required]"
                :mask="tin" box
                v-model="updatedForm.auth_officer.tin">
            </v-text-field>
        </v-flex>
        <v-divider></v-divider>

        <v-flex xs12>
            <span class="body-1">Old Value</span>: <span class="body-2">{{existingForm.auth_officer.id_type}}</span>
            <v-autocomplete
                color="green darken-1"
                :rules="[rules.required]"
                v-model="updatedForm.auth_officer.id_type"
                :items="id_type" box
                hide-no-data
                hide-selected
                label="ID Type">
            </v-autocomplete>
        </v-flex>
        <v-divider></v-divider>

        <v-flex xs12>
            <span class="body-1">Old Value</span>: <span class="body-2">{{existingForm.auth_officer.id_no}}</span>
            <v-text-field
                color="green darken-1"
                label="ID Number" box
                :rules="[rules.required]"
                v-model="updatedForm.auth_officer.id_no">
            </v-text-field>
        </v-flex>
        <v-divider></v-divider>

        <v-flex xs12>
            <span class="body-1">Old Value</span>: <span class="body-2">{{existingForm.auth_officer.id_expiry}}</span>
            <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menu"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px">
                <v-text-field
                    color="green darken-1"
                    slot="activator"
                    :rules="[rules.required]"
                    v-model="updatedForm.auth_officer.id_expiry"
                    label="Expiry" box
                    prepend-icon="event"
                    readonly>
                </v-text-field>
                <v-date-picker
                    color="green darken-1"
                    v-model="updatedForm.auth_officer.id_expiry"
                    no-title
                    scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu.save(updatedForm.auth_officer.id_expiry)">OK</v-btn>
                </v-date-picker>
            </v-menu>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  props: ["existingForm", "updatedForm"],
  data() {
    return {
      menu: null,
      menu2: null,
      tin: "###-###-###-###",
      id_type: ["PRC", "TIN"],
      designation: [
        "Owner (for sole proprietorships)",
        "CEO/ President/ General Manager",
        "Head, Quality Assurance/ Control",
        "Head, Regulatory Affairs",
        "Head, Production"
      ],
      rules: {
        required: v => !!v || "Required field",
        email: v =>
          ((!!v || "E-mail is required") &&
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)) ||
          "E-mail must be valid"
      }
    };
  }
};
</script>

<style>
</style>
