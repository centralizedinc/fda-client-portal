<template>
    <v-flex xs12>
        <v-card color="fdaSilver" class="elevation-5" 
          v-if="details.license_details && 
          details.case_details && 
          details.license_details.license_no && 
          details.case_details.case_no">
          <v-card-title class="active-license-title fdaSilver--text">
            <v-avatar class="mr-3" color="grey">
              <img src="https://i.postimg.cc/L6Z0cZk3/vue-logo.png" alt="FDA">
            </v-avatar>
            <span class="display-1 font-weight-light">License No.: {{details.license_details.license_no}}</span>
            <v-spacer></v-spacer>
            <v-speed-dial
              v-if="menu"
              v-model="fab"
              direction="left"
              open-on-hover
              transition="slide-x-reverse-transition">
              <template v-slot:activator>
                <v-tooltip top>
                  <v-btn slot="activator" v-model="fab" color="fdaGreen" dark flat fab>
                    <v-icon>{{ fab ? "close" : "menu"}}</v-icon>
                  </v-btn>Close
                </v-tooltip>
              </template>
              <v-tooltip top>
                <v-btn slot="activator" fab dark color="fdaBlueGreen" @click="$emit('view')">
                  <v-icon>search</v-icon>
                </v-btn>View Full License
              </v-tooltip>
              <v-tooltip top>
                <v-btn slot="activator" fab dark @click="$emit('variate')" color="fdaOrange">
                  <v-icon>edit</v-icon>
                </v-btn>Variation
              </v-tooltip>
              <v-tooltip top>
                <v-btn slot="activator" fab dark @click="$emit('renew')" color="fdaMed">
                  <v-icon>autorenew</v-icon>
                </v-btn>Renewal
              </v-tooltip>
              <v-tooltip top>
                <v-btn slot="activator" fab dark color="fdaYellow" @click="$emit('print')">
                  <v-icon>print</v-icon>
                </v-btn>Print
              </v-tooltip>
            </v-speed-dial>
          </v-card-title>
          <v-divider inset></v-divider>
          <v-card-text>
            <v-container grid-list-xl>
              <v-layout row wrap class="subheading">
                <v-flex xs12 md6 lg3 xl2 class="font-weight-medium">Case No:</v-flex>
                <v-flex xs12 md6 lg3 xl2>{{details.case_details.case_no}}</v-flex>
                <v-flex xs12 md6 lg3 xl2 class="font-weight-medium">Status:</v-flex>
                <v-flex
                  :class="`${getAppStatusColor(details.case_details.status)}--text font-weight-bold text-uppercase` "
                  xs12 md6 lg3 xl2>
                  {{getAppStatus(details.case_details.status)}}
                </v-flex>
                <v-flex xs12 md6 lg3 xl2 class="font-weight-medium">License Expiry:</v-flex>
                <v-flex xs12 md6 lg3 xl2>
                  {{details.license_details.license_expiry ? formatDate(details.license_details.license_expiry) : "-"}}</v-flex>
                <v-flex xs12 md6 lg3 xl2 class="font-weight-medium">Primary:</v-flex>
                <v-flex xs12 md6 lg3 xl2>{{getPrimary(details.case_details.primary_activity)}}</v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
        <v-card class="elevation-5 active-license-title fdaSilver--text" 
          v-else-if="details.license_details && 
          details.case_details">
          <v-card-text>
            <i>Loading data ...</i>
          </v-card-text>
        </v-card>
        <v-card color="error" class="elevation-5" v-else>
          <v-card-text class="white--text subheading">
            <i>No Active License</i>
          </v-card-text>
        </v-card>
    </v-flex>
</template>

<script>
export default {
  props: {
    menu: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fab: false,
      details: {
        case_details: {},
        license_details: {}
      }
    };
  },
  created() {
    this.$store
      .dispatch("GET_ACTIVE_LICENSE")
      .then(result => {
        if (result.success) {
          this.details = result.model;
        } else {
          console.log("GET_ACTIVE_LICENSE result.errors :", result.errors);
        }
      })
      .catch(err => {
        console.log("GET_ACTIVE_LICENSE err :", err);
      });
  }
};
</script>

<style>
.active-license-title {
  background: linear-gradient(360deg, #104b2a 0%, #b5c25a 100%);
  box-shadow: 0 6px 20px 0 rgba(38, 198, 218, 0.5);
}
</style>
