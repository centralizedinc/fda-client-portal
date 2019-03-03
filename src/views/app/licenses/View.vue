<template>
  <v-layout align-start justify-start column fill-height>
    <v-card width="calc(100% - 0px">
      <v-card-text>
        <v-layout align-start justify-start row fill-height>
          <v-flex xs3 mr-5 mt-3 pt-3 pr-5>
            <v-item-group v-model="window" class="shrink mr-5" mandatory tag="v-flex">
              <v-item v-for="n in title" :key="n">
                <div class="mr-5 pr-5" left slot-scope="{ active, toggle }">
                  <v-btn class="text-align: left" ripple flat @click="toggle">
                    <v-icon>mdi-record</v-icon>
                    {{n}}
                  </v-btn>
                </div>
              </v-item>
            </v-item-group>
          </v-flex>
          <v-layout align-start justify-start row fill-height>
            <v-flex xs12 pl-2>
              <v-window
                v-model="window"
                class="elevation-5 mt-3"
                style="border-radius: 8px"
                vertical>
                <v-window-item v-for="n in title" :key="n">
                  <v-layout align-start justify-start row fill-height>
                    <v-flex>
                      <v-card flat>
                        <v-card-text>
                          <v-layout align-center justify-center fill-height mb-3>
                            <v-avatar class="mr-3" color="grey">
                              <img src="https://i.postimg.cc/L6Z0cZk3/vue-logo.png" alt="FDA">
                            </v-avatar>

                            <strong class="title text-transform: uppercase">{{ n }}</strong>
                            <v-spacer></v-spacer>
                            <v-btn icon>
                              <v-icon>mdi-account</v-icon>
                            </v-btn>
                          </v-layout>
                          <v-divider></v-divider>

                          <!-- Summary-->
                          <v-card flat v-show="window===0">
                            <v-container grid-list-md text-xs-left>
                              <app-summary :form="form"></app-summary>
                            </v-container>
                          </v-card>

                          <!-- Data -->
                          <v-card flat v-show="window===1">
                            <v-container grid-list-md text-xs-left>
                              <app-data :form="form"></app-data>
                            </v-container>
                          </v-card>

                          <!-- Uploaded Documents -->
                          <v-card flat v-show="window===2">
                            <v-container grid-list-md text-xs-left>
                              <files :form="form"></files>
                            </v-container>
                          </v-card>

                          <!-- Output Documents -->
                          <v-card flat v-show="window===3">
                            <v-container grid-list-md text-xs-left>
                              <output-docs :form="form"></output-docs>
                            </v-container>
                          </v-card>

                          <!-- Application History -->
                          <v-card flat v-show="window===4">
                            <v-container grid-list-md text-xs-left>
                              <app-history :form="form"></app-history>
                            </v-container>
                          </v-card>

                          <!-- Payment Details -->
                          <v-card flat v-show="window===5">
                            <!-- Display if PENDING or PAID TRANSACTION -->
                            <pending-trans :form="form" :allow_paylater="false"></pending-trans>
                          </v-card>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-window-item>
              </v-window>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-btn color="info" @click="$emit('back')" block>back</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
import tabs from "../licenses/appoverview/tabs";

const tabscomponents = Object.assign(
  {
    PaymentSummary: () => import("../payment/PaymentSummary.vue"),
    PendingTrans: () => import("../payment/PendingTransaction.vue"),
    PaidTrans: () => import("../payment/PaidTransaction.vue")
  },
  tabs
);

export default {
  props: ["form"],
  components: tabscomponents,
  data() {
    return {
      window: 0,
      title: [
        "Summary",
        "Application Data",
        "Uploaded Files",
        "Output Documents",
        "History",
        "Payment"
      ]
    };
  }
};
</script>

<style>
</style>
