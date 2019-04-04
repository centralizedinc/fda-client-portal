<template>
  <v-layout row wrap>
    <v-flex xs12 mt-3 ml-3>
      <span class="headline font-weight-bold">Your License application is in process.</span>
    </v-flex>
    <v-layout row wrap>
      <v-flex xs4 mt-2 ml-3>
        <span class="body-2">Case Number</span>
      </v-flex>
      <v-flex xs4 mr-5>
        <v-chip class="font-weight-bold" label color="fdaGreen" text-color="white">{{form.case_no}}</v-chip>
      </v-flex>
      <v-flex xs4 ml-3 mt-2 mb-2>
        <span class="body-2">Application Type</span>
      </v-flex>
      <v-flex
        xs4
        mr-5
        ml-1
        mt-2
        mb-2
      >{{getAppType(form.application_type)}} - {{getCaseType(case_holder.case_type)}}</v-flex>
      <!-- <v-flex xs4 mr-5 ml-1>
        <v-chip class="font-weight-bold" label color="fdaGreen" text-color="white">{{getCaseType(case_holder.case_type)}}</v-chip>
      </v-flex>-->
      <v-flex xs4 ml-3 mt-2 mb-2>
        <span class="body-2">Establishment</span>
      </v-flex>
      <v-flex xs4 mr-5 ml-1>{{form.estab_details.establishment_name}}</v-flex>
      <v-flex xs12 text-xs-center>
        <!-- <a href="#">Click here to download your official receipt</a> -->
        <v-btn color="primary" flat @click="download_receipt"><u>Click here to download your official receipt</u></v-btn>
      </v-flex>
    </v-layout>
    <v-flex xs12>
      <v-divider></v-divider>
    </v-flex>
    <v-btn block color="secondary" @click="$router.push('/app')">Back to Main</v-btn>
  </v-layout>
</template>

<script>
export default {
  props: {
    form: {
      type: Object
    },
    charges: {
      type: Object
    },
    case_holder: {
      type: Object
    },
    allow_paylater: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    download_receipt() {
      var details = {
        case_no: this.form.case_no,
        fee: `₱ ${this.numberWithCommas(this.charges.fee)}`,
        lrf: `₱ ${this.numberWithCommas(this.charges.lrf)}`,
        penalty: `₱ ${this.numberWithCommas(
          parseFloat(this.charges.surcharge) + parseFloat(this.charges.interest)
        )}`,
        total: `₱ ${this.numberWithCommas(this.charges.total)}`,
        amount: `₱ ${this.numberWithCommas(this.charges.total)}`,
        remaining_balance: "₱ 0.00"
      };
      // if (details.penalty) details.penalty = 0;
      this.$download(details, "RCPT", this.form.case_no);
    }
  }
};
</script>

<style>
</style>
