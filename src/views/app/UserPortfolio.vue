<template>
  <v-layout row wrap align-start>
    <template v-if="user.status === 2">
      <!-- Active License -->
      <!-- <v-flex xs12 mb-2>
        <div class="headline font-weight-thin" style="text-transform: uppercase">Active License</div>
      </v-flex> -->
      <v-flex xs12 md3 pa-2 d-flex>
        <v-card style="background-color: #00a65a!important; box-shadow: 0 6px 20px rgba(101, 198, 187, 1);">          
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs9>
                  <span class="title white--text font-weight-light">{{this.active_lic.license_no}}</span>
                  <div class="caption  white--text font-weight-bold">Expiry: <span class="caption  white--text">{{formatDate(this.active_lic.license_expiry)}}</span></div>
                  <div class="caption  white--text font-weight-bold">Status: <span class="caption  white--text">{{getAppStatus(this.active_lic.status)}}</span></div>
                  <div class="caption  white--text font-weight-bold">Name: <span class="caption  white--text">{{this.active_lic.estab_details?this.active_lic.estab_details.establishment_name:""}}</span></div>
                </v-flex>
                <v-flex xs3 align-center justify-center d-flex>
                  <v-icon style="font-size:60px; color:rgba(0,0,0,.15)">fas fa-file-signature</v-icon>
                </v-flex>
              </v-layout>                            
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions style="background:rgba(0,0,0,.1)">
              <v-spacer></v-spacer>
              <p class="caption white--text" style="cursor:pointer" @click="$router.push('/app/licenses')">More info <v-icon color="white" small>launch</v-icon></p>
              <v-spacer></v-spacer>
            </v-card-actions>          
        </v-card>
      </v-flex>
      <!-- <active-license></active-license> -->
      
      <v-flex xs12 md3 pa-2 d-flex>
        <v-card style="background:linear-gradient(360deg, #297373 0%, #5FA391 100%); box-shadow: 0 6px 20px rgba(101, 198, 187, 1);">          
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs9>
                  <span class="display-2 white--text font-weight-bold">0</span>
                  <p class="title  white--text font-weight-bold mt-2">Certificates</p>
                </v-flex>
                <v-flex xs3 align-center justify-center d-flex>
                  <v-icon style="font-size:60px; color:rgba(0,0,0,.15)">fas fa-certificate</v-icon>
                </v-flex>
              </v-layout>                            
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions style="background:rgba(0,0,0,.1)">
              <v-spacer></v-spacer>
              <p class="caption white--text" style="cursor:pointer" @click="$router.push('/app/certificates')">More info <v-icon color="white" small>launch</v-icon></p>
              <v-spacer></v-spacer>
            </v-card-actions>          
        </v-card>
      </v-flex>
      <v-flex xs12 md3 pa-2 d-flex>
        <v-card style="background: linear-gradient(360deg, #F1961D 0%, #F58555  100%); box-shadow: 0 6px 20px 0 rgba(228, 120, 51, 1)">          
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs9>
                  <span class="display-2 white--text font-weight-bold">0</span>
                  <p class="title  white--text font-weight-bold mt-2">Products</p>
                </v-flex>
                <v-flex xs3 align-center justify-center d-flex>
                  <v-icon style="font-size:60px; color:rgba(0,0,0,.15)">fas fa-file-invoice</v-icon>
                </v-flex>
              </v-layout>                            
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions style="background:rgba(0,0,0,.1)">
              <v-spacer></v-spacer>
              <p class="caption white--text" style="cursor:pointer" @click="$router.push('/app/certificates')">More info <v-icon color="white" small>launch</v-icon></p>
              <v-spacer></v-spacer>
            </v-card-actions>          
        </v-card>        
      </v-flex>
      <v-flex xs12 md3 pa-2 d-flex>
        <v-card style="background: linear-gradient(360deg, #95A523 0%, #B5C25A  100%); box-shadow: 0 6px 20px 0 rgba(200, 247, 197, 1)">          
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs9>
                  <span class="display-2 white--text font-weight-bold">0</span>
                  <p class="title  white--text font-weight-bold mt-2">Payments</p>
                </v-flex>
                <v-flex xs3 align-center justify-center d-flex>
                  <v-icon style="font-size:60px; color:rgba(0,0,0,.15)">fas fa-credit-card</v-icon>
                </v-flex>
              </v-layout>                            
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions style="background:rgba(0,0,0,.1)">
              <v-spacer></v-spacer>
              <p class="caption white--text" style="cursor:pointer" @click="$router.push('/app/payments')">More info <v-icon color="white" small>launch</v-icon></p>
              <v-spacer></v-spacer>
            </v-card-actions>          
        </v-card>
      </v-flex>

      <!-- Cards -->
      <!-- <v-flex xs12 mt-5>
        <div class="headline font-weight-thin" style="text-transform: uppercase">Overview</div>
      </v-flex>
      <dashboard-overview></dashboard-overview> -->
      <!-- <v-flex xs12 mt-5>
        <div class="headline font-weight-thin" style="text-transform: uppercase">Reference</div>
      </v-flex> -->
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
    active_lic: {},
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
      this.$store
        .dispatch("GET_ACTIVE_LICENSE")
        .then(result => {
          console.log("GET_ACTIVE_LICENSE: " + JSON.stringify(result));
          this.active_lic = result;
          return this.$store.dispatch("GET_TASKS");
        })
        .then(tasks => {
          console.log("tasks :", tasks);
        })
        .catch(err => {});
    }
  }
};
</script>


<style>
.v-picker__title__btn:not(.v-picker__title__btn--active) {
  font-size: 50px;
}
</style>