<template>
  <v-form ref="form" v-model="valid">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs6>
          <!-- v-model="form.establishment_info.activity" -->
          <v-autocomplete
            :rules="[rules.required]"
            hide-no-data
            color="green darken-1"
            outline
            hide-selected 
            v-model="form.establisment_info.activity"
            label="Please select the corresponding company activity/ies"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs6>
          <!-- v-model="form.establisment_info.type" -->
          <v-autocomplete
            color="green darken-1"
            :rules="[rules.required]"
            outline
            hide-no-data
            hide-selected
            label="Source Type"
            v-model="form.establisment_info.type"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs6>
          <!-- v-model="form.establisment_info.origin_country" -->
          <v-autocomplete
            :rules="[rules.required]"
            color="green darken-1"
            outline
            hide-no-data
            hide-selected
            v-model="form.establisment_info.origin_country"
            label="Country of Origin"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs6>
           <!-- v-model="form.establisment_info.directly_source"
            :items="answer"
            item-text="name"
            item-value="code"  -->
          <v-autocomplete
            outline
            :rules="[rules.required]"
            color="green darken-1"           
            hide-no-data
            hide-selected
            label="Directly Sourced?"
            v-model="form.establisment_info.directly_source"
            :items="answer"
            item-text="name"
            item-value="code"
          ></v-autocomplete>
        </v-flex>
        <!-- Documents Upload -->
        <v-flex xs12>
          <v-toolbar
            dark
            class="sheetStyle elevation-10 mt-3 mb-4 subheading"
            color="fdaGreen"
            height="30"
            width="calc(100% - 10px)"
          >Documents Upload</v-toolbar>
        </v-flex>
        <v-flex xs6 class="pt-5 mt-3">
          <uploader @upload="upload"></uploader>
        </v-flex>
        <v-flex xs6>
          <span
            class="caption font-weight-light"
          >Documentary Requirements/ Substantiation of Claims/ Product Label (Maximum upload file size 2MB)</span>
          <span class="caption font-weight-light">
            For products sourced from supplier, upload ANY of the following scanned copy of the original documents:
            <ul>
              <li>Foreign Agency Agreement, or</li>
              <li>Certificate of Distributorship, or</li>
              <li>Appointment Letter, or</li>
              <li>Proforma Invoice, or</li>
              <li>Memorandum of Agreement from each supplier</li>
            </ul>
          </span>
          <br>
          <span class="caption font-weight-light">
            AND ANY of the following documents issued by the Regulatory/ Health Authority/ Attested by recognized Association or duly authenticated by the Philippine Consulate from the country of origin:
            <ul>
              <li>Certificate of Registration with GMP Compliance or its equivalent,</li>
              <li>Valid Sanitary Phyto-Sanitary Certificate, or</li>
              <li>Health Certificate, or</li>
              <li>ISO 22000 Certificate, or</li>
              <li>FSSC 22000, or</li>
              <li>HACCP Certificate, or</li>
              <li>Certificate of Free Sale issued by the Manufacturer</li>
            </ul>
          </span>
        </v-flex>

        <v-flex xs6>
          <v-text-field
            color="green darken-1"
            :rules="[rules.required]"
            outline
            label="Supplier's Complete Name"
            v-model="form.establisment_info.supplier_name"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            color="green darken-1"
            :rules="[rules.required]"
            outline
            label="Supplier's Complete Address"
            v-model="form.establisment_info.supplier_address"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            color="green darken-1"
            :rules="[rules.required]"
            outline
            label="Manufacturer's Complete Name"
            v-model="form.establisment_info.manufacturer_name"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            color="green darken-1"
            :rules="[rules.required]"
            outline
            label="Manufacturer's Complete Address"
            v-model="form.establisment_info.manufacturer_address"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  components: {
    Uploader: () => import("@/components/Uploader")
  },
  props: ["form"],
  data: () => ({
    uploads: false,
    valid: true,
    answer: [
        {
          name: "No",
          code: false
        },
        {
          name: "Yes",
          code: true
        }
    ],
    rules: {
      required: value => !!value || "This field is required"
    }
  }),
  watch: {
    files: {
      handler: function(val) {
        this.form.uploaded_files = val;
      },
      deep: true
    }
  },
  created(){
    console.log("establishment info data: " + JSON.stringify(this.form))
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
        color: "warning",
        initialMargin: 100
      });
    },
    upload(data) {
      this.$emit("upload", data);
      this.uploads = true;
    },
    validate() {
      return this.uploads;
    }
  }
};
</script>

<style>
</style>
