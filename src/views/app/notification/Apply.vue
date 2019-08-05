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
            <stepOne
              :form="cosmetic_certificate"
              :product_presentation="product_presentation"
              @next="next"
            ></stepOne>
          </v-card>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2" editable>
          Establishment Information
          <small>Local Company Responsible for Placing the Product in the Market</small>
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-card flat class="mb-5">
            <stepTwo :form="cosmetic_certificate" @next="next"></stepTwo>
          </v-card>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3" editable>Person Representing the Local Company</v-stepper-step>
        <v-stepper-content step="3">
          <v-card flat class="mb-5">
            <stepThree :form="cosmetic_certificate" @next="next"></stepThree>
          </v-card>
        </v-stepper-content>

        <v-stepper-step step="4" editable>Product Ingredient List</v-stepper-step>
        <v-stepper-content step="4">
          <v-card flat class="mb-5">
            <stepFour :form="cosmetic_certificate"></stepFour>
          </v-card>
          <v-btn color="primary" @click="save">Continue</v-btn>
          <v-btn flat @click="cancel">Cancel</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-layout>
  </v-container>
</template>

<script>
import ProductParticulars from "./cosmetic/ProductParticulars";
import EstablishmentInfo from "./cosmetic/EstablishmentInfo";
import Representative from "./cosmetic/Representative";
import ProductIngredients from "./cosmetic/ProdIngredient";

export default {
  components: {
    stepOne: () => ({
      component: import("./cosmetic/ProductParticulars")
    }),
    stepTwo: () => ({
      component: import("./cosmetic/EstablishmentInfo")
    }),
    stepThree: () => ({
      component: import("./cosmetic/Representative")
    }),
    stepFour: () => ({
      component: import("./cosmetic/ProdIngredient")
    })
  },
  data: () => ({
    e6: 1,
    loading: false,
    particular_product: [],
    additional_information: [],
    establishment_info: [],
    company_representative: [],
    ingredients: [],
    product_presentation: [],
    product_line: [],
    cosmetic_certificate: {
      particular_product: {
        brand_name: "",
        product_name: "",
        years_applied: 0,
        product_variants: [],
        product_type: "",
        product_specify: "",
        intended_use: "",
        product_presentation: "",
        presentation_component: "",
        presentation_specify: "",
        additional_information: [
          // {
          //   packaging_size: 0,
          //   packaging_type: "",
          //   gtin: ""
          // }
        ]
      },
      establishment_info: {
        activity: "",
        origin_country: "",
        directly_source: "",
        manufacturer_name: "",
        manufacturer_address: "",
        company: "",
        address: "",
        region: "",
        license_no: "",
        license_validity: "",
        contact_info: {
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
      ingredients: [
        // {
        //   variant: "",
        //   name: "",
        //   function: "",
        //   percentage: ""
        // }
      ]
    }
  }),
  created() {
    console.log("apply cosmetic");
    this.init();
  },
  methods: {
    next(page) {
      this.e6 = page;
    },
    cancel() {
      this.$emit("next", 3);
    },
    init() {
      console.log("Apply Notification");
      this.cosmetic_certificate.establishment_info.company = this.active_license.estab_details.establishment_name;
      // this.cosmetic_certificate.establishment_info.address = this.active_license.estab_details.address;
      this.active_license.address_list.forEach(add => {
        if (add.type == 0) {
          this.cosmetic_certificate.establishment_info.address = add.address;
          this.cosmetic_certificate.establishment_info.region = add.region;
        }
      });
      this.cosmetic_certificate.establishment_info.license_no = this.active_license.license_no;
      this.cosmetic_certificate.establishment_info.primary_activity = this.getPrimary(
        this.active_license.general_info.primary_activity
      );
      this.cosmetic_certificate.establishment_info.contact_info.email = this.active_license.estab_details.email;
      this.cosmetic_certificate.establishment_info.contact_info.landline = this.active_license.estab_details.landline;
      this.cosmetic_certificate.establishment_info.contact_info.fax = this.active_license.estab_details.fax;
      this.cosmetic_certificate.establishment_info.contact_info.mobile = this.active_license.estab_details.mobile;
      this.product_presentation = this.$store.state.cosmeticCertificate.product_presentation;
      this.product_line = this.active_license.estab_details.products;
      console.log(
        "product presentation: " + JSON.stringify(this.product_presentation)
      );
      // console.log("primary activity: " + JSON.stringify(this.cosmetic_certificate.establishment_info.primary_activity))
    },
    save() {
      console.log(
        "this.cosmetic_certificate: " +
          JSON.stringify(this.cosmetic_certificate)
      );
      var payDetails = {
        application_type: 0,
        product_type: this.cosmetic_certificate.particular_product
          .product_presentation
      };
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
          cosmetic_certificate: this.cosmetic_certificate,
          certificate_type: 2,
          application_type: 0,
          case_type: 1
        });
        this.$store.commit("SET_FORM", {
          cosmetic_certificate: this.cosmetic_certificate,
          certificate_type: 2,
          application_type: 0,
          case_type: 1,
        });
        this.$router.push("/app/certificates/overview");
        this.$notify({
          color: "success",
          message:
            "Registration fee computed! For this application you will have to pay the amount of  ₱ " +
            this.numberWithCommas(this.total_amount)
        });
      });

      // this.$store.dispatch("SAVE_CERTIFICATE", {
      //   cosmetic_certificate: this.cosmetic_certificate,
      //   certificate_type: 2,
      //   application_type: 0
      // });
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
