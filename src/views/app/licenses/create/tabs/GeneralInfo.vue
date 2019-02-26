<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-autocomplete
        v-model="form.general_info.product_type"
        :items="product_items"
        :rules="[rules.required]"
        hide-no-data
        hide-selected
        @change="load_primary_items"
        item-text="name"
        color="green darken-1"
        item-value="_id"
        label="Product Type"
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
        @change="load_items"
        item-text="name"
        item-value="_id"
        :rules="[rules.required]"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        v-model="form.general_info.addtl_activity"
        :rules="[rules.required]"
        :items="secondary_items"
        hide-no-data
        color="green darken-1"
        hide-selected
        label="Additional Activity"
        type="text"
        item-text="name"
        item-value="_id"
        v-if="form.general_info.primary_activity&&form.general_info.primary_activity!==''&&secondary_items.length!==0"
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
        v-if="form.general_info.primary_activity&&form.general_info.primary_activity!==''&& declared_items!==null"
      ></v-autocomplete>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["form"],
  data: () => ({
    rules: {
      required: value => !!value || "This field is required",
      declare: () =>
        "Please declare your capital. If none, select Not Applicable"
    }
  }),
  created(){
    console.log('this.product_items :', JSON.stringify(this.product_items));
  },
  watch:{
    form(){
      if(!isEmpty(this.form.general_info.primary_activity)){
        console.log("watch of primary activity"+JSON.stringify(this.form.general_info.primary_activity))
        this.declared_items();
      }
    }
  },
  computed: {
    product_items() {
      console.log(
        "created product type $$$$$$$$$$$$$$$$$$$$$$$$$: " +
          JSON.stringify(this.$store.state.products.productType)
      );
      console.log("data from form: " + JSON.stringify(this.form))
      return this.$store.state.products.productType;
    },
    primary_items() {
      console.log("primary activity data: " + JSON.stringify(this.$store.state.products.primaryActivity))
      return this.$store.state.products.primaryActivity;
    },
    secondary_items() {
      return this.$store.state.products.secondaryActivity;
    },
    declared_items() {
      return this.form.general_info.primary_activity.declared_capital;
    }
  },
  methods: {
    load_primary_items() {
      console.log('this.form.general_info.product_type :', JSON.stringify(this.form));
      this.form.general_info.primary_activity = "";
      this.$emit("product_select", this.form.general_info.product_type);
    },
    load_items() {
      this.form.general_info.addtl_activity = "";
      this.form.general_info.declared_capital = "";
      this.$emit("primary_select", this.form.general_info.primary_activity);
      console.log("load items general info:  " + JSON.stringify(this.$store.state.products.declared))
    }
  }
};
</script>

<style>
</style>
