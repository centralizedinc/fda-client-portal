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
                vertical
              >
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

                          <!-- COmpliance -->
                          <v-card flat v-show="window===6">
                            <v-flex mt-3 ml-2>
                              <v-list two-line width>
                                <template v-for="(item, index) in items">
                                  <v-subheader
                                    v-if="item.header"
                                    :key="item.header"
                                  >{{ item.header }}</v-subheader>
                                  <v-divider
                                    v-else-if="item.divider"
                                    :inset="item.inset"
                                    :key="index"
                                  ></v-divider>
                                  <v-list-tile v-else avatar :key="index">
                                    <v-list-tile-avatar>
                                      <img :src="item.avatar">
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                      <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                      <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                  </v-list-tile>
                                </template>
                              </v-list>
                              <v-divider></v-divider>
                              <v-card-actions>
                                <v-btn flat block color="success">view more</v-btn>
                              </v-card-actions>
                            </v-flex>
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
    </v-card>
  </v-layout>
</template>

<script>
import tabs from "./licenses/appoverview/tabs";

const tabscomponents = Object.assign(
  {
    PaymentSummary: () => import("./payment/PaymentSummary.vue"),
    PendingTrans: () => import("./payment/PendingTransaction.vue"),
    PaidTrans: () => import("./payment/PaidTransaction.vue")
  },
  tabs
);
export default {
  components: tabscomponents,
  data: () => ({
    form: {
      current_task: "",
      user: "",
      action: "",
      created_by: "",
      date_created: "",
      application_type: "",
      general_info: {
        product_type: "",
        primary_activity: "",
        declared_capital: ""
      },
      estab_details: {
        establishment_name: "",
        establishment_owner: "",
        tin: "",
        email: "",
        landline: "",
        fax: "",
        mobile: "",
        products: [
          {
            prod_line: "",
            remarks: ""
          }
        ]
      },
      addresses: {
        office: {
          address: "",
          region: "",
          province: "",
          city: "",
          zipcode: "",
          location: ""
        },
        warehouse: [],
        plant: {
          address: "",
          region: "",
          province: "",
          city: "",
          zipcode: ""
        }
      },
      auth_officer: {
        mail_add: {
          address: "",
          region: "",
          province: "",
          city: "",
          zipcode: ""
        },
        lastname: "",
        firstname: "",
        middlename: "",
        designation: "",
        email: "",
        tin: "",
        birthday: "",
        id_type: "",
        id_no: "",
        id_expiry: ""
      },
      qualified_personnel: [],
      uploaded_files: [
        {
          purpose: "Proof of Business Name Registration",
          file_name: "",
          file: null
        },
        {
          purpose: "Site Master File",
          file_name: "",
          file: null
        },
        {
          purpose: "Risk Management Plan",
          file_name: "",
          file: null
        },
        {
          purpose: "Licensing Seminar Certificate",
          file_name: "",
          file: null
        },
        {
          purpose: "PRC ID",
          file_name: "",
          file: null
        }
      ]
    },
    window: 0,
    headers: [
      {
        text: "Name",
        value: "",
        sortable: false
      },
      {
        text: "Designation",
        value: "",
        sortable: false
      },
      {
        text: "Birthdate",
        value: "",
        sortable: false
      },
      {
        text: "TIN",
        value: "",
        sortable: false
      },
      {
        text: "Government ID",
        value: "",
        sortable: false
      }
    ],
    title: [
      "Summary",
      "Application Data",
      "Uploaded Files",
      "Output Documents",
      "History",
      "Payment",
      "Compliance"
    ],
    items: [
      { header: "Today" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Authorized Officer",
        subtitle:
          "<span class='text--primary'>Chz Quiocho</span> &mdash; Applied Certificate for Food"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "Cashier ",
        subtitle:
          "<span class='text--primary'>Godfrey Rivera</span> &mdash; accepted License Application "
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Authorized Officer",
        subtitle:
          "<span class='text--primary'>Chz Quiocho</span> &mdash; Renewed License 0001111"
      }
    ],
    details: null
  }),
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store
        .dispatch("GET_UNAPPROVED_LICENSES")
        .then(result => {
          console.log("JSON.stringify(result) :", JSON.stringify(result));
          this.form = result.license;
        })
        .catch(err => {
          console.log("loading user status error: " + err);
        });




      this.details = this.$store.state.licenses.details;
      this.$store
        .dispatch("GET_ACTIVE_AND_CASES")
        .then(result => {
          console.log("JSON.stringify(result) GET_ACTIVE_AND_CASES :", JSON.stringify(result));
          this.details = result;
          return this.$store.dispatch("GET_TASKS");
        })
        .then(result => {
          console.log("result GET_TASKS :", JSON.stringify(result));
        })
        .catch(err => {
          console.log("err :", err);
        });


    }
  }
};
</script>

<style>
</style>
