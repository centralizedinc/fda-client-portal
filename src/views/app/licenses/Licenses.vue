<template >
  <v-layout row wrap>
    <v-flex xs12 p1-2>
      <v-card>
        <!-- <v-tooltip top>
          <v-btn slot="activator" fab medium color="fdaMed" top right absolute @click="dialog=true">
            <v-icon medium color="fdaSilver">create</v-icon>
          </v-btn>Apply New License
        </v-tooltip> -->

        <undertaking-dialog :show="dialog" @proceed="launchAppForm"></undertaking-dialog>
        <v-data-table :headers="headers" :items="licenses" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.case_no }}</td>
            <td>{{ props.item.licenses_no }}</td>
            <td>{{ getAppType(props.item.application_type) }}</td>
            <td>{{ props.item.current_task }}</td>
            <td>{{ props.item.date_created }}</td>
            <td>{{ props.item.date_variation }}</td>
            <td>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-tooltip top>
                    <v-btn slot="activator" flat icon color="primary" @click="renewForm(props.item)">
                      <v-icon small>refresh</v-icon>
                    </v-btn>Renewal
                  </v-tooltip>
                </v-flex>
                <v-flex xs4>
                  <v-tooltip top>
                    <v-btn slot="activator" flat icon color="primary" @click="variationForm(props.item)">
                      <v-icon small>edit</v-icon>
                    </v-btn>Variation
                  </v-tooltip>
                </v-flex>
                <v-flex xs4>
                  <v-tooltip top>
                    <v-btn slot="activator" flat icon color="primary" @click="viewForm(props.item)">
                      <v-icon small>search</v-icon>
                    </v-btn>View Application
                  </v-tooltip>
                </v-flex>
              </v-layout>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>


    
      
    
    <v-layout column class="fab-container">
      <v-tooltip top>
        <v-btn slot="activator" fab color="primary" @click="dialog=true">
          <v-icon>add</v-icon>
        </v-btn>
        Apply New
      </v-tooltip>
    </v-layout>

  </v-layout>
</template>

<script>
import Undertaking from "../../../components/UndertakingDialog";
export default {
  components: {
    UndertakingDialog: () => import("@/components/UndertakingDialog")
  },
  data() {
    return {
      dialog: false,
      dialogView: false,
      initial: false,
      renewal: false,
      // variation: false,
      form: {},
      headers: [
        { text: "Case No", value: "case_no" },
        { text: "License No", value: "case_no" },
        { text: "Type", value: "application_type" },
        { text: "Task", value: "current_task" },
        { text: "Application Date", value: "date_created" },
        { text: "Variation Date", value: "date_variation" },
        { text: "Actions", value: "" }
      ],
      licenses: [],
      licensesData: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("GET_LICENSES");
      var licenseData = this.$store.state.licenses.licenses;
      // this.licenses = this.$store.state.licenses.licenses;
      licenseData.forEach(element => {
        // var app_type = null;        
        // if(element.application_type === "I"){
        //   app_type = "Initial"
        // } else if(element.application_type === "V"){
        //   app_type = "Variation"
        // } else if(element.application_type === "R"){
        //   app_type = "Renewal"
        // }
        // var data = {
        //   case_no: element.case_no,
        //   licenses_no: element.auto_id,
        //   application_type: app_type,
        //   current_task: element.current_task,
        //   date_created: element.date_created,
        //   date_variation: element.date_variation
        // }
        // this.licensesData.push(data);
        this.licenses.push(element);
      });
      // console.log("####################License data: " + JSON.stringify(this.licensesData)2)
    },
    viewForm(item) {
      console.log("$$$$$$$$$$$$$$$$$ view data: " + JSON.stringify(item))
      this.loadForm(item);
      // this.$store.commit("SET_FORM", item)
      this.$router.push("/app/licenses/view");
    },
    renewForm(item){
      this.loadForm(item);
      console.log("renew data: " + JSON.stringify(item.application_type))
      // item.application_type = "R"
      // this.$store.commit("SET_FORM", item)
    },
    variationForm(item){
      this.loadForm(item);
      this.dialog=true
      // item.application_type = "V"
      // this.$store.commit("SET_FORM", item)
    },
    loadForm(form){
      // console.log("loadform data case number: " + case_no);
      // var index = this.licenses.findIndex(x => {
      //   return x.case_no === case_no;
      // })

      // this.$store.commit("SET_FORM", this.licenses[index])
      this.$store.commit("SET_FORM", form)

    },
    launchAppForm() {
      this.$router.push("/app/licenses/apply");
    },
    getAppType(type) {
      if (type === "I") {
        return "Initial";
      } else if (type === "R") {
        return "Renewal";
      } else if (type === "V") {
        return "Variation";
      }
    },
      // getTask(task_id){
      //   console.log("task id: " + JSON.stringify(task_id))
      //   this.$store.dispatch("GET_TASKS");
      //   // console.log("tasks: " + JSON.stringify(this.$store.state.tasks.tasks))
      //   var index = this.$store.state.tasks.tasks.findIndex(x => {
      //     return x._id === task_id
      //   })
      //   return index.name
      // }
  }
};
</script>

<style>
</style>
