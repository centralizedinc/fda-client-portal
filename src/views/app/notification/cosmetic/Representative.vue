<template>
  <v-form>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field outline name="name" label="Name" id="id"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field outline name="name" label="Designation" id="id"></v-text-field>
        </v-flex>
        <!-- Contact Info -->
        <v-flex xs12>
          <v-toolbar
            dark
            class="sheetStyle elevation-10 mt-3 mb-4 subheading"
            color="fdaGreen"
            height="30"
            width="calc(100% - 10px)"
          >Contact Information as listed in License</v-toolbar>
        </v-flex>
        <v-flex xs6>
          <v-text-field outline color="green darken-1" label="1. Email Address"></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            mask="(##)-####-####"
            color="green darken-1"
            label="2. Landline Number"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field outline mask="(##)-####-####" color="green darken-1" label="3. Fax Number"></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
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
  props: ["form"]
};
</script>

<style>
</style>
