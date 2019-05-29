<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-toolbar dark flat color="primary" class="elevation-5">
        <span class="title font-weight-light">Ingredients</span>
        <v-spacer></v-spacer>
        <v-tooltip top>
          <v-btn slot="activator" outline small icon @click="addIngredients">
            <v-icon>edit</v-icon>
          </v-btn>Add Ingredients
        </v-tooltip>
      </v-toolbar>
      <v-flex xs12>
        <v-data-table :headers="headers" :items="ingredients_list" hide-actions class="elevation-1">
          <template slot="items" slot-scope="props">
            <tr @click="viewItem(props.item, props.index)">
              <td>{{props.item.name}}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
      <v-dialog
        v-model="dialogIngredients"
        scrollable
        persistent
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <span class="title font-weight-light">New Ingredient</span>
            <v-spacer></v-spacer>
            <v-btn flat icon @click="dialogIngredients=false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field outline name="name" label="Ingredient Name"></v-text-field>
                </v-flex>
                <v-divider></v-divider>
                <br>
                <span
                  class="caption font-weight-light"
                >In descending order of proportion. Product formulation must be consistent with the Ingredient List on the label. Declaration of Food additives should specify its common name not the functional name only and indicate levels eg. LECITHIN (EMULSIFIER) 0.1%.</span>
                <br>
                <br>
                <span class="caption font-weight-light pa-1">
                  For multi-component ingredients declaration:
                  <ul>
                    <li>Non Dairy Creamer (as follows)</li>
                    <li>Glucose Syrup</li>
                    <li>Hydrogenated Vegetable Fat</li>
                  </ul>
                </span>
                <br>
                <span class="caption font-weight-light pa-1">
                  For food supplement, ingredients declaration should be in the following format:
                  <br>
                  <span
                    class="caption font-weight-light pa-1"
                  >Specific Name of Ingredient Amount per Serving</span>
                  <ul>
                    <li>Example: Zeaxanthin 1 mg</li>
                  </ul>
                </span>
                <br>
                <span class="caption font-weight-light pa-1">
                  For Vitamins and minerals as Food Supplement, ingredients declaration should be in the following format:
                  <br>
                  <span
                    class="caption font-weight-light pa-1"
                  >Specific Name (Form/ Chemical nature of Vitamin or Mineral) Amount per Serving</span>
                  <ul>
                    <li>Example: Vitamin A (Beta-carotene) 300 µgRE</li>
                  </ul>
                </span>
                <br>
                <span class="caption font-weight-light pa-1">
                  For Amino acids as Food Supplement, ingredients declaration should be in the following format:
                  <br>
                  <span class="caption font-weight-light pa-1">Specific Name Amount per Serving</span>
                  <ul>
                    <li>Example: Leucine 50 mg</li>
                  </ul>
                </span>
                <br>
                <span class="caption font-weight-light pa-1">
                  For Herbs and Botanicals as Food Supplement, ingredients declaration should be in the following format:
                  <br>
                  <span
                    class="caption font-weight-light pa-1"
                  >Specific Name (Scientific name) Plant Part Used Amount per Serving</span>
                  <ul>
                    <li>Example: Guyabano (Annona muricata) Fruit 100 mg</li>
                  </ul>
                </span>
                <br>
                <span class="caption font-weight-light pa-1">
                  For Products with Nutritional Substances (plant or animal origin) as Food Supplement, ingredients declaration should be in the following format:
                  <br>
                  <span
                    class="caption font-weight-light pa-1"
                  >Specific name Plant or animal source Amount per Serving</span>
                  <ul>
                    <li>Examples: Collagen from Fish 500mg</li>
                    <li>Allicin from Garlic 100mg</li>
                  </ul>
                </span>
              </v-layout>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions v-if="add">
            <v-spacer></v-spacer>
            <v-btn outline color="primary" @click="dialogIngredients=false">Cancel</v-btn>
            <v-btn color="primary">Add</v-btn>
          </v-card-actions>
          <v-card-actions v-else>
            <v-spacer></v-spacer>
            <v-btn outline color="error">Delete</v-btn>
            <v-btn color="primary">Edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["form"],
  data: () => ({
    dialogIngredients: false,
    add: true,
    index: null,
    valid: true,
    ingredients_list: [],
    headers: [
      {
        text: "Name of Ingredients",
        value: "type"
      }
    ]
  }),
  methods: {
    addIngredients() {
      this.add = true;
      this.dialogIngredients = true;
    }
  }
};
</script>

<style>
</style>
