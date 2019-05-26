<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6>
        <v-autocomplete
          outline
          color="green darken-1"
          v-model="value"
          :items="types"
          hide-no-data
          hide-selected
          label="Food Product Type"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs6>
        <v-autocomplete
          outline
          color="green darken-1"
          v-model="value"
          :items="types"
          hide-no-data
          hide-selected
          label="Food Category"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          color="green darken-1"
          label="Brand Name"
          v-model="form.food_product.brand_name"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline color="green darken-1" label="Product Name" v-model="value"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          outline
          color="green darken-1"
          label="Company Name (as listed in LTO)"
          v-model="value"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          color="green darken-1"
          label="Address (as listed in LTO)"
          v-model="value"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-autocomplete
          outline
          color="green darken-1"
          v-model="value"
          :items="types"
          hide-no-data
          hide-selected
          label="Region"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs4>
        <v-text-field outline color="green darken-1" label="LTO Number" v-model="value"></v-text-field>
      </v-flex>
      <v-flex xs4>
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
            outline
            slot="activator"
            v-model="date"
            label="LTO Validity"
            prepend-inner-icon="event"
            color="green darken-1"
            readonly
          ></v-text-field>
          <v-date-picker v-model="value" @input="menu2 = false" color="green darken-1"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs4>
        <v-autocomplete
          outline
          color="green darken-1"
          v-model="value"
          :items="types"
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
        <v-text-field outline color="green darken-1" label="1. Email Address" v-model="value"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline color="green darken-1" label="2. Landline Number" v-model="value"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline color="green darken-1" label="3. Fax Number" v-model="value"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline color="green darken-1" label="4. Mobile Number" v-model="value"></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["form"]
};
</script>

<style>
</style>
