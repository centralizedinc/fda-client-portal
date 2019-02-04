<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-autocomplete
        v-model="form.general_info.product_type"
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
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        v-model="form.general_info.primary_capital"
        :items="capital"
        hide-no-data
        color="green darken-1"
        hide-selected
        :rules="[rules.declare]"
        label="Declared Capital"
        required
        type="text"
        item-text="name"
        item-value="_id"
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
   created(){
    this.init();
  },
  methods:{
    init(){
      this.$store.dispatch("GET_PRODUCT_TYPE").then((result) => {
        
      console.log("########################product type list: " + JSON.stringify(this.$store.state.licenses.productType))
      // this.$store.state.licenses.productType.forEach(element => {
      //   // var data = {
      //   //   _id: element._id,
      //   //   name: elemenet.name,
      //   //   date_created: element.date_created,
      //   //   primary_activity: element.primary_activity
      //   // }
      //   this.types.push(element); 
      // })
      this.types = this.$store.state.licenses.productType;
      console.log("transfer to types##############: " + JSON.stringify(this.types))
      }).catch((err) => {
        
      });      
    },
    loadPrimary(){
      console.log("form general information product type: " + JSON.stringify(this.form.general_info.product_type))
      this.form.general_info.primary_activity = "";
      this.$store.dispatch("GET_PRIMARY", this.form.general_info.productType);
      this.activity = this.$store.licenses.primaryActivity
      

    },
    loadItems(){
      this.form.general_info.addtl_activity = "";
      this.form.general_info.primary_capital = "";
      this.$store.dispatch()
    }
  }
};
</script>

<style>
</style>
