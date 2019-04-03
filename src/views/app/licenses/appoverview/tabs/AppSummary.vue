<template>

  <v-layout row wrap>
    <v-flex xs12 md4 class="subheading" v-if="show">Case Number</v-flex>
    <v-flex xs12 md8 v-if="show">{{form.case_no}}</v-flex>
    <v-flex xs12 md4 class="subheading">Application Type</v-flex>
    <v-flex xs12 md8>{{getAppType(form.application_type)}}</v-flex>
    <v-flex xs12 md4 class="subheading">Name of Establishment</v-flex>
    <v-flex xs12 md8>{{form.estab_details.establishment_name}}</v-flex>
    <v-flex xs12 md4 class="subheading">Establishment Owner</v-flex>
    <v-flex xs12 md8>{{form.estab_details.establishment_owner}}</v-flex>
    <v-flex xs12 md4 class="subheading">Product Type</v-flex>
    <v-flex xs12 md8>{{getProduct(form.general_info.product_type)}}</v-flex>
    <v-flex xs12 md4 class="subheading">Primary Activity</v-flex>
    <v-flex xs12 md8>{{getPrimary(form.general_info.primary_activity)}}</v-flex>
    <v-flex xs12 md4 class="subheading">Declared Capital</v-flex>
    <v-flex xs12 md8>{{getDeclared(form.general_info.declared_capital)}}</v-flex>
    <v-flex xs12 md4 class="subheading" v-if="show" >Current Task</v-flex>
    <v-flex xs12 md8 v-if="show">{{getTask(case_holder.current_task).name}}</v-flex>
    <!-- <v-flex xs12 md4 class="subheading">Current User</v-flex>
    <v-flex xs12 md8>{{getAdminName(form.user)}}</v-flex> -->
    <!-- <v-flex xs12 md4 class="subheading">Required Action</v-flex>
    <v-flex xs12 md8>{{form.action}}</v-flex> -->
    <!-- <v-flex xs12 md4 class="subheading" v-if="show">Created by</v-flex>
    <v-flex xs12 md8 v-if="show">{{getUsername(form.created_by)}}</v-flex> -->
    <v-flex xs12 md4 class="subheading" v-if="show">Date Submitted</v-flex>
    <v-flex xs12 md8 v-if="show">{{formatDate(form.date_created)}}</v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["form", "case_holder"],
  data(){
    return{
      show: false
    }
  },
  watch: {
    case_holder() {
      console.log("caseholder")
      this.show = true
    }
  }
};
</script>

<style>
</style>
