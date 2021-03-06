export default {
    ApplicationOverview: () => import('@/components/ApplicationOverview.vue'),
    AppHistory: () => import('./AppHistory.vue'),
    AppSummary: () => import('./AppSummary.vue'),
    AppData: () => import('./Data.vue'),
    Files: () => import('./Files.vue'),
    OutputDocs: () => import('./OutputDocs.vue'),
    PaymentDetails: () => import('./PaymentDetails.vue')
}