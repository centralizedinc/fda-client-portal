<template>
  <!-- Pending Transaction -->
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-container grid-list-md text-xs-left></v-container>
        <v-card-actions>
          <v-btn flat block color="error" @click="Home">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["form"],
  components: {
    PendingTrans: () => import("./PendingTransaction.vue"),
    PaymentSummary: () => import("./PaymentSummary.vue")
  },
  methods: {
    Home() {
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
