<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-progress-linear color="primary" background-color="primary"></v-progress-linear>
      <!-- stepper -->
      <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1" editable>
          Product Particulars
          <small>Fill out all necessary information</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card flat class="mb-5">
            <stepOne :form="toy_certificate" :exempt="exempt" :sku_total="sku_total" @next="next"></stepOne>
          </v-card>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2" editable>
          Establishment Information
          <small>Local Company Responsible for Placing the Product in the Market</small>
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-card flat class="mb-5">
            <stepTwo :form="toy_certificate" @next="next"></stepTwo>
          </v-card>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3" editable>Person Representing the Local Company</v-stepper-step>
        <v-stepper-content step="3">
          <v-card flat class="mb-5">
            <stepThree :form="toy_certificate" @next="next"></stepThree>
          </v-card>
        </v-stepper-content>

        <v-stepper-step step="4" editable>
          Document Upload
          <small>Please upload documents to determine conformance to the standard/s of product identity. For food supplement (if applicable), please upload safety data (e.g. LD50 toxicity tests). For the list of standards or issuances (e.g. PNS, Codex standards, FDA Issuances, local or international standards) please refer to the CFRR Product Registration Manual of Procedure/ Handbook.</small>
        </v-stepper-step>
        <v-stepper-content step="4">
          <v-card flat class="mb-5">
            <stepFour :form="toy_certificate"></stepFour>
          </v-card>
          <v-btn color="primary" @click="save">Continue</v-btn>
          <v-btn flat @click="cancel">Cancel</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-layout>
  </v-container>
</template>

<script>
import ParticularProduct from "./toys/ParticularProduct";
import LocalCompany from "./toys/LocalCompany";
import PersonRepresentatvive from "./toys/PersonRepresentatvive";
import UploadDocument from "./toys/UploadDocument";

export default {
  components: {
    stepOne: () => ({
      component: import("./toys/ParticularProduct")
    }),
    stepTwo: () => ({
      component: import("./toys/LocalCompany")
    }),
    stepThree: () => ({
      component: import("./toys/PersonRepresentatvive")
    }),
    stepFour: () => ({
      component: import("./toys/UploadDocument")
    })
  },
  data: () => ({
    e6: 1,
    loading: false,
    particular_product: [],
    product_details: [],
    establishment_info: [],
    company_representative: [],
    exempt: [],
    sku_total: 0,
    toy_certificate: {
      particular_product: {
        brand_name: "",
        product_details: [
          // {
          //   item: "",
          //   model: "",
          //   sku: "",
          //   age_grading: ""
          // }
        ],
        product_type: "",
        product_use: 0,
        mass_of_child: 0,
        if_appropriate: 0,
        exemption_reason: ""
      },
      establishment_info: {
        activity: "",
        origin_country: "",
        manufacturer_name: "",
        manufacturer_address: "",
        company: "",
        address: "",
        region: "",
        license_no: "",
        license_validity: "",
        contacts: {
          email: null,
          landline: null,
          fax: null,
          mobile: null
        }
      },
      company_representative: {
        name: "",
        designation: "",
        contacts: {
          email: null,
          landline: null,
          fax: null,
          mobile: null
        }
      },
      output_files: []
    }
  }),
  created() {
    console.log("apply toys");
    this.init();
  },
  methods: {
    next(page) {
      this.e6 = page;
    },
    cancel() {
      this.$emit("next", 2);
    },
    init() {
      console.log("Apply Notification Toys");
      this.toy_certificate.establishment_info.company = this.active_license.estab_details.establishment_name;
      this.toy_certificate.establishment_info.license_validity = this.formatDate(
        this.active_license.license_expiry
      );
      // console.log("License validity: " + JSON.stringify(this.active_license.license_expiry))
      this.active_license.address_list.forEach(add => {
        if (add.type == 0) {
          this.toy_certificate.establishment_info.address = add.address;
          this.toy_certificate.establishment_info.region = add.region;
        }
      });
      this.toy_certificate.establishment_info.license_no = this.active_license.license_no;
      // this.toy_certificate.establishment_info.primary_activity = this.getPrimary(
      //   this.active_license.general_info.primary_activity
      // );
      console.log(
        "this.active_license.estab_details: " +
          JSON.stringify(this.active_license.estab_details)
      );
      this.toy_certificate.establishment_info.contacts.email = this.active_license.estab_details.email;
      this.toy_certificate.establishment_info.contacts.landline = this.active_license.estab_details.landline;
      this.toy_certificate.establishment_info.contacts.fax = this.active_license.estab_details.fax;
      this.toy_certificate.establishment_info.contacts.mobile = this.active_license.estab_details.mobile;
      this.toy_certificate.company_representative.name =
        this.active_license.auth_officer.firstname +
        " " +
        this.active_license.auth_officer.middlename +
        " " +
        this.active_license.auth_officer.lastname;
      this.toy_certificate.company_representative.contacts.email = this.active_license.auth_officer.email;
      console.log(
        "auth_officer: " + JSON.stringify(this.active_license.auth_officer)
      );
      console.log(
        "auth_officer email: " +
          JSON.stringify(this.active_license.auth_officer.email)
      );
      this.toy_certificate.company_representative.designation = this.getDesignation(
        this.active_license.auth_officer.designation
      ).name;
      this.exempt = this.$store.state.toysCertificate.toys_exemption;
      console.log(
        "toys product exempt data: " +
          JSON.stringify(this.$store.state.toysCertificate.toys_exemption)
      );
      // console.log("toys designation: " + JSON.stringify(this.getDesignation(this.active_license.auth_officer.designation)))
      // console.log("primary activity: " + JSON.stringify(this.cosmetic_certificate.establishment_info.primary_activity))
    },
    save() {
      this.toy_certificate.particular_product.product_details.forEach(data => {
        this.sku_total += data.sku * 1;
        console.log("this is sku data: " + JSON.stringify(this.sku_total));
      });
      var payDetails = {
        application_type: 0,
        product_type: this.toy_certificate.particular_product.exemption_reason,
        sku: this.sku_total
      };
      console.log(
        "toy certificate data: " + JSON.stringify(this.toy_certificate)
      );
      this.$store.dispatch("GET_CERTIFICATE_FEES", payDetails).then(result => {
        console.log("get certificate fees: " + JSON.stringify(result));
        this.fees = [];
        this.fees.push({
          description: "Application Fee",
          amount: result.fee
        });
        this.fees.push({
          description: "LRF",
          amount: result.lrf
        });
        this.fees.push({
          description: "Interest",
          amount: result.interest
        }),
          this.fees.push({
            description: "Surcharge",
            amount: result.surcharge
          });
        this.total_amount =
          result.fee + result.lrf + result.interest + result.surcharge;
        this.$store.commit("SET_VIEW_CERTIFICATE", {
          toy_certificate: this.toy_certificate,
          certificate_type: 1,
          application_type: 0,
          case_type: 1
        });
        this.$store.commit("SET_FORM", {
          toy_certificate: this.toy_certificate,
          certificate_type: 1,
          case_type: 1,
          application_type: 0,
          output_files: this.toy_certificate.output_files
        });
        this.$router.push("/app/certificates/overview");
        this.$notify({
          color: "success",
          message:
            "Registration fee computed! For this application you will have to pay the amount of  ₱ " +
            this.numberWithCommas(this.total_amount)
        });
      });

      // this.$store.dispatch("SAVE_CERTIFICATE", this.cosmetic_certificate);
    }
  },
  computed: {
    active_license() {
      console.log(
        "ACTIVE LICENSE : " +
          JSON.stringify(this.$store.state.licenses.active_license)
      );
      return this.$store.state.licenses.active_license;
    }
  }
};
</script>

<style>
</style>
