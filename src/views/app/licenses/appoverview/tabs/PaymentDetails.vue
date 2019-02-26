<template>
  <v-layout row wrap>
    <v-flex xs8 class="subheading">Application Fee:</v-flex>
    <v-flex xs4>{{charges.fee}}</v-flex>
    <v-flex xs8 class="subheading">No. of year/s applied:</v-flex>
    <v-flex xs4>dd</v-flex>
    <v-flex xs8 class="subheading">Surcharge:</v-flex>
    <v-flex xs4>{{charges.surcharge}}</v-flex>
    <v-flex xs8 class="subheading">Legal Research Fund (LRF):</v-flex>
    <v-flex xs4>{{charges.lrf}}</v-flex>
    <v-flex xs8 class="title" mt-1 mb-1>Total Payment Due:</v-flex>
    <v-flex xs4>{{charges.total}}</v-flex>
    <!-- <v-flex xs8 class="subheading">Payment Receipt:</v-flex>
    <v-flex xs4 class="body-2">
      <a href="#">Receipt</a>
    </v-flex>-->
  </v-layout>
</template>

<script>
export default {
  props: ["form"],
  data(){
    return{
      charges:{}
    }
  },
  watch:{
    form(){
      if(
        isEmpty(this.form.general_info.product_type) &&
        isEmpty(this.form.general_info.primary_activity) &&
        isEmpty(this.form.general_info.declared_capital) &&
        isEmpty(this.form.application_type)){
          var details = {
            productType: this.form.general_info.product_type,
            primaryActivity: this.form.general_info.primary_activity,
            declaredCapital: this.form.general_info.declared_capital,
            appType: this.form.application_type
          }
          this.$store.dispatch("GET_FEES", details).then(result =>{
            this.charges = result;
            console.log("charges data payment details: " + JSON.stringify(this.charges))
          })
        }
    }
  }
}
</script>

<style>
</style>
