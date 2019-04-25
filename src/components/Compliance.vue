<template>
  <v-card class="dcard" height="410">
    <v-toolbar class="compliance-title">
      <v-toolbar-title>For Compliance</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>-->
    </v-toolbar>
    <v-list class="scrollList" three-line width>
      <template v-for="(item, index) in compliance_data">
        <v-list-tile avatar :key="index" class="data-item">
          <v-list-tile-content>
            <v-list-tile-sub-title>{{formatDate(item.date_completed)}}</v-list-tile-sub-title>
            <v-list-tile-sub-title>
              {{getCaseType(item.case_type)}} Application with Case No.:
              <v-tooltip bottom>
                <a slot="activator" @click="viewCase(item.application_id)">{{item.case_no}}</a>
                View Case
              </v-tooltip>
            </v-list-tile-sub-title>
            <v-list-tile-title>
              <span class="font-weight-bold" color="error">{{getTask(item.task).name}} Remarks:</span>
              {{item.remarks}}
            </v-list-tile-title>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <v-btn slot="activator" flat icon color="primary" @click="comply(item)">
              <v-icon>fas fa-search</v-icon>
            </v-btn>View Details
          </v-tooltip>
        </v-list-tile>
        <v-divider :key="index">></v-divider>
      </template>
      <v-layout
        row
        wrap
        v-if="compliance_data.length === 0"
        class="text-xs-center subheading font-italic"
        mt-5
      >
        <v-flex xs12>No action needed.</v-flex>
      </v-layout>
    </v-list>
    <!-- <v-divider></v-divider> -->
    
    <v-dialog
      v-model="complyDialog"
      persistent
      :overlay="false"
      max-width="600px"
      transition="dialog-transition"
    >
      <v-card>
        <v-spacer></v-spacer>
        <v-card-title class="headline font-weight-thin compliance-dialog-title">
          <v-avatar class="mr-3" color="grey">
            <img src="https://i.postimg.cc/L6Z0cZk3/vue-logo.png" alt="FDA">
          </v-avatar>Compliance
          <v-spacer></v-spacer>
          <v-tooltip top>
            <v-btn slot="activator" flat icon color="black" @click="complyDialog=false">
              <i class="fas fa-times-circle"></i>
            </v-btn>Close
          </v-tooltip>
        </v-card-title>
        <v-card-text class="subheading">
          <v-card flat>
            <v-card-text box>
              <v-flex xs12 class="font-weight-light" mb-2>
                Remarks as of
                <span
                  class="font-weight-light"
                >{{formatDate(selected.date_completed)}}:</span>
              </v-flex>
              <v-flex xs12 class="font-italic text--indent font-weight-bold">{{selected.remarks}}</v-flex>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 mt-3>
              <v-textarea box  label="User Remarks" v-model="remarks"></v-textarea>
            </v-flex>
            <v-flex xs12>
              <span class="error--text">*</span><i class="font-weight-bold">Note: Only PDF files are accepted.</i>
              <uploader @upload="upload"></uploader>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn block color="primary" :loading="loading" @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  components: {
    Uploader: () => import("@/components/Uploader.vue")
  },
  data() {
    return {
      compliance_data: [],
      complyDialog: false,
      remarks: null,
      form_data: null,
      selected: {},
      loading: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.selected = {};
      this.complyDialog = false;
      this.$store
        .dispatch("GET_COMPLY")
        .then(result => {
          if (result.success) this.compliance_data = result.model;
          else console.log("GET_COMPLY result.errors :", result.errors);
          this.loading = false;
        })
        .catch(err => {
          console.log("GET_COMPLY err :", err);
          this.loading = false;
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
        .catch(err => console.log("###loadForm err :", err));
    },
    comply(item) {
      this.selected = item;
      this.complyDialog = true;
    },
    upload(file) {
      this.form_data = file;
    },
    submit() {
      this.loading = true;
      if (this.remarks != null) {
        this.$store
          .dispatch("SAVE_COMPLY", {
            case_id: this.selected.case_id,
            case_no: this.selected.case_no,
            remarks: this.remarks,
            form_data: this.form_data
          })
          .then(result => this.init());
        this.loading = false;
        this.complyDialog = false;
        this.$notify({
          message: "Compliance has been submitted",
          color: "success",
          icon: "check_circle"
        }).catch(err => console.log("err :", err));
        this.loading = false;
        this.$notify({
          message: "Oops! Something went wrong. Please try again.",
          color: "error",
          icon: "error_outline"
        });
      } else {
        this.loading = false;
        this.$notify({
          message: "User Remarks is required",
          color: "error",
          icon: "check_circle"
        });
      }
    }
  }
};
</script>

<style>
.dcard {
  -webkit-box-reflect: below 6px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(70%, transparent), to(rgba(250, 250, 250, 0.1)));
}

.compliance-title {
  background: linear-gradient(45deg, #939d51 0%, #cad0a0 100%);
}

.data-item :hover {
  cursor: pointer;
}

.compliance-dialog-title {
  background: linear-gradient(45deg, #104b2a 0%, #b5c25a 100%);
  text-transform: uppercase;
}

.scrollList {
  height: 300px;
  overflow-y: auto;
}

.text--indent {
  text-indent: 50px;
}
</style>
