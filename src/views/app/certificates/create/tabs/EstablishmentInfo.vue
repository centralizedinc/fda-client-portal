<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-autocomplete
        v-model="form.estab_info.company_activity"
        :items="types"
        hide-no-data
        color="green darken-1"
        hide-selected
        label="Please select the corresponding company activity/ies"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        v-model="form.estab_info.source_type"
        :items="types"
        color="green darken-1"
        hide-no-data
        hide-selected
        label="Source Type"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        v-model="form.estab_info.origin_country"
        :items="types"
        color="green darken-1"
        hide-no-data
        hide-selected
        label="Country of Origin"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        v-model="form.estab_info.source"
        :items="types"
        color="green darken-1"
        hide-no-data
        hide-selected
        label="Directly Sourced?"
      ></v-autocomplete>
    </v-flex>
    <!-- Documents Upload -->
    <v-flex xs12>
      <v-card-title primary-title class="headline">Documents Upload
        <v-spacer></v-spacer>
        <v-tooltip top>
          <v-btn slot="activator" flat icon right color="error">
            <i class="fas fa-question fa-lg"></i>
          </v-btn>Get Help
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <v-flex :key="index">
          <upload-btn
            label="1. Choose File"
            :index="index"
            @getFile="getFile"
            mimetype="application/pdf"
            @onError="uploadError"
          ></upload-btn>
        </v-flex>
        <v-flex :key="index">
          <upload-btn
            label="2. Choose File"
            :index="index"
            @getFile="getFile"
            mimetype="application/pdf"
            @onError="uploadError"
          ></upload-btn>
        </v-flex>
      </v-card-text>
      <v-flex xs12>
        <v-text-field
          color="green darken-1"
          label="Supplier's Complete Name"
          v-model="form.estab_info.supplier_name"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          color="green darken-1"
          multi-line
          label="Supplier's Complete Address"
          v-model="form.estab_info.supplier_address"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          color="green darken-1"
          label="Manufacturer's Complete Name"
          v-model="form.estab_info.manufacturer_name"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          multi-line
          color="green darken-1"
          label="Manufacturer's Complete Address"
          v-model="form.estab_info.manufacturer_address"
        ></v-text-field>
      </v-flex>
    </v-flex>

    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        label="Supplier's Complete Name"
        v-model="form.estab_info.supplier_name"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        multi-line
        label="Supplier's Complete Address"
        v-model="form.estab_info.supplier_address"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        label="Manufacturer's Complete Name"
        v-model="form.estab_info.manufacturer_name"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        multi-line
        color="green darken-1"
        label="Manufacturer's Complete Address"
        v-model="form.estab_info.manufacturer_address"
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {
    UploadBtn: () => import("@/components/UploadBtn")
  },
  props: ["form"],
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
