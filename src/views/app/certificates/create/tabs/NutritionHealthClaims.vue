<template>
  <v-container grid-list-md>
    <v-layout row wrap align-center justify-center>
      <v-flex xs6>
        <v-select outline label hint :items="items" v-model="value" autocomplete></v-select>
      </v-flex>
      <v-flex xs2 mb-4 ml-3>
        <v-tooltip top>
          <v-btn slot="activator" flat icon color="primary">
            <v-icon>far fa-plus-square</v-icon>
          </v-btn>Add New
        </v-tooltip>
      </v-flex>
      <v-flex xs12>
        <v-text-field outline name="name" label="Claims" id="id"></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["form"],
  data: () => ({
    items: ["Nutrition Claims", "Health Claims"]
  })
};
</script>

<style>
</style>
