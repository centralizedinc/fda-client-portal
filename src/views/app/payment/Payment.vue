<template>
  <v-layout row wrap>
    <v-flex xs12 p1-2>
      <v-card>
        <v-data-table
          :pagination.sync="pagination"
          :headers="headers"
          hide-actions
          :items="details.cases"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <tr @click="loadForm(props.item.application_id)" class="data-row">
              <td>{{ props.item.case_no }}</td>
              <!-- <td>{{ props.item.case_no }}</td> -->
              <td>{{ getAppType(props.item.application_type) }}</td>
              <td>{{ getTask(props.item.current_task).name }}</td>
              <td>{{ formatDate (props.item.date_created) }}</td>
              <td>props.item.payment_status }}</td>
              <!-- <td>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-btn flat icon color="primary" @click="pay">
                    <v-icon small>payment</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
              </td>-->
            </tr>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {
    ActiveLicense: () => import("@/components/ActiveLicense.vue")
  },
  data() {
    return {
      pagination: {},
      mode: 0, // 0 - new, 1 - variation, 2 - renewal
      headers: [
        { text: "Case No", value: "case_no" },
        // { text: "License No", value: "case_no" },
        { text: "Type", value: "application_type" },
        { text: "Current Task", value: "current_task" },
        { text: "Date Created", value: "date_created" },
        { text: "Payment Status", value: "payment_status" }
        // { text: "Actions", value: "" }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.details = this.$store.state.licenses.details;
      this.$store
        .dispatch("GET_ACTIVE_AND_CASES")
        .then(result => {
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
      this.$store.commit("SET_VIEW_LICENSE", this.details.license_details);
      this.$router.push("/app/licenses/view");
    },
    loadForm(application_id) {
      this.$store
        .dispatch("GET_LICENSE_BY_ID", application_id)
        .then(result => {
          if (result.data.success) {
            console.log(
              "get license data: " + JSON.stringify(result.data.model)
            );
            this.$store.commit("SET_VIEW_LICENSE", result.data.model);
            this.$router.push("/app/licenses/view");
          } else console.log("result.data.errors :", result.data.errors);
        })
        .catch(err => {
          console.log("###loadForm err :", err);
        });
    },
    pay() {
      this.$router.push("/app/payments/summary");
    }
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
  }
};
</script>

<style>
.data-row:hover {
  cursor: pointer;
}
</style>
