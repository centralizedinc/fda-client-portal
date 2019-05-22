<template>
  <v-layout row wrap>
    <v-card flat>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap align-center justify-center>
            <v-flex xs4>
              <v-text-field
                outline
                label="Shelf Life Declaration (in Months)"
                hint="For Alcoholic Beverages without Shelf Life, indicate 0 (Zero)"
                v-model="value"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-select outline label="Type" :items="items" v-model="value" autocomplete></v-select>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                outline
                label="Packaging Material Type/Name"
                hint="eg. Glass Bottle; Polyethylene Terephthalate (PET); Polyethylene; Polypropylene; Cellophane; Paper (such as Glassine, Vegetable Parchment); Can coated with Oleoresinous, Phenolic, Epoxy or Vinyl; Polyamide; Aluminum; Blister Pack; etc"
                v-model="value"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                outline
                label="Description of Product in Commercial Presentation"
                hint="eg. Individually Wrapped in Pillow Packs inside Laminated Plastic Pack, In Bottle, In Box, In 90g (2sachets x 45g) carton box"
                v-model="value"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                outline
                label="Storage Condition Requirements	"
                hint="e.g. Product should be stored in a cool and dry place with air humidity of 70% maximum, cool storage is recommended"
                v-model="value"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                outline
                label="Function of the Food material"
                hint="Function of the Food Material applies to Food Additives and Ingredients only. (e.g. preservative, nutrient, emulsifier, bakery ingredient)"
                v-model="value"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                outline
                label="Source of Allergen (If any)"
                hint="eg. Cereal containing gluten; Crustaceans and products of these; Eggs and egg products; Peanuts, soybeans, and products of these; Milk and Milk products (lactose included); Tree nut and nut products; Sulphite in concentrations of 10 mg/kg or more)"
                v-model="value"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                outline
                label="Lot Code and Interpretation"
                hint="e.g. 230115A where 23- day, 01- month, 15- year, and A- 1st batch"
                v-model="value"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field outline label="Open Date Marking/ Expiry Date" v-model="value"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  props: ["form"]
};
</script>

<style>
</style>
