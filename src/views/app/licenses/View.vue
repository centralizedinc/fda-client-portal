<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <!-- <v-toolbar color="primary" style="background: linear-gradient(45deg, #f58555 0%, #b5c25a 100%); box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5)">
                            <span class="font-weight-light title">View License</span>
        </v-toolbar>-->
        <!-- <v-card-title primary-title class="headline">Application Overview</v-card-title> -->
        <v-card-text>
          <v-layout align-center>
            <v-flex xs2 mr-5 pr-5 align-center>
              <v-item-group v-model="window" class="shrink mr-4" mandatory tag="v-flex">
                <v-item v-for="n in title.length" :key="n">
                  <div slot-scope="{ active, toggle }">
                    <v-btn :input-value="active" flat align-center @click="toggle">
                      <!-- <v-icon>mdi-record</v-icon> -->
                      {{title[n]}}
                    </v-btn>
                  </div>
                </v-item>
              </v-item-group>
              <v-spacer></v-spacer>
            </v-flex>
            <v-flex xs10>
              <v-window v-model="window" class="elevation-1" vertical>
                <v-window-item v-for="n in title.length" :key="n">
                  <v-card flat>
                    <v-card-text>
                      <v-layout align-center mb-3>
                        <!-- <v-avatar color="grey" class="mr-3"></v-avatar> -->
                        <strong class="title">{{ title[n] }}</strong>
                        <v-spacer></v-spacer>
                        <!-- <v-btn icon>
                                                    <v-icon>mdi-account</v-icon>
                        </v-btn>-->
                      </v-layout>
                      <!-- Summary-->
                      <v-card flat v-show="n===1">
                        <v-card-title>
                          <h3 class="title">APPLICATION SUMMARY</h3>
                          <v-container grid-list-md text-xs-left>
                            <v-layout row wrap>
                              <v-flex xs4 class="fontbold">Case Number</v-flex>
                              <v-flex xs8>{{form.case_no}}</v-flex>
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
                          <!-- <v-data-table
                                                        headers="headers"
                                                        items="items"
                                                        hide-actions
                                                        class="elevation-1"
                                                        >
                                                        <template slot="items" slot-scope="{{item}}">
                                                            <td></td>
                                                            <td class="text-xs-right">{{ item.firstname + "" +item.lastname +""+ item.middlename }}</td>
</template>
                          </v-data-table>-->
                          <md-table v-model="form.qualified_personnel" md-sort-order="asc">
                            <md-table-row slot="md-table-row" slot-scope="{ item }">
                              <md-table-cell
                                md-label="Name"
                                md-sort-by="name"
                              >{{ item.firstname + "" +item.lastname +""+ item.middlename }}</md-table-cell>
                              <md-table-cell
                                md-label="Designation"
                                md-sort-by="designation"
                              >{{ item.designation }}</md-table-cell>
                              <md-table-cell
                                md-label="Birthdate"
                                md-sort-by="birthdate"
                              >{{ item.birthdate }}</md-table-cell>
                              <md-table-cell md-label="TIN" md-sort-by="tin">{{ item.tin }}</md-table-cell>
                              <md-table-cell
                                md-label="Government ID"
                                md-sort-by="id"
                              >{{ item.id_type}}</md-table-cell>
                              <md-table-cell md-label="ID Number" md-sort-by="no">{{ item.id_no }}</md-table-cell>
                            </md-table-row>
                          </md-table>
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
                    </v-card-text>
                  </v-card>
                </v-window-item>
              </v-window>
            </v-flex>
          </v-layout>
        </v-card-text>
        <!-- <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="error" @click="$emit('close')">Close</v-btn>
                    <v-spacer></v-spacer>
        </v-card-actions>-->
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {  
  data() {
    return {
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
      ],
      form: null
      // form: {
      //   application_type: "",
      //   general_info: {
      //     product_type: "",
      //     primary_activity: "",
      //     declared_capital: ""
      //   },
      //   estab_details: {
      //     establishment_name: "",
      //     establishment_owner: "",
      //     tin: "",
      //     email: "",
      //     landline: "",
      //     fax: "",
      //     mobile: "",
      //     products: [
      //       {
      //         prod_line: "",
      //         remarks: ""
      //       }
      //     ]
      //   },
      //   addresses: {
      //     office: {
      //       address: "",
      //       region: "",
      //       province: "",
      //       city: "",
      //       zipcode: "",
      //       location: ""
      //     },
      //     warehouse: [],
      //     plant: {
      //       address: "",
      //       region: "",
      //       province: "",
      //       city: "",
      //       zipcode: ""
      //     }
      //   },
      //   auth_officer: {
      //     mail_add: {
      //       address: "",
      //       region: "",
      //       province: "",
      //       city: "",
      //       zipcode: ""
      //     },
      //     lastname: "",
      //     firstname: "",
      //     middlename: "",
      //     designation: "",
      //     tin: "",
      //     birthday: "",
      //     id_type: "",
      //     id_no: "",
      //     id_expiry: ""
      //   }
      // }
    };
  },
  created(){
    this.form = this.$store.state.licenses.form
    console.log("VIEW ########################: " + JSON.stringify(this.form))
  }
};
</script>

<style>
</style>
