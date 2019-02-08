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
        label="Email Address"
        :rules="[rules.required]"
        v-model="form.auth_officer.email"
      ></v-text-field>
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
      <v-menu
        ref="menu2"
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
          v-model="form.auth_officer.birthday"
          label="Birthday"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker
          ref="picker2"
          v-model="form.auth_officer.birthday"
          :max="new Date().toISOString().substr(0, 10)"
          min="1950-01-01"
          @input="$refs.menu2.save(form.auth_officer.birthday)"
        ></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs12>
      <v-sheet
        dark
        class="font-weight-normal elevation-2 pl-3 mt-3 mb-4 subheading"
        color="fdaGreen"
        height="35"
        width="calc(100% - 30px)"
        style="border-radius: 0px 0px 12px 12px !important; text-transform: uppercase"
      >Government Issued Identification Document
        <v-tooltip top>
          <v-btn slot="activator" flat icon small color="error">
            <v-icon small class="pb-1">fas fa-question fa-move</v-icon>
          </v-btn>Get Help
        </v-tooltip>
      </v-sheet>

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
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
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
            v-model="form.auth_officer.id_expiry"
            label="Expiry"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker
            ref="picker"
            color="green darken-1"
            v-model="form.auth_officer.id_expiry"
            :max="new Date().toISOString().substr(0, 10)"
            min="2018-01-01"
            @input="$refs.menu.save(form.auth_officer.id_expiry)"
          ></v-date-picker>
        </v-menu>
      </v-flex>
    </v-flex>
    <v-flex xs12>
      <v-sheet
        dark
        class="font-weight-normal elevation-2 pl-3 mt-3 mb-4 subheading"
        color="fdaGreen"
        height="35"
        width="calc(100% - 30px)"
        style="border-radius: 0px 0px 12px 12px !important; text-transform: uppercase"
      >Mailing Address
        <v-tooltip top>
          <v-btn slot="activator" flat icon small color="error">
            <v-icon small class="pb-1">fas fa-question fa-move</v-icon>
          </v-btn>Get Help
        </v-tooltip>
      </v-sheet>
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
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["form"],
  data: () => ({
    menu: null,
    menu2: null,
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
  }),
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    menu2(val) {
      val && this.$nextTick(() => (this.$refs.picker2.activePicker = "YEAR"));
    }
  }
};
</script>

<style>
</style>
