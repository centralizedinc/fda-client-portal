<template>
  <v-layout row wrap>
    <v-flex xs12 p1-2>
      <v-card>
        <!-- <v-tooltip top>
          <v-btn slot="activator" fab medium color="fdaMed" top right absolute @click="dialog=true">
            <v-icon medium color="fdaSilver">create</v-icon>
          </v-btn>Apply New Certificate
        </v-tooltip>-->

        <undertaking-dialog :show="dialog" @proceed="launchAppForm" @close="closeDecDialog"></undertaking-dialog>

        <v-data-table
          :headers="headers"
          :items="certificates"
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

export default {
  components: {
    UndertakingDialog: () => import("./create/tabs/UndertakingDialog")
  },
  data() {
    return {
      loading: false,
      dialog: false,
      pagination: {
        sortBy: "date_created",
        descending: true
      },
      headers: [
        { text: "Case No", value: "case_no" },
        { text: "Type", value: "application_type" },
        { text: "Status", value: "status", sortable: true },
        // { text: "Current Task", value: "current_task" },
        { text: "Date Created", value: "date_created" },
        { text: "Remarks", value: "remarks" }
      ],
      certificates: [
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
      console.log("Welcome to certificates!!!");
      this.$store.dispatch("GET_CERTIFICATE").then((result) => {
        this.certificates = this.$store.state.certificate.certificates
      }).catch((err) => {
        this.$notifyError(err);
      });
    },
    launchAppForm() {
      console.log("certificates launchappform");
      this.$router.push("/app/certificates/apply");
    },
    closeDecDialog() {
      this.dialog = false;
    },
    preview(item) {
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
