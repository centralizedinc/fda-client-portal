<template>
  <v-layout row wrap>
    <v-flex xs12 p1-2>
      <v-card>
        <v-data-table 
          :pagination.sync="pagination"
          :headers="headers"
          hide-actions
          :items="case_items"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <tr @click="loadForm(props.item.application_id)" class="data-row">
              <td>{{ props.item.case_no }}</td>
              <!-- <td>{{ props.item.case_no }}</td> -->
              <td>{{ getAppType(props.item.application_type) }}</td>
              <td>{{getCaseType(props.item.case_type)}}</td>
              <td>{{ getTask(props.item.current_task).name }}</td>
              <td>{{ formatDate (props.item.date_created) }}</td>
              <td
                :class="props.item.is_paid ? 'paid': 'unpaid'"
              >{{ props.item.is_paid ? "Paid" : "Unpaid" }}</td>
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
            <v-dialog v-model="callPendingTrans" max-width="calc(100% - 10px)" persistent>
              <v-card flat>
                <v-toolbar flat>
                  <v-spacer></v-spacer>
                  <v-tooltip top>
                    <v-btn slot="activator" flat icon color="black" @click="close">
                      <v-icon>fas fa-times-circle fa-1x</v-icon>
                    </v-btn>Close
                  </v-tooltip>
                </v-toolbar>
                <!-- Display if PENDING or PAID TRANSACTION -->
                <pending-trans
                  :form="form"
                  :charges="charges"
                  :case_holder="case_holder"
                  :allow_paylater="false"
                ></pending-trans>
                <!-- <paid-trans
                  :form="form"
                  :charges="charges"
                  :case_holder="case_holder"
                  :allow_paylater="false"
                ></paid-trans>-->
              </v-card>
            </v-dialog>
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
    ActiveLicense: () => import("@/components/ActiveLicense.vue"),
    PendingTrans: () => import("./PendingTransaction.vue"),
    PaidTrans: () => import("./PaidTransaction.vue")
  },
  data() {
    return {
      form: {},
      pagination: {
        sortBy: 'date_created',
        descending: true
        
      },
      charges: {},
      case_holder: {},
      callPendingTrans: false,
      mode: 0, // 0 - new, 1 - variation, 2 - renewal
      headers: [
        {
          text: "Case No",
          value: "case_no"
        },
        // { text: "License No", value: "case_no" },
        {
          text: "Type",
          value: "application_type"
        },
        {
          text: "Case Type",
          value: "case_type"
        },
        {
          text: "Current Task",
          value: "current_task"
        },
        {
          text: "Date Created",
          value: "date_created"        
        },
        {
          text: "Payment Status",
          value: "payment_status"
        }
        // { text: "Actions", value: "" }
      ],
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
            this.form = this.$store.state.licenses.view_license;
            console.log("###########FORM  :", JSON.stringify(this.form));

            if (
              this.form.general_info.product_type !== null &&
              this.form.general_info.primary_activity !== null &&
              // this.form.general_info.declared_capital !== null &&
              this.form.application_type !== null
            ) {
              var details = {
                productType: this.form.general_info.product_type,
                primaryActivity: this.form.general_info.primary_activity,
                declaredCapital: this.form.general_info.declared_capital,
                appType: this.form.application_type
              };
              console.log("load fees view: " + JSON.stringify(details));
              this.$store
                .dispatch("GET_FEES", details)
                .then(result => {
                  this.charges = result;
                  console.log(
                    "charges data payment details: " +
                      JSON.stringify(this.charges)
                  );
                  return this.$store.dispatch(
                    "GET_ONE_CASE",
                    this.form.case_no
                  );
                })
                .then(result => {
                  console.log(
                    "get onse case @ view: " + JSON.stringify(result)
                  );
                  this.case_holder = result;
                });
            }
            this.callPendingTrans = true;
          } else console.log("result.data.errors :", result.data.errors);
        })
        .catch(err => {
          console.log("###loadForm err :", err);
        });
    },
    close() {
      this.callPendingTrans = false;
    }
    // pay() {
    //   this.$router.push("/app/payments/summary");
    // }
  },
  computed: {
    case_items(){
      var items = []
      this.details.cases.forEach(caseDetails => {
        if(!caseDetails.is_paid){
          items.push(caseDetails)
        }
      })
      return items
    },
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
