<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        label="Last Name"
        :rules="[rules.required]"
        v-model="form.auth_officer.lastname"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        label="First Name"
        :rules="[rules.required]"
        v-model="form.auth_officer.firstname"
      ></v-text-field>
      <v-flex xs12>
        <v-text-field
          color="green darken-1"
          label="Middle Name"
          :rules="[rules.required]"
          v-model="form.auth_officer.middlename"
        ></v-text-field>
      </v-flex>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        color="green darken-1"
        :rules="[rules.required]"
        v-model="form.auth_officer.designation"
        :items="designation"
        hide-no-data
        hide-selected
        label="Designation"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        label="TIN Number"
        :rules="[rules.required]"
        v-model="form.auth_officer.tin"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-card-title primary-title class="headline">Government Issued Identification Document
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg"></i>
          </v-btn>Get Help
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <v-flex xs12>
          <v-autocomplete
            color="green darken-1"
            :rules="[rules.required]"
            v-model="form.auth_officer.id_type"
            :items="id_type"
            hide-no-data
            hide-selected
            label="ID Type"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            color="green darken-1"
            label="ID Number"
            :rules="[rules.required]"
            v-model="form.auth_officer.id_no"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-menu
            :close-on-content-click="false"
            v-model="menu2"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              color="green darken-1"
              slot="activator"
              :rules="[rules.required]"
              v-model="date"
              label="Expiry"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker color="green darken-1" v-model="date" @input="menu2 = false"></v-date-picker>
          </v-menu>
        </v-flex>
      </v-card-text>
    </v-flex>
    <v-flex xs12>
      <v-card-title primary-title class="headline">Mailing Address</v-card-title>
      <v-card-text>
        <v-flex xs12>
          <v-text-field
            color="green darken-1"
            label="Address"
            :rules="[rules.required]"
            v-model="form.auth_officer.mail_add.address"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-autocomplete
            color="green darken-1"
            :rules="[rules.required]"
            v-model="form.auth_officer.mail_add.region"
            :items="region"
            hide-no-data
            hide-selected
            label="Region"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs12>
          <v-autocomplete
            color="green darken-1"
            :rules="[rules.required]"
            v-model="form.auth_officer.mail_add.province"
            :items="province"
            hide-no-data
            hide-selected
            label="Province"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs12>
          <v-autocomplete
            color="green darken-1"
            :rules="[rules.required]"
            v-model="form.auth_officer.mail_add.city"
            :items="city"
            hide-no-data
            hide-selected
            label="City / Town"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs12>
          <v-autocomplete
            color="green darken-1"
            :rules="[rules.required]"
            v-model="form.auth_officer.mail_add.zipcode"
            :items="zip"
            hide-no-data
            hide-selected
            label="Zip Code"
          ></v-autocomplete>
        </v-flex>
      </v-card-text>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["form"],
  data: () => ({
    designation: [
      "Owner (for sole proprietorships)",
      "CEO/ President/ General Manager",
      "Head, Quality Assurance/ Control",
      "Head, Regulatory Affairs",
      "Head, Production"
    ],
    id_type: ["PRC", "TIN"],
    rules: {
      required: value => !!value || "This field is required"
    }
  })
};
</script>

<style>
</style>
