<template>
  <v-layout row wrap>
    <v-card width="calc(100% - 0px">
      <v-card-title primary-title class="font-weight-light headline">Application Overview</v-card-title>
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
            <v-window v-model="window" class="elevation-5 mt-3" style="border-radius: 8px" vertical>
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
                      <v-container grid-list-md text-xs-left>
                        <v-layout row wrap>
                          <v-flex xs4 class="subheading">Case Number</v-flex>
                          <v-flex xs8>{{form.case_no}}</v-flex>
                          <v-flex xs4 class="subheading">App Type</v-flex>
                          <v-flex xs8>{{form.application_type}}</v-flex>
                          <v-flex xs4 class="subheading">Establishment</v-flex>
                          <v-flex xs8>{{form.estab_details.establishment_name}}</v-flex>
                          <v-flex xs4 class="subheading">Product Type</v-flex>
                          <v-flex xs8>{{form.general_info.product_type}}</v-flex>
                          <v-flex xs4 class="subheading">Primary Activity</v-flex>
                          <v-flex xs8>{{form.general_info.primary_activity}}</v-flex>
                          <v-flex xs4 class="subheading">Current Task</v-flex>
                          <v-flex xs8>{{form.current_task}}</v-flex>
                          <v-flex xs4 class="subheading">Current User</v-flex>
                          <v-flex xs8>{{form.user}}</v-flex>
                          <v-flex xs4 class="subheading">Required Action</v-flex>
                          <v-flex xs8>{{form.action}}</v-flex>
                          <v-flex xs4 class="subheading">Created by</v-flex>
                          <v-flex xs8>{{form.created_by}}</v-flex>
                          <v-flex xs4 class="subheading">Created Date</v-flex>
                          <v-flex xs8>{{form.date_created}}</v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>

                    <!-- Data -->
                    <v-card flat v-show="window===1">
                      <v-container grid-list-md text-xs-left>
                        <v-layout row wrap>
                          <v-flex
                            xs12
                            class="headline mt-2 mb-4 pt-3 font-weight-thin"
                            style="padding: 2px"
                          >Application Information</v-flex>
                          <v-flex xs4 class="subheading">Product Type</v-flex>
                          <v-flex xs8>{{form.general_info.product_type}}</v-flex>
                          <v-flex xs4 class="subheading">Primary Activity</v-flex>
                          <v-flex xs8>{{form.general_info.primary_activity}}</v-flex>
                          <v-flex xs4 class="subheading">Declared Capital</v-flex>
                          <v-flex xs8>{{form.general_info.primary_capital}}</v-flex>
                          <!-- Establishment Info -->
                          <v-flex
                            xs12
                            class="headline mt-2 mb-4 pt-3 font-weight-thin"
                            style="padding: 2px"
                          >Establishment Information</v-flex>
                          <v-flex xs4 class="subheading">Name of Establishment</v-flex>
                          <v-flex xs8>{{form.estab_details.establishment_name}}</v-flex>
                          <v-flex xs4 class="subheading">Establishment Owner</v-flex>
                          <v-flex xs8>{{form.estab_details.establishment_owner}}</v-flex>
                          <v-flex xs4 class="subheading">TIN</v-flex>
                          <v-flex xs8>{{form.estab_details.tin}}</v-flex>
                          <v-flex xs4 class="subheading">Contact Information</v-flex>
                          <v-flex xs8>Email: {{form.estab_details.email}}</v-flex>
                          <v-flex xs4></v-flex>
                          <v-flex xs8>Landline: {{form.estab_details.landline}}</v-flex>
                          <v-flex xs4></v-flex>
                          <v-flex xs8>Fax: {{form.estab_details.fax}}</v-flex>
                          <v-flex xs4></v-flex>
                          <v-flex xs8>Mobile: {{form.estab_details.mobile}}</v-flex>
                          <!-- Product Line -->
                          <v-flex
                            xs12
                            class="headline mt-2 mb-4 pt-3 font-weight-thin"
                            style="padding: 2px"
                          >Product Line</v-flex>
                          <v-container
                            grid-list-md
                            text-xs-left
                            v-for="(item, index) in form.estab_details.products"
                            :key="index"
                          >
                            <v-layout row wrap>
                              <v-flex xs8 class="subheading">{{item.prod_line}}</v-flex>
                              <v-flex xs4>{{item.remarks}}</v-flex>
                            </v-layout>
                          </v-container>
                          <!-- Office Address -->
                          <v-flex
                            xs12
                            class="headline mt-2 mb-4 pt-3 font-weight-thin"
                            style="padding: 2px"
                          >Office Address</v-flex>
                          <v-container grid-list-md text-xs-left>
                            <v-layout row wrap>
                              <v-flex xs4 class="subheading">Mailing Address</v-flex>
                              <v-flex
                                xs8
                              >{{form.addresses.office.address + " " + form.addresses.office.region + " " + form.addresses.office.province + " " + form.addresses.office.city + " " + form.addresses.office.zipcode}}</v-flex>
                            </v-layout>
                          </v-container>
                          <!-- Authorized Officer -->
                          <v-flex
                            xs12
                            class="headline mt-2 mb-4 pt-3 font-weight-thin"
                            style="padding: 2px"
                          >Authorized Officer</v-flex>
                          <v-container grid-list-md text-xs-left>
                            <v-layout row wrap>
                              <v-flex xs4 class="subheading">Name</v-flex>
                              <v-flex
                                xs8
                              >{{form.auth_officer.lastname + ", " + form.auth_officer.firstname + " " + form.auth_officer.middlename }}</v-flex>
                              <v-flex xs4 class="subheading">Designation</v-flex>
                              <v-flex xs8>{{form.auth_officer.designation}}</v-flex>
                              <v-flex xs4 class="subheading">TIN</v-flex>
                              <v-flex xs8>{{form.auth_officer.tin}}</v-flex>
                              <v-flex xs4 class="subheading">Birthday</v-flex>
                              <v-flex xs8>{{form.auth_officer.birthday}}</v-flex>
                              <v-flex xs4 class="subheading">Government ID</v-flex>
                              <v-flex
                                xs8
                              >{{form.auth_officer.id_type + " - " + form.auth_officer.id_no}}</v-flex>
                              <v-flex xs4 class="subheading">Address</v-flex>
                              <v-flex
                                xs8
                              >{{form.auth_officer.mail_add.address + " " + form.auth_officer.mail_add.region + " " + form.auth_officer.mail_add.province + " " + form.auth_officer.mail_add.city + " " + form.auth_officer.mail_add.zipcode}}</v-flex>
                            </v-layout>
                          </v-container>
                          <!-- Qualified Personnel -->
                          <v-flex
                            xs12
                            class="headline mt-2 mb-4 pt-3 font-weight-thin"
                            style="padding: 2px"
                          >Qualified Personnel</v-flex>
                          <v-layout row wrap>
                            <v-flex xs12>
                              <v-data-table
                                :headers="headers"
                                :items="form.qualified_personnel"
                                class="elevation-1"
                              >
                                <template slot="items" slot-scope="props">
                                  <td>{{props.item.firstname + " " + props.item.lastname }}</td>
                                  <td>{{props.item.designation}}</td>
                                  <td>{{props.item.birthday}}</td>
                                  <td>{{props.item.tin}}</td>
                                  <td>{{props.item.id_type + "-" + props.item.id_no}}</td>
                                  <td></td>
                                </template>
                              </v-data-table>
                            </v-flex>
                          </v-layout>
                        </v-layout>
                      </v-container>
                    </v-card>

                    <!-- Uploaded Documents -->
                    <v-card flat v-show="window===2">
                      <v-container grid-list-md text-xs-left>
                        <v-layout row wrap>
                          <slot name="uploadedfiles"></slot>
                        </v-layout>
                      </v-container>
                    </v-card>

                    <!-- Output Documents -->
                    <v-card flat v-show="window===3">
                      <v-container grid-list-md text-xs-left>
                        <v-layout row wrap>
                          <slot name="outputdocs"></slot>
                        </v-layout>
                      </v-container>
                    </v-card>

                    <!-- Application History -->
                    <v-card flat v-show="window===4">
                      <v-container grid-list-md text-xs-left>
                        <v-layout row wrap>
                          <slot name="apphistory"></slot>
                        </v-layout>
                      </v-container>
                    </v-card>

                    <!-- Payment Details -->
                    <v-card flat v-show="window===5">
                      <v-container grid-list-md text-xs-left>
                        <v-layout row wrap>
                          <slot name="paymentdetails"></slot>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="success">submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  props: ["form"],
  data() {
    return {
      length: 3,
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
        "",
        "Summary",
        "Application Data",
        "Uploaded Files",
        "Output Documents",
        "History",
        "Payment Details"
      ],
      form: null
    };
  },
  created() {
    this.form = this.$store.state.licenses.form;
    console.log("VIEW ########################: " + JSON.stringify(this.form));
  }
};
</script>

<style>
</style>
