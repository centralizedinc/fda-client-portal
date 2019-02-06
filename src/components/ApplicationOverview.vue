<template>
  <v-layout row wrap>
    <v-dialog v-model="show" max-width="1000px" persistent transition="dialog-transition">
      <v-card>
        <v-toolbar
          color="primary"
          style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
        >
          <span class="font-weight-light headline">Application Overview</span>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <v-btn slot="activator" flat icon color="black" @click="$emit('close')">
              <v-icon>fas fa-times</v-icon>
            </v-btn>Close
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-layout align-left>
            <v-flex xs2 mr-5 mt-3 pt-3 pr-5>
              <v-item-group v-model="window" class="shrink mr-5" mandatory tag="v-flex">
                <v-item v-for="n in title.length" :key="n">
                  <div class="mr-5 pr-5" left slot-scope="{ active, toggle }">
                    <v-btn class="text-align: left" ripple flat @click="toggle">
                      <v-icon>mdi-record</v-icon>
                      {{title[n]}}
                    </v-btn>
                  </div>
                </v-item>
              </v-item-group>
            </v-flex>

            <v-flex xs10>
              <v-window
                v-model="window"
                class="elevation-5 mt-3"
                style="border-radius: 8px"
                vertical
              >
                <v-window-item v-for="n in title.length" :key="n">
                  <v-card>
                    <v-card-text>
                      <v-layout align-center mb-3>
                        <v-avatar class="mr-3" color="grey">
                          <img src="https://i.postimg.cc/L6Z0cZk3/vue-logo.png" alt="FDA">
                        </v-avatar>

                        <strong class="title text-transform: uppercase">{{ title[n] }}</strong>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                          <v-icon>mdi-account</v-icon>
                        </v-btn>
                      </v-layout>

                      <!-- Summary-->
                      <v-card flat v-show="window===0">
                        <v-card-title class="headline ml-3 mt-2 pt-3" style="padding: 2px;">
                          <!-- <slot :name="'header-'"></slot> -->
                          <v-container grid-list-md text-xs-left>
                            <v-layout row wrap>
                              <slot name="'appsummary'"></slot>
                            </v-layout>
                          </v-container>
                        </v-card-title>
                      </v-card>

                      <!-- Data -->
                      <v-card flat v-show="window===1">
                        <v-card-title class="headline ml-3 mt-2 pt-3" style="padding: 2px;">
                          <slot :name="'header-'"></slot>
                          <v-container grid-list-md text-xs-left>
                            <v-layout row wrap>
                              <slot :name="'appdata'"></slot>
                            </v-layout>
                          </v-container>
                        </v-card-title>
                      </v-card>

                      <!-- Uploaded Documents -->
                      <v-card flat v-show="n===3">
                        <v-container grid-list-md text-xs-left>
                          <v-layout row wrap>
                            <slot :name="'uploadedfiles'"></slot>
                          </v-layout>
                        </v-container>
                      </v-card>

                      <!-- Output Documents -->
                      <v-card flat v-show="n===4">
                        <v-card-title class="headline ml-3 mt-2 pt-3" style="padding: 2px;">
                          <slot :name="'header-'"></slot>
                          <v-container grid-list-md text-xs-left>
                            <v-layout row wrap>
                              <slot :name="'outputdocs'"></slot>
                            </v-layout>
                          </v-container>
                        </v-card-title>
                      </v-card>

                      <!-- Application History -->
                      <v-card flat v-show="n===5">
                        <v-card-title class="headline ml-3 mt-2 pt-3" style="padding: 2px;">
                          <slot :name="'header-'"></slot>
                          <v-container grid-list-md text-xs-left>
                            <v-layout row wrap>
                              <slot :name="'apphistory'"></slot>
                            </v-layout>
                          </v-container>
                        </v-card-title>
                      </v-card>

                      <!-- Payment Details -->
                      <v-card flat v-show="n===6">
                        <v-card-title class="headline ml-3 mt-2 pt-3" style="padding: 2px;">
                          <slot :name="'header-'"></slot>
                          <v-container grid-list-md text-xs-left>
                            <v-layout row wrap>
                              <slot :name="'paymentdetails'"></slot>
                            </v-layout>
                          </v-container>
                        </v-card-title>
                      </v-card>
                    </v-card-text>
                  </v-card>
                </v-window-item>
              </v-window>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn block flat color="error" @click="$emit('close')">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    form: {},
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  watch: {
    window(val) {
      console.log(val);
    }
  },
  data: () => ({
    appsummary: null,
    appdata: null,
    length: 0,
    window: 0,
    title: [
      " ",
      "Summary",
      "Application Data",
      "Uploaded Files",
      "Output Documents",
      "History",
      "Payment Details"
    ]
  })
};
</script>

<style>
</style>
