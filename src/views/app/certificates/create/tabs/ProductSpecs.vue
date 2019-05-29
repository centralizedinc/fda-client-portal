<template>
  <v-form ref="form" v-model="valid">
    <v-container grid-list-md>
      <v-layout row wrap justify-center align-center>
        <v-flex xs6>
          <v-autocomplete
            outline
            :rules="[rules.required]"
            label="Physical Parameters"
            hint="e.g. powder, liquid, gel, etc."
            persistent-hint
            :items="physicalSpecs"
            autocomplete
          ></v-autocomplete>
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
        <v-divider></v-divider>
        <v-toolbar dark flat color="primary" class="elevation-5">
          <span class="title font-weight-light">Parameter & Specs</span>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <v-btn slot="activator" outline small icon>
              <v-icon>edit</v-icon>
            </v-btn>Add New Parameter & Specification
          </v-tooltip>
        </v-toolbar>
        <v-flex xs12>
          <v-data-table
            :headers="headers"
            :items="ingredients_list"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <tr @click="viewItem(props.item, props.index)">
                <td>{{props.item.name}}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
        <v-dialog
          v-model="dialogSpecs"
          scrollable
          persistent
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar dark color="primary">
              <span class="title font-weight-light">New Ingredient</span>
              <v-spacer></v-spacer>
              <v-btn flat icon @click="dialogSpecs=false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid">
                <v-layout row wrap>
                  <v-flex xs12>vtext</v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
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
