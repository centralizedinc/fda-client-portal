<template>
  <v-layout row wrap align-start>
    <template v-if="user.status === 2">
      <!-- Active License -->
      <v-flex xs12 mb-2>
        <div class="headline font-weight-thin" style="text-transform: uppercase">Active License</div>
      </v-flex>
      <v-flex xs12>
        <v-card color="fdaSilver" class="elevation-15">
          <v-card-title
            style="background: linear-gradient(360deg, #104B2A 0%, #b5c25a 100%)
 box-shadow:0 6px 20px 0 rgba(38, 198, 218, 0.5)"
          >
            <v-avatar class="mr-3" color="grey">
              <img src="https://i.postimg.cc/L6Z0cZk3/vue-logo.png" alt="FDA">
            </v-avatar>
            <span class="headline">License No.: {{details.license_details.license_no}}</span>
          </v-card-title>
          <v-divider inset></v-divider>
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

      <!-- Cards -->
      <v-flex xs12 mt-5>
        <div class="headline font-weight-thin" style="text-transform: uppercase">Overview</div>
      </v-flex>
      <!-- <v-flex xs12 md6 lg3 pa-2>
        <v-card>
          <v-tooltip top>
            <v-btn
              slot="activator"
              color="success"
              dark
              absolute
              top
              right
              fab
              small
              @click="$router.push('/app/licenses')"
            >
              <v-icon small>call_made</v-icon>
            </v-btn>Go to Licenses
          </v-tooltip>

          <dashboard-card
            class="dcard"
            icon="fas fa-file-contract"
            title="Licenses"
            description="Count"
            details="1"
            color="primary"
          ></dashboard-card>
        </v-card>
      </v-flex>-->
      <v-flex xs12 md4 lg4 pa-2>
        <v-card>
          <v-tooltip top>
            <v-btn
              slot="activator"
              color="success"
              dark
              absolute
              top
              right
              fab
              small
              @click="$router.push('/app/certificates')"
            >
              <v-icon>call_made</v-icon>
            </v-btn>Go to Certificates
          </v-tooltip>
          <dashboard-card
            class="dcard"
            icon="fas fa-certificate"
            title="Certificates"
            description="Count"
            details="9"
            color="fdaGold"
          ></dashboard-card>
        </v-card>
      </v-flex>
      <v-flex xs12 md4 lg4 pa-2>
        <v-card>
          <v-tooltip top>
            <v-btn
              slot="activator"
              color="success"
              dark
              absolute
              top
              right
              fab
              small
              @click="$router.push('/app/notification')"
            >
              <v-icon>call_made</v-icon>
            </v-btn>Go to Product Notification
          </v-tooltip>
          <dashboard-card
            class="dcard"
            icon="fas fa-file-invoice"
            title="Product Notification"
            description="Count"
            details="2"
            color="fdaOrange"
          ></dashboard-card>
        </v-card>
      </v-flex>
      <v-flex xs12 md4 lg4 pa-2>
        <v-card>
          <v-tooltip top>
            <v-btn
              slot="activator"
              color="success"
              dark
              absolute
              top
              right
              fab
              small
              @click="$router.push('/app/payments')"
            >
              <v-icon>call_made</v-icon>
            </v-btn>Go to Payments
          </v-tooltip>
          <dashboard-card
            class="dcard"
            icon="fas fa-credit-card fa-xs"
            title="Payments"
            description="Count"
            details="0"
            color="fdaBlueGreen"
          ></dashboard-card>
        </v-card>
      </v-flex>
      <v-flex xs12 mt-5>
        <div class="headline font-weight-thin" style="text-transform: uppercase">Reference</div>
      </v-flex>
    </template>

    <!-- REFERENCE -->
    <!-- User Activity -->
    <v-flex xs12 md6 pa-2>
      <v-card class="dcard" height="410">
        <v-toolbar
          width="calc(100% - 10px)"
          style="background: linear-gradient(45deg, #e0c71c 0%, #e9d758 100%);"
        >
          <v-toolbar-title>User Activity</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list class="scrollList" three-line width>
          <template v-for="(item, index) in activities">
            <!-- <v-subheader v-if="item.header" :key="item.header"></v-subheader> -->
            <!-- <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider> -->
            <v-list-tile :key="index">
              <v-list-tile-avatar>
                <img :src="items.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <!-- <v-list-tile-title v-html="item.title"></v-list-tile-title> -->
                <v-list-tile-title class="font-weight-bold">{{getTask(item.task_id).name}}</v-list-tile-title>
                <v-list-tile-sub-title>{{getAdminName(item.assigned_user).username}} {{getActStatus(item.status)}} {{getAppType(item.application_type)}} application of {{getCaseType(details.case_details.case_type)}} with</v-list-tile-sub-title>
                <v-list-tile-sub-title>Case No.: {{item.case_no}} on {{formatDate(item.date_completed)}}</v-list-tile-sub-title>
                <!-- + {{getAppType(details.license_details.application_type)}} + {{details.license_details.case_no}} -->
                <!-- <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title> -->
                <!-- <v-list-tile-sub-title>{{getTask(item.task_id).name}}  {{getActStatus(item.status)}} {{getCaseType(details.case_details.case_type)}} {{getAdminName(item.assigned_user).username}} {{getAppType(details.license_details.application_type)}} {{details.license_details.case_no}}</v-list-tile-sub-title> -->
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
          </template>
        </v-list>
      </v-card>
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
      transition="dialog-transition"
    >
      <v-card>
        <v-spacer></v-spacer>
        <v-card-title
          class="headline font-weight-thin"
          style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%); text-transform: uppercase"
        >Compliance
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
import DashboardCard from "@/components/DashboardCards";
import Uploader from "@/components/Uploader.vue";

export default {
  components: {
    DashboardCard,
    Uploader
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
      return (this.completedTasks / this.tasks.length) * 100;
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
          console.log("details user portfolio: " + JSON.stringify(this.details.cases))
          this.details.cases.forEach(casesData => {
            console.log("cases data foreach: " + JSON.stringify(casesData))
            casesData.activities.forEach(act =>{
              console.log("activities data from act: " + JSON.stringify(act))
              if( act != null){
                act.case_no = casesData.case_no,
                act.application_type = casesData.application_type
              //   var case_details = {
              //   case_no: casesData.case_no,
              //   application_type: casesData.application_type,
              //   act: act
              // }
              this.activities.push(act)
              }
              
            })
          });
          console.log("data pushit: " + JSON.stringify(this.activities))
          // for(var x = result.case_details.activities.length;x>=0;x--){
          //   console.log("for user portfolio: " + JSON.stringify(result.case_details.activities[x]))
          // }

          // this.activities = result.case_details.activities

          this.activities.sort(function(a, b){
            var dateA=new Date(a.date_completed), dateB=new Date(b.date_completed)
            return dateB - dateA});
          console.log("activities user portfolio: " + JSON.stringify(this.activities))
          return this.$store.dispatch("GET_TASKS");
        })
        .then(result => {
          console.log("result :" + JSON.stringify(result));
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
</style>