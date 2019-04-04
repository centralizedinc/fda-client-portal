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
                        <v-flex xs6 class="font-weight-light">{{getAppType (license_details.application_type)}} Application</v-flex>
                        <v-flex xs6 class="font-weight-light"> Establishment Address:</v-flex>
                        <v-flex xs6 class="font-weight-light"> {{license_details.estab_details.establishment_name}}</v-flex>
                        <v-flex xs6 class="font-weight-light"> Establishment Owner:</v-flex>
                        <v-flex xs6 class="font-weight-light"> {{license_details.estab_details.establishment_owner}}</v-flex>
                    </v-layout>
                    <br>
                    <span class="headline text--center font-weight-light"> This application has been <b class="red--text">DISAPPROVED.</b>
</span>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="primary" block @click="viewLetter">Open Letter</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</v-layout>

<!-- <v-container grid-list-xl>
    <v-layout row align-center justify-center>
      <v-flex xs6>
        <v-card>
            <v-card-title class="headline">
                View Resultsss
            </v-card-title>
            <v-card-text>
                <i>This is only temporary</i>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" :loading="loading" block @click="viewLetter">View</v-btn>
            </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container> -->
</template>

<script>
export default {
  data() {
    return {
      license_details: {
        estab_details: {},
        addresses: {}
      },
      case_details: {},
      client_details: {
        name: {}
      },
      director: "",
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
        .dispatch("GET_RESULT_BY_KEY", this.$route.params.key)
        .then(result => {
          this.loading = false;
          console.log("result.data :", result.data);
          if (result.data.success) {
            this.license_details = result.data.model.license_details;
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
      var details = {
        date_created: this.formatDate(this.director.date_completed),
        name: `${this.client_details.name.first} ${
          this.client_details.name.last
        }`,
        establishment_name: this.license_details.estab_details
          .establishment_name,
        establishment_address: this.license_details.addresses.office.address,
        application_type: this.getAppType(
          this.license_details.application_type
        ) + " Application",
        case_no: this.case_details.case_no,
        reasons: this.director.remarks
      };
      this.$print(details, "DENIED_LIC");
    }
  }
};
</script>

<style>
.disappCase {
    background: linear-gradient(360deg, #58595B 0%, #E6E6E6 100%);
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.0);
}
</style>
