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
        color="primary"
        style="background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%); box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5)"
      >
        <span class="font-weight-light title">Note</span>
      </v-toolbar>
      <!-- <v-card-title primary-title class="headline">Note:</v-card-title> -->
      <v-card-text>
        Before you proceed on to the next step, kindly
        <a href="#">review</a> your application and make sure you have entered all values correctly. Once you clicked Next, you won't be able to modify any of the data you have entered.
        <div></div>
        <v-spacer></v-spacer>
        <v-btn block color="primary">Review your Application</v-btn>
        <v-spacer></v-spacer>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="error" @click="$emit('close')">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
