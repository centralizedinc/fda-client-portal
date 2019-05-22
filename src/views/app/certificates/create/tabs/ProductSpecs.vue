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
              <v-text-field outline label="Color" v-model="value"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field outline label="Odor" v-model="value"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field outline label="Taste" v-model="value"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field outline label="Texture" v-model="value"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                outline
                label="Form"
                v-model="value"
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
    <v-card-text>
      <v-container grid-list-md>
        <v-layout row wrap align-center justify-center>
          <v-flex xs5>
            <v-text-field outline label="Parameter" v-model="value"></v-text-field>
          </v-flex>
          <v-flex xs5>
            <v-text-field outline label="Specification" v-model="value"></v-text-field>
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
    <v-card-text>
      <v-container grid-list-md>
        <v-layout row wrap align-center justify-center>
          <v-flex xs5>
            <v-text-field outline label="Parameter" v-model="value"></v-text-field>
          </v-flex>
          <v-flex xs5>
            <v-text-field outline label="Specification" v-model="value"></v-text-field>
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
