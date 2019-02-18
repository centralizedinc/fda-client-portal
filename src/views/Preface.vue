<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex hidden-xs-only md8>
      <v-card class="tCard">
        <v-img :src="require('@/assets/FDACard2.png')" height="130"></v-img>
        <v-card-text
          class="font-weight-bold black--text"
          style="text-shadow: 2px 2px 4px grey;"
        >This FDA Portal version 3.0 allows users to complete entire application online, apply and submit License and Certificates, upload documents, pay online through debit or credit card and wait for the FDA approval. Track, view and get notified on the status of application in the dashboard. New license application requires one time registration to access the portal.</v-card-text>
      </v-card>
    </v-flex>
    <v-container grid-list-md text-xs-center>
      <v-layout align-center justify-center row fill-height>
        <v-flex xs12 md6>
          <v-card
            class="cardButton"
            color="fdaGold"
            @click="validationDialog=true"
            hover
            ripple
            style="background: linear-gradient(180deg, #E9EDCF, #B5C25A)"
          >
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
          <v-card
            class="cardButton"
            style="background: linear-gradient(180deg, #EFF1E3, #CAD0A0)"
            color="fdaTan"
            hover
            ripple
            @click="$router.push('/registration/new')"
          >
            <v-card-text>
              <v-spacer></v-spacer>
              <v-tooltip top>
                <v-icon class="pt-4" slot="activator" color="primary">fas fa-plus fa-4x</v-icon>
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
  props: ["account"],
  data: () => ({
    validationDialog: false
  })
};
</script>

<style>
.tCard {
  background-color: transparent !important;
  box-shadow: none !important;
}
.cardButton {
  -webkit-box-reflect: below 6px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(10%, transparent), to(rgba(250, 250, 250, 0.1))) !important;
  border-radius: 8px !important;
  height: calc(100% - 30px) !important;
  border: none;
  position: relative;
  margin: 10px 1px;
  line-height: 1.42857;
  text-transform: uppercase;
  letter-spacing: 0;
  will-change: box-shadow, transform;
}
</style>
