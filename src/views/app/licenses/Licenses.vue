<template >
  <v-layout row wrap>
    <v-flex xs12 p1-2>
      <v-card>
        <!-- <v-tooltip top>
          <v-btn slot="activator" fab medium color="fdaMed" top right absolute @click="dialog=true">
            <v-icon medium color="fdaSilver">create</v-icon>
          </v-btn>Apply New License
        </v-tooltip>-->
        <undertaking-dialog :show="dialog" @proceed="launchAppForm"></undertaking-dialog>
        <v-data-table :headers="headers" :items="cases" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.case_no }}</td>
            <td>{{ props.item.case_type }}</td>
            <td>{{ getAppType(props.item.application_type) }}</td>
            <td>{{ props.item.client_name }}</td>
            <td>{{ app_status[props.item.status] }}</td>
            <td>{{ getTask(props.item.current_task) ? getTask(props.item.current_task).name : '' }}</td>
            <td>{{ props.item.current_assigned_user }}</td>
            <td>{{ formatDate (props.item.date_created) }}</td>
            <td>{{ props.item.remarks }}</td>
            <td>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-tooltip top>
                    <v-btn
                      slot="activator"
                      flat
                      icon
                      color="primary"
                      @click="renewForm(props.item)"
                    >
                      <v-icon small>refresh</v-icon>
                    </v-btn>Renewal
                  </v-tooltip>
                </v-flex>
                <v-flex xs4>
                  <v-tooltip top>
                    <v-btn
                      slot="activator"
                      flat
                      icon
                      color="primary"
                      @click="variationForm(props.item)"
                    >
                      <v-icon small>edit</v-icon>
                    </v-btn>Variation
                  </v-tooltip>
                </v-flex>
                <v-flex xs4>
                  <v-tooltip top>
                    <v-btn slot="activator" flat icon color="primary" @click="viewForm(props.item)">
                      <v-icon small>search</v-icon>
                    </v-btn>View Application
                  </v-tooltip>
                </v-flex>
              </v-layout>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>

    <v-layout column class="fab-container">
      <v-tooltip top>
        <v-btn slot="activator" fab color="fdaMed" @click="dialog=true">
          <v-icon large color="fdaSilver">add</v-icon>
        </v-btn>Apply New
      </v-tooltip>
    </v-layout>
  </v-layout>
</template>

<script>
import Undertaking from "../../../components/UndertakingDialog";
export default {
  components: {
    UndertakingDialog: () => import("@/components/UndertakingDialog")
  },
  data() {
    return {
      dialog: false,
      dialogView: false,
      initial: false,
      renewal: false,
      // variation: false,
      form: {},
      headers: [
        { text: "Case No", value: "case_no" },
        { text: "Application", value: "case_type" },
        { text: "Type", value: "application_type" },
        { text: "Created By", value: "client_name" },
        { text: "Status", value: "status" },
        { text: "Current Task", value: "current_task" },
        { text: "Current User", value: "current_assigned_user" },
        { text: "Date Created", value: "date_created" },
        { text: "Remarks", value: "remarks" },
        { text: "Actions", value: "" }
      ],
      cases: [],
      tasks: [],
      app_status: ["On Process", "Approved", "Compliance", "Denied", "Expired"]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.cases = this.$store.state.case.cases;
      this.$store
        .dispatch("GET_CASES")
        .then(result => {
          this.cases = result;
        })
        .catch(err => {});
    },
    viewForm(item) {
      this.loadForm(item);
    },
    renewForm(item) {
      this.loadForm(item, 2);
    },
    variationForm(item) {
      this.loadForm(item, 1);
    },
    loadForm(_case, application_type) {
      this.$store
        .dispatch("GET_LICENSE_BY_ID", {
          app_id: _case.application_id,
          application_type: application_type
        })
        .then(result => {
          if (application_type === 1) {
            this.dialog = true;
          } else {
            this.$router.push("/app/licenses/view");
          }
        })
        .catch(err => {
          console.log("###loadForm err :", err);
        });
    },
    launchAppForm() {
      this.$router.push("/app/licenses/apply");
    }
  }
};
</script>

<style>
</style>
