import {
    AppData,
    AppHistory,
    ApplicationOverview,
    AppSummary,
    Files,
    OutputDocs,
    PaymentDetails
} from '../appoverview/tabs'

export default {
    ChangeForm: () =>
        import ('./tabs/ChangeForm.vue'),
    Deletion: () =>
        import ('./tabs/Deletion.vue'),
    ProductLine: () =>
        import ('./tabs/ProductLine.vue'),
    ConfirmToReviewApp: () =>
        import ("../create/tabs/ConfirmDialog.vue"),
    PaymentSummary: () =>
        import ("../../payment/PaymentSummary.vue"),
    QualifiedPersonnel: () =>
        import ('./tabs/QualifiedPersonnel.vue'),
    AppData,
    AppHistory,
    ApplicationOverview,
    AppSummary,
    UploadedFiles: Files,
    OutputDocs,
    Payment: PaymentDetails
}