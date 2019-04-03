<template>
  <v-layout row wrap>
    <v-layout row wrap>
      <v-flex xs12 md4 class="subheading">Current Task</v-flex>
      <v-flex xs12 md8>{{getTask(case_holder.current_task).name}}</v-flex>
      <v-flex xs12 md4 class="subheading">Date Submitted</v-flex>
      <v-flex xs12 md8>{{formatDate(case_holder.date_created)}}</v-flex>
      <!-- <v-flex xs12 md4 class="subheading">Created By</v-flex>
      <v-flex xs12 md8>{{getUsername(form.created_by)}}</v-flex> -->
      <!-- <v-flex xs12 md4 class="subheading">Days</v-flex>
      <v-flex xs12 md8>{No. of days}}</v-flex> -->
      <!-- <v-flex xs12 md4 class="subheading">Assigned User</v-flex>
      <v-flex xs12 md8>{{form.user}}</v-flex> -->
      <!-- <v-flex xs12 md4 class="subheading">Remarks</v-flex>
      <v-flex xs12 md8>Remarks</v-flex> -->
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  props: ["form", "case_holder"]
};
</script>

<style>
</style>
