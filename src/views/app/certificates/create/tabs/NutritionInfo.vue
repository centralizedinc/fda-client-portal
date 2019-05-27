<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6>
        <v-text-field outline label="Serving Size (grams or ml)" v-model="form.nutrition_info.serving_size"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline label="Number of Serving per Container/Pack" v-model="form.nutrition_info.serving_per_pack"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Calories (kcal)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <span>all fields below doesnt have yet vmodel</span>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="Amount per Serving"
          label=" Saturated Fat (g) (kcal)"
          id="id"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Trans Fat (g)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="Amount per Serving"
          label="Cholesterol (mg)"
          id="id"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Sodium (mg)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="Amount per Serving"
          label="Total Carbohydrates (g)"
          id="id"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label=" Sugar (g)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="Amount per Serving"
          label="Dietary Fiber (g)"
          id="id"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="Amount per Serving"
          label="Total Protein (g)"
          id="id"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <!-- vits -->
      <v-toolbar
        dark
        class="sheetStyle elevation-10 mt-3 mb-4 subheading"
        color="fdaGreen"
        height="30"
        width="calc(100% - 10px)"
      >Vitamins</v-toolbar>
      <v-flex xs12>
        <span
          class="body-1 font-weight-thin"
        >Note: Vitamins and Minerals shall be declared as applicable to product claims</span>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Vitamin C (mg)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Thiamin (mg)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Riboflavin (mg)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Niacin NE (mg)	" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Folate DFE (ug)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Vitamin B6 (mg)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="Amount per Serving"
          label="Vitamin B12 (ug)"
          id="id"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="Amount per Serving"
          label="Vitamin A RE (IU)"
          id="id"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Vitamin D (IU)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Vitamin E (IU)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Vitamin K (ug)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>

      <v-toolbar
        dark
        class="sheetStyle elevation-10 mt-3 mb-4 subheading"
        color="fdaGreen"
        height="30"
        width="calc(100% - 10px)"
      >Minerals</v-toolbar>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Calcium (mg)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Iron (mg)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Iodine (ug)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Magnesium (mg)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Phosphorus (mg)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Zinc (mg)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Selenium (ug)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Flouride (mg)" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field outline name="name" hint="Amount per Serving" label="Manganese (mg)	" id="id"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          outline
          name="name"
          hint="% RENI, Mandatory for Locally Manufactured Products, otherwise indicate NOT APPLICABLE"
          label
          id="id"
          v-model="value"
          suffix="%"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["form"]
};
</script>

<style>
</style>
