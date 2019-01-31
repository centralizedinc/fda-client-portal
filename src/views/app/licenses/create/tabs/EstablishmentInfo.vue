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
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        label="Establishment Owner"
        :rules="[rules.required]"
        required
        v-model="form.estab_details.establishment_owner"
      ></v-text-field>
      <ul>
        <li
          class="text-error"
        >For single proprietorship reflect the name of the person indicated in the DTI registration certificate.</li>
        <li
          class="text-danger"
        >For corporation/partnership/cooperative reflect the name of the corporation/partnership/cooperative as indicated in the SEC/CDA registration</li>
        <li
          class="text-danger"
        >For government owned or controlled corporation reflect the name of the agency as indicated in the charter.</li>
      </ul>
    </v-flex>
    <v-flex xs12>
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

    <v-flex xs12 mt-3>
      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>
      <v-card-title primary-title class="headline">Contact Information</v-card-title>
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
    </v-flex>

    <v-flex xs12 mt-3>
      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>
      <v-card-title primary-title class="headline">Product Line
        <v-tooltip top>
          <v-btn slot="activator" fab medium small color="fdaGreen" @click="addItem">
            <v-icon medium color="fdaSilver">add</v-icon>
          </v-btn>Apply New License
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg"></i>
          </v-btn>Get Help
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <template v-for="(item, index) in form.estab_details.products">
            <v-flex xs5 ml-4 :key="index">
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
            <v-flex xs5 ml-5 :key="index">
              <v-text-field
                color="green darken-1"
                :rules="[rules.required]"
                label="Remarks"
                v-model="item.remarks"
              ></v-text-field>
            </v-flex>
            <v-flex xs1 pt-3 :key="index">
              <v-btn flat icon @click="removeItem(index)">
                <v-icon color="error">remove_circle</v-icon>
              </v-btn>
            </v-flex>
          </template>
        </v-layout>
      </v-card-text>
      <div></div>
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
