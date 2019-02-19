<template>
  <v-container grid-list-md text-xs-left>
    <v-layout row wrap fill-height v-show="!paymentDialog">
      <v-flex xs4>
        <span class="headline font-weight-bold">Case Number:</span>
      </v-flex>
      <v-flex xs8>
        <span class="headline font-weight-bold">{{form.case_no}}</span>
      </v-flex>
      <v-flex xs12>
        To process your application, please pay the amount of
        <b class="font-weight-bold">PHP XXXX.XX</b> to your selected accredited payment channels. To avoid late charges/ penalties, we encourage you to pay on or before the payment due date.
      </v-flex>
      <v-layout row wrap>
        <v-flex xs4 mt-2 ml-3>
          <span class="body-2">Application Status</span>
        </v-flex>
        <v-flex xs4 mr-5>
          <v-chip class="font-weight-bold" label color="fdaYellow" text-color="black">PENDING</v-chip>
        </v-flex>
        <v-flex xs4 ml-3>
          <span class="body-2">Due Date</span>
        </v-flex>
        <v-flex xs6 mr-5 ml-2>MM DD, YYYY HH:MM:SS AM/PM</v-flex>
      </v-layout>
      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>
      <v-btn block color="success" @click="pay">Pay now</v-btn>
    </v-layout>
    <v-layout row wrap>
      <payment-summary v-show="paymentDialog" :allow_paylater="allow_paylater"></payment-summary>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  components: {
    PaymentSummary: () => import("./PaymentSummary.vue")
  },
  props: {
    form: {
      type: Object
    },
    allow_paylater: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      paymentDialog: false
    };
  },
  methods: {
    pay() {
      this.paymentDialog = true;
    }
  }
};
</script>

<style>
</style>
