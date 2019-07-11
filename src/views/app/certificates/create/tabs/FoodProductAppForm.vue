<template>
  <v-form v-model="isValid" ref="form">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs6>
          <v-autocomplete
            outline
            :rules="[rules.required]"
            required
            color="green darken-1"
            v-model="foodProduct"
            :items="foodProducts"
            item-text="name"
            item-value="_id"
            hide-no-data
            hide-selected
            label="Food Product Type"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs6>
          <v-autocomplete
            outline
            :rules="[rules.required]"
            required
            color="green darken-1"
            hide-no-data
            hide-selected
            v-model="form.food_product.categorization"
            :items="categoryHolder"
            item-text="name"
            item-value="_id"
            label="Food Category"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            :rules="[rules.required]"
            required
            color="green darken-1"
            label="Brand Name"
            v-model="form.food_product.brand_name"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            :rules="[rules.required]"
            required
            color="green darken-1"
            label="Product Name"
            v-model="form.food_product.product_name"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            outline
            :rules="[rules.required]"
            required
            color="green darken-1"
            label="Company Name (as listed in LTO)"
            v-model="form.food_product.company"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            :rules="[rules.required]"
            required
            color="green darken-1"
            label="Address (as listed in LTO)"
            v-model="form.food_product.address"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <!-- <v-text-field
            outline
            :rules="[rules.required]"
            readonly=""
            color="green darken-1"
            label="Region"
            v-model="form.food_product.region"
          ></v-text-field>-->
          <v-autocomplete
            outline
            :rules="[rules.required]"
            readonly
            color="green darken-1"
            hide-no-data
            hide-selected
            label="Region"
            item-text="name"
            item-value="_id"
            v-model="form.food_product.region"
            :items="regions"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            :rules="[rules.required]"
            readonly
            color="green darken-1"
            label="LTO Number"
            v-model="form.food_product.license_no"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="validity"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              outline
              color="green darken-1"
              slot="activator"
              readonly
              :rules="[rules.required]"
              label="LTO Validity"
              v-model="form.food_product.license_validity"
              append-icon="event"
            ></v-text-field>
            <v-date-picker
              v-model="dateFormatted"
              @input="validity=false"
              color="green darken-1"
              no-title
              scrollable
              :min="new Date().toISOString().substr(0, 10)"
            >
              <!-- <v-spacer></v-spacer>
              <v-btn flat color="secondary" outline @click="menu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(form.food_product.license_validity)">OK</v-btn>-->
            </v-date-picker>
          </v-menu>
        </v-flex>
        <!-- <v-flex xs4>
          <v-autocomplete
            outline
            :rules="[rules.required]"
            required
            color="green darken-1"
            hide-no-data
            hide-selected
            label="Number of Years applied for Product Registration"
            :items="years"
            item-text="name"
            item-value="code"
          ></v-autocomplete>
        </v-flex>-->
        <!-- Contact Information -->
        <v-toolbar
          dark
          class="sheetStyle elevation-10 mt-3 mb-4 subheading"
          color="fdaGreen"
          height="30"
          width="calc(100% - 10px)"
        >Contact Information</v-toolbar>

        <v-flex xs6>
          <v-text-field
            outline
            readonly
            color="green darken-1"
            label="1. Email Address"
            v-model="form.food_product.contacts.email"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            readonly
            mask="(##)-####-####"
            color="green darken-1"
            v-model="form.food_product.contacts.landline"
            label="2. Landline Number"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            readonly
            mask="(##)-####-####"
            color="green darken-1"
            label="3. Fax Number"
            v-model="form.food_product.contacts.fax"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            readonly
            mask="(####)-###-####"
            color="green darken-1"
            label="4. Mobile Number"
            v-model="form.food_product.contacts.mobile"
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
    menu: null,
    isValid: true,
    contact: {},
    rules: {
      required: value => !!value || "This field is required"
    },
    emailRules: [
      v => !!v || "E-mail is required",
      v =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid"
    ],
    validity: false,
    dateFormatted: "",
    product_type: [],
    foodProduct: "",
    categoryHolder: [],
    years: [
      {
        code: 2,
        name: "2 years"
      },
      {
        code: 3,
        name: "3 years"
      },
      {
        code: 4,
        name: "4 years"
      },
      {
        code: 5,
        name: "5 years"
      }
    ],
    dateFormatted: null,
    expiry_date: null
  }),
  watch: {
    dateFormatted(val) {
      this.form.food_product.license_validity = this.formatDate(val);
    },
    foodProduct(val) {
      this.form.food_product.type = val;
      this.categoryHolder = [];
      console.log("type", this.form.food_product.type);
      this.category.forEach(data => {
        if (data.food_product == this.form.food_product.type) {
          this.categoryHolder.push(data);
        }
      });
    }
  },
  computed: {
    regions() {
      return this.deepCopy(this.$store.state.places.regions);
    },
    foodProducts() {
      return this.deepCopy(this.$store.state.foodCertificate.food_product);
    },
    category() {
      return this.deepCopy(this.$store.state.foodCertificate.food_category);
    }
  },
  methods: {
    proceed() {
      if (this.validate()) {
        this.$emit("next", 2);
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
    },
    submit() {
      this.$refs.form.validate();
      if (this.isValid) {
        this.isValid = false;
      } else {
        this.$notifyError([{ message: "Fill-up required fields." }]);
      }
    }
  }
};
</script>

<style>
</style>