<template >
  <v-layout row wrap>
    <v-flex xs12 p1-2>
      <v-card>
        <v-tooltip top>
          <v-btn slot="activator" fab medium color="fdaMed" top right absolute @click="dialog=true">
            <v-icon medium color="fdaSilver">create</v-icon>
          </v-btn>Apply New License
        </v-tooltip>

        <undertaking-dialog :show="dialog" @proceed="launchAppForm"></undertaking-dialog>
        <v-data-table :headers="headers" :items="licenses" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.case_no }}</td>
            <td>{{ props.item.case_no }}</td>
            <td>{{ props.item.application_type }}</td>
            <td>{{ props.item.current_task }}</td>
            <td>{{ props.item.date_created }}</td>
            <td>{{ props.item.date_variation }}</td>
            <td>
              <v-layout row wrap>
                <v-flex xs3>
                  <v-tooltip top>
                    <v-btn slot="activator" flat icon color="primary" @click="renewForm(props.item)">
                      <v-icon small>refresh</v-icon>
                    </v-btn>Renewal
                  </v-tooltip>
                </v-flex>
                <v-flex xs3>
                  <v-tooltip top>
                    <v-btn slot="activator" flat icon color="primary" @click="variationForm(props.item)">
                      <v-icon small>edit</v-icon>
                    </v-btn>Variation
                  </v-tooltip>
                </v-flex>
                <v-flex xs3>
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
      variation: false,
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
      licenses: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("GET_LICENSES")
      var licensesData = this.$store.state.licenses.licenses;
      licensesData.forEach(element => {
        // var data = {
        //   case_no: element.auto_id,
        //   application_type: element.application_type,
        //   current_task: element.current_task,
        //   date_created: element.date_created,
        //   date_variation: element.date_variation
        // }
        // this.licenses.push(data); 
        this.licenses.push(element); 
      });
    },
    viewForm(item) {
      this.$store.commit("SET_FORM", item)
      this.$router.push("/app/licenses/view");
    },
    renewForm(item){
      console.log("renew data: " + JSON.stringify(item.application_type))
      item.application_type = "R"
      this.$store.commit("SET_FORM", item)
    },
    variationForm(item){
      item.application_type = "V"
      this.dialog=true
      this.$store.commit("SET_FORM", item)
    },
    launchAppForm() {
      this.$router.push("/app/licenses/apply");
    }
  }
};
</script>

<style>
</style>
