<template >
  <div>
    <license-preview :form="form" v-if="showForm" @back="showForm=false"></license-preview>
    <v-layout row wrap v-else>
      <!-- ACTIVE LICENSE -->
      <v-flex xs12 pa-2>
        <v-card
          color="fdaTan"
          class="elevation-5"
          style="background: linear-gradient(180deg, #CAD0A0 50%, #C3D0A0 100%); ; box-shadow:0 6px 20px 0 rgba(79, 0, 44, 71)"
        >
          <v-card-title>
            <v-avatar class="mr-3" color="grey">
              <img src="https://i.postimg.cc/L6Z0cZk3/vue-logo.png" alt="FDA">
            </v-avatar>
            <span
              class="headline font-weight-medium"
            >License No.: {{details.license_details.license_no}}</span>
            <v-spacer></v-spacer>
            <v-speed-dial
              v-model="fab"
              direction="left"
              open-on-hover
              transition="slide-x-reverse-transition"
            >
              <template v-slot:activator>
                <v-tooltip top>
                  <v-btn slot="activator" v-model="fab" color="fdaGreen" dark flat fab>
                    <v-icon>{{ fab ? "close" : "menu"}}</v-icon>
                  </v-btn>Close
                </v-tooltip>
              </template>
              <v-tooltip top>
                <v-btn slot="activator" fab dark color="fdaBlueGreen" @click="viewForm">
                  <v-icon>search</v-icon>
                </v-btn>View Full License
              </v-tooltip>
              <v-tooltip top>
                <v-btn slot="activator" fab dark @click="variateForm" color="fdaOrange">
                  <v-icon>edit</v-icon>
                </v-btn>Variation
              </v-tooltip>
              <v-tooltip top>
                <v-btn slot="activator" fab dark @click="renewForm" color="fdaMed">
                  <v-icon>autorenew</v-icon>
                </v-btn>Renewal
              </v-tooltip>
              <v-tooltip top>
                <v-btn slot="activator" fab dark color="fdaYellow" @click="confirmPrinting">
                  <v-icon>print</v-icon>
                </v-btn>Print
              </v-tooltip>
            </v-speed-dial>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container grid-list-xl>
              <v-layout row wrap class="subheading">
                <v-flex xs12 md6 lg3 xl2 class="font-weight-medium">Case No:</v-flex>
                <v-flex xs12 md6 lg3 xl2>{{details.case_details.case_no}}</v-flex>
                <v-flex xs12 md6 lg3 xl2 class="font-weight-medium">Status:</v-flex>
                <v-flex
                  xs12
                  md6
                  lg3
                  xl2
                  style="text-transform: uppercase"
                  :class="`${getAppStatusColor(details.case_details.status)}--text font-weight-bold` "
                >{{getAppStatus(details.case_details.status)}}</v-flex>
                <v-flex xs12 md6 lg3 xl2 class="font-weight-medium">License Expiry:</v-flex>
                <v-flex
                  xs12
                  md6
                  lg3
                  xl2
                >{{details.license_details.license_expiry ? formatDate(details.license_details.license_expiry) : "-"}}</v-flex>
                <v-flex xs12 md6 lg3 xl2 class="font-weight-medium">Primary:</v-flex>
                <v-flex xs12 md6 lg3 xl2>{{getPrimary(details.case_details.primary_activity)}}</v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- HISTORY CASES -->
      <v-flex xs12 pa-2>
        <v-card>
          <v-card-title
            text-md-center
            class="headline font-weight-thin"
            style="text-transform: uppercase"
          >Application History</v-card-title>
          <v-divider></v-divider>
          <v-data-table :headers="headers" :items="details.cases" class="elevation-1">
            <template slot="items" slot-scope="props">
              <tr @click="loadForm(props.item.application_id)" class="data-row">
                <td>{{ props.item.case_no }}</td>
                <td>{{ getAppType(props.item.application_type) }}</td>
                <td
                  :class="`${getAppStatusColor(props.item.status)}--text`"
                >{{ getAppStatus(props.item.status) }}</td>
                <td>{{ getTask(props.item.current_task).name }}</td>
                <td>{{ props.item.current_assigned_user }}</td>
                <td>{{ formatDate (props.item.date_created) }}</td>
                <td>{{ props.item.remarks }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>

      <!-- NEW LICENSE -->
      <v-layout column class="fab-container">
        <v-tooltip top>
          <v-btn slot="activator" fab color="fdaLight" @click="dialog=true">
            <v-icon large color="fdaSilver">add</v-icon>
          </v-btn>Apply New
        </v-tooltip>
      </v-layout>

      <!-- DIALOGS -->
      <undertaking-dialog :show="dialog" @proceed="launchAppForm" @close="dialog = false"></undertaking-dialog>
      <v-dialog v-model="printDialog" persistent max-width="300px" transition="dialog-transition">
        <v-card>
          <v-toolbar
            color="fdaGreen"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >
            <span class="font-weight-light headline">Confirm Printing</span>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <v-btn slot="activator" flat icon color="black" @click="printDialog = false">
                <v-icon small>close</v-icon>
              </v-btn>Close
            </v-tooltip>
          </v-toolbar>
          <v-card-text class="subheading font-weight-light">Please take note that:
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
    LicensePreview: () => import("./View.vue"),
    UndertakingDialog: () => import("@/components/UndertakingDialog")
  },
  data() {
    return {
      fab: false,
      showForm: false,
      dialog: false,
      printDialog: false,
      dialogView: false,
      initial: false,
      selected_case: {},
      details: {},
      form: {},
      headers: [
        { text: "Case No", value: "case_no" },
        { text: "Type", value: "application_type" },
        { text: "Status", value: "status", sortable: true },
        { text: "Current Task", value: "current_task" },
        { text: "Current User", value: "current_assigned_user" },
        { text: "Date Created", value: "date_created" },
        { text: "Remarks", value: "remarks" }
      ],
      tasks: []
    };
  },
  created() {
    this.init();
  },
  watch: {
    showForm(val) {
      this.fab = false;
      this.dialog = false;
      this.printDialog = false;
    }
  },
  methods: {
    init() {
      this.details = this.$store.state.licenses.details;
      this.$store
        .dispatch("GET_ACTIVE_AND_CASES")
        .then(result => {
          console.log("JSON.stringify(result) :", JSON.stringify(result));
          this.details = result;
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
      this.form = this.details.license_details;
      this.showForm = true;
    },
    renewForm() {
      this.$store.commit("SET_RENEWAL", this.details.license_details);
      this.$router.push("/app/licenses/renew");
    },
    variateForm() {
      console.log("test");
      this.$store.commit("SET_VARIATION", this.details.license_details);
      this.$router.push("/app/licenses/variation");
    },
    loadForm(application_id) {
      console.log("application_id :", application_id);
      this.$store
        .dispatch("RETRIEVE_LICENSE_BY_ID", application_id)
        .then(result => {
          this.form = result;
          this.showForm = true;
        })
        .catch(err => {
          console.log("###loadForm err :", err);
        });
    },
    launchAppForm() {
      this.$router.push("/app/licenses/apply");
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
          var app = result;
          app.general_info.primary_activity = this.getPrimary(
            app.general_info.primary_activity
          );
          app.application_type = this.getAppType(app.application_type);
          app.license_expiry = this.formatDate(app.license_expiry);
          this.$print(app, "LIC");
          this.printDialog = false;
        })
        .catch(err => {
          console.log("###printLicense err :", err);
        });
    }
  }
};
</script>

<style>
.data-row:hover {
  cursor: pointer;
}
</style>
