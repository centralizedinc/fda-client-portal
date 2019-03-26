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
        label="TIN"
        hint="Tax Identification Number"
        :rules="[rules.required]"
        :mask="tin"
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
            color="green darken-1"
            v-model="form.auth_officer.id_expiry"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn flat color="secondary" outline @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(form.auth_officer.id_expiry)">OK</v-btn>
          </v-date-picker>
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
          :items="regions"
          item-text="name"
          item-value="_id"
          @change="getProvinces"
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
          :items="provinces"
          @change="getCities"
          item-text="name"
          item-value="_id"
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
          :items="cities"
          item-text="name"
          item-value="_id"
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
          :items="zipcodes"
          item-text="name"
          item-value="_id"
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
    regions: [],
    provinces: [],
    cities: [],
    zipcodes: [],
    tin: "###-###-###-###",
    rules: {
      required: value => !!value || "This field is required"
    }
  }),
  created() {
    this.init();
  },
  watch: {
    form: {
      handler(val) {
        console.log("form auth: " + JSON.stringify(val));
      },
      deep: true
    },
    menu2(val) {
      val && this.$nextTick(() => (this.$refs.picker2.activePicker = "YEAR"));
    }
  },
  methods: {
    init() {
      this.$store.dispatch("GET_REGION").then(result => {
        this.regions = this.$store.state.places.regions;
      });
    },
    getProvinces() {
      this.$store
        .dispatch("GET_PROVINCE", this.form.auth_officer.mail_add.region)
        .then(result => {
          this.provinces = this.$store.state.places.provinces;
          return this.$store.dispatch("GET_REGION");
        })
        .then(result => {
          // GET region data
          this.regions = this.$store.state.places.regions;
        });
    },
    getCities() {
      this.$store
        .dispatch("GET_CITY", this.form.auth_officer.mail_add.city)
        .then(result => {
          this.cities = this.$store.state.places.city;
          return this.$store.dispatch("GET_PROVINCE");
        })
        .then(result => {
          // GET CITIES data
          this.provinces = this.$store.state.places.provinces;
        });
    }
  }
};
</script>

<style>
</style>
