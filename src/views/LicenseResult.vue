<template>
<v-layout row wrap justify-center>
    <v-flex xs12 md5>
        <v-card>
            <v-card-title class="disappCase black--text">
                <v-avatar class="mr-2" color="grey">
                    <img src="https://i.postimg.cc/L6Z0cZk3/vue-logo.png" alt="FDA">
            </v-avatar>
                    <span class="display-1 font-weight-thin">Case No.: <b>{{case_details.case_no}}</b></span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-xl>
                    <v-layout row wrap class="subheading">
                        <v-flex xs6 class="font-weight-light">Application Type :</v-flex>
                        <v-flex xs6 class="font-weight-bold">{{getAppType (license_details.application_type, license_details.case_type)}} Application</v-flex>
                        <v-flex xs6 class="font-weight-light"> Establishment Address :</v-flex>
                        <v-flex xs6 class="font-weight-bold"> {{license_details.estab_details.establishment_name}}</v-flex>
                        <v-flex xs6 class="font-weight-light"> Establishment Owner :</v-flex>
                        <v-flex xs6 class="font-weight-bold"> {{license_details.estab_details.establishment_owner}}</v-flex>
                    </v-layout>
                    <br>
                    <span class="headline text--center font-weight-light"> This application has been <b :class="license_details.status === 1 ? 'green--text': 'red--text'">{{getAppStatus(license_details.status).toUpperCase()}}.</b>
                    </span>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="primary" block @click="processLicense">View PDF</v-btn>
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
        address_list: []
      },
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
      var address = "";

      this.license_details.address_list.forEach(elem => {
        if (elem.type === 0) {
          address = elem.address;
        }
      });

      var details = {
        date_created: this.formatDate(this.director.date_completed),
        name: `${this.client_details.name.first} ${
          this.client_details.name.last
        }`,
        establishment_name: this.license_details.estab_details
          .establishment_name,
        establishment_address: address,
        application_type:
          this.getAppType(
            this.license_details.application_type,
            this.case_details.case_type
          ) + " Application",
        case_no: this.case_details.case_no,
        reasons: this.director.remarks
      };
      this.$print(details, "DENIED");
    },
    processLicense() {
      var app = this.deepCopy(this.license_details);
      if (app.status === 1) {
        // Approved
        app.general_info.primary_activity = this.getPrimary(
          app.general_info.primary_activity
        );
        app.application_type = this.getAppType(
          app.application_type,
          this.case_details.case_type
        );
        app.license_expiry = this.formatDate(app.license_expiry);

        app.officeAddress = app.address_list.find(x => {
          return x.type === 0;
        });
        if (!app.officeAddress) {
          app.officeAddress = {
            address: ""
          };
        }
        this.$print(app, "LIC");
      } else if (app.status === 3) {
        // Disapproved
        var address = "";
        app.address_list.forEach(elem => {
          if (elem.type === 0) {
            address = elem.address;
          }
        });

        var details = {
          date_created: this.formatDate(new Date()),
          name: `${this.getClientUser(this.case_details.client).name.first} ${
            this.getClientUser(this.case_details.client).name.last
          }`,
          establishment_name: app.estab_details.establishment_name,
          establishment_address: address,
          application_type:
            this.getAppType(app.application_type, this.case_details.case_type) +
            " Application",
          case_no: this.case_details.case_no,
          reasons: this.evaluated_case.remarks
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
