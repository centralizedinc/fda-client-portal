<template>
  <v-layout row wrap>
    <!-- Active License -->
    <v-flex xs12 mb-2>
      <div class="headline">Active License</div>
    </v-flex>
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

    <!-- Cards -->
    <v-flex xs12 mt-5>
      <div class="headline">Overview</div>
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
    <v-flex xs12 md6 lg4 pa-2>
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
    <v-flex xs12 md6 lg4 pa-2>
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
    <v-flex xs12 md6 lg4 pa-2>
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
      <div class="headline">Reference</div>
    </v-flex>

    <!-- User Activity -->
    <v-flex xs7 mt-3 ml-2>
      <v-card width="calc(100% - 10px)" class="dcard" height="410">
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

        <v-list two-line width>
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
            <v-list-tile v-else avatar :key="index">
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn flat block color="success">view more</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <!-- For Compliance -->
    <v-flex mt-3 ml-2>
      <v-card class="dcard" height="410">
        <v-toolbar style="background: linear-gradient(45deg, #006400 0%, #0F901A 100%);">
          <v-toolbar-title>For Compliance</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list two-line width>
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
            <v-list-tile v-else avatar :key="index">
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn flat block color="success">view more</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import DashboardCard from "@/components/DashboardCards";
export default {
  components: { DashboardCard },
  data: () => ({
    details: {},
    date2: new Date().toISOString().substr(0, 10),
    items: [
      { header: "Today" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Authorized Officer",
        subtitle:
          "<span class='text--primary'>Chz Quiocho</span> &mdash; Applied Certificate for Food"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "Cashier ",
        subtitle:
          "<span class='text--primary'>Godfrey Rivera</span> &mdash; accepted License Application "
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Authorized Officer",
        subtitle:
          "<span class='text--primary'>Chz Quiocho</span> &mdash; Renewed License 0001111"
      }
    ],
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
    task: null
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
    }
  }
};
</script>


<style>
.dcard {
  -webkit-box-reflect: below 6px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(70%, transparent), to(rgba(250, 250, 250, 0.1)));
}
.v-picker__title__btn:not(.v-picker__title__btn--active) {
  font-size: 50px;
}
</style>

// .primary {
//   background: linear-gradient(45deg, #e0c71c 0%, #e9d758 100%);
//   /* border-color: #104b2a !important; */
// }