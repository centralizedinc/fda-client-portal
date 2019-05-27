<template>
  <v-form v-model="valid" ref="form">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs6>
          <v-autocomplete
            outline
            :rules="[rules.required]"
            required
            color="green darken-1"
            hide-no-data
            hide-selected
            label="Food Product Type"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs6>
          <v-autocomplete
            outline
            :rules="[rules.required]"
            required
            color="green darken-1"
            hide-no-data
            hide-selected
            label="Food Category"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            :rules="[rules.required]"
            required
            color="green darken-1"
            label="Brand Name"
            v-model="form.food_product.brand_name"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            :rules="[rules.required]"
            required
            color="green darken-1"
            label="Product Name"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            outline
            :rules="[rules.required]"
            required
            color="green darken-1"
            label="Company Name (as listed in LTO)"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            :rules="[rules.required]"
            required
            color="green darken-1"
            label="Address (as listed in LTO)"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-autocomplete
            outline
            :rules="[rules.required]"
            required
            color="green darken-1"
            hide-no-data
            hide-selected
            label="Region"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs4>
          <v-text-field
            outline
            :rules="[rules.required]"
            required
            color="green darken-1"
            label="LTO Number"
          ></v-text-field>
        </v-flex>
        <v-flex xs4>
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
              outline
              color="green darken-1"
              slot="activator"
              :rules="[rules.required]"
              label="LTO Validity"
              append-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker color="green darken-1" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="secondary" outline @click="menu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(form.auth_officer.id_expiry)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs4>
          <v-autocomplete
            outline
            :rules="[rules.required]"
            required
            color="green darken-1"
            hide-no-data
            hide-selected
            label="Number of Years applied for Product Registration"
          ></v-autocomplete>
        </v-flex>
        <!-- Contact Information -->
        <v-toolbar
          dark
          class="sheetStyle elevation-10 mt-3 mb-4 subheading"
          color="fdaGreen"
          height="30"
          width="calc(100% - 10px)"
        >Contact Information</v-toolbar>

        <v-flex xs6>
          <v-text-field
            outline
            :rules="emailRules"
            required
            color="green darken-1"
            label="1. Email Address"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            :rules="[rules.required]"
            required
            mask="(##)-####-####"
            color="green darken-1"
            label="2. Landline Number"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            :rules="[rules.required]"
            required
            mask="(##)-####-####"
            color="green darken-1"
            label="3. Fax Number"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            :rules="[rules.required]"
            required
            mask="(####)-###-####"
            color="green darken-1"
            label="4. Mobile Number"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: ["form"],
  data: () => ({
    menu: null,
    valid: true,
    rules: {
      required: value => !!value || "This field is required"
    },
    emailRules: [
      v => !!v || "E-mail is required",
      v =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid"
    ]
  }),
  methods: {
    validate() {
      this.$refs.vform.validate();
      return this.VALID;
    }
  }
};
</script>

<style>
</style>
