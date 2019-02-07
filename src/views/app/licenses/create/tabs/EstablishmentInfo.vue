<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        :rules="[rules.required]"
        required
        label="Name of Establishment"
        v-model="form.estab_details.establishment_name"
      ></v-text-field>
    </v-flex>
    <v-flex xs6>
      <v-text-field
        color="green darken-1"
        label="Establishment Owner"
        :rules="[rules.required]"
        required
        v-model="form.estab_details.establishment_owner"
      ></v-text-field>
    </v-flex>
    <v-flex ml-5>
      <v-text-field
        color="green darken-1"
        label="TIN Number"
        :mask="tin"
        :rules="[rules.required]"
        hint="Establishment's registered Tax Identification Number"
        class="input-group--focused"
        v-model="form.estab_details.tin"
      ></v-text-field>
    </v-flex>
    <ul>
      <li
        class="text-danger"
      >For single proprietorship reflect the name of the person indicated in the DTI registration certificate.</li>
      <li
        class="text-danger"
      >For corporation/partnership/cooperative reflect the name of the corporation/partnership/cooperative as indicated in the SEC/CDA registration</li>
      <li
        class="text-danger"
      >For government owned or controlled corporation reflect the name of the agency as indicated in the charter.</li>
    </ul>

    <v-sheet
      dark
      class="font-weight-normal elevation-2 pl-3 mt-3 mb-4 subheading"
      color="fdaGreen"
      height="35"
      width="calc(100% - 30px)"
      style="border-radius: 0px 0px 12px 12px !important; text-transform: uppercase"
    >Contact Information
      <v-tooltip top>
        <v-btn slot="activator" flat icon small color="error">
          <v-icon small class="pb-1">fas fa-question fa-move</v-icon>
        </v-btn>Get Help
      </v-tooltip>
    </v-sheet>
    <p class="category ml-5">Note: Please indicate "N/A" for Not Applicable</p>
    <v-layout row wrap>
      <v-flex xs5 ml-5>
        <v-text-field
          color="green darken-1"
          :rules="[rules.required, rules.email]"
          label="1. Email Address"
          v-model="form.estab_details.email"
          :disabled="form.application_type==='R'"
          hint="Establishment's main email address. If possible, enter an email address that is not specific to an employee"
          class="input-group--focused"
        ></v-text-field>
      </v-flex>
      <v-flex xs5 ml-5>
        <v-text-field
          color="green darken-1"
          :rules="[rules.required]"
          label="2. Landline Number"
          v-model="form.estab_details.landline"
          :disabled="form.application_type==='R'"
          hint="Establishment's primary landline number"
          class="input-group--focused"
        ></v-text-field>
      </v-flex>
      <v-flex xs5 ml-5>
        <v-text-field
          color="green darken-1"
          :rules="[rules.required]"
          label="3. Fax Number"
          v-model="form.estab_details.fax"
          :disabled="form.application_type==='R'"
        ></v-text-field>
      </v-flex>
      <v-flex xs5 ml-5>
        <v-text-field
          color="green darken-1"
          :rules="[rules.required]"
          label="4. Mobile Number"
          v-model="form.estab_details.mobile"
          :disabled="form.application_type==='R'"
          hint="Establisment's or administrator's mobile number"
          class="input-group--focused"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-sheet
      dark
      class="font-weight-normal elevation-2 pl-3 mb-3 mt-3 subheading"
      color="fdaGreen"
      height="35"
      width="calc(100% - 30px)"
      style="border-radius: 0px 0px 12px 12px !important; text-transform: uppercase"
    >Product Line
      <v-tooltip top>
        <v-btn slot="activator" flat icon small color="error">
          <v-icon small class="pb-1">fas fa-question fa-move</v-icon>
        </v-btn>Get Help
      </v-tooltip>
    </v-sheet>

    <v-layout row wrap>
      <template v-for="(item, index) in form.estab_details.products">
        <v-flex xs5 ml-5 :key="index">
          <v-autocomplete
            color="green darken-1"
            v-model="item.prod_line"
            :items="lines"
            hide-no-data
            hide-selected
            :rules="[rules.required]"
            label="Product Line"
          ></v-autocomplete>
        </v-flex>
        <v-flex ml-2 :key="index">
          <v-text-field
            color="green darken-1"
            :rules="[rules.required]"
            label="Remarks"
            v-model="item.remarks"
          ></v-text-field>
        </v-flex>
        <v-flex xs1 mt-3 :key="index">
          <v-btn flat small icon @click="removeItem(index)">
            <v-icon color="error">fas fa-trash-alt</v-icon>
          </v-btn>
        </v-flex>
      </template>
    </v-layout>
    <!-- add button -->
    <v-flex xs12>
      <v-tooltip top>
        <v-btn
          color="transparent"
          slot="activator"
          block
          @click="addItem"
          style="box-shadow: none !important"
        >
          <v-icon medium color="success">fas fa-plus fa-3x</v-icon>
        </v-btn>Add new
      </v-tooltip>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["form"],
  data: () => ({
    products: [],
    lines: [
      "Creams, emulsions, lotions, gels and oils for skin (hands, face, feet, etc.)",
      "Face masks (with the exception of chemical peeling products)",
      "Tinted bases (liquids, pastes, powders)",
      "Make-up powders, after-bath powder, hygienic powders, etc.",
      "Toilet soaps, deodorant soaps, etc",
      "Perfumes, toilet waters and eau de Cologne",
      "Bath or shower preparations (salts, foams, oils. gels, etc.)",
      "Depilatories",
      "Deodorants and anti-perspirants",
      "Hair care products",
      "Shaving product (creams, foams, lotions, etc.)",
      "Products for making-up and removing make-up from the face and the eyes",
      "Products intended for application to the lips",
      "Products for care of the teeth and the mouth",
      "Products for nail care and make-up",
      "Products for external intimate hygiene",
      "Sunbathing products",
      "Products for tanning without sun",
      "Skin whitening products",
      "Anti-wrinkle products",
      "Others (Specify in Remarks)"
    ],
    rules: {
      required: value => !!value || "This field is required",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),
  methods: {
    addItem() {
      this.form.estab_details.products.push({
        prod_line: "",
        remarks: ""
      });
    },
    removeItem(index) {
      console.log(index);
      this.form.estab_details.products.splice(index, 1);
    }
  },
  watch: {
    form() {
      console.log("establishment form: " + JSON.stringify(this.form));
    }
  }
};
</script>

<style>
</style>
