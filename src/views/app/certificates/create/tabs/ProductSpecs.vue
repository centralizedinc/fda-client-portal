<template>
  <v-layout row wrap>
    <v-toolbar
      dark
      class="sheetStyle elevation-10 mt-3 mb-4 subheading"
      color="fdaGreen"
      height="30"
      width="calc(100% - 10px)"
    >Physical</v-toolbar>
    <v-card flat>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap align-center justify-center>
            <v-flex xs4>
              <v-text-field outline label="Color" v-model="form.product_specification.physical.color"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field outline label="Odor" v-model="form.product_specification.physical.odor"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field outline label="Taste" v-model="form.product_specification.physical.taste"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field outline label="Texture" v-model="form.product_specification.physical.texture"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                outline
                label="Form"
                v-model="form.product_specification.physical.form"
                hint="e.g. powder, liquid, gel, etc."
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <v-toolbar
      dark
      class="sheetStyle elevation-10 mt-3 mb-4 subheading"
      color="fdaGreen"
      height="30"
      width="calc(100% - 10px)"
    >Chemical (e.g. Moisture Content, Water Activity, pH, etc)</v-toolbar>
    <span>add delete not yet working</span>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout row wrap align-center justify-center>
          <v-flex xs5>
            <v-text-field outline label="Parameter" v-model="form.product_specification.chemical.parameter"></v-text-field>
          </v-flex>
          <v-flex xs5>
            <v-text-field outline label="Specification" v-model="form.product_specification.chemical.specification"></v-text-field>
          </v-flex>
          <v-flex xs1 mb-4>
            <v-tooltip top>
              <v-btn slot="activator" flat icon color="primary">
                <v-icon>far fa-minus-square</v-icon>
              </v-btn>Delete
            </v-tooltip>
          </v-flex>
          <v-flex xs1 mb-4>
            <v-tooltip top>
              <v-btn slot="activator" flat icon color="primary">
                <v-icon>far fa-plus-square</v-icon>
              </v-btn>Add New
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-toolbar
      dark
      class="sheetStyle elevation-10 mt-3 mb-4 subheading"
      color="fdaGreen"
      height="30"
      width="calc(100% - 10px)"
    >Microbiological (e.g. Coliforms)</v-toolbar>
    <span>add delete not yet working</span>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout row wrap align-center justify-center>
          <v-flex xs5>
            <v-text-field outline label="Parameter" v-model="form.product_specification.microbiological.parameter"></v-text-field>
          </v-flex>
          <v-flex xs5>
            <v-text-field outline label="Specification" v-model="form.product_specification.microbiological.parameter"></v-text-field>
          </v-flex>
          <v-flex xs1 mb-4>
            <v-tooltip top>
              <v-btn slot="activator" flat icon color="primary">
                <v-icon>far fa-minus-square</v-icon>
              </v-btn>Delete
            </v-tooltip>
          </v-flex>
          <v-flex xs1 mb-4>
            <v-tooltip top>
              <v-btn slot="activator" flat icon color="primary">
                <v-icon>far fa-plus-square</v-icon>
              </v-btn>Add New
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
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
