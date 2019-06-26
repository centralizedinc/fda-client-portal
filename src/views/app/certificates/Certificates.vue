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
                <v-btn :loading="loading" slot="activator" flat icon @click="loadForm(0)">
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
                readonly
                :value="getAppType(preview_item.application_type, preview_item.case_type)"
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
                :value="getAppStatusCert(preview_item.status)"
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
                    <v-btn small slot="activator" color="fdaGreen" dark flat fab>
                      <v-icon>{{ fab ? "close" : "menu"}}</v-icon>
                    </v-btn>Actions
                  </v-tooltip>
                </template>
                <v-tooltip top>
                  <v-btn small slot="activator" fab dark color="fdaBlueGreen" @click="loadForm(0)">
                    <v-icon>search</v-icon>
                  </v-btn>View Full Certificate
                </v-tooltip>
                <v-tooltip top>
                  <v-btn small slot="activator" fab dark color="fdaOrange" @click="loadForm(1)">
                    <v-icon>edit</v-icon>
                  </v-btn>Amendment
                </v-tooltip>
                <v-tooltip top>
                  <v-btn small slot="activator" fab dark color="fdaMed" @click="loadForm(2)">
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
          </v-card>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>

    <v-flex xs12 p1-2>
      <v-card>
        <v-card-title>
          <v-btn color="success" @click="loadItems(true)">
            REFRESH
            <v-icon dark right>refresh</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-text-field
            outline
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <undertaking-dialog :show="dialog" @proceed="launchAppForm" @close="closeDecDialog"></undertaking-dialog>
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
          :pagination.sync="pagination"
          :loading="loading"
          :rows-per-page-items="rowsPerPageItems"
          :search="search"
        >
          <template slot="items" slot-scope="props">
            <tr @click="preview(props.item)" style="cursor:pointer">
              <td>{{props.item.case_no}}</td>
              <td>{{props.item.certificate_no}}</td>
              <td>{{getAppType(props.item.application_type, props.item.case_type)}}</td>
              <td>{{getAppStatus(props.item.status)}}</td>
              <!-- <td>{{props.items.current_task}}</td> -->
              <!-- <td>{{ formatDate (props.item.date_created) }}</td> -->
              <td>{{ getCertStatus(props.item.certificate_status) }}</td>
            </tr>
          </template>
          <template v-slot:no-data>
            <v-alert :value="!loading" color="error" icon="warning">No data found</v-alert>
          </template>
        </v-data-table>
        <!-- <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>-->
      </v-card>
    </v-flex>

    <!-- NEW CERTIFICATE -->
    <v-layout column class="fab-container pb-5">
      <v-tooltip top>
        <v-btn slot="activator" fab elevation-15 color="fdaLight" @click="dialog=true">
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
      search: "",
      preview_item: {},
      overview: null,
      fab: false,
      data_complete: false,
      dialogView: false,
      initial: false,
      selected_case: {},
      loading: false,
      dialog: false,
      rowsPerPageItems: [10, 20, 30, 40],
      pass_to: 0,
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
        { text: "Certificate No", value: "certificate_no" },
        { text: "Application Type", value: "application_type" },
        { text: "Status", value: "status", sortable: true },
        { text: "Remarks", value: "certificate_status" }
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
    },
    items() {
      return this.$store.state.certificate.certificates;
    }
  },
  methods: {
    init() {
      console.log("welcome to certificates!!!");
      this.loading = true;
      this.$store.dispatch("GET_FOOD_PRODUCT");
      this.$store.dispatch("GET_FOOD_CATEGORY");
      this.$store.dispatch("GET_REGION");
      this.$store.dispatch("GET_SHELF_LIFE");
      this.$store.dispatch("GET_SOURCE");
      this.$store.dispatch("GET_PRODUCT_SPECIFICATION");
      this.$store.dispatch("GET_NUTRITION_INFORMATION");
      this.$store.dispatch("GET_NUTRITION_HEALTH_CLAIMS");
      this.$store.dispatch("GET_VITAMINS");
      this.$store.dispatch("GET_MINERALS");
      this.$store.dispatch("GET_ORIGIN");
      this.$store.dispatch("GET_PHYSICAL_PARAMETER");
      this.$store.dispatch("GET_COMPANY_ACTIVITY");
      this.loadItems();
    },
    loadItems(refresh) {
      this.loading = true;
      this.data_complete = false;
      console.log("isRefresh :", refresh);
      this.$store
        .dispatch("GET_CERTIFICATE", refresh)
        .then(results => {
          console.log("done in loading");
          this.loading = false;
          this.data_complete = true;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    launchAppForm() {
      console.log("launch application form");
      if (this.pass_to === 1) {
        this.$router.push("/app/certificates/variation");
      } else if (this.pass_to === 2) {
        this.$router.push("/app/certificates/renew");
      } else {
        this.$router.push("/app/certificates/apply");
      }
    },
    closeDecDialog() {
      this.dialog = false;
    },
    loadForm(redirect_to) {
      this.loading = true;
      this.$store
        .dispatch("GET_CERTIFICATE_BY_CASE_NO", this.preview_item.case_no)
        .then(result => {
          console.log(
            "this is certificate by case no: " + JSON.stringify(result)
          );
          this.loading = false;
          if (redirect_to === 0) {
            this.$router.push("/app/certificates/overview");
          } else {
            this.dialog = true;
            this.pass_to = redirect_to;
          }
        })
        .catch(err => {
          this.loading = false;
          console.log("###loadForm err :", err);
        });
    },
    preview(item) {
      this.preview_item = item;
      this.overview = true;
    },
    getCertStatus(status) {
      var st = [
        "",
        "Active",
        "",
        "Inactive",
        "Expired",
        "",
        "Inactive",
        "For Ammendment"
      ];
      return st[status];
    }
  }
};
</script>

<style>
.data-row:hover {
  cursor: pointer;
}
</style>
