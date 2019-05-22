<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-autocomplete
        color="green darken-1"
        v-model="name"
        :items="types"
        hide-no-data
        hide-selected
        label="Food Product Type"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        color="green darken-1"
        v-model="name"
        :items="types"
        hide-no-data
        hide-selected
        label="Food Category"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-text-field color="green darken-1" label="Brand Name" v-model="name"></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field color="green darken-1" label="Product Name" v-model="name"></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field color="green darken-1" label="Company Name (as listed in LTO)" v-model="name"></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field color="green darken-1" label="Address (as listed in LTO)" v-model="name"></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        color="green darken-1"
        v-model="name"
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
        <v-date-picker v-model="name" @input="menu2 = false" color="green darken-1"></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        color="green darken-1"
        v-model="name"
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
        <v-text-field color="green darken-1" label="1. Email Address" v-model="name"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field color="green darken-1" label="2. Landline Number" v-model="name"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field color="green darken-1" label="3. Fax Number" v-model="name"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field color="green darken-1" label="4. Mobile Number" v-model="name"></v-text-field>
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
