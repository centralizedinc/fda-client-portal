<template>
  <v-form v-model="isValid" ref="form">
    <v-container grid-list-md>
      <v-layout row wrap justify-center align-center>
        <v-flex xs4>
          <v-text-field
            :rules="[rules.required]"
            outline
            label="Shelf Life Declaration (in Months)"
            hint="For Alcoholic Beverages without Shelf Life, indicate 0 (Zero)"
            v-model="form.shelf.declaration_date"
          ></v-text-field>
        </v-flex>
        <!-- <v-flex xs4>
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="validity1"
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
              :rules="[rules.required]"
              label="Shelf Life Declaration (in Months)"
              v-model="form.shelf.declaration_date"
              append-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker 
            v-model="dateFormatted1"
            @input="validity1=false"
            color="green darken-1" 
            no-title 
            scrollable
        :min="new Date().toISOString().substr(0, 10)">-->
        <!-- <v-spacer></v-spacer>
              <v-btn flat color="secondary" outline @click="menu = false">Cancel</v-btn>
        <v-btn flat color="primary" @click="$refs.menu.save(form.food_product.license_validity)">OK</v-btn>-->
        <!-- </v-date-picker>
          </v-menu>
        </v-flex>-->
        <v-flex xs4>
          <v-autocomplete
            :rules="[rules.required]"
            :items="shelfLifeTypes"
            item-text="name"
            item-value="_id"
            outline
            label="Type"
            v-model="form.shelf.shelf_type"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs4>
          <v-text-field
            :rules="[rules.required]"
            outline
            label="Packaging Material Type/Name"
            hint="eg. Glass Bottle; Polyethylene Terephthalate (PET); Polyethylene; Polypropylene; Cellophane; Paper (such as Glassine, Vegetable Parchment); Can coated with Oleoresinous, Phenolic, Epoxy or Vinyl; Polyamide; Aluminum; Blister Pack; etc"
            v-model="form.shelf.packaging_material"
          ></v-text-field>
        </v-flex>
        <v-flex xs4>
          <v-text-field
            :rules="[rules.required]"
            outline
            label="Description of Product in Commercial Presentation"
            hint="eg. Individually Wrapped in Pillow Packs inside Laminated Plastic Pack, In Bottle, In Box, In 90g (2sachets x 45g) carton box"
            v-model="form.shelf.description"
          ></v-text-field>
        </v-flex>
        <v-flex xs4>
          <v-text-field
            :rules="[rules.required]"
            outline
            label="Storage Condition Requirements	"
            hint="e.g. Product should be stored in a cool and dry place with air humidity of 70% maximum, cool storage is recommended"
            v-model="form.shelf.storage_requirements"
          ></v-text-field>
        </v-flex>
        <v-flex xs4>
          <v-text-field
            :rules="[rules.required]"
            outline
            label="Function of the Food material"
            hint="Function of the Food Material applies to Food Additives and Ingredients only. (e.g. preservative, nutrient, emulsifier, bakery ingredient)"
            v-model="form.shelf.food_material"
          ></v-text-field>
        </v-flex>
        <v-flex xs4>
          <v-text-field
            :rules="[rules.required]"
            outline
            label="Source of Allergen (If any)"
            hint="eg. Cereal containing gluten; Crustaceans and products of these; Eggs and egg products; Peanuts, soybeans, and products of these; Milk and Milk products (lactose included); Tree nut and nut products; Sulphite in concentrations of 10 mg/kg or more)"
            v-model="form.shelf.allergen_source"
          ></v-text-field>
        </v-flex>
        <v-flex xs4>
          <v-text-field
            :rules="[rules.required]"
            outline
            label="Lot Code and Interpretation"
            hint="e.g. 230115A where 23- day, 01- month, 15- year, and A- 1st batch"
            v-model="form.shelf.lot_code_interpretation"
          ></v-text-field>
        </v-flex>
        <v-flex xs4>
          <v-text-field
            :rules="[rules.required]"
            outline
            label="Open Date Marking/ Expiry Date"
            v-model="form.shelf.date"
          ></v-text-field>
        </v-flex>
        <!-- <v-flex xs4>
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
              :rules="[rules.required]"
              label="Open Date Marking/ Expiry Date"
              v-model="form.shelf.date"
              append-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker 
            v-model="dateFormatted"
            @input="validity=false"
            color="green darken-1" 
            no-title 
            scrollable
        :min="new Date().toISOString().substr(0, 10)">-->
        <!-- <v-spacer></v-spacer>
              <v-btn flat color="secondary" outline @click="menu = false">Cancel</v-btn>
        <v-btn flat color="primary" @click="$refs.menu.save(form.food_product.license_validity)">OK</v-btn>-->
        <!-- </v-date-picker>
          </v-menu>
        </v-flex>-->
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
    },
    validity1: false,
    dateFormatted1: "",
    dateFormatted1: null,
    validity: false,
    dateFormatted: "",
    dateFormatted: null,
    expiry_date: null
  }),
  computed: {
    shelfLifeTypes(){
      return this.deepCopy(this.$store.state.foodCertificate.shelf_life)
    }
  },
  watch: {
    dateFormatted(val) {
      this.form.shelf.date = this.formatDate(val);
    },
    dateFormatted1(val) {
      this.form.shelf.declaration_date = this.formatDate(val);
    }
  },
  methods: {
    proceed() {
      if (this.validate()) {
        this.$emit("next", 6);
      } else {
        this.$notifyError([{ message: "Fill-up required fields." }]);
      }
    },
    cancel() {
      this.$emit("next", 4);
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
