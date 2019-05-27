<template>
  <v-form ref="form" v-model="valid">
    <v-layout row wrap>
      <v-card flat>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap align-center justify-center>
              <v-flex xs8 ml-5>
                <v-text-field outline :rules="[rules.required]" label="Ingredient Name"></v-text-field>
              </v-flex>
              <v-flex xs2 mb-4 ml-3>
                <v-tooltip top>
                  <v-btn slot="activator" flat icon color="primary">
                    <v-icon>far fa-plus-square</v-icon>
                  </v-btn>Add New
                </v-tooltip>
              </v-flex>
            </v-layout>
          </v-container>
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
        </v-card-text>
      </v-card>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  props: ["form"],
  data: () => ({
    valid: true,
    rules: {
      required: value => !!value || "This field is required"
    }
  })
};
</script>

<style>
</style>
