<template>
  <v-form ref="form" v-model="isValid">
    <v-container grid-list-md>
      <v-layout row wrap>
        <!-- Activity -->
        <v-flex xs6>
          <!-- v-model="form.establishment_info.activity" -->
          <v-autocomplete
            :rules="[rules.required]"
            hide-no-data
            color="green darken-1"
            outline
            hide-selected
            :value="activity"
            v-model="form.establishment_info.activity"
            label="Please select the corresponding company activity/ies"
            :items="companyActivity"
            item-text="name"
            item-value="_id"
          ></v-autocomplete>
        </v-flex>
        <!-- Source Type -->
        <v-flex xs6 v-if="sourceType">
          <!-- v-model="form.establisment_info.type" -->
          <v-autocomplete
            color="green darken-1"
            :rules="[rules.required]"
            outline
            hide-no-data
            hide-selected
            :disabled="sourceType"
            :value="form.establishment_info.type"
            label="Source Type"
            v-model="form.establishment_info.type"
            :items="source"
            item-text="name"
            item-value="_id"
          ></v-autocomplete>
        </v-flex>
        <!-- Country Origin -->
        <v-flex xs6 v-if="countryOrigin">
          <!-- v-model="form.establisment_info.origin_country" -->
          <v-autocomplete
            :rules="[rules.required]"
            color="green darken-1"
            outline
            hide-no-data
            hide-selected
            v-model="form.establishment_info.origin_country"
            label="Country of Origin"
            :items="origin"
            item-text="name"
            item-value="_id"
          ></v-autocomplete>
        </v-flex>
        <!-- Directly Source -->
        <v-flex xs6 v-if="directlySourced">
          <!-- v-model="form.establisment_info.directly_source"
            :items="answer"
            item-text="name"
          item-value="code"-->
          <v-autocomplete
            outline
            :rules="[rules.required]"
            color="green darken-1"
            hide-no-data
            hide-selected
            value
            label="Directly Sourced?"
            v-model="form.establishment_info.directly_source"
            :items="answer"
            item-text="name"
            item-value="code"
          ></v-autocomplete>
        </v-flex>
        <!-- Documents Upload -->
        <v-flex xs12 v-if="documentUpload">
          <v-toolbar
            dark
            class="sheetStyle elevation-10 mt-3 mb-4 subheading"
            color="fdaGreen"
            height="30"
            width="calc(100% - 10px)"
          >Documents Upload</v-toolbar>
        </v-flex>
        <v-flex xs6 class="pt-5 mt-3" v-if="documentUpload">
          <uploader @upload="upload"></uploader>
        </v-flex>
        <!-- instruction -->
        <v-flex xs6 v-if="instruction">
          <span
            class="caption font-weight-light"
          >Documentary Requirements/ Substantiation of Claims/ Product Label (Maximum upload file size 2MB)</span>
          <span class="caption font-weight-light" v-if="!form.establishment_info.directly_source">
            For products sourced from supplier, upload ANY of the following scanned copy of the original documents:
            <ul>
              <li>Foreign Agency Agreement, or</li>
              <li>Certificate of Distributorship, or</li>
              <li>Appointment Letter, or</li>
              <li>Proforma Invoice, or</li>
              <li>Memorandum of Agreement from each supplier</li>
            </ul>
          </span>
          <span class="caption font-weight-light" v-if="form.establishment_info.directly_source">
            For products sourced from the manufacturer, upload ANY of the following scanned copy of the original documents
            <ul>
              <li>Foreign Agency Agreement, or</li>
              <li>Certificate of Distributorship, or</li>
              <li>Appointment Letter, or</li>
              <li>Proforma Invoice, or</li>
              <li>Memorandum of Agreement from the manufacturer</li>
            </ul>
          </span>
          <br />
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
        <!-- instruction 2 -->
        <v-flex xs6 v-if="instruction2">
          <span
            class="caption font-weight-light"
          >Documentary Requirements/ Substantiation of Claims/ Product Label (Maximum upload file size 2MB)</span>
          <span class="caption font-weight-light">
            For products sourced from supplier/manufacturer, upload ANY of the following scanned copy of the original documents:
            <ul>
              <li>Valid notarized distributorship agreement,</li>
              <li>Letter of appointment between applicant and FDA-licensed source, or</li>
              <li>Valid Certificate of Product Registration (CPR) of product to be distributed</li>
            </ul>
          </span>
        </v-flex>
        <!-- instruction 3 -->
        <v-flex xs6 v-if="instruction3">
          <span
            class="caption font-weight-light"
          >Documentary Requirements/ Substantiation of Claims/ Product Label (Maximum upload file size 2MB)</span>
          <span
            class="caption font-weight-light"
          >For products sourced from toll manufacturer, upload the scanned copy of the Valid and notarized Toll Manufacturing and/or repacking agreement with FDA-licensed toll manufacturer and/or repacker</span>
        </v-flex>
        <!-- Supplier -->
        <v-flex xs6 v-if="supplier">
          <v-text-field
            color="green darken-1"
            :rules="[rules.required]"
            outline
            label="Supplier's Complete Name"
            v-model="form.establishment_info.supplier_name"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 v-if="supplier">
          <v-text-field
            color="green darken-1"
            :rules="[rules.required]"
            outline
            label="Supplier's Complete Address"
            v-model="form.establishment_info.supplier_address"
          ></v-text-field>
        </v-flex>
        <!-- Manufacturer -->
        <v-flex xs6 v-if="manufacturer">
          <v-text-field
            color="green darken-1"
            :rules="[rules.required]"
            outline
            label="Manufacturer's Complete Name"
            v-model="form.establishment_info.manufacturer_name"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 v-if="manufacturer">
          <v-text-field
            color="green darken-1"
            :rules="[rules.required]"
            outline
            label="Manufacturer's Complete Address"
            v-model="form.establishment_info.manufacturer_address"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn color="primary" @click="proceed">Continue</v-btn>
    <v-btn flat @click="cancel">Cancel</v-btn>
  </v-form>
</template>

<script>
export default {
  components: {
    Uploader: () => import("@/components/Uploader")
  },
  props: ["form", "source", "origin", "companyActivity"],
  data: () => ({
    uploads: false,
    isValid: true,
    uploadedFiles: [],
    form_data: null,
    company_activity: "",
    sourceType: false,
    countryOrigin: false,
    directlySourced: false,
    instruction: false,
    instruction2: false,
    instruction3: false,
    documentUpload: false,
    supplier: false,
    manufacturer: false,
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
    },
    "form.establishment_info.activity": function(val) {
      // this.sourceType = true
      //   this.countryOrigin = true
      //   this.directlySourced = true
      //   this.instruction = true
      //   this.instruction2 = true
      //   this.instruction3 = true
      //   this.documentUpload = true
      //   this.supplier = true
      //   this.manufacturer = true
      this.sourceType = false;
      this.countryOrigin = false;
      this.directlySourced = false;
      this.instruction = false;
      this.instruction2 = false;
      this.instruction3 = false;
      this.documentUpload = false;
      this.supplier = false;
      this.manufacturer = false;
      this.form.establishment_info.type = "";
      this.form.establishment_info.manufacturer_address = "";
      this.form.establishment_info.origin_country = "";
      this.form.establishment_info.directly_source = "";
      this.form.establishment_info.supplier_name = "";
      this.form.establishment_info.supplier_address = "";
      this.form.establishment_info.manufacturer_name = "";
      this.form.establishment_info.manufacturer_address = "";
      console.log("estab info activity: " + JSON.stringify(val));
      var activity = this.establishmentInfo(val).name;
      if (activity == "Manufacturer") {
      } else if (activity == "Importer, Distributor, Wholesaler") {
        this.sourceType = true;
        this.countryOrigin = true;
        this.instruction = true;
        this.directlySourced = true;
        this.documentUpload = true;
        console.log("source data: " + JSON.stringify(this.source));

        this.form.establishment_info.directly_source = this.source[0]._id;
        console.log();
      } else if (activity == "Distributor, Wholesaler") {
        this.directlySourced = true;
        this.documentUpload = true;
        this.instruction2 = true;
      } else if (activity == "Trader") {
        this.directlySourced = true;
        this.instruction3 = true;
        this.documentUpload = true;
      }
    },
    "form.establishment_info.directly_source": function(val) {
      if (val) {
        this.supplier = false;
        this.manufacturer = true;
      } else {
        this.supplier = true;
        this.manufacturer = true;
      }
    }
  },
  computed: {
    activity() {
      if (
        this.establishmentInfo(this.form.establishment_info.activity) ==
        "Manufacturer"
      ) {
      } else if (
        this.establishmentInfo(this.form.establishment_info.activity) ==
        "Manufacturer"
      ) {
      } else if (
        this.establishmentInfo(this.form.establishment_info.activity) ==
        "Manufacturer"
      ) {
      } else if (
        this.establishmentInfo(this.form.establishment_info.activity) ==
        "Manufacturer"
      ) {
      }
    }
  },
  created() {
    console.log("establishment info data: " + JSON.stringify(this.form));
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
      console.log(
        "form data check point: " + JSON.stringify(this.form.establishment_info)
      );
      this.$emit("upload", data);
      this.form_data = data.formData;
      this.uploadedFiles = data.uploadedFiles;
      this.form.output_files.push({
        form_data: this.form_data,
        uploadedFiles: this.uploadedFiles,
        type: "documents"
      });

      // console.log("this is upload data!!!: " + JSON.stringify(this.form_data));
      // this.$store.dispatch("SAVE_COMPLY_CERTIFICATE", {
      //       case_id: "this.selected.case_id",
      //       case_no: "this.selected.case_no",
      //       remarks: "this.remarks",
      //       form_data: this.form_data
      //     }).then((result) => {
      //       console.log("SAVE_COMPLY_CERTIFICATE result data: " + JSON.stringify(result))
      //       return this.$store.dispatch("GET_COMPLY_CERTIFICATE")
      //     }).then((result1) =>{
      //       console.log("GET_COMPLY_CERTIFICATE data result: " + JSON.stringify(result1))
      //     })

      // this.form.output_files.push({
      //   type: "documents",
      //   data: data
      // })
      this.uploads = true;
    },
    proceed() {
      if (this.validate()) {
        this.$emit("next", 3);
      } else {
        this.$notifyError([{ message: "Fill-up required fields." }]);
      }
    },
    cancel() {
      this.$emit("next", 1);
    },
    validate() {
      this.$refs.form.validate();
      return this.isValid;
    }
    // validate() {
    //   return this.uploads;
    // }
  }
};
</script>

<style>
</style>
