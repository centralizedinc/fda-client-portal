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
                <v-btn color="success" block @click="viewLetter">View</v-btn>
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
      reasons: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store
        .dispatch("GET_RESULT_BY_KEY", this.$route.params.key)
        .then(result => {
          console.log("result.data :", result.data);
          if (result.data.success) {
            this.license_details = result.data.model.license_details;
            this.case_details = result.data.model.case_details;
            this.client_details = result.data.model.client_details;
            this.reasons = result.data.model.reasons;
          } else {
            this.$notifyError(result.data.errors);
          }
        })
        .catch(err => {
          this.$notifyError(err);
        });
    },
    viewLetter() {
      var details = {
        date_created: this.formatDate(new Date()),
        name: `${client_details.name.first} ${client_details.name.last}`,
        establishment_name: license_details.estab_details.establishment_name,
        establishment_address: license_details.addresses.office.address,
        application_type: this.getAppType(license_details.application_type),
        case_no: case_details.case_no,
        reasons: this.reasons
      };
      this.$print(details, "DENIED_LIC");
    }
  }
};
</script>

<style>
</style>
