<template>
  <v-container grid-list-xl>
    <v-layout row align-center justify-center>
      <v-flex xs6>
        <v-card>
            <v-card-title class="headline">
                View Result
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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      license_details: {
        estab_details: {}
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
        ),
        case_no: this.case_details.case_no,
        reasons: this.director.remarks
      };
      this.$print(details, "DENIED_LIC");
    }
  }
};
</script>

<style>
</style>
