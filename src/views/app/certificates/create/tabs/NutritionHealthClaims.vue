<template>
  <v-form v-model="form" ref="valid">
    <v-container grid-list-md>
      <v-layout row wrap align-center justify-center>
        <v-flex xs6>
          <v-select
            outline
            label="Claims"
            :rules="[rules.required]"
            hint="Please choose if Nutrition or Health Claims"
            :items="items"
            v-model="value"
            autocomplete
          ></v-select>
        </v-flex>
        <v-flex xs5>
          <v-text-field outline name="name" label="Description" id="id"></v-text-field>
        </v-flex>
        <v-flex mb-4>
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
    items: ["Nutrition Claims", "Health Claims"],
    rules: {
      required: value => !!value || "This field is required"
    }
  })
};
</script>

<style>
</style>
