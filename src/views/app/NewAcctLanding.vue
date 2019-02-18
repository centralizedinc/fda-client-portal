<template>
  <div>
    <v-card>
      <application-overview :form="form" :show="showAppOverview"></application-overview>
      <v-card-actions>
        <v-btn flat block color="error">Close</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import tabs from "@/components/ApplicationOverview";

export default {
  components: tabscomponents,
  data: () => ({
    form: {
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
        email: "",
        tin: "",
        birthday: "",
        id_type: "",
        id_no: "",
        id_expiry: ""
      },
      qualified_personnel: [],
      uploaded_files: [
        {
          purpose: "Proof of Business Name Registration",
          file_name: "",
          file: null
        },
        {
          purpose: "Site Master File",
          file_name: "",
          file: null
        },
        {
          purpose: "Risk Management Plan",
          file_name: "",
          file: null
        },
        {
          purpose: "Licensing Seminar Certificate",
          file_name: "",
          file: null
        },
        {
          purpose: "PRC ID",
          file_name: "",
          file: null
        }
      ]
    },
    showAppOverview: false
  })
};
</script>

<style>
</style>
