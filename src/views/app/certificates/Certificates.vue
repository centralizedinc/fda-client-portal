<template>
  <v-layout row wrap>
    <v-navigation-drawer v-model="overview" right temporary app width="400px">
      <!-- nav drawer details-->
      <v-toolbar dark color="primary">
        <span class="title font-weight-light">Application Overview</span>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <v-btn slot="activator" flat icon>
            <v-icon small dark @click="overview=false">fas fa-times-circle</v-icon>
          </v-btn>Close
        </v-tooltip>
      </v-toolbar>

      <v-layout row wrap>
        <v-flex xs12 pa-1>
          <v-card>
            <v-toolbar flat>
              <span class="subheading font-weight-light primary--text">Case Details</span>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <v-btn
                  :loading="loading"
                  slot="activator"
                  flat
                  icon
                  @click="loadForm(preview_item.application_id)"
                >
                  <v-icon color="primary">launch</v-icon>
                </v-btn>View Full Details
              </v-tooltip>
            </v-toolbar>
            <!-- <v-card-title primary-title>
            </v-card-title>-->
            <v-divider></v-divider>
            <v-card-text>
              <v-text-field
                name="name"
                label="Reference Number"
                id="id"
                readonly
                :value="preview_item.case_no"
              ></v-text-field>
              <v-text-field
                name="name"
                label="Application Type"
                id="id"
                readonly
                :value="getAppType(preview_item.application_type)"
              ></v-text-field>
              <v-text-field
                name="name"
                label="Date Applied"
                id="id"
                readonly
                :value="formatDate (preview_item.date_created)"
              ></v-text-field>
              <v-text-field
                name="name"
                label="Status"
                id="id"
                readonly
                :value="getAppStatus(preview_item.status)"
              ></v-text-field>
              <!-- <v-text-field
                name="name"
                label="Current Tasks"
                id="id"
                readonly
                :value="getTask(preview_item.current_task).name"
              ></v-text-field>-->
              <v-textarea
                rows="2"
                name="name"
                label="Remarks"
                id="id"
                readonly
                :value="preview_item.remarks"
              ></v-textarea>
            </v-card-text>
            <v-divider></v-divider>
            <v-footer flat height="50px">
              <v-spacer></v-spacer>
              <v-speed-dial
                v-model="fab"
                direction="left"
                open-on-hover
                transition="slide-x-reverse-transition"
              >
                <template v-slot:activator>
                  <v-tooltip top>
                    <v-btn small slot="activator" v-model="fab" color="fdaGreen" dark flat fab>
                      <v-icon>{{ fab ? "close" : "menu"}}</v-icon>
                    </v-btn>Actions
                  </v-tooltip>
                </template>
                <v-tooltip top>
                  <v-btn small slot="activator" fab dark color="fdaBlueGreen">
                    <v-icon>search</v-icon>
                  </v-btn>View Full Certificate
                </v-tooltip>
                <v-tooltip top>
                  <v-btn small slot="activator" fab dark color="fdaOrange">
                    <v-icon>edit</v-icon>
                  </v-btn>Amendment
                </v-tooltip>
                <v-tooltip top>
                  <v-btn small slot="activator" fab dark color="fdaMed">
                    <v-icon>autorenew</v-icon>
                  </v-btn>Renewal
                </v-tooltip>
                <v-tooltip top>
                  <v-btn small slot="activator" fab dark color="fdaYellow">
                    <v-icon>print</v-icon>
                  </v-btn>Print
                </v-tooltip>
              </v-speed-dial>
            </v-footer>

            <!-- <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="loading" outline color="secondary" @click="overview=false">Close</v-btn>
              <v-btn
                :loading="loading"
                color="primary"
                @click="loadForm(preview_item.application_id)"
              >View</v-btn>
            </v-card-actions>-->
          </v-card>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>

    <v-flex xs12 p1-2>
      <v-card>
        <undertaking-dialog :show="dialog" @proceed="launchAppForm" @close="closeDecDialog"></undertaking-dialog>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-actions
          class="elevation-1"
          :pagination.sync="pagination"
          :loading="loading"
        >
          <template slot="items" slot-scope="props">
            <tr @click="preview(props.item)" style="cursor:pointer">
              <td>{{props.item.case_no}}</td>
              <td>{{props.item.application_type}}</td>
              <td>{{props.item.status}}</td>
              <!-- <td>{{props.items.current_task}}</td> -->
              <!-- <td>{{ formatDate (props.item.date_created) }}</td> -->
              <td>{{ props.item.remarks }}</td>
            </tr>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
      </v-card>
    </v-flex>

    <!-- NEW CERTIFICATE -->
    <v-layout column class="fab-container">
      <v-tooltip top>
        <v-btn slot="activator" fab color="fdaLight" @click="dialog=true">
          <v-icon large color="fdaSilver">add</v-icon>
        </v-btn>Apply New
      </v-tooltip>
    </v-layout>
  </v-layout>
</template>

<script>
import Undertaking from "./create/tabs/UndertakingDialog";
import { log } from "util";

export default {
  components: {
    UndertakingDialog: () => import("./create/tabs/UndertakingDialog")
  },
  data() {
    return {
      // preview: {},
      // isLoading: false,
      preview_item: {},
      overview: null,
      fab: false,
      dialogView: false,
      initial: false,
      selected_case: {},
      loading: false,
      dialog: false,
      pagination: {
        sortBy: "date_created",
        descending: true
      },
      details: {
        license_details: {},
        case_details: {}
      },
      headers: [
        { text: "Case No", value: "case_no" },
        { text: "Application Type", value: "application_type" },
        { text: "Status", value: "status", sortable: true },
        // { text: "Current Task", value: "current_task" },
        // { text: "Date Created", value: "date_created" },
        { text: "Remarks", value: "remarks" }
      ],
      items: [
        // {
        //   case_no: "00",
        //   application_type: "sample application",
        //   status: "Initial",
        //   // current_task: "sample task",
        //   date_created: "01/01/2019",
        //   remarks: "this is a remark"
        // }
      ]
    };
  },
  created() {
    this.init();
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;
      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  },
  methods: {
    init() {
      console.log("welcome to certificates!!!");
      this.loading = true;
      this.$store
        .dispatch("GET_CERTIFICATE")
        .then(results => {
          this.loading = false;
          this.items = results;
          console.log(
            "############## ACTIVE CERTIFICATES: " + JSON.stringify(this.items)
          );
          return this.$store.dispatch("GET_FOOD_PRODUCT");
        })
        .then(result => {
          // this.food_product = this.$store.state.foodCertificate.food_product
          console.log(
            "####food Product###" +
              JSON.stringify(this.$store.state.foodCertificate.food_product)
          );
          return this.$store.dispatch("GET_FOOD_CATEGORY");
        })
        .then(result => {
          // this.category = this.$store.state.foodCertificate.food_category
          console.log(
            "####food category###" +
              JSON.stringify(this.$store.state.foodCertificate.food_category)
          );
          return this.$store.dispatch("GET_REGION");
        })
        .then(result => {
          return this.$store.dispatch("GET_SHELF_LIFE");
        })
        .then(result => {
          // this.shelf_life = this.$store.state.foodCertificate.shelf_life
          console.log(
            "####shelf life###" +
              JSON.stringify(this.$store.state.foodCertificate.shelf_life)
          );
          return this.$store.dispatch("GET_SOURCE");
        })
        .then(result => {
          // this.source = this.$store.state.foodCertificate.source
          console.log(
            "####source###" +
              JSON.stringify(this.$store.state.foodCertificate.source)
          );
          return this.$store.dispatch("GET_PRODUCT_SPECIFICATION");
        })
        .then(result => {
          // this.product_specification = this.$store.state.foodCertificate.product_specification
          console.log(
            "####product specification###" +
              JSON.stringify(
                this.$store.state.foodCertificate.product_specification
              )
          );
          return this.$store.dispatch("GET_NUTRITION_INFORMATION");
        })
        .then(result => {
          // this.nutrition_information = this.$store.state.foodCertificate.nutrition_information
          console.log(
            "####nutrition information###" +
              JSON.stringify(
                this.$store.state.foodCertificate.nutrition_information
              )
          );
          return this.$store.dispatch("GET_NUTRITION_HEALTH_CLAIMS");
        })
        .then(result => {
          // this.nutrition_health_claims = this.$store.state.foodCertificate.nutrition_health_claims
          console.log(
            "####nutrition health claims###" +
              JSON.stringify(
                this.$store.state.foodCertificate.nutrition_health_claims
              )
          );
          return this.$store.dispatch("GET_VITAMINS");
        })
        .then(result => {
          // this.vitamins = this.$store.state.foodCertificate.vitamins
          console.log(
            "####Vitamins###" +
              JSON.stringify(this.$store.state.foodCertificate.vitamins)
          );
          return this.$store.dispatch("GET_MINERALS");
        })
        .then(result => {
          // this.minerals = this.$store.state.foodCertificate.minerals
          console.log(
            "####minerals###" +
              JSON.stringify(this.$store.state.foodCertificate.minerals)
          );
          return this.$store.dispatch("GET_ORIGIN");
        })
        .then(result => {
          // this.origin = this.$store.state.places.origin
          console.log(
            "####origin###" + JSON.stringify(this.$store.state.places.origin)
          );
          return this.$store.dispatch("GET_PHYSICAL_PARAMETER");
        })
        .then(result => {
          // this.physical_parameter = this.$store.state.foodCertificate.physical_parameter
          console.log(
            "####physical parameter###" +
              JSON.stringify(
                this.$store.state.foodCertificate.physical_parameter
              )
          );
          return this.$store.dispatch("GET_COMPANY_ACTIVITY");
        })
        .then(result => {
          // this.company_activity = this.$store.state.foodCertificate.company_activity
          console.log(
            "####company activity###" +
              JSON.stringify(this.$store.state.foodCertificate.company_activity)
          );
        })

        .catch(error => {
          this.loading = false;
        });
    },
    launchAppForm() {
      console.log("launch application form");
      this.$router.push("/app/certificates/apply");
    },
    closeDecDialog() {
      this.dialog = false;
    },
    loadForm(application_id) {
      console.log("#########loadform");

      // this.preview = item;
      this.loading = true;
      // this.$store
      //   .dispatch("GET_CERTIFICATE_BY_CASE_NO", application_id)
      //   .then(result => {
      //     this.loading = false;
      //     if (result.data.success) {
      //       console.log(
      //         "certificate preview: " + JSON.stringify(result.data.model)
      //       );
      this.$router.push("/app/certificates/overview");
      //     } else console.log("result.data.errors :", result.data.errors);
      //   })
      //   .catch(err => {
      //     this.loading = false;
      //     console.log("###loadForm err :", err);
      //   });
    },
    preview(item) {
      console.log("preview data: " + JSON.stringify(item));
      this.$store.commit("SET_VIEW_CERTIFICATE", item);
      this.preview_item = item;
      this.overview = true;
    },
    viewForm() {
      // this.$store.commit("SET_VIEW_LICENSE", this.details.license_details);
      this.$router.push("/app/certificates/overview");
    }
  }
};
</script>

<style>
.data-row:hover {
  cursor: pointer;
}
</style>
