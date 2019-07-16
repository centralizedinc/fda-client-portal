<template>
  <v-form v-model="isValid" ref="form">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            outline
            name="name"
            v-model="form.company_representative.name"
            label="Name"
            id="id"
            :rules="[rules.required]"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            outline
            name="name"
            v-model="form.company_representative.designation"
            label="Designation"
            id="id"
            :rules="[rules.required]"
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
            color="green darken-1"
            v-model="form.company_representative.contacts.email"
            label="1. Email Address"
            :rules="[rules.required]"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            mask="(##)-####-####"
            color="green darken-1"
            v-model="form.company_representative.contacts.landline"
            label="2. Landline Number"
            :rules="[rules.required]"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            mask="(##)-####-####"
            color="green darken-1"
            v-model="form.company_representative.contacts.fax"
            label="3. Fax Number"
            :rules="[rules.required]"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            mask="(####)-###-####"
            color="green darken-1"
            v-model="form.company_representative.contacts.mobile"
            label="4. Mobile Number"
            :rules="[rules.required]"
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
    isValid: true,
    rules: {
      required: value => !!value || "This field is required"
    }
  }),
  methods: {
    proceed() {
      if (this.validate()) {
        this.$emit("next", 4);
      } else {
        this.$notifyError([{ message: "Fill-up required fields." }]);
      }
    },
    cancel() {
      this.$emit("next", 2);
    },
    validate() {
      this.$refs.form.validate();
      return this.isValid;
    }
  }
};
</script>

<style>
</style>
