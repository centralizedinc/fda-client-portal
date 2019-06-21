<template>
  <v-layout row wrap justify-center>
    <v-flex xs5>
      <v-card>
        <v-card-title class="disappCase black--text">
          <v-avatar class="mr-2" color="grey">
            <img src="https://i.postimg.cc/L6Z0cZk3/vue-logo.png" alt="FDA">
          </v-avatar>
          <span class="display-1 font-weight-thin">Case No.: {{case_details.case_no}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xl>
            <v-layout row wrap class="subheading">
              <v-flex xs6 class="font-weight-light">Application Type:</v-flex>
              <v-flex xs6 class="font-weight-light">{{ getAppType(certificate_details.application_type, case_details.case_type)}} Application</v-flex>
              <v-flex xs6 class="font-weight-light">Brand Name:</v-flex>
              <v-flex xs6 class="font-weight-light"> {{certificate_details.food_product.brand_name}}</v-flex>
              <v-flex xs6 class="font-weight-light">Product Name:</v-flex>
              <v-flex xs6 class="font-weight-light"> {{certificate_details.food_product.product_name}}</v-flex>
              <v-flex xs6 class="font-weight-light">Company Name:</v-flex>
              <v-flex xs6 class="font-weight-light"> {{certificate_details.food_product.company}}</v-flex>
            </v-layout>
            <br>
            <span class="headline text--center font-weight-light">
              This application has been
              <b class="red--text">{{getAppStatus(certificate_details.status).toUpperCase()}}.</b>
            </span>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" block @click="processCertificate">View PDF</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      certificate_details: {},
      case_details: {},
      client_details: {
        name: {}
      },
      director: {},
      loading: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.$store
        .dispatch("GET_CERTIFICATE_RESULT_BY_KEY", this.$route.params.key)
        .then(result => {
          this.loading = false;
          console.log("result.data :", result.data);
          if (result.data.success) {
            this.certificate_details = result.data.model.certificate_details;
            this.case_details = result.data.model.case_details;
            this.client_details = result.data.model.client_details;
            this.director = result.data.model.director;
          } else {
            this.$notifyError(result.data.errors);
          }
        })
        .catch(err => {
          this.loading = false;
          this.$notifyError(err);
        });
    },
    viewLetter() {
      var address = "";

      this.certificate_details.address_list.forEach(elem => {
        if (elem.type === 0) {
          address = elem.address;
        }
      });

      var details = {
        date_created: this.formatDate(this.director.date_completed),
        name: `${this.client_details.name.first} ${
          this.client_details.name.last
        }`,
        establishment_name: this.certificate_details.food_product.company,
        establishment_address: this.certificate_details.food_product.address,
        application_type:
          this.getAppType(
            this.certificate_details.application_type,
            this.case_details.case_type
          ) + " Application",
        case_no: this.case_details.case_no,
        reasons: this.director.remarks
      };
      this.$print(details, "DENIED");
    },
    processCertificate() {
      var app = this.deepCopy(this.certificate_details);
      if (app.status === 1) {
        // Approved
        var certificate = {
          certificate_no: app.certificate_no,
          product_name: app.food_product.product_name,
          active_ingredients: "", // confirmation suggested by kyango
          intended_use: "", // confirmation suggested by kyango
          packaging: app.shelf.packaging_material,
          manufacturer: app.establishment_info.manufacturer_name,
          repacker_source: "", // confirmation suggested by kyango
          client_name: "",
          client_address: "",
          validity: app.date_validity,
          date_approved: app.date_approved
        };
        this.$print(certificate, "CERT");
      } else if (app.status === 3) {
        // Disapproved
        var details = {
          date_created: this.formatDate(new Date()),
          name: `${this.getClientUser(this.case_details.client).name.first} ${
            this.getClientUser(this.case_details.client).name.last
          }`,
          establishment_name: this.certificate_details.food_product.company,
        establishment_address: this.certificate_details.food_product.address,
          application_type:
            this.getAppType(app.application_type, this.case_details.case_type) +
            " Application",
          case_no: this.case_details.case_no,
          reasons: this.director.remarks
        };
        this.$print(details, "DENIED");
      }
    }
  }
};
</script>

<style>
.disappCase {
  background: linear-gradient(360deg, #58595b 0%, #e6e6e6 100%);
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0);
}
</style>
