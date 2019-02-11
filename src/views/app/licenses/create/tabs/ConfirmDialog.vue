<template>
  <v-dialog
    v-model="show"
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <v-toolbar
        color="fdaGreen"
        style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
      >
        <span class="font-weight-light title">Note</span>
      </v-toolbar>
      <!-- <v-card-title primary-title class="headline">Note:</v-card-title> -->
      <v-card-text>
        Before you proceed on to the next step, kindly review your application and make sure you have entered all values correctly. Once you clicked Submit, you won't be able to modify any of the data you have entered.
        <div></div>
        <v-spacer></v-spacer>
        <v-btn block color="success" @click="$emit('overview')">Review your Application</v-btn>
        <v-spacer></v-spacer>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn flat color="error" @click="$emit('close')">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn flat color="success" @click="$emit('submit')">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ApplicationOverview from "@/components/ApplicationOverview";

export default {
  components: {
    ApplicationOverview: () => import("@/components/ApplicationOverview")
  },
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
