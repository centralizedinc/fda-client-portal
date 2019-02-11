<template>
  <v-layout row wrap>
    <v-container grid-list-md text-xs-left>
      <v-layout row wrap>
        <v-flex xs4 class="subheading">Task</v-flex>
        <v-flex xs8>{{form.current_task}}</v-flex>
        <v-flex xs4 class="subheading">Date Started</v-flex>
        <v-flex xs8>{{form.date_created}}</v-flex>
        <v-flex xs4 class="subheading">Date Completed</v-flex>
        <v-flex xs8>Date Completed</v-flex>
        <v-flex xs4 class="subheading">Days</v-flex>
        <v-flex xs8>No. of days}</v-flex>
        <v-flex xs4 class="subheading">Assigned User</v-flex>
        <v-flex xs8>Client</v-flex>
        <v-flex xs4 class="subheading">Remarks</v-flex>
        <v-flex xs8>Remarks</v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  props: ["form"]
};
</script>

<style>
</style>
