var {
    AuthorizedOfficerDetails,
    ConfirmDialog,
    DocumentsUpload,
    EstablishmentInfo,
    GeneralInfo,
    OfficeAddress,
    QualifiedPersonnel
} = require("@/views/app/licenses/create/tabs");

var {
    AppHistory,
    AppSummary,
    AppData,
    Files,
    OutputDocs,
    PaymentDetails
} = require("@/views/app/licenses/appoverview/tabs");

export default {
    FormLayout: () => import('@/components/FormLayout'),
    ApplicationOverview: () => import('@/components/ApplicationOverview'),
    ConfirmToReviewApp: ConfirmDialog,
    StepOne: GeneralInfo,
    StepTwo: EstablishmentInfo,
    StepThree: OfficeAddress,
    StepFour: AuthorizedOfficerDetails,
    StepFive: QualifiedPersonnel,
    StepSix: DocumentsUpload,
    StepSeven: () => import('./Account.vue'),
    AppHistory,
    AppSummary,
    AppData,
    UploadedFiles: Files,
    OutputDocs: OutputDocs,
    Payment: PaymentDetails,
    PaymentSummary: () => import('@/views/app/payment/PaymentSummary')
}