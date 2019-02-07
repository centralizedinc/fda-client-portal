<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-autocomplete
        color="green darken-1"
        v-model="form.food_appform.product_type"
        :items="types"
        hide-no-data
        hide-selected
        label="Food Product Type"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        color="green darken-1"
        v-model="form.food_appform.category"
        :items="types"
        hide-no-data
        hide-selected
        label="Food Category"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        label="Brand Name"
        v-model="form.food_appform.brand_name"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        label="Product Name"
        v-model="form.food_appform.product_name"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        label="Company Name (as listed in LTO)"
        v-model="form.food_appform.company_name"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        label="Address (as listed in LTO)"
        v-model="form.food_appform.address"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        color="green darken-1"
        v-model="form.food_appform.region"
        :items="types"
        hide-no-data
        hide-selected
        label="Region"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-text-field color="green darken-1" label="LTO Number" v-model="form.food_appform.lto_no"></v-text-field>
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
          slot="activator"
          v-model="date"
          label="LTO Validity"
          prepend-icon="event"
          color="green darken-1"
          readonly
        ></v-text-field>
        <v-date-picker
          v-model="form.food_appform.lto_validity"
          @input="menu2 = false"
          color="green darken-1"
        ></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        color="green darken-1"
        v-model="form.food_appform.no_of_years"
        :items="types"
        hide-no-data
        hide-selected
        label="Number of Years applied for Product Registration"
      ></v-autocomplete>
    </v-flex>
    <!-- Contact Information -->
    <v-card-title primary-title class="headline">Contact Information</v-card-title>
    <v-card-text>
      <span class="error--text">Note: Please indicate "N/A" for Not Applicable</span>
      <v-flex xs12>
        <v-text-field
          color="green darken-1"
          label="1. Email Address"
          v-model="form.food_appform. contact_info.email"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          color="green darken-1"
          label="2. Landline Number"
          v-model="form.food_appform. contact_info.landline"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          color="green darken-1"
          label="3. Fax Number"
          v-model="form.food_appform. contact_info.fax"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          color="green darken-1"
          label="4. Mobile Number"
          v-model="form.food_appform. contact_info.mobile"
        ></v-text-field>
      </v-flex>
    </v-card-text>
  </v-layout>
</template>

<script>
export default {
  props: ["form"]
};
</script>

<style>
</style>
