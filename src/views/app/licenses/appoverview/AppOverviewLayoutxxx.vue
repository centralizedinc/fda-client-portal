<template>
  <div>
    <application-overview :show="showAppView" @close="showAppView=false">
      <!-- <template slot="header-1">Application Summary</template> -->
      <application-summary slot="appsumary"></application-summary>
      <app-data slot="appdata"></app-data>
      <uploaded-files slot="uploadedfiles"></uploaded-files>
      <output-docs slot="outputdocs"></output-docs>
      <app-history slot="apphistory"></app-history>
      <payment-details slot="paymentdetails"></payment-details>
    </application-overview>
  </div>
</template>

<script>
export default {
  components: {
    ApplicationOverview: () => import("@/components/ApplicationOverview"),
    ApplicationSummary: () =>
      import("@/views/app/licenses/appoverview/AppSummary.vue"),
    AppData: () => import("@/views/app/licenses/appoverview/Data.vue"),
    UploadedFiles: () => import("@/views/app/licenses/appoverview/Files.vue"),
    OutputDocs: () => import("@/views/app/licenses/appoverview/OutputDocs.vue"),
    AppHistory: () => import("@/views/app/licenses/appoverview/AppHistory.vue"),
    PaymentDetails: () =>
      import("@/views/app/licenses/appoverview/PaymentDetails.vue")
  },
  data() {
    return {
      showAppView: false,
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
      }
    };
  }
};
</script>