<template>
  <v-card class="dcard" height="410">
    <v-toolbar width="calc(100% - 10px)" class="user-activity-title">
      <v-toolbar-title>Recent Activity</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon><v-icon>more_vert</v-icon>
      </v-btn>-->
    </v-toolbar>

    <v-list class="scrollList" three-line width>
      <template v-for="(item, index) in activities">
        <v-list-tile :key="index">
          <v-list-tile-content>
            <v-list-tile-sub-title class="font-weight-light">{{formatDate(item.date_completed)}}</v-list-tile-sub-title>
            <v-list-tile-title>
              {{getTask(item.task_id).name}} on Case No.
              <v-tooltip bottom>
                <a slot="activator" @click="viewCase(item.application_id)">{{item.case_no}}</a>
                View Case
              </v-tooltip>
            </v-list-tile-title>
            <v-list-tile-title class="font-weight-bold">
              {{getAppType(item.application_type)}} {{getCaseType(item.case_type)}}
              <span
                style="text-transform: uppercase ; text-decoration: underline"
              >{{getActStatus(item.status)}}</span>
            </v-list-tile-title>
          </v-list-tile-content>
          <!-- <v-list-tile-content>
                        <v-list-tile-title class="font-weight-bold">{{getTask(item.task_id).name}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{getActStatus(item.status)}} {{getAppType(item.application_type)}} application of {{getCaseType(item.case_type)}} with</v-list-tile-sub-title>
                        <v-list-tile-sub-title>
                          Case No.: 
                          <v-tooltip bottom>
                            <a slot="activator" @click="viewCase(item.application_id)">{{item.case_no}}</a>
                            View Details
                          </v-tooltip> on {{formatDate(item.date_completed)}}
                        </v-list-tile-sub-title>
          </v-list-tile-content>-->
        </v-list-tile>
        <v-divider :key="index"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      activities: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store
        .dispatch("GET_ACTIVITIES")
        .then(result => {
          if (result.data.success) this.activities = result.data.model;
          else
            console.log(
              "GET_ACTIVITIES result.data.errors :",
              result.data.errors
            );
        })
        .catch(err => {
          console.log("GET_ACTIVITIES err :", err);
        });
    },
    viewCase(application_id) {
      this.$store
        .dispatch("GET_LICENSE_BY_ID", application_id)
        .then(result => {
          if (result.data.success) {
            this.$store.commit("SET_VIEW_LICENSE", result.data.model);
            this.$router.push("/app/licenses/view");
          } else console.log("result.data.errors :", result.data.errors);
        })
        .catch(err => {
          console.log("###loadForm err :", err);
        });
    }
  }
};
</script>

<style>
.user-activity-title {
  background: linear-gradient(45deg, #e0c71c 0%, #e9d758 100%);
}
</style>
