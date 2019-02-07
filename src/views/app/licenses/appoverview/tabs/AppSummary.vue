<template>
  <v-layout row wrap>
    <!-- <v-flex xs4 class="subheading">Case Number</v-flex>
    <v-flex xs8>form.case_no}}</v-flex>-->
    <v-flex xs4 class="subheading">App Type</v-flex>
    <v-flex xs8>{{form.application_type}}</v-flex>
    <v-flex xs4 class="subheading">Establishment</v-flex>
    <v-flex xs8>{{form.estab_details.establishment_name}}</v-flex>
    <v-flex xs4 class="subheading">Product Type</v-flex>
    <v-flex xs8>form.general_info.product_type}}</v-flex>
    <v-flex xs4 class="subheading">Primary Activity</v-flex>
    <v-flex xs8>form.general_info.primary_activity}}</v-flex>
    <v-flex xs4 class="subheading">Current Task</v-flex>
    <v-flex xs8>form.current_task}}</v-flex>
    <v-flex xs4 class="subheading">Current User</v-flex>
    <v-flex xs8>form.user}}</v-flex>
    <v-flex xs4 class="subheading">Required Action</v-flex>
    <v-flex xs8>form.action}}</v-flex>
    <v-flex xs4 class="subheading">Created by</v-flex>
    <v-flex xs8>created_by}}</v-flex>
    <v-flex xs4 class="subheading">Created Date</v-flex>
    <v-flex xs8>form.date_created}}</v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["form"],
  data() {
    return {
      form: {
        case_no: "",
        current_task: "",
        user: "",
        action: "",
        created_by: "",
        date_created: "",
        application_type: "",
        general_info: {
          product_type: "",
          primary_activity: "",
          declared_capital: ""
        },
        estab_details: {
          establishment_name: "",
          establishment_owner: "",
          tin: "",
          email: "",
          landline: "",
          fax: "",
          mobile: "",
          products: [
            {
              prod_line: "",
              remarks: ""
            }
          ]
        },
        addresses: {
          office: {
            address: "",
            region: "",
            province: "",
            city: "",
            zipcode: "",
            location: ""
          },
          warehouse: [],
          plant: {
            address: "",
            region: "",
            province: "",
            city: "",
            zipcode: ""
          }
        },
        auth_officer: {
          mail_add: {
            address: "",
            region: "",
            province: "",
            city: "",
            zipcode: ""
          },
          lastname: "",
          firstname: "",
          middlename: "",
          designation: "",
          tin: "",
          birthday: "",
          id_type: "",
          id_no: "",
          id_expiry: ""
        },
        qualified_personnel: []
      }
    };
  }
};
</script>

<style>
</style>
