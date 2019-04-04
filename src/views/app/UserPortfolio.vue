<template>
  <v-layout row wrap align-start>
    <template v-if="user.status === 2">
      <!-- Active License -->
      <v-flex xs12 mb-2>
        <div class="headline font-weight-thin" style="text-transform: uppercase">Active License</div>
      </v-flex>
      <active-license></active-license>

      <!-- Cards -->
      <v-flex xs12 mt-5>
        <div class="headline font-weight-thin" style="text-transform: uppercase">Overview</div>
      </v-flex>
      <dashboard-overview></dashboard-overview>
      <v-flex xs12 mt-5>
        <div class="headline font-weight-thin" style="text-transform: uppercase">Reference</div>
      </v-flex>
    </template>

    <!-- REFERENCE -->
    <!-- User Activity -->
    <v-flex xs12 md6 pa-2>
        <user-activity></user-activity>
    </v-flex>

    <!-- For Compliance -->
    <v-flex xs12 md6 pa-2>
      <compliance></compliance>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {
    UserActivity: () => import("@/components/UserActivity.vue"),
    DashboardOverview: () => import("@/components/DashboardOverview.vue"),
    Compliance: () => import("@/components/Compliance.vue"),
    ActiveLicense: () => import("@/components/ActiveLicense.vue")
  },
  data: () => ({
    details: {},
    complyDetails: null,
    complyActivities: [],
    complyDialog: false,
    complyData: {},
    remarks: null,
    files: [],
    user: {},
    date2: new Date().toISOString().substr(0, 10),
    items: [
      {
        header: "Today"
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Inspection",
        subtitle:
          "<span class='text--primary'>Godfrey Rivera remarks:</span> Upload business documents"
      },
      {
        divider: true
      }
    ],
    activities: [],
    tasks: [
      {
        done: false,
        text: "Renewal of License"
      },
      {
        done: false,
        text: "Check and log validity of Certificates"
      }
    ],
    task: null,
    calendar: null
  }),
  created() {
    this.init();
  },
  computed: {
    completedTasks() {
      return this.tasks.filter(task => task.done).length;
    },
    progress() {
      return this.completedTasks / this.tasks.length * 100;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    }
  },
  methods: {
    init() {
      this.user = this.$store.state.user_session.user;
      this.details = this.$store.state.licenses.details;
      this.$store
        .dispatch("GET_ACTIVE_AND_CASES")
        .then(result => {
          this.details = result;
          console.log(
            "details user portfolio: " + JSON.stringify(this.details.cases)
          );
          this.details.cases.forEach(casesData => {
            console.log("cases data foreach: " + JSON.stringify(casesData));
            casesData.activities.forEach(act => {
              console.log("activities data from act: " + JSON.stringify(act));
              if (act != null) {
                (act.case_no = casesData.case_no),
                  (act.application_type = casesData.application_type),
                  (act.case_type = casesData.case_type);
                this.activities.push(act);
              }
            });
          });
          console.log("data pushit: " + JSON.stringify(this.activities));
          // for(var x = result.case_details.activities.length;x>=0;x--){
          //   console.log("for user portfolio: " + JSON.stringify(result.case_details.activities[x]))
          // }
          // this.activities = result.case_details.activities
          this.activities.sort(function(a, b) {
            var dateA = new Date(a.date_completed),
              dateB = new Date(b.date_completed);
            return dateB - dateA;
          });
          return this.$store.dispatch("GET_TASKS");
        })        
        .then(result => {
          console.log("result of get admin: " + JSON.stringify(result));
        })
        .catch(err => {
          console.log("err :", err);
        });
    },
    functionEvents(date) {
      const [, , day] = date.split("-");
      if ([12, 17, 28].includes(parseInt(day, 10))) return true;
      if ([1, 19, 22].includes(parseInt(day, 10))) return ["red", "#00f"];
      return false;
    },
    create() {
      this.tasks.push({
        done: false,
        text: this.task
      });
      this.task = null;
    },
    comply(data) {
      console.log("JSON.stringify(data) :", JSON.stringify(data));
      this.complyData = data;
      this.complyDialog = true;
    },
    upload(formData) {
      // this.$emit("upload", formData);
      console.log("upload data: " + formData);
      this.files = formData;
    },
    submit() {
      var filesData = this.files;
      const formData = new FormData();
      for (let i = 0; i < filesData.length; i++) {
        if (filesData[i].file) {
          formData.append("lto", filesData[i].file, filesData[i].file["name"]);
        }
      }
      var complied = {
        case_id: this.complyData.case_id,
        case_no: this.complyData.case_no,
        remarks: this.remarks,
        form_data: this.files
      };
      this.$store
        .dispatch("SAVE_COMPLY", complied)
        .then(result => {
          console.log("#result :", result);
        })
        .catch(err => {
          console.log("err :", err);
        });
    }
  }
};
</script>


<style>
.v-picker__title__btn:not(.v-picker__title__btn--active) {
  font-size: 50px;
}
</style>