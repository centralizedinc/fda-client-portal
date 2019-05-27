<template>
  <v-form ref="form" v-model="valid">
    <v-container grid-list-md>
      <v-layout row wrap justify-center align-center>
        <v-flex xs6>
          <v-select
            outline
            :rules="[rules.required]"
            label="Physical Specifications"
            hint="e.g. powder, liquid, gel, etc."
            persistent-hint
            :items="physicalSpecs"
            v-model="value"
            autocomplete
          ></v-select>
        </v-flex>
        <v-flex xs5>
          <v-text-field outline :rules="[rules.required]" name="name" label="Specification" id="id"></v-text-field>
        </v-flex>
        <v-flex mb-4>
          <v-tooltip top>
            <v-btn slot="activator" flat icon color="primary">
              <v-icon>far fa-plus-square</v-icon>
            </v-btn>Add New
          </v-tooltip>
        </v-flex>
        <v-toolbar
          dark
          class="sheetStyle elevation-10 mt-3 mb-4 subheading"
          color="fdaGreen"
          height="30"
          width="calc(100% - 10px)"
        >Chemical (e.g. Moisture Content, Water Activity, pH, etc)</v-toolbar>
        <v-flex xs5>
          <v-text-field :rules="[rules.required]" outline label="Parameter" v-model="value"></v-text-field>
        </v-flex>
        <v-flex xs5>
          <v-text-field :rules="[rules.required]" outline label="Specification" v-model="value"></v-text-field>
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
        <v-toolbar
          dark
          class="sheetStyle elevation-10 mt-3 mb-4 subheading"
          color="fdaGreen"
          height="30"
          width="calc(100% - 10px)"
        >Microbiological (e.g. Coliforms)</v-toolbar>
        <v-flex xs5>
          <v-text-field outline :rules="[rules.required]" label="Parameter" v-model="value"></v-text-field>
        </v-flex>
        <v-flex xs5>
          <v-text-field outline :rules="[rules.required]" label="Specification" v-model="value"></v-text-field>
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
  </v-form>
</template>

<script>
export default {
  props: ["form"],
  data: () => ({
    valid: true,
    physicalSpecs: ["Color", "Odor", "Taste", "Texture", "Form"],
    rules: {
      required: value => !!value || "This field is required"
    }
  })
};
</script>

<style>
</style>
