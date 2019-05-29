<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-checkbox label="Change in Brand Name" v-model="value" value="value"></v-checkbox>
      <v-card>
        <v-text-field label="From Brand Name" v-model="form.food_product.brand_name" disabled></v-text-field>
        <v-text-field label="To Brand Name" v-model="form.for_ammendment.brand_name"></v-text-field>
      </v-card>
      <v-checkbox label="Change in Product Name" v-model="value" value="value"></v-checkbox>
      <v-card>
        <v-text-field label="From Product Name" v-model="value" disabled></v-text-field>
        <v-text-field label="To Product Name" v-model="form.for_ammendment.product_name"></v-text-field>
      </v-card>
      <v-checkbox label="Change in Company Name" v-model="value" value="value"></v-checkbox>
      <v-card>
        <v-text-field label="From Comapny Name (As listed in LTO)" v-model="value" disabled></v-text-field>
        <v-text-field label="To Company Name (As listed in LTO)" v-model="form.for_ammendment.company_name"></v-text-field>
      </v-card>
      <v-checkbox label="Change in Supplier Details" v-model="value" value="value"></v-checkbox>
      <v-card>
        <v-text-field label="From Complete Name of Supplier" v-model="value" disabled></v-text-field>
        <v-text-field label="From Complete Address of Supplier" v-model="value" disabled></v-text-field>
        <v-text-field label="To Complete Name of Supplier" v-model="form.for_ammendment.supplier_name"></v-text-field>
        <v-text-field label="To Complete Address of Supplier" v-model="form.for_ammedment.supplier_address"></v-text-field>
      </v-card>
      <v-checkbox
        label="Change in Packing Material and/or Additional Type"
        v-model="value"
        value="value"
      ></v-checkbox>
      <v-card>
        ( eg. Glass Bottle; Polyethylene Terephthalate (PET); Polyethylene; Polypropylene; Cellophane; Paper (such as Glassine, Vegetable Parchment); Can coated with Oleoresinous, Phenolic, Epoxy or Vinyl; Polyamide;Aluminum; etc)
        <v-text-field label="From Packaging Material Type/Name" v-model="value" disabled></v-text-field>
        <v-text-field label="To Packaging Material Type/Name" v-model="form.for_ammendment.packaging_material"></v-text-field>
      </v-card>
      <v-checkbox
        label="Change of Packaging in Commercial Presentation"
        v-model="value"
        value="value"
      ></v-checkbox>
      <v-card>
        eg. Individually Wrapped in Pillow Packs inside Laminated Plastic Pack, In Bottle, In Box, In 90g (2sachets x 45g) carton box
        <v-text-field label="From Product Commercial Presentation" v-model="value" disabled></v-text-field>
        <v-text-field label="To Product Commercial Presentation" v-model="form.for_ammendment.product_commercial"></v-text-field>
      </v-card>
      <v-checkbox label="Change or Extension in Shelf Life" v-model="value" value="value"></v-checkbox>
      <v-card>
        For Alcoholic Beverages without Shelf Life, indicate 0 (Zero)
        <v-text-field label="From Shelf Life Declaration(in Months)" v-model="value"></v-text-field>
        <v-text-field label="To Shelf Life Declaration(in Months)" v-model="form.for_ammendment.shelf_life"></v-text-field>
      </v-card>
      <v-checkbox label="Change in/Additional Packaging Design" v-model="value" value="value"></v-checkbox>
      <v-card>
        <v-flex xs12>
          <uploader @upload="upload"></uploader>
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Uploader from "@/components/Uploader";

export default {
  components: {
    Uploader
  },
  data() {
    return {
      uploads: false
    };
  },
  methods: {
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
