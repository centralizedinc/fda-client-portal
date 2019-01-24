<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-autocomplete
        v-model="form.general_info.product_type"
        :items="types"
        hide-no-data
        hide-selected
        item-text="name"
        color="green darken-1"
        item-value="_id"
        label="Product Type"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        v-model="form.general_info.primary_activity"
        :items="activity"
        hide-no-data
        color="green darken-1"
        hide-selected
        label="Primary Activity"
        type="text"
        item-text="name"
        item-value="_id"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        multiple
        chips
        v-model="form.general_info.addtl_activity"
        :items="addtl"
        hide-no-data
        color="green darken-1"
        hide-selected
        label="Additional Activity"
        type="text"
        item-text="name"
        item-value="_id"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        v-model="form.general_info.primary_capital"
        :items="capital"
        hide-no-data
        color="green darken-1"
        hide-selected
        label="Declared Capital"
        type="text"
        item-text="name"
        item-value="_id"
        :disabled="form.application_type==='R'"
        v-if="form.general_info.primary_activity&&form.general_info.primary_activity!==''&&capital.length!==0"
      ></v-autocomplete>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["form"],
  
};
</script>

<style>
</style>
