<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <form-layout>
          <v-container slot="content-step-1" grid-list-xl>
            <v-card>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-flex xs12 pl-5 pt-3 pb-3>
                    <label>Application Fee: </label>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex xs12 pl-5 pt-3 pb-3>
                    <label># of year/s applied: </label>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex xs12 pl-5 pt-3 pb-3>
                    <label>Surcharge: </label>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex xs12 pl-5 pt-3 pb-3>
                    <label>Legal Research Fund (LRF): </label>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex xs12 pl-5 pt-3 pb-3>
                    <label color="error">Total Payment Due: </label>
                    <v-divider></v-divider>
                  </v-flex>
                </v-flex>
                <v-flex xs6>
                  <v-flex xs12 pr-5 pt-3 pb-3>
                    <label>Php {{rates.fee}}</label>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex xs12 pr-5 pt-3 pb-3>
                    <label>1</label>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex xs12 pr-5 pt-3 pb-3>
                    <label><i class="fa fa-times text-danger"/></label>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex xs12 pr-5 pt-3 pb-3>
                    <label>Php {{rates.lrf}}</label>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex xs12 pr-5 pt-3 pb-3>
                    <label>Php 5,050.00</label>
                    <v-divider></v-divider>
                  </v-flex>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-flex xs4 pl-5>
                  <v-btn color="success">Landbank</v-btn>
                </v-flex>
                <v-flex xs4 pl-5>
                  <v-btn color="success" @click="generatePDF">FDA Cashier / FDAC</v-btn>
                </v-flex>
                <v-flex xs4 pl-5>
                  <v-btn color="success" @click="creditCard">Credit Card</v-btn>
                </v-flex>
              </v-card-actions>
            </v-card>
          </v-container>
        </form-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import * as OrderOfPaymentGenerator from './OrderOfPaymentGenerator'

  export default {
    props: ["form"],
    data(){
      return{
        rates:{
          fee: 5000,
          lrf: 50
        }
      }
    },
    created(){
      this.init();
    },
    methods:{
      init(){
        console.log("Welcome to payment summary")

      },
      generatePDF(){       
        OrderOfPaymentGenerator.generateOrderOfPayment(this.form, this.rates);
      },
      creditCard(){
        this.$router.push('/app/payments/creaditcard')
      }
    }
  }
</script>

<style>

</style>
