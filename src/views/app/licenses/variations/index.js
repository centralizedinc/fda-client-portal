import tabs from '../appoverview/tabs';

export default {
    ChangeForm: () =>
        import('./tabs/ChangeForm.vue'),
    Deletion: () =>
        import('./tabs/Deletion.vue'),
    ProductLine: () =>
        import('./tabs/ProductLine.vue'),
    ConfirmToReviewApp: () =>
        import("../create/tabs/ConfirmDialog.vue"),
    PaymentSummary: () =>
        import("../../payment/PaymentSummary.vue"),
    QualifiedPersonnel: () =>
        import('./tabs/QualifiedPersonnel.vue'),
    AppData: tabs.AppData,
    AppHistory: tabs.AppHistory,
    ApplicationOverview: tabs.ApplicationOverview,
    AppSummary: tabs.AppSummary,
    UploadedFiles: tabs.Files,
    OutputDocs: tabs.OutputDocs,
    Payment: tabs.PaymentDetails
}