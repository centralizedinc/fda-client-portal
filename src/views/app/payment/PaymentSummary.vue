<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <form-layout>
          <v-container slot="content-step-1" grid-list-xl>
            <v-card>
              <v-layout row wrap mt-2 pl-5>
                <v-flex xs6>
                  <v-flex xs12 pl-5 pt-3 pb-3 ml-5>
                    <label class="subheading">Application Fee:</label>
                  </v-flex>
                  <v-flex xs12 pl-5 pt-3 pb-3 ml-5>
                    <label class="subheading"># of year/s applied:</label>
                  </v-flex>
                  <v-flex xs12 pl-5 pt-3 pb-3 ml-5>
                    <label class="subheading">Surcharge:</label>
                  </v-flex>
                  <v-flex xs12 pl-5 pt-3 pb-3 ml-5>
                    <label class="subheading">Legal Research Fund (LRF):</label>
                  </v-flex>
                  <v-flex xs12 pl-5 pt-3 pb-3 ml-5>
                    <label class="subheading" color="error">Total Payment Due:</label>
                  </v-flex>
                </v-flex>

                <v-flex xs4>
                  <v-flex xs12 pr-5 pt-3 pb-3>
                    <label class="subheading">Php {{rates.fee}}</label>
                  </v-flex>
                  <v-flex xs12 pr-5 pt-3 pb-3>
                    <label class="subheading">1</label>
                  </v-flex>
                  <v-flex xs12 pr-5 pt-3 pb-3>
                    <label class="subheading">
                      <v-icon medium color="error">close</v-icon>
                    </label>
                  </v-flex>
                  <v-flex xs12 pr-5 pt-3 pb-3>
                    <label class="subheading">Php {{rates.lrf}}</label>
                  </v-flex>
                  <v-flex xs12 pr-5 pt-3 pb-3>
                    <label class="subheading">Php 5,050.00</label>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-card>
          </v-container>
        </form-layout>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-flex ml-5>
            <v-btn class="font-weight-light" color="success">Bank Payment</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex>
            <v-btn class="font-weight-light" color="success" @click="generatePDF">FDA Cashier / FDAC</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex>
            <v-btn class="font-weight-light" color="success" @click="creditCard">Credit Card</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import * as OrderOfPaymentGenerator from "./OrderOfPaymentGenerator";

export default {
  props: ["form"],
  data() {
    return {
      rates: {
        fee: 5000,
        lrf: 50
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log("Welcome to payment summary");
    },
    generatePDF() {
      OrderOfPaymentGenerator.generateOrderOfPayment(this.form, this.rates);
    },
    creditCard() {
      this.$router.push("/app/payments/creaditcard");
    }
  }
};
</script>

<style>
</style>
