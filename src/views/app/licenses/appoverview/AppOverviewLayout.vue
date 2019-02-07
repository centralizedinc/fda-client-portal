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
      showAppView: false
    };
  }
};
</script>