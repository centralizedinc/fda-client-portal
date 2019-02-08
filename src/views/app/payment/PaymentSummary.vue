<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title class="font-weight-light headline">Payment Summary</v-card-title>
        <form-layout>
          <v-container slot="content-step-1" grid-list-xl>
            <v-card flat>
              <v-layout row wrap mt-2 pl-5>
                <v-flex xs6>
                  <v-flex xs12 pl-5 pt-3 pb-3 ml-2>
                    <label class="subheading">Application Fee:</label>
                  </v-flex>
                  <v-flex xs12 pl-5 pt-3 pb-3 ml-2>
                    <label class="subheading"># of year/s applied:</label>
                  </v-flex>
                  <v-flex xs12 pl-5 pt-3 pb-3 ml-2>
                    <label class="subheading">Surcharge:</label>
                  </v-flex>
                  <v-flex xs12 pl-5 pt-3 pb-3 ml-2>
                    <label class="subheading">Legal Research Fund (LRF):</label>
                  </v-flex>
                  <v-flex xs12 pl-5 pt-3 pb-3 ml-2>
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
            <v-btn class="font-weight-light" color="success" @click="redirect">Bancnet Online</v-btn>
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
    <v-layout row wrap>
      <v-dialog
        v-model="finalStep"
        scrollable
        persistent
        transition="dialog-transition"
        max-width="500"
      >
        <v-card>
          <v-toolbar
            color="primary"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >
            <span class="font-weight-light headline">Final Step</span>

            <v-spacer></v-spacer>
            <v-tooltip top>
              <v-btn slot="activator" flat icon color="black" @click="finalStep =false">
                <i class="fas fa-times-circle"></i>
              </v-btn>Close
            </v-tooltip>
          </v-toolbar>

          <v-divider></v-divider>
          <v-card-text>
            <v-flex xs12>
              <p class="body-2">You have successfuly downloaded the Order of Payment.</p>
              <p>General Guidelines:</p>
              <ol>
                <li>Print the system generated Order of Payment</li>
                <li>Proceed to any Landbank of the Philippines branch or nearest FDA Action Center and present the Order of Payment</li>
                <li>*Upload the receipt/confirmation in the Application Summary*</li>
              </ol>
              <div></div>
              <p
                class="caption mt-2"
                style="color: grey; font-family:courier"
              >Note: The payment of fee is not a guarantee that the application will be granted. The processing of the application will still be subject to the evaluation of the concerned FDA personnel and its compliance with the pertinent laws, rules and regulations</p>
            </v-flex>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn flat block color="error" @click="finalStep =false">close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout row wrap>
      <v-dialog
        v-model="bancnetDialog"
        scrollable
        persistent
        transition="dialog-transition"
        max-width="400"
      >
        <v-card>
          <v-card-title primary-title>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <v-btn slot="activator" flat icon color="black" @click="bancnetDialog =false">
                <i class="fas fa-times-circle"></i>
              </v-btn>Close
            </v-tooltip>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 ml-1>
                <v-text-field box name="name" label="Enter OR/Transaction Number" id="id"></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
              <v-btn class="ml-1" color="success">Upload Payment receipt</v-btn>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn block flat color="success">submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
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
      },
      finalStep: false,
      bancnetDialog: false
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
      this.finalStep = true;
      OrderOfPaymentGenerator.generateOrderOfPayment(this.form, this.rates);
    },
    creditCard() {
      this.$router.push("/app/payments/creditcard");
    },
    redirect() {
      this.bancnetDialog = true;
      window.open("https://www.bancnetonline.com/BancnetWeb/login.do");
    }
  }
};
</script>

<style>
</style>
