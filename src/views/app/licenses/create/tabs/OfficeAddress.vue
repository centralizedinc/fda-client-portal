<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-text-field color="green darken-1" label="Address" v-model="form.addresses.office.address"></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        color="green darken-1"
        v-model="form.addresses.office.region"
        :items="region"
        hide-no-data
        hide-selected
        label="Region"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        color="green darken-1"
        v-model="form.addresses.office.province"
        :items="province"
        hide-no-data
        hide-selected
        label="Province"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        color="green darken-1"
        v-model="form.addresses.office.city"
        :items="city"
        hide-no-data
        hide-selected
        label="City / Town"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        color="green darken-1"
        v-model="form.addresses.office.zipcode"
        :items="zip"
        hide-no-data
        hide-selected
        label="Zip Code"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12 mt-3>
      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>
      <!-- Warehouse list -->
      <v-card-title primary-title class="headline">Warehouse LIst
        <v-tooltip top>
          <v-btn slot="activator" fab medium small color="fdaGreen">
            <v-icon medium color="fdaSilver">add</v-icon>
          </v-btn>Add Warehouse to List
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <v-layout row wrap></v-layout>
      </v-card-text>
      <div></div>
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
