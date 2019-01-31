<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-toolbar
          color="fdaGold"
          class="subheading"
          style="background: linear-gradient(45deg, #cad0a0 0%, #b5c25a 100%)"
        >Add new ingredient</v-toolbar>
        <v-card-text>
          <v-layout row wrap>
            <v-spacer></v-spacer>
            <v-btn color="success" flat icon medium>
              <v-icon medium>fas fa-plus fa-2x</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["form"]
};
</script>

<style>
</style>
