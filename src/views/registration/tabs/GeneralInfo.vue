<template>
 <v-form ref="vform" v-model="isValid">
  <v-layout row wrap>   
    <v-flex xs12>                    
      <v-autocomplete
        v-model="form.general_info.product_type"
        :items="product_items"
        :rules="[rules.required]"
        hide-no-data
        hide-selected
        item-text="name"
        color="green darken-1"
        item-value="_id"
        label="Product Type"
        v-if="product_items.length > 0"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        v-model="form.general_info.primary_activity"
        :items="primary_items"
        hide-no-data
        color="green darken-1"
        hide-selected
        label="Primary Activity"
        type="text"
        item-text="name"
        item-value="_id"
        :rules="[rules.required]"
        v-if="primary_items.length > 0"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        v-model="form.general_info.addtl_activity"
        :rules="[rules.required]"
        :items="additional_items"
        hide-no-data
        multiple
        chips
        clearable
        color="green darken-1"
        hide-selected
        label="Additional Activity"
        type="text"
        item-text="name"
        item-value="_id"
        v-if="additional_items.length > 0"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        v-model="form.general_info.declared_capital"
        :items="declared_items"
        hide-no-data
        color="green darken-1"
        hide-selected
        :rules="[rules.required]"
        label="Declared Capital"
        required
        type="text"
        item-text="name"
        item-value="_id"
        v-if="declared_items.length > 0"
      ></v-autocomplete>     
    </v-flex>
   
  </v-layout>
   </v-form>
</template>

<script>
export default {
  props: ["form"],
  data: () => ({
    isValid:true,
    rules: {
      required: value => !!value || "This field is required",
      declare: () =>
        "Please declare your capital. If none, select Not Applicable"
    }
  }),
  watch: {
    "form.general_info.product_type": function(val) {
      this.form.general_info.primary_activity = "";
    },
    "form.general_info.primary_activity": function(val) {
      this.form.general_info.addtl_activity = "";
      this.form.general_info.declared_capital = "";
    },
    "form.general_info.product_type": function(val){
      console.log(this.form.general_info.addtl_activity)
    }
  },
  computed: {
    product_items() {
      return this.$store.state.products.productType;
    },
    primary_items() {
      var products_primary = this.isEmpty(this.form.general_info.product_type)
        ? []
        : this.$store.state.products.productType.find(
            x => x._id === this.form.general_info.product_type
          ).primary_activity;
      return this.getItems(
        products_primary,
        this.$store.state.products.primaryActivity
      );
    },
    additional_items() {
      var primary_additional = this.isEmpty(
        this.form.general_info.primary_activity
      )
        ? []
        : this.$store.state.products.primaryActivity.find(
            x => x._id === this.form.general_info.primary_activity
          ).additional_activities;
      return this.getItems(
        primary_additional,
        this.$store.state.products.additional
      );
    },
    declared_items() {
      var primary_declared = this.isEmpty(
        this.form.general_info.primary_activity
      )
        ? []
        : this.$store.state.products.primaryActivity.find(
            x => x._id === this.form.general_info.primary_activity
          ).declared_capital;
      return this.getItems(
        primary_declared,
        this.$store.state.products.declared
      );
    }
  },
  created(){
    this.init();
  },
  methods: {
    init(){
      this.$store.dispatch("GET_PRODUCT_REFERENCE")
    },
    getItems(arr1, arr2) {
      var items = [];
      for (let a = 0; a < arr1.length; a++) {
        for (let b = 0; b < arr2.length; b++) {
          if (arr1[a] === arr2[b]._id.toString()) {
            items.push(arr2[b]);
            break;
          }
        }
      }
      return items;
    },
    validate(){
      this.$refs.vform.validate();
      return this.isValid;
    }
  }
};
</script>

<style>
</style>
