import createTabs from "../../app/licenses/create/tabs";

import overviewTabs from "../../app/licenses/appoverview/tabs";

export default {
    FormLayout: () => import('@/components/FormLayout'),
    ApplicationOverview: () => import('@/components/ApplicationOverview'),
    ConfirmToReviewApp: createTabs.ConfirmDialog,
    StepOne: createTabs.GeneralInfo,
    StepTwo: createTabs.EstablishmentInfo,
    StepThree: createTabs.OfficeAddress,
    StepFour: createTabs.AuthorizedOfficerDetails,
    StepFive: createTabs.QualifiedPersonnel,
    StepSix: createTabs.DocumentsUpload,
    StepSeven: () => import('./Account.vue'),
    AppHistory: overviewTabs.AppHistory,
    AppSummary: overviewTabs.AppSummary,
    AppData: overviewTabs.AppData,
    UploadedFiles: overviewTabs.Files,
    OutputDocs: overviewTabs.OutputDocs,
    Payment: overviewTabs.PaymentDetails,
    PaymentSummary: () => import('@/views/app/payment/PaymentSummary')
}