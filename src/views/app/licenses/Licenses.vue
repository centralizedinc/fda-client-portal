<template >
  <div>
    <v-layout row wrap>
      <v-navigation-drawer v-model="overview" right temporary app width="400px">
        <v-toolbar dark color="primary">
          <span class="title font-weight-light">Application Overview</span>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <v-btn :loading="isLoading" slot="activator" flat icon @click="loadForm(preview_item.application_id)">
              <v-icon>launch</v-icon>
            </v-btn>
              View Full Details
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
                  :value="preview_item.case_no"
                ></v-text-field>
                <v-text-field
                  name="name"
                  label="Application Type"
                  id="id"
                  :value="getAppType(preview_item.application_type)"
                ></v-text-field>
                <v-text-field
                  name="name"
                  label="Date Applied"
                  id="id"
                  :value="formatDate (preview_item.date_created)"
                ></v-text-field>
                <v-text-field
                  name="name"
                  label="Status"
                  id="id"
                  :value="getAppStatus(preview_item.status)"
                ></v-text-field>
                <v-text-field
                  name="name"
                  label="Current Tasks"
                  id="id"
                  :value="getTask(preview_item.current_task).name"
                ></v-text-field>                                 
                <v-textarea rows="2"
                  name="name"
                  label="Remarks"
                  id="id"
                  :value="preview_item.remarks"
                ></v-textarea>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="isLoading" outline color="primary" @click="overview=false">Close</v-btn>
              <v-btn :loading="isLoading" color="primary" @click="loadForm(preview_item.application_id)">View</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        </v-layout>
        
        
        
      </v-navigation-drawer>
      <!-- ACTIVE LICENSE -->
      <active-license
        menu
        @view="viewForm"
        @variate="variateForm"
        @renew="renewForm"
        @print="confirmPrinting"
      ></active-license>

      <!-- HISTORY CASES -->
      <v-flex xs12 pa-2>
        <v-card>
          <v-card-title
            text-md-center
            class="headline font-weight-thin"
            style="text-transform: uppercase"
          >Application History</v-card-title>
          <v-divider></v-divider>
          <v-data-table
            :pagination.sync="pagination"
            :headers="headers"
            hide-actions
            :items="details.cases"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <!-- <tr @click="loadForm(props.item.application_id)" class="data-row"> -->
              <tr @click="preview(props.item)" style="cursor:pointer">
                <td>{{ props.item.case_no }}</td>
                <td>{{ getAppType(props.item.application_type) }}</td>
                <td
                  :class="`${getAppStatusColor(props.item.status)}--text`"
                >{{ getAppStatus(props.item.status) }}</td>
                <td>{{ getTask(props.item.current_task).name }}</td>
                <!-- <td>{{ getUsername(props.item.current_assigned_user) }}</td> -->
                <td>{{ formatDate (props.item.date_created) }}</td>
                <td>{{ props.item.remarks }}</td>
              </tr>
            </template>
          </v-data-table>
          <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
          </div>
        </v-card>
      </v-flex>

      <!-- NEW LICENSE -->
      <!-- <v-layout column class="fab-container">
        <v-tooltip top>
          <v-btn slot="activator" fab color="fdaLight" @click="newLicense">
            <v-icon large color="fdaSilver">add</v-icon>
          </v-btn>Apply New
        </v-tooltip>
      </v-layout> -->

      <!-- DIALOGS -->
      <undertaking-dialog :show="dialog" @proceed="launchAppForm" @close="dialog = false"></undertaking-dialog>
      <v-dialog v-model="printDialog" persistent max-width="300px" transition="dialog-transition">
        <v-card>
          <v-toolbar
            dark
            color="fdaGreen"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >
            <span class="font-weight-light headline">Confirm Printing</span>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <v-btn slot="activator" flat icon color="black" @click="printDialog = false">
                <v-icon small>fas fa-times-circle fa-1x</v-icon>
              </v-btn>Close
            </v-tooltip>
          </v-toolbar>
          <v-card-text class="subheading font-weight-light">
            Please take note that:
            <ol>
              <li>
                This printed License is
                <b>UNOFFICIAL</b> and for reference purposes only
              </li>
              <li>This is not your Official Electronic License</li>
              <li>This license cannot be Display in Public View</li>
            </ol>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" class="font-weight-light" flat @click="printLicense">Ok</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  components: {
    ActiveLicense: () => import("@/components/ActiveLicense.vue"),
    UndertakingDialog: () => import("@/components/UndertakingDialog")
  },
  data() {
    return {
      isLoading: false,
      preview_item: {},
      overview: null,
      fab: false,
      dialog: false,
      printDialog: false,
      dialogView: false,
      initial: false,
      selected_case: {},
      pagination: {
        sortBy: 'date_created',
        descending: true
      },
      details: {
        license_details: {},
        case_details: {}
      },
      mode: 0, // 0 - new, 1 - variation, 2 - renewal
      headers: [
        { text: "Case No", value: "case_no" },
        { text: "Type", value: "application_type" },
        { text: "Status", value: "status", sortable: true },
        { text: "Current Task", value: "current_task" },
        // { text: "Current User", value: "current_assigned_user" },
        { text: "Date Created", value: "date_created" },
        { text: "Remarks", value: "remarks" }
      ],
      tasks: []
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
      this.details = this.$store.state.licenses.details;
      this.$store
        .dispatch("GET_ACTIVE_AND_CASES")
        .then(result => {
          this.details = result;
          console.log('##### DETAILS: '+JSON.stringify(this.details))
          return this.$store.dispatch("GET_TASKS");
        })
        .then(result => {
          console.log("result :", result);
        })
        .catch(err => {
          console.log("err :", err);
        });
    },
    viewForm() {
      this.$store.commit("SET_VIEW_LICENSE", this.details.license_details);
      this.$router.push("/app/licenses/view");
    },
    newLicense() {
      this.mode = 0;
      this.dialog = true;
    },
    renewForm() {
      this.mode = 2;
      this.$store.commit("SET_RENEWAL", this.details.license_details);
      this.dialog = true;
    },
    variateForm() {
      this.mode = 1;
      this.$store.commit("SET_VARIATION", this.details.license_details);
      this.dialog = true;
    },
    loadForm(application_id) {
      this.isLoading = true;
      this.$store
        .dispatch("GET_LICENSE_BY_ID", application_id)
        .then(result => {
          this.isLoading = false;
          if (result.data.success) {
            console.log(
              "get license data: " + JSON.stringify(result.data.model)
            );
            this.$store.commit("SET_VIEW_LICENSE", result.data.model);
            this.$store.commit("SET_VIEW_CASE", this.preview_item);
            console.log('CASE ACTIVITIES: '+JSON.stringify(this.preview_item))

            this.$router.push("/app/licenses/view");
          } else console.log("result.data.errors :", result.data.errors);
        })
        .catch(err => {
          this.isLoading = false;
          console.log("###loadForm err :", err);
        });
    },
    launchAppForm() {
      if (this.mode === 0) {
        this.$router.push("/app/licenses/apply");
      } else if (this.mode === 1) {
        this.$router.push("/app/licenses/variation");
      } else if (this.mode === 2) {
        this.$router.push("/app/licenses/renew");
      }
    },
    confirmPrinting() {
      this.selected_case = this.details.case_details;
      console.log(
        "JSON.stringify(this.selected_case) :",
        JSON.stringify(this.selected_case)
      );
      this.printDialog = true;
    },
    printLicense() {
      this.$store
        .dispatch("GET_LICENSE_BY_ID", this.selected_case.application_id)
        .then(result => {
          if (result.data.success) {
            var app = result.data.model;
            app.general_info.primary_activity = this.getPrimary(
              app.general_info.primary_activity
            );
            app.application_type = this.getAppType(app.application_type);
            app.license_expiry = this.formatDate(app.license_expiry);
            this.$print(app, "LIC");
            this.printDialog = false;
          }
        })
        .catch(err => {
          console.log("###printLicense err :", err);
        });
    },
    preview(item){
      this.preview_item = item;
      this.overview = true;
    }
  }
};
</script>

<style>
.data-row:hover {
  cursor: pointer;
}
</style>
