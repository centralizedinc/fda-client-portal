<template>
  <v-layout row wrap>
    <div>
      <v-layout row wrap>
        <template v-for="(item, index) in files">
          <v-flex xs12 :key="index">
            <v-card class="elevation-1">
              <v-flex xs1 mt-3 pt-3 :key="index" v-if="index > 4">
                <v-tooltip top>
                  <v-btn
                    class="mt-4"
                    slot="activator"
                    small
                    flat
                    color="error"
                    @click="remove(index)"
                    fab
                    right
                    absolute
                  >
                    <v-icon class="pt-1">fas fa-trash-alt</v-icon>
                  </v-btn>Remove this file
                </v-tooltip>
              </v-flex>
              <v-flex xs1 :key="index" v-else></v-flex>
              <v-flex xs12 mt-3>
                <div
                  v-if="index < 5"
                  class="subheading font-weight: heavy align-center"
                  style="text-transform: uppercase !important ; "
                >
                  <v-sheet
                    dark
                    class="elevation-1 pl-3"
                    color="fdaGreen"
                    height="26"
                    style="border-radius: 0px 0px 12px 12px !important"
                  >
                    {{item.purpose}}
                    <span style="color: red">*</span>
                  </v-sheet>
                </div>

                <div v-else>
                  <v-flex xs11 mr-4 ml-5 pr-5 mb-0>
                    <v-text-field label="Purpose" :rules="[rules.required]" v-model="item.purpose"></v-text-field>
                  </v-flex>
                </div>
              </v-flex>
              <v-layout row wrap>
                <v-flex xs3 pl-3 pb-3 ml-3 mt-2 pt-2 :key="index">
                  <upload-btn
                    label="Choose File"
                    :index="index"
                    @getFile="getFile"
                    mimetype="application/pdf"
                    @onError="uploadError"
                  ></upload-btn>
                </v-flex>
                <v-flex
                  xs6
                  ml-5
                  mt-4
                  pl-5
                  pb-2
                  :key="index"
                >{{item.file_name !== '' ? item.file_name : "No file chosen"}}</v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </template>
      </v-layout>
      <v-divider class="mt-3"></v-divider>

      <v-flex xs12>
        <!-- <v-tooltip top>
          <v-btn
            class="mt-0"
            color="transparent"
            slot="activator"
            block
            @click="addItem"
            style="box-shadow: none !important"
          >
            <v-icon medium color="success">fas fa-plus fa-3x</v-icon>
          </v-btn>Add another file
        </v-tooltip>
        </v-flex>-->
        <v-card class="mt-2" @click="addItem" hover ripple="hover">
          <v-card-text>
            <v-layout row wrap>
              <v-spacer></v-spacer>
              <v-tooltip top>
                <v-icon slot="activator" color="success">fas fa-plus fa-3x</v-icon>Add another file
              </v-tooltip>
              <v-spacer></v-spacer>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
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
    ],
    rules: {
      required: value => !!value || "This field is required"
    }
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
      // this.$notify({
      //   message: "File is invalid. Only PDF File is supported.",
      //   icon: "add_alert",
      //   type: "warning",
      //   initialMargin: 100
      // });
    }
  }
};
</script>

<style>
</style>
