<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-progress-linear color="primary" background-color="primary"></v-progress-linear>
      <!-- stepper -->
      <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1">
          Product Particulars
          <small>Fill out all necessary information</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card flat class="mb-5">
            <stepOne></stepOne>
          </v-card>
          <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2">
          Establishment Information
          <small>Local Company Responsible for Placing the Product in the Market</small>
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-card flat class="mb-5">
            <stepTwo></stepTwo>
          </v-card>
          <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step step="3">Person Representing the Local Company</v-stepper-step>
        <v-stepper-content step="3">
          <v-card flat class="mb-5">
            <stepThree></stepThree>
          </v-card>
          <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step step="4">Product Ingredient List</v-stepper-step>
        <v-stepper-content step="4">
          <v-card flat class="mb-5">
            <stepFour></stepFour>
          </v-card>
          <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-layout>
  </v-container>
</template>

<script>
import ProductParticulars from "./cosmetic/ProductParticulars";
import EstablishmentInfo from "./cosmetic/EstablishmentInfo";
import Representative from "./cosmetic/Representative";
import ProductIngredients from "./cosmetic/ProdIngredient";

export default {
  components: {
    stepOne: () => ({
      component: import("./cosmetic/ProductParticulars")
    }),
    stepTwo: () => ({
      component: import("./cosmetic/EstablishmentInfo")
    }),
    stepThree: () => ({
      component: import("./cosmetic/Representative")
    }),
    stepFour: () => ({
      component: import("./cosmetic/ProdIngredient")
    })
  },
  data: () => ({
    e6: 1
  })
};
</script>

<style>
</style>
