<template>
  <v-layout row wrap>
    <v-flex
      xs12
      class="headline mt-2 mb-4 pt-3 font-weight-thin"
      style="padding: 2px"
    >Application Information</v-flex>
    <v-flex xs4 class="subheading">Product Type</v-flex>
    <v-flex xs8>{{form.general_info.product_type}}</v-flex>
    <v-flex xs4 class="subheading">Primary Activity</v-flex>
    <v-flex xs8>{{form.general_info.primary_activity}}</v-flex>
    <v-flex xs4 class="subheading">Declared Capital</v-flex>
    <v-flex xs8>{{form.general_info.primary_capital}}</v-flex>
    <!-- Establishment Info -->
    <v-flex
      xs12
      class="headline mt-2 mb-4 pt-3 font-weight-thin"
      style="padding: 2px"
    >Establishment Information</v-flex>
    <v-flex xs4 class="subheading">Name of Establishment</v-flex>
    <v-flex xs8>{{form.estab_details.establishment_name}}</v-flex>
    <v-flex xs4 class="subheading">Establishment Owner</v-flex>
    <v-flex xs8>{{form.estab_details.establishment_owner}}</v-flex>
    <v-flex xs4 class="subheading">TIN</v-flex>
    <v-flex xs8>{{form.estab_details.tin}}</v-flex>
    <v-flex xs4 class="subheading">Contact Information</v-flex>
    <v-flex xs8>Email: {{form.estab_details.email}}</v-flex>
    <v-flex xs4></v-flex>
    <v-flex xs8>Landline: {{form.estab_details.landline}}</v-flex>
    <v-flex xs4></v-flex>
    <v-flex xs8>Fax: {{form.estab_details.fax}}</v-flex>
    <v-flex xs4></v-flex>
    <v-flex xs8>Mobile: {{form.estab_details.mobile}}</v-flex>
    <!-- Product Line -->
    <v-flex xs12 class="headline mt-2 mb-4 pt-3 font-weight-thin" style="padding: 2px">Product Line</v-flex>
    <v-container
      grid-list-md
      text-xs-left
      v-for="(item, index) in form.estab_details.products"
      :key="index"
    >
      <v-layout row wrap>
        <v-flex xs8 class="subheading">{{item.prod_line}}</v-flex>
        <v-flex xs4>{{item.remarks}}</v-flex>
      </v-layout>
    </v-container>
    <!-- Office Address -->
    <v-flex
      xs12
      class="headline mt-2 mb-4 pt-3 font-weight-thin"
      style="padding: 2px"
    >Office Address</v-flex>
    <v-container grid-list-md text-xs-left>
      <v-layout row wrap>
        <v-flex xs4 class="subheading">Mailing Address</v-flex>
        <v-flex
          xs8
        >{{form.addresses.office.address + " " + form.addresses.office.region + " " + form.addresses.office.province + " " + form.addresses.office.city + " " + form.addresses.office.zipcode}}</v-flex>
      </v-layout>
    </v-container>
    <!-- Authorized Officer -->
    <v-flex
      xs12
      class="headline mt-2 mb-4 pt-3 font-weight-thin"
      style="padding: 2px"
    >Authorized Officer</v-flex>
    <v-container grid-list-md text-xs-left>
      <v-layout row wrap>
        <v-flex xs4 class="subheading">Name</v-flex>
        <v-flex
          xs8
        >{{form.auth_officer.lastname + ", " + form.auth_officer.firstname + " " + form.auth_officer.middlename }}</v-flex>
        <v-flex xs4 class="subheading">Designation</v-flex>
        <v-flex xs8>{{form.auth_officer.designation}}</v-flex>
        <v-flex xs4 class="subheading">TIN</v-flex>
        <v-flex xs8>{{form.auth_officer.tin}}</v-flex>
        <v-flex xs4 class="subheading">Birthday</v-flex>
        <v-flex xs8>{{form.auth_officer.birthday}}</v-flex>
        <v-flex xs4 class="subheading">Government ID</v-flex>
        <v-flex xs8>{{form.auth_officer.id_type}}</v-flex>
        <v-flex xs4 class="subheading">ID Number</v-flex>
        <v-flex xs8>{{form.auth_officer.id_no}}</v-flex>
        <v-flex xs4 class="subheading">Address</v-flex>
        <v-flex
          xs8
        >{{form.auth_officer.mail_add.address + " " + form.auth_officer.mail_add.region + " " + form.auth_officer.mail_add.province + " " + form.auth_officer.mail_add.city + " " + form.auth_officer.mail_add.zipcode}}</v-flex>
      </v-layout>
    </v-container>
    <!-- Qualified Personnel -->
    <v-flex
      xs12
      class="headline mt-2 mb-4 pt-3 font-weight-thin"
      style="padding: 2px"
    >Qualified Personnel</v-flex>
    <v-container grid-list-md text-xs-left>
      <v-layout row wrap>
        <v-flex xs4 class="subheading">Name</v-flex>
        <v-flex
          xs8
        >{{form.qualified_personnel.lastname + ", " + form.qualified_personnel.firstname + " " + form.qualified_personnel.middlename}}</v-flex>
        <v-flex xs4 class="subheading">Designation</v-flex>
        <v-flex xs8>{{form.qualified_personnel.designation}}</v-flex>

        <v-flex xs4 class="subheading">Birthday</v-flex>
        <v-flex xs8>{{form.qualified_personnel.birthday}}</v-flex>
        <v-flex xs4 class="subheading">TIN</v-flex>
        <v-flex xs8>{{form.qualified_personnel.tin}}</v-flex>
        <v-flex xs4 class="subheading">Government ID</v-flex>
        <v-flex xs8>{{form.qualified_personnel.id_type + " " + form.qualified_personnel.id_no}}</v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      form: {
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
