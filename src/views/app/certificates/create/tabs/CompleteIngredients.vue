<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-spacer></v-spacer>
      <v-btn color="success">Add new ingredient</v-btn>
      <v-spacer></v-spacer>
    </v-flex>
    <v-flex xs1>
      <v-text-field
        color="green darken-1"
        label="Brand Name"
        v-model="form.food_appform.brand_name"
      ></v-text-field>
    </v-flex>
    <v-flex xs9 pl-2>
      <v-text-field
        color="green darken-1"
        label="Product Name"
        v-model="form.food_appform.product_name"
      ></v-text-field>
    </v-flex>
    <v-flex xs2>
      <v-btn color="success">text</v-btn>
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
        label="Number of Yeras applied for Product Registration"
      ></v-autocomplete>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["form"]
};
</script>

<style>
</style>
