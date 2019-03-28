<template>
  <v-layout row wrap>
    <v-flex xs12 mt-3 ml-3>
      <span class="headline font-weight-bold">Your License application is in process.</span>
    </v-flex>
    <v-layout row wrap>
      <v-flex xs4 mt-2 ml-3>
        <span class="body-2">Case Number</span>
      </v-flex>
      <v-flex xs4 mr-5>
        <v-chip class="font-weight-bold" label color="fdaGreen" text-color="white">{{form.case_no}}</v-chip>
      </v-flex>
      <v-flex xs4 ml-3 mt-2 mb-2>
        <span class="body-2">Application Type</span>
      </v-flex>
      <v-flex
        xs4
        mr-5
        ml-1
        mt-2
        mb-2
      >{{getAppType(form.application_type)}} - {{getCaseType(case_holder.case_type)}}</v-flex>
      <!-- <v-flex xs4 mr-5 ml-1>
        <v-chip class="font-weight-bold" label color="fdaGreen" text-color="white">{{getCaseType(case_holder.case_type)}}</v-chip>
      </v-flex>-->
      <v-flex xs4 ml-3 mt-2 mb-2>
        <span class="body-2">Establishment</span>
      </v-flex>
      <v-flex xs4 mr-5 ml-1>{{form.estab_details.establishment_name}}</v-flex>
      <v-flex xs12 text-xs-center>
        <a href="#">Click here to download your official receipt</a>
      </v-flex>
    </v-layout>
    <v-flex xs12>
      <v-divider></v-divider>
    </v-flex>
    <v-btn block color="success">Back to Main</v-btn>
  </v-layout>
</template>

<script>
export default {
  props: {
    form: {
      type: Object
    },
    charges: {
      type: Object
    },
    case_holder: {
      type: Object
    },
    allow_paylater: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style>
</style>
