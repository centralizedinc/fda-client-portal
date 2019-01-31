<template>
  <v-layout row wrap>
    <div>
      <v-layout row wrap>
        <template v-for="(item, index) in files">
          <v-flex xs12 :key="index">
            <v-card class="elevation-1">
              <v-flex xs1 pt-3 :key="index" v-if="index > 4">
                <v-tooltip top>
                  <v-btn
                    slot="activator"
                    small
                    color="error"
                    @click="remove(index)"
                    fab
                    right
                    absolute
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>Remove this file
                </v-tooltip>
              </v-flex>
              <v-flex xs1 :key="index" v-else></v-flex>
              <v-flex xs12 ml-4 pt-4 pb-2>
                <div
                  v-if="index < 5"
                  class="subheading bold"
                  style="text-transform: uppercase !important"
                >
                  <span style="color: red">*</span>
                  {{item.purpose}}
                </div>
                <div v-else pb-2>
                  <v-flex xs11 mr-4>
                    <v-text-field label="Purpose" v-model="item.purpose"></v-text-field>
                  </v-flex>
                </div>
              </v-flex>

              <v-flex
                xs2
                ml-5
                :key="index"
              >{{item.file_name !== '' ? item.file_name : "No file Chosen"}}</v-flex>
              <v-flex xs5 ml-5 mb-3 pa-2 :key="index">
                <upload-btn
                  style
                  label="Choose File"
                  :index="index"
                  @getFile="getFile"
                  mimetype="application/pdf"
                  @onError="uploadError"
                ></upload-btn>
              </v-flex>
            </v-card>
          </v-flex>
        </template>
      </v-layout>
      <v-card-actions>
        <v-btn block color="success" @click="addItem">Add File</v-btn>
      </v-card-actions>
    </div>
  </v-layout>
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
