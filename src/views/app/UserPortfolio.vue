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
      <v-card class="dcard" height="410">
        <v-toolbar style="background: linear-gradient(45deg, #939D51 0%, #CAD0A0 100%);">
          <v-toolbar-title>For Compliance</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list class="scrollList" three-line width>
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
            <v-list-tile v-else avatar :key="index">
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content @click="comply">
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-tooltip top>
                <v-btn slot="activator" small flat icon color="primary" @click="comply">
                  <v-icon>fas fa-external-link-alt</v-icon>
                </v-btn>Open
              </v-tooltip>
            </v-list-tile>
          </template>
        </v-list>
        <v-divider></v-divider>
      </v-card>
    </v-flex>
    <v-dialog
      v-model="complyDialog"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition">
      <v-card>
        <v-spacer></v-spacer>
        <v-card-title
          class="headline font-weight-thin"
          style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%); text-transform: uppercase">
          Compliance
          <v-spacer></v-spacer>
          <v-tooltip top>
            <v-btn slot="activator" flat icon color="black" @click="complyDialog=false">
              <i class="fas fa-times-circle"></i>
            </v-btn>Close
          </v-tooltip>
        </v-card-title>
        <v-card-text>
          <v-flex xs12>
            <v-text-field box multi-line label="assigned_user Remarks" disabled></v-text-field>
          </v-flex>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <uploader @upload="upload"></uploader>
            </v-flex>
            <v-flex xs12 mt-3>
              <v-text-field box multi-line label="User Remarks"></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn block color="success">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  components: {
    UserActivity: () => import("@/components/UserActivity.vue"),
    DashboardOverview: () => import("@/components/DashboardOverview.vue"),
    Uploader: () => import("@/components/Uploader.vue"),
    ActiveLicense: () => import("@/components/ActiveLicense.vue")
  },
  data: () => ({
    details: {},
    complyDialog: false,
    user: {},
    date2: new Date().toISOString().substr(0, 10),
    items: [
      { header: "Today" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Inspection",
        subtitle:
          "<span class='text--primary'>Godfrey Rivera remarks:</span> Upload business documents"
      },
      { divider: true }
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
          console.log("JSON.stringify(result) :" + JSON.stringify(result));
          this.details = result;
          console.log(
            "details user portfolio: " + JSON.stringify(this.details.cases)
          );
          this.details.cases.forEach(casesData => {
            console.log("cases data foreach: " + JSON.stringify(casesData));
            casesData.activities.forEach(act => {
              console.log("activities data from act: " + JSON.stringify(act));
              if (act != null) {
                act.case_no = casesData.case_no;
                act.application_type = casesData.application_type;
                this.activities.push(act);
              }
            });
          });
          this.activities.sort(function(a, b) {
            var dateA = new Date(a.date_completed),
              dateB = new Date(b.date_completed);
            return dateB - dateA;
          });
          return this.$store.dispatch("GET_TASKS");
        })
        .then(result => {
          return this.$store.dispatch("GET_ADMIN");
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
    comply() {
      this.complyDialog = true;
    },
    upload(formData) {
      this.$emit("upload", formData);
    }
  }
};
</script>


<style>
.scrollList {
  height: 300px;
  overflow-y: auto;
}

.dcard {
  -webkit-box-reflect: below 6px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(70%, transparent), to(rgba(250, 250, 250, 0.1)));
}
.v-picker__title__btn:not(.v-picker__title__btn--active) {
  font-size: 50px;
}

.active-license-title {
  background: linear-gradient(360deg, #104b2a 0%, #b5c25a 100%);
  box-shadow: 0 6px 20px 0 rgba(38, 198, 218, 0.5);
}
</style>