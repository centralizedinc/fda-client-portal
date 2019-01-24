<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        label="Name of Establishment"
        v-model="form.estab_details.establishment_name"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        label="Establishment Owner"
        v-model="form.estab_details.establishment_owner"
      ></v-text-field>
      <ul>
        <li
          class="text-danger"
        >For single proprietorship reflect the name of the person indicated in the DTI registration certificate.</li>
        <li
          class="text-danger"
        >For corporation/partnership/cooperative reflect the name of the corporation/partnership/cooperative as indicated in the SEC/CDA registration</li>
        <li
          class="text-danger"
        >For government owned or controlled corporation reflect the name of the agency as indicated in the charter.</li>
      </ul>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        label="TIN Number"
        :mask="tin"
        v-model="form.estab_details.tin"
      ></v-text-field>
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
