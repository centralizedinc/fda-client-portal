<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex hidden-xs-only md8>
      <v-card class="tCard">
        <v-img :src="require('@/assets/FDACard2.png')" height="130"></v-img>
        <v-card-text
          class="font-weight-bold black--text"
          style="text-shadow: 2px 2px 4px grey;"
        >This FDA Portal version 3.0 allows users to complete their entire application online, apply and submit License and Certificates, upload documents, pay online through debit or credit card and wait for the approval from FDA. Track, view and get notified on the status of your application in the dashboard. New license requires one time registration to access the portal.</v-card-text>
      </v-card>
    </v-flex>
    <v-container grid-list-md text-xs-center>
      <v-layout align-center justify-center row fill-height>
        <v-flex xs12 md6>
          <v-card class="cardButton" color="fdaGold" @click="validationDialog=true" hover ripple>
            <v-card-text>
              <v-spacer></v-spacer>
              <v-tooltip top>
                <v-icon class="pt-4" slot="activator" color="primary">fas fa-file-contract fa-4x</v-icon>
              </v-tooltip>
              <v-spacer></v-spacer>
              <v-flex xs12>
                <span
                  class="headline font-weight-thin text-xs-center"
                  color="primary"
                  style="text-transform: uppercase"
                >Existing License</span>
                <h1
                  class="caption"
                >Applicants with existing license that needs renewal, variation or certificate application</h1>
              </v-flex>
            </v-card-text>
            <existing-user :show="validationDialog" @close="validationDialog=false"></existing-user>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-card class="cardButton" color="fdaTan" hover ripple>
            <v-card-text>
              <v-spacer></v-spacer>
              <v-tooltip top>
                <v-icon
                  class="pt-4"
                  slot="activator"
                  color="primary"
                  @click="$router.push('/signup')"
                >fas fa-plus fa-4x</v-icon>
              </v-tooltip>
              <v-spacer></v-spacer>
              <v-flex xs12>
                <span
                  class="headline font-weight-thin text-xs-center"
                  style="text-transform: uppercase"
                >New License</span>
                <h1
                  class="caption"
                >New license application requires registration for their username and password.</h1>
              </v-flex>
            </v-card-text>
            <existing-user :show="validationDialog" @close="validationDialog=false"></existing-user>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  components: {
    ExistingUser: () => import("./registration/existing/Validate.vue")
  },
  data() {
    return {
      validationDialog: false
    };
    //   },
    //   methods: {
    //     validateExistingUser() {
    //       this.validationDialog = true;
    //     }
  }
};
</script>

<style>
.tCard {
  background-color: transparent !important;
  box-shadow: none !important;
}
.cardButton {
  -webkit-box-reflect: below 6px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(10%, transparent), to(rgba(250, 250, 250, 0.1))) !important;
  border-radius: 10px !important;
  height: 200px !important;
}
</style>
