<template>
  <v-layout row wrap>
    <v-dialog
      v-model="finalStep"
      scrollable
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-toolbar
          color="primary"
          style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
        >
          <span class="font-weight-light title">Note</span>
        </v-toolbar>
        <v-card-title primary-title headline class="font-weight-bold">
          <v-flex xs3>
            <span class="headline font-weight-bold">Case Number:</span>
          </v-flex>
          <v-flex xs9>
            <span class="headline font-weight-bold">1425226272</span>
          </v-flex>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-flex xs12>
            <p class="headline">You have successfuly downloaded the Order of Payment.</p>
            <p class="subheading">Note:</p>
            <ol>
              <li>Print the system generated Order of Payment</li>
              <li>Proceed to any Landbank of the Philippines Branch or nearest FDA Action Center and present the Order of Payment</li>
              <li></li>
            </ol>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  }
};
</script>

<style>
</style>
