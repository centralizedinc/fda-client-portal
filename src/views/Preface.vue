<template>
  <v-layout align-start justify-start row fill-height>
    <v-flex hidden-sm-and-down md8 mt-2 ml-3>
      <v-card class="tCard">
        <v-img :src="require('@/assets/FDACard.png')" height="200px"></v-img>
        <v-card-text
          class="ml-2 font-weight-bold black--text"
          style="text-shadow: 2px 2px 4px grey;"
        >This FDA Portal version 3.0 allows users to complete their entire application online, apply and submit License and Certificates, upload documents, pay online through debit or credit card and wait for the approval from FDA. Track, view and get notified on the status of your application in the dashboard. Register now and enjoy a hassle free application blah blah</v-card-text>
      </v-card>
    </v-flex>
    <v-container grid-list-xl text-xs-center>
      <v-layout row wrap>
        <v-flex xs6 md6 pl-5>
          <v-card class="cardButton mt-5" color="fdaGold" @click="route" hover ripple="hover">
            <v-card-text>
              <v-spacer></v-spacer>
              <v-tooltip top>
                <v-icon class="pt-4" slot="activator" color="primary">far fa-id-card fa-4x</v-icon>Add another file
              </v-tooltip>
              <v-spacer></v-spacer>
              <v-flex xs12>
                <span class="headline font-weight-thin">Existing Applicants</span>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs6 md6 pl-5>
          <v-card class="cardButton mt-5" color="fdaOrange" @click="route" hover ripple="hover">
            <v-card-text>
              <v-spacer></v-spacer>
              <v-tooltip top>
                <v-icon class="pt-4" slot="activator" color="primary">fas fa-user-circle fa-4x</v-icon>Add another file
              </v-tooltip>
              <v-spacer></v-spacer>
              <v-flex xs12>
                <span class="headline font-weight-thin">New Applicants</span>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  methods: {
    route() {}
  }
};
</script>

<style>
.tCard {
  background-color: transparent !important;
  box-shadow: none !important;
}
.cardButton {
  border-radius: 3px !important;
}
</style>
