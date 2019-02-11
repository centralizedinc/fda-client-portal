<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-autocomplete
        v-model="editForm.general_info.product_type"
        :items="types"
        :rules="[rules.required]"
        hide-no-data
        hide-selected
        @change="loadPrimary"
        item-text="name"
        color="green darken-1"
        item-value="_id"
        label="Product Type"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        v-model="form.general_info.primary_activity"
        :items="activity"
        hide-no-data
        color="green darken-1"
        hide-selected
        label="Primary Activity"
        type="text"
        @change="loadItems"
        item-text="name"
        item-value="_id"
        :rules="[rules.required]"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        v-model="form.general_info.addtl_activity"
        :rules="[rules.required]"
        :items="addtl"
        hide-no-data
        color="green darken-1"
        hide-selected
        label="Additional Activity"
        type="text"
        item-text="name"
        item-value="_id"
        v-if="form.general_info.primary_activity&&form.general_info.primary_activity!==''&&addtl.length!==0"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        v-model="form.general_info.primary_capital"
        :items="capital"
        hide-no-data
        color="green darken-1"
        hide-selected
        :rules="[rules.required]"
        label="Declared Capital"
        required
        type="text"
        item-text="name"
        item-value="_id"
        v-if="form.general_info.primary_activity&&form.general_info.primary_activity!==''&&capital.length!==0"
      ></v-autocomplete>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["form"],
  data: () => ({
    types: [],
    activity: [],
    addtl: [],
    capital: [],
    product: [],
    primary: [],
    rules: {
      required: value => !!value || "This field is required",
      declare: () =>
        "Please declare your capital. If none, select Not Applicable"
    }
  }),
  created() {
    this.init();
  },
  computed: {
    loadPrimary() {
      this.editForm = this.form;
      this.form.general_info.primary_activity = "";
      this.$store
        .dispatch("GET_PRIMARY_ACTIVITY", this.form.general_info.product_type)
        .then(result => {
          return (this.activity = this.$store.state.products.primaryActivity);
        });
    },
    loadItems() {
      this.form.general_info.addtl_activity = "";
      this.form.general_info.primary_capital = "";
      // this.$store.dispatch("GET_SECONDARY_ACTIVITY", this.form.general_info.primary_activity).then(result =>{
      //   return this.addtl = this.$store.state.products.secondaryActivity
      // })
      // this.$store.dispatch("GET_ADDITIONAL", this.form.general_info.primary_activity).then(result =>{
      //   return this.addtl = this.$store.state.products.secondaryActivity
      // })
      // this.$store.dispatch("GET_DECLARED", this.form.general_info.primary_activity).then(result =>{
      //   return this.capital = this.$store.state.products.declared
      // })
       this.$store.dispatch("GET_SECONDARY_ACTIVITY", this.form.general_info.primary_activity).then(result =>{
        this.addtl = this.$store.state.products.secondaryActivity
        return this.$store.dispatch("GET_ADDITIONAL", this.form.general_info.primary_activity)
      })
      .then(result =>{
        this.addtl = this.$store.state.products.secondaryActivity
        return this.$store.dispatch("GET_DECLARED", this.form.general_info.primary_activity)
      })
      .then(result =>{
        return this.capital = this.$store.state.products.declared
      })
    }
  },
  methods: {
    init() {
      this.$store
        .dispatch("GET_PRODUCT_TYPE")
        .then(result => {
          this.types = this.$store.state.products.productType;
        })
        .catch(err => {});
    }
  }
};
</script>

<style>
</style>
