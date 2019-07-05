<template>
  <v-form ref="form" v-model="isValid">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            disabled
            outline
            name="name"
            v-model="form.establishment_info.company"
            label="Company Name (As listed in License)"
            id="id"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            disabled
            outline
            name="name"
            v-model="form.establishment_info.address"
            label="Address (As listed in License)"
            id="id"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            disabled
            outline
            name="name"
            v-model="form.establishment_info.license_no"
            label="License Number"
            id="id"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            disabled
            outline
            name="name"
            v-model="form.establishment_info.license_validity"
            label="LTO Validity"
            id="id"
          ></v-text-field>
        </v-flex>
        <!-- Contact Info -->
        <v-flex xs12>
          <v-toolbar
            dark
            class="sheetStyle elevation-10 mt-3 mb-4 subheading"
            color="fdaGreen"
            height="30"
            width="calc(100% - 10px)"
          >Contact Information as listed in License</v-toolbar>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            disabled
            color="green darken-1"
            v-model="form.establishment_info.contact_info.email"
            label="1. Email Address"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            disabled
            mask="(##)-####-####"
            color="green darken-1"
            v-model="form.establishment_info.contact_info.landline"
            label="2. Landline Number"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            disabled
            mask="(##)-####-####"
            color="green darken-1"
            v-model="form.establishment_info.contact_info.fax"
            label="3. Fax Number"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            disabled
            mask="(####)-###-####"
            color="green darken-1"
            v-model="form.establishment_info.contact_info.mobile"
            label="4. Mobile Number"
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
  props: ["form"],
  data: () => ({
    isValid: true
  }),
  methods: {
    proceed() {
      this.$emit("next", 3);
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
