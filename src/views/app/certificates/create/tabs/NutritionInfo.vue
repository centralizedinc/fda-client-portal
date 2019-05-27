<template>
  <v-form v-model="form" ref="valid">
    <v-container grid-list-md>
      <v-layout row wrap align-center justify-center>
        <v-flex xs6>
          <v-text-field
            outline
            :rules="[rules.required]"
            label="Serving Size (grams or ml)"
            v-model="value"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            :rules="[rules.required]"
            label="Number of Serving per Container/Pack"
            v-model="value"
          ></v-text-field>
        </v-flex>
        <!-- amt per serving -->
        <v-card flat>
          <v-container grid-list-xs>
            <v-layout row wrap align-center justify-center>
              <v-flex xs6>
                <v-select
                  outline
                  :rules="[rules.required]"
                  hint="Please add all the fields in the list and input corresponding %RENI"
                  persistent-hint
                  label="Amount Per Serving"
                  :items="amtServing"
                  v-model="value"
                  autocomplete
                ></v-select>
              </v-flex>
              <v-flex xs5>
                <v-text-field
                  outline
                  :rules="[rules.required]"
                  name="name"
                  hint="N/A if not applicable"
                  label="%RENI, for Locally Manufactured Products "
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex mb-4>
                <v-tooltip top>
                  <v-btn slot="activator" flat icon color="primary">
                    <v-icon>far fa-plus-square</v-icon>
                  </v-btn>Add New
                </v-tooltip>
              </v-flex>
              <!-- vits -->
              <v-flex xs6>
                <v-select
                  :rules="[rules.required]"
                  outline
                  label="Vitamins"
                  :items="vitamins"
                  v-model="value"
                  hint="Please add all the fields in the list and input corresponding %RENI"
                  persistent-hint
                  autocomplete
                ></v-select>
              </v-flex>
              <v-flex xs5>
                <v-text-field
                  outline
                  :rules="[rules.required]"
                  name="name"
                  hint="N/A if not applicable"
                  label="%RENI, for Locally Manufactured Products "
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex mb-4>
                <v-tooltip top>
                  <v-btn slot="activator" flat icon color="primary">
                    <v-icon>far fa-plus-square</v-icon>
                  </v-btn>Add New
                </v-tooltip>
              </v-flex>
              <!-- minerals -->
              <v-flex xs6>
                <v-select
                  outline
                  :rules="[rules.required]"
                  label="Minerals"
                  hint="Please add all the fields in the list and input corresponding %RENI"
                  persistent-hint
                  :items="minerals"
                  v-model="value"
                  autocomplete
                ></v-select>
              </v-flex>
              <v-flex xs5>
                <v-text-field
                  outline
                  :rules="[rules.required]"
                  name="name"
                  hint="N/A if not applicable"
                  label="%RENI, for Locally Manufactured Products "
                  id="id"
                ></v-text-field>
              </v-flex>
              <v-flex mb-4>
                <v-tooltip top>
                  <v-btn slot="activator" flat icon small color="primary">
                    <v-icon>far fa-plus-square</v-icon>
                  </v-btn>Add New
                </v-tooltip>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: ["form"],
  data: () => ({
    valid: true,
    rules: {
      required: value => !!value || "This field is required"
    },
    amtServing: [
      "Calories (kcal)",
      "Total Fat (g)",
      "Saturated Fat (g)",
      "Trans Fat (g)",
      "Cholesterol (mg)",
      "Sodium (mg)",
      "Total Carbohydrates (g)",
      "Sugar (g)",
      "Dietary Fiber (g)",
      "Total Protein (g)"
    ],
    vitamins: [
      "Vitamin C (mg)",
      "Thiamin (mg)",
      "Riboflavin (mg)",
      "Niacin NE (mg)",
      "Folate DFE (ug)",
      "Vitamin B6 (mg)",
      "Vitamin B12 (ug)",
      "Vitamin A RE (IU)",
      "Vitamin D (IU)",
      "Vitamin E (IU)",
      "Vitamin K (ug)"
    ],
    minerals: [
      " Calcium (mg)",
      "Iron (mg)",
      "Iodine (ug)",
      "Magnesium (mg)",
      "Phosphorus (mg)",
      "Zinc (mg)",
      "Selenium (ug)",
      "Flouride (mg)",
      "Manganese (mg)"
    ]
  })
};
</script>

<style>
</style>
