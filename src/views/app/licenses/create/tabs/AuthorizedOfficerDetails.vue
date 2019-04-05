<template>
<v-form ref="vform" v-model="isValid">

  <!-- <v-expansion-panel v-model="panels">
    <v-expansion-panel-content class="ma-3 pa-3">
      <div slot="header" class="title font-weight-light primary--text">Personal Details</div> -->
      
      <v-card> 
        <v-sheet
            dark
            class="font-weight-normal elevation-2 pl-3 mt-3 mb-4 subheading"
            color="fdaGreen"
            height="40"
      width="calc(100% - 10px)"
            style="border-radius: 0px 0px 12px 12px !important; text-transform: uppercase"
          >
            Personal Information
          </v-sheet>
        <v-card-text>
          
                    
        <v-layout row wrap>              
          <v-flex xs12 md4 pa-2>
            <v-text-field
              color="green darken-1"
              label="Last Name"
              :rules="[rules.required]"
              v-model="form.auth_officer.lastname"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4 pa-2>
            <v-text-field
              color="green darken-1"
              label="First Name"
              :rules="[rules.required]"
              v-model="form.auth_officer.firstname"
            ></v-text-field>
            </v-flex>
            <v-flex xs12 md4 pa-2>
              <v-text-field
                color="green darken-1"
                label="Middle Name"
                :rules="[rules.required]"
                v-model="form.auth_officer.middlename"
              ></v-text-field>      
          </v-flex>
          <v-flex xs12 md4 pa-2>
            <v-autocomplete
              color="green darken-1"
              :rules="[rules.required]"
              v-model="form.auth_officer.designation"
              :items="designations"
              item-text="name"
              item-value="_id"
              hide-no-data
              hide-selected
              label="Designation"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12 md4 pa-2>
            <v-text-field
              color="green darken-1"
              label="Email Address"
              :rules="[rules.required]"
              v-model="form.auth_officer.email"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4 pa-2>
            <v-text-field
              color="green darken-1"
              label="TIN"
              hint="Tax Identification Number"
              :rules="[rules.required]"
              :mask="tin"
              v-model="form.auth_officer.tin"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4 pa-1>
        <v-autocomplete
          color="green darken-1"
          :rules="[rules.required]"
          v-model="form.auth_officer.id_type"
          :items="id_types"
          item-text="name"
          item-value="_id"
          hide-no-data
          hide-selected
          label="ID Type"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs12 md4 pa-1>
        <v-text-field
          color="green darken-1"
          label="ID Number"
          :rules="[rules.required]"
          v-model="form.auth_officer.id_no"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md4 pa-1>
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
            append-icon="event"
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
        </v-layout>
        </v-card-text> 
        </v-card>
    <!-- </v-expansion-panel-content>
    <v-expansion-panel-content class="ma-3 pa-3">
      <div slot="header" class="title font-weight-light primary--text">Address Details</div> -->
      <v-card>
       <v-sheet
      dark
      class="font-weight-normal elevation-2 pl-3 mt-3 mb-4 subheading"
      color="fdaGreen"
     height="40"
      width="calc(100% - 10px)"
      style="border-radius: 0px 0px 12px 12px !important; text-transform: uppercase"
    >
      Address Details
    </v-sheet>
     <v-card-text>       
        <v-layout row wrap>
          <v-flex xs12>
            <v-textarea rows='2'
              color="green darken-1"
              label="Address"
              :rules="[rules.required]"
              v-model="form.auth_officer.mail_add.address"
            ></v-textarea>
          </v-flex>
          <v-flex xs12 md6 pa-2>
            <v-autocomplete
              color="green darken-1"
              :rules="[rules.required]"
              v-model="form.auth_officer.mail_add.region"
              :items="regions"
              item-text="name"
              item-value="_id"
              hide-no-data
              hide-selected
              label="Region"
            ></v-autocomplete>            
          </v-flex>
          <v-flex xs12 md6 pa-2>
            <v-autocomplete
              color="green darken-1"
              :rules="[rules.required]"
              v-model="form.auth_officer.mail_add.province"
              :items="filtered_provinces"
              item-text="name"
              item-value="_id"
              hide-no-data
              hide-selected
              label="Province"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12  md6 pa-2>
            <v-autocomplete
              color="green darken-1"
              :rules="[rules.required]"
              v-model="form.auth_officer.mail_add.city"
              :items="filtered_cities"
              item-text="name"
              item-value="_id"
              hide-no-data
              hide-selected
              label="City / Town"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12  md6 pa-2>
            <v-text-field
              color="green darken-1"
              :rules="[rules.required]"
              v-model="form.auth_officer.mail_add.zipcode"
              label="Zip Code"
            ></v-text-field>
          </v-flex>
        </v-layout>
        </v-card-text>
      </v-card>        
    <!-- </v-expansion-panel-content>
  </v-expansion-panel> -->



  
    <!-- <v-flex xs12 md4 pa-2>
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
    </v-flex> -->

    
    <!-- <v-flex xs12 >
      <v-sheet
        dark
        class="font-weight-normal elevation-2 pl-3 mt-3 mb-4 subheading"
        color="fdaGreen"
        height="35"
        width="calc(100% - 30px)"
        style="border-radius: 0px 0px 12px 12px !important; text-transform: uppercase"
      >
        Government Issued Identification Document
        <v-tooltip top>
          <v-btn slot="activator" flat icon small color="error">
            <v-icon small class="pb-1">fas fa-question fa-move</v-icon>
          </v-btn>Please make sure that the ID number is matched to the ID selected
        </v-tooltip>
      </v-sheet>

      
    </v-flex> -->
    <!-- <v-flex xs12>
      <v-sheet
        dark
        class="font-weight-normal elevation-2 pl-3 mt-3 mb-4 subheading"
        color="fdaGreen"
        height="35"
        width="calc(100% - 30px)"
        style="border-radius: 0px 0px 12px 12px !important; text-transform: uppercase"
      >
        Mailing Address
        <v-tooltip top>
          <v-btn slot="activator" flat icon small color="error">
            <v-icon small class="pb-1">fas fa-question fa-move</v-icon>
          </v-btn>
        </v-tooltip>
      </v-sheet>
      
    </v-flex> -->
    
  <!-- </v-layout> -->
  </v-form>
</template>

<script>
export default {
  props: ["form", "account"],
  data: () => ({
    panels: [true, false],
    isValid: true,
    menu: null,
    menu2: null,
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
    menu2(val) {
      val && this.$nextTick(() => (this.$refs.picker2.activePicker = "YEAR"));
    }
  },
  methods: {
    init() {
      // this.$store.dispatch("GET_REGION").then(result => {
      //   this.regions = this.$store.state.places.regions;
      // });
      this.$store
        .dispatch("GET_PLACES_REFERENCE")
        .then(locations => {
          if (locations) {
            this.regions = locations.regions;
            this.provinces = locations.provinces;
            this.cities = locations.provinces;
          }
          // load ID TYPES and DESIGNATIONS
          return this.$store.dispatch("GET_REFERENCES");
        })
        .catch(err => {
          this.$notifyError(err);
        });
    },
    validate() {
      this.$refs.vform.validate();
      if (!this.isValid) {
        this.panels = [true, true];
      } else {
        this.account.name.first = this.form.auth_officer.firstname;
        this.account.name.last = this.form.auth_officer.lastname;
        this.account.name.middle = this.form.auth_officer.middlename;
        this.account.email = this.form.auth_officer.email;
      }
      console.log("ACCOUNT: " + JSON.stringify(this.account));
      return this.isValid;
    }
    // getProvinces() {
    //   this.$store
    //     .dispatch("GET_PROVINCE", this.form.auth_officer.mail_add.region)
    //     .then(result => {
    //       this.provinces = this.$store.state.places.provinces;
    //       return this.$store.dispatch("GET_REGION");
    //     })
    //     .then(result => {
    //       // GET region data
    //       this.regions = this.$store.state.places.regions;
    //     });
    // },
    // getCities() {
    //   this.$store
    //     .dispatch("GET_CITY", this.form.auth_officer.mail_add.city)
    //     .then(result => {
    //       this.cities = this.$store.state.places.city;
    //       return this.$store.dispatch("GET_PROVINCE");
    //     })
    //     .then(result => {
    //       // GET CITIES data
    //       this.provinces = this.$store.state.places.provinces;
    //     });
    // }
  },
  computed: {
    filtered_provinces() {
      return this.findProvinces(this.form.auth_officer.mail_add.region);
    },
    filtered_cities() {
      return this.findCities(this.form.auth_officer.mail_add.province);
    },
    id_types() {
      return this.$store.state.references.id_types;
    },
    designations() {
      var datas = this.$store.state.references.designations;
      if (datas) return datas.filter(x => x.type === 0);
      else return [];
    }
  }
};
</script>

<style>
</style>
