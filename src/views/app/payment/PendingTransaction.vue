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
        <b
          class="font-weight-bold"
        >PHP {{numberWithCommas(charges.total)}}</b> to your selected accredited payment channels. To avoid late charges/ penalties, we encourage you to pay on or before the payment due date.
      </v-flex>
      <v-layout row wrap>
        <v-flex xs4 mt-2 ml-3>
          <span class="body-2">Payment Status</span>
        </v-flex>
        <v-flex xs4 mr-5>
          <!-- <v-chip class="font-weight-bold" label color="fdaYellow" text-color="black">PENDING</v-chip> -->
          <v-chip
            class="font-weight-bold"
            label
            color="fdaYellow"
            text-color="black"
          >{{case_holder.is_paid ? "PAID" : "UNPAID"}}</v-chip>
        </v-flex>
        <!-- <v-flex xs4 ml-3>
          <span class="body-2">Due Date</span>
        </v-flex>
        <v-flex xs6 mr-5 ml-2>MM DD, YYYY HH:MM:SS AM/PM</v-flex>-->
      </v-layout>
      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>
      <v-btn block color="success" @click="pay">Pay now</v-btn>
    </v-layout>
    <v-layout row wrap>
      <payment-summary v-show="paymentDialog" :form="form" :allow_paylater="allow_paylater"></payment-summary>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  components: {
    PaymentSummary: () => import("./PaymentSummary.vue")
  },
  props: {
    close: {
      type: Boolean
    },
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
  data() {
    return {
      paymentDialog: false,
      expiration: null,
      // charges: null,
      cases: [],
      date: null
    };
  },
  created() {
    console.log(
      "state user data: " + JSON.stringify(this.$store.state.case.cases)
    );
    this.date = new Date(
      new Date().setTime(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
    );
    console.log("date of expiration: " + this.date);
  },
  watch: {
    form: function() {
      console.log(
        "charges from pending transaction: " + JSON.stringify(this.form)
      );
      this.paymentDialog = false;
    }
  },
  // watch: {
  //   "form": function() {
  //     // this.load_fees()
  //     console.log("pending transaction form: " + JSON.stringify(this.form));
  //     // var bill = {
  //     //   appType: this.form.appType,
  //     //   productType: this.form.productType,
  //     //   primaryActivity: this.form.primaryActivity,
  //     //   declaredCapital: this.form.declaredCapital
  //     // }
  //     // this.$store.dispatch("GET_UNAPPROVED_LICENSES").then((result) => {
  //     //   console.log("expiration date: "+JSON.stringify(result))
  //     //   // this.expiration = result.model.expiry_date;
  //     // }).catch((err) => {
  //     // });
  //     console.log("load fees pasok dito!!!!")
  //     if (
  //       // !this.isEmptyStrings([
  //       //   this.form.general_info.product_type,
  //       //   this.form.general_info.primary_activity,
  //       //   // this.form.general_info.declared_capital,
  //       //   // this.form.application_type,
  //       // ])
  //       this.form.general_info.product_type !== "" &&
  //       this.form.general_info.primary_activity !== "" &&
  //       this.charges === null
  //       // this.form.general_info.declared_capital !== null &&
  //       // this.form.application_type !== null
  //     ) {
  //       var details = {
  //         productType: this.form.general_info.product_type,
  //         primaryActivity: this.form.general_info.primary_activity,
  //         declaredCapital: this.form.general_info.declared_capital,
  //         appType: this.form.application_type
  //       }
  //       this.$store
  //         .dispatch("GET_CASES")
  //         .then(result => {
  //           this.cases = result;
  //           this.cases.forEach(element => {
  //             if (element.case_no === this.form.case_no) {
  //               this.case_holder = element
  //             }
  //           })
  //           // return this.$store.dispatch("GET_FEES", details)
  //         })
  //       this.$store.dispatch("GET_FEES", details).then(result => {
  //         this.charges = result;
  //       })
  //     } else {
  //       console.log("error no data found")
  //     }
  //   },
  //   // case_holder(){
  //   //   console.log("case holder watch: " + JSON.stringify(this.case_holder))
  //   // }
  //   // "form.case_no": function(val) {
  //   //   console.log("element data labas: " + JSON.stringify(this.cases))
  //   //   this.cases.forEach(element => {
  //   //     console.log("element data: " + JSON.stringify(element))
  //   //     if (element.case_no === this.form.case_no) {
  //   //       this.case_holder = element
  //   //     }
  //   //   })
  //   //   console.log("case holder data: " + JSON.stringify(this.case_holder))
  //   // }
  // },
  methods: {
    isEmpty(str) {
      return !str || str === null || str === "";
    },
    pay() {
      this.paymentDialog = true;
    }
  }
};
</script>

<style>
</style>
