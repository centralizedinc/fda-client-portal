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
              <i class="fas fa-times-circle"></i>
            </v-btn>Close
          </v-tooltip>
        </v-toolbar>
        <!-- <v-card-title primary-title class="headline">Application Overview</v-card-title> -->
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
              <v-window v-model="window" class="elevation-5" style="border-radius: 8px" vertical>
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
                      <v-card flat v-show="n===1">
                        <v-card-title>
                          <h3 class="title">APPLICATION SUMMARY</h3>
                          <v-container grid-list-md text-xs-left>
                            <v-layout row wrap>
                              <v-flex xs4 class="fontbold">Case Number</v-flex>
                              <v-flex xs8>dd</v-flex>
                              <v-flex xs4 class="fontbold">App Type</v-flex>
                              <v-flex xs8>dd</v-flex>
                              <v-flex xs4 class="fontbold">Establishment</v-flex>
                              <v-flex xs8>dd</v-flex>
                              <v-flex xs4 class="fontbold">Product Type</v-flex>
                              <v-flex xs8>{{form.general_info.product_type}}</v-flex>
                              <v-flex xs4 class="fontbold">Primary Activity</v-flex>
                              <v-flex xs8>{{form.general_info.primary_activity}}</v-flex>
                              <v-flex xs4 class="fontbold">Current Task</v-flex>
                              <v-flex xs8>dd</v-flex>
                              <v-flex xs4 class="fontbold">Current User</v-flex>
                              <v-flex xs8>dd</v-flex>
                              <v-flex xs4 class="fontbold">Required Action</v-flex>
                              <v-flex xs8>dd</v-flex>
                              <v-flex xs4 class="fontbold">Created by</v-flex>
                              <v-flex xs8>dd</v-flex>
                              <v-flex xs4 class="fontbold">Created Date</v-flex>
                              <v-flex xs8>dd</v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-title>
                      </v-card>
                      <!-- Data -->
                      <v-card flat v-show="n===2">
                        <v-card-title>
                          <h1 class="title">Application Information</h1>
                          <v-container grid-list-md text-xs-left>
                            <v-layout row wrap>
                              <v-flex xs4 class="fontbold">Product Type</v-flex>
                              <v-flex xs8>{{form.general_info.product_type}}</v-flex>
                              <v-flex xs4 class="fontbold">Primary Activity</v-flex>
                              <v-flex xs8>{{form.general_info.primary_activity}}</v-flex>
                              <v-flex xs4 class="fontbold">Declared Capital</v-flex>
                              <v-flex xs8>{{form.general_info.primary_capital}}</v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-title>
                        <v-card-title>
                          <h1 class="title">Establishment Information</h1>
                          <v-container grid-list-md text-xs-left>
                            <v-layout row wrap>
                              <v-flex xs4 class="fontbold">Name of Establishment</v-flex>
                              <v-flex xs8>{{form.estab_details.establishment_name}}</v-flex>
                              <v-flex xs4 class="fontbold">Establishment Owner</v-flex>
                              <v-flex xs8>{{form.estab_details.establishment_owner}}</v-flex>
                              <v-flex xs4 class="fontbold">TIN</v-flex>
                              <v-flex xs8>{{form.estab_details.tin}}</v-flex>
                              <v-flex xs4 class="fontbold">Contact Information</v-flex>
                              <v-flex xs8>Email: {{form.estab_details.email}}</v-flex>
                              <v-flex xs4></v-flex>
                              <v-flex xs8>Landline: {{form.estab_details.landline}}</v-flex>
                              <v-flex xs4></v-flex>
                              <v-flex xs8>Fax: {{form.estab_details.fax}}</v-flex>
                              <v-flex xs4></v-flex>
                              <v-flex xs8>Mobile: {{form.estab_details.mobile}}</v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-title>
                        <v-card-title>
                          <h1 class="title">Product Line</h1>
                          <v-container>
                            <v-layout row wrap>
                              <v-flex xs8></v-flex>
                              <v-flex xs4>
                                <em>Remarks (if any)</em>
                              </v-flex>
                            </v-layout>
                          </v-container>
                          <v-container
                            grid-list-md
                            text-xs-left
                            v-for="(item, index) in form.estab_details.products"
                            :key="index"
                          >
                            <v-layout row wrap>
                              <v-flex xs8 class="fontbold">{{item.prod_line}}</v-flex>
                              <v-flex xs4>{{item.remarks}}</v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-title>
                        <v-card-title>
                          <h1 class="title">Office Address</h1>
                          <v-container grid-list-md text-xs-left>
                            <v-layout row wrap>
                              <v-flex xs4 class="fontbold">Mailing Address</v-flex>
                              <v-flex
                                xs8
                              >{{form.addresses.office.address + " " + form.addresses.office.region + " " + form.addresses.office.province + " " + form.addresses.office.city + " " + form.addresses.office.zipcode}}</v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-title>
                        <v-card-title>
                          <h1 class="title">Authorized Officer</h1>
                          <v-container grid-list-md text-xs-left>
                            <v-layout row wrap>
                              <v-flex xs4 class="fontbold">Name</v-flex>
                              <v-flex
                                xs8
                              >{{form.auth_officer.lastname + ", " + form.auth_officer.firstname + " " + form.auth_officer.middlename }}</v-flex>
                              <v-flex xs4 class="fontbold">Designation</v-flex>
                              <v-flex xs8>{{form.auth_officer.designation}}</v-flex>
                              <v-flex xs4 class="fontbold">TIN</v-flex>
                              <v-flex xs8>{{form.auth_officer.tin}}</v-flex>
                              <v-flex xs4 class="fontbold">Birthday</v-flex>
                              <v-flex xs8>{{form.auth_officer.birthday}}</v-flex>
                              <v-flex xs4 class="fontbold">Government ID</v-flex>
                              <v-flex
                                xs8
                              >{{form.auth_officer.id_type + " " + form.auth_officer.id_number }}</v-flex>
                              <v-flex xs4 class="fontbold">Address</v-flex>
                              <v-flex
                                xs8
                              >{{form.auth_officer.mail_add.address + " " + form.auth_officer.mail_add.region + " " + form.auth_officer.mail_add.province + " " + form.auth_officer.mail_add.city + " " + form.auth_officer.mail_add.zipcode}}</v-flex>
                              <v-flex xs4 class="fontbold">ID Number</v-flex>
                              <v-flex xs8>{{form.auth_officer.id_number}}</v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-title>
                        <v-card-title>
                          <h1 class="title">Qualified Personnel</h1>
                        </v-card-title>
                        <v-container
                          grid-list-md
                          text-xs-left
                          v-for="(item, index) in form.qualified_personnel"
                          :key="index"
                        >
                          <v-data-table
                            v-model="form.qualified_personnel"
                            :headers="headers"
                            :items="items"
                            class="elevation-1"
                          >
                            <template slot="item" slot-scope="props">
                              <td>{{ props.item.name }}</td>
                              <td
                                class="text-xs-right"
                              >{{ props.item.firstname + "" +props.item.lastname +""+ props.item.middlename }}</td>
                              <td class="text-xs-right">{{ props.item.designation }}</td>
                              <td class="text-xs-right">{{ props.item.birthdate }}</td>
                              <td class="text-xs-right">{{ props.item.id_type }}</td>
                              <td class="text-xs-right">{{ props.item.id_no }}</td>
                            </template>
                          </v-data-table>
                        </v-container>
                      </v-card>

                      <!-- Uploaded Documents -->
                      <v-card flat v-show="n===3">
                        <v-card-title>
                          <h1 class="title">Uploaded Documents</h1>
                          <v-container grid-list-md text-xs-left>
                            <v-layout row wrap>
                              <v-flex xs4 class="fontbold"></v-flex>
                              <v-flex xs4 class="fontbold"></v-flex>
                              <v-flex xs4 class="fontbold"></v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-title>
                      </v-card>

                      <!-- Output Documents -->
                      <v-card flat v-show="n===4">
                        <v-card-title>
                          <h1 class="title">Uploaded Documents</h1>
                          <v-container grid-list-md text-xs-left>
                            <v-layout row wrap>
                              <v-flex xs4 class="fontbold"></v-flex>
                              <v-flex xs4 class="fontbold"></v-flex>
                              <v-flex xs4 class="fontbold"></v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-title>
                      </v-card>

                      <!-- Application History -->
                      <v-card flat v-show="n===5">
                        <v-card-title>
                          <h1 class="title">Application History</h1>
                          <v-container grid-list-md text-xs-left>
                            <v-layout row wrap>
                              <v-flex xs4 class="fontbold"></v-flex>
                              <v-flex xs4 class="fontbold"></v-flex>
                              <v-flex xs4 class="fontbold"></v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-title>
                      </v-card>

                      <!-- Payment Details -->
                      <v-card flat v-show="n===6">
                        <v-card-title>
                          <h1 class="title">Payment Summary</h1>
                          <v-container grid-list-md text-xs-left>
                            <v-layout row wrap>
                              <v-flex xs4 class="fontbold">Application Fee:</v-flex>
                              <v-flex xs8>dd</v-flex>
                              <v-flex xs4 class="fontbold">No. of year/s applied:</v-flex>
                              <v-flex xs8>dd</v-flex>
                              <v-flex xs4 class="fontbold">Surcharge:</v-flex>
                              <v-flex xs8>dd</v-flex>
                              <v-flex xs4 class="fontbold">Legal Research Fund (LRF):</v-flex>
                              <v-flex xs8>dd</v-flex>
                              <v-flex xs4 h4 class="fontbold">Total Payment Due:</v-flex>
                              <v-flex xs8>dd</v-flex>
                              <v-flex xs4 class="fontbold">Payment Receipt:</v-flex>
                              <v-flex xs8>
                                <a href="#">Receipt</a>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-title>
                      </v-card>
                      <!-- <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>-->
                    </v-card-text>
                  </v-card>
                </v-window-item>
              </v-window>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="error" @click="$emit('close')">Close</v-btn>
          <v-spacer></v-spacer>
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
  data: () => ({
    length: 3,
    window: 0,
    title: [
      "",
      "Summary",
      "Data",
      "Files",
      "Output Documents",
      "History",
      "Payment Details"
    ]
  })
};
</script>

<style>
</style>
