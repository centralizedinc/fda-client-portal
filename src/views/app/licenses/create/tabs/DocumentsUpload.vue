<template>
  <div>
    <!-- <v-container grid-list-xs-sm-md-lg ml-5> -->
      <v-layout row wrap pl-5 ml-3 mt-5>
        <template v-for="(item, index) in files">
          <v-flex xs5 :key="index">
            <div v-if="index < 5">
              <span style="color: red">*</span>
              {{item.purpose}}
            </div>
            <div v-else>
              <v-text-field label="Purpose" v-model="item.purpose"></v-text-field>
            </div>
          </v-flex>
          <v-flex xs4 mt-2 :key="index">{{item.file_name !== '' ? item.file_name : "No file Chosen"}}</v-flex>
          <v-flex xs2 mt-4 :key="index">
            <upload-btn
              style
              label="Choose File"
              :index="index"
              @getFile="getFile"
              mimetype="application/pdf"
              @onError="uploadError"
            ></upload-btn>
          </v-flex>
          <v-flex xs1 mt-2 :key="index" v-if="index > 4">
            <v-btn medium color="error" @click="remove(index)" fab flat>
              <v-icon>delete</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs1 :key="index" v-else></v-flex>
        </template>
      </v-layout>
    </v-container>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success" class="font-weight-light" @click="addItem">Add File</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  components: {
    UploadBtn: () => import("@/components/UploadBtn")
  },
  props: ["form"],
  data: () => ({
    files: [
      {
        purpose: "Proof of Business Name Registration",
        file_name: "",
        file: null
      },
      {
        purpose: "Site Master File",
        file_name: "",
        file: null
      },
      {
        purpose: "Risk Management Plan",
        file_name: "",
        file: null
      },
      {
        purpose: "Licensing Seminar Certificate",
        file_name: "",
        file: null
      },
      {
        purpose: "PRC ID",
        file_name: "",
        file: null
      }
    ]
  }),
  created() {
    this.init();
  },
  watch: {
    files: {
      handler: function(val) {
        this.form.uploaded_files = val;
      },
      deep: true
    }
  },
  methods: {
    init() {
      if (this.form.uploaded_files && this.form.uploaded_files.length > 0) {
        this.files = this.form.uploaded_files;
      } else {
        this.form.uploaded_files = this.files;
      }
    },
    getFile(data, index) {
      this.files[index].file = data.file;
      this.files[index].file_name = data.name;
    },
    addItem() {
      this.files.push({
        purpose: "",
        file_name: "",
        file: null
      });
    },
    remove(index) {
      this.files.splice(index, 1);
    },
    uploadError() {
      this.$notify({
        message: "File is invalid. Only PDF File is supported.",
        icon: "add_alert",
        type: "warning",
        initialMargin: 100
      });
    }
  }
};
</script>

<style>
</style>
