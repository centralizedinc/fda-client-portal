<template>
  <v-layout row wrap>
    <v-navigation-drawer v-model="overview" right temporary app width="400px">
      <v-toolbar dark color="primary">
        <span class="title font-weight-light">Application Overview</span>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <v-btn
            :loading="isLoading"
            slot="activator"
            flat
            icon
            @click="loadForm(preview_item.application_id)"
          >
            <v-icon>launch</v-icon>
          </v-btn>View Full Details
        </v-tooltip>
      </v-toolbar>
      <v-layout row wrap>
        <v-flex xs12 pa-1>
          <v-card>
            <v-card-title primary-title>
              <span class="subheading font-weight-light primary--text">Case Details</span>
            </v-card-title>
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
              ></v-text-field> -->
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
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="isLoading" outline color="secondary" @click="overview=false">Close</v-btn>
              <v-btn
                :loading="isLoading"
                color="primary"
                @click="loadForm(preview_item.application_id)"
              >View</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <!-- <v-layout row wrap>
        <v-flex xs12 pa-1>
          <v-card>
            <v-card-title primary-title>
              <span class="subheading font-weight-light primary--text">Case Details</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-text-field name="name" label="Reference Number" id="id" readonly></v-text-field>
              <v-text-field name="name" label="Application Type" id="id" readonly></v-text-field>
              <v-text-field name="name" label="Date Applied" id="id" readonly></v-text-field>
              <v-text-field name="name" label="Status" id="id" readonly></v-text-field>
              <v-text-field name="name" label="Current Tasks" id="id" readonly></v-text-field>
              <v-textarea rows="2" name="name" label="Remarks" id="id" readonly></v-textarea>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="loading" outline color="secondary">Close</v-btn>
              <v-btn :loading="loading" color="primary">View</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout> -->
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
          :loading="true"
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
      isLoading: false,
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
        { text: "Type", value: "application_type" },
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
          this.Loading = false;
          this.items = results;
          console.log(
            "############## ACTIVE CERTIFICATES: " + JSON.stringify(this.items)
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
    loadForm(item) {
      this.preview = item;
      this.overview = true;
      this.$router.push("/app/certificates/overview");
    },
    preview(item) {
      this.preview_item = item;
      this.overview = true;
    },
    viewForm() {
      this.$store.commit("SET_VIEW_LICENSE", this.details.license_details);
      this.$router.push("/app/certificates/overview");
    }
    // loadForm(application_id) {
    //   this.isLoading = true;
    //   this.$store
    //     .dispatch("GET_LICENSE_BY_ID", application_id)
    //     .then(result => {
    //       this.isLoading = false;
    //       if (result.data.success) {
    //         console.log(
    //           "get license data: " + JSON.stringify(result.data.model)
    //         );
    //         this.$store.commit("SET_VIEW_LICENSE", result.data.model);
    //         this.$store.commit("SET_VIEW_CASE", this.preview_item);
    //         console.log(
    //           "CASE ACTIVITIES: " + JSON.stringify(this.preview_item)
    //         );

    //         this.$router.push("/app/certificates/overview");
    //       } else console.log("result.data.errors :", result.data.errors);
    //     })
    //     .catch(err => {
    //       this.isLoading = false;
    //       console.log("###loadForm err :", err);
    //     });
    // }
  }
};
</script>

<style>
.data-row:hover {
  cursor: pointer;
}
</style>
