<template>
  <v-layout row wrap>
    <v-flex xs12 
      v-if="form.uploaded_files && form.uploaded_files.length > 0"
      v-for="(item, index) in form.uploaded_files" 
      :key="index">
      <a :href="item.location" target="_blank">{{item.originalname}}</a>
      <v-spacer></v-spacer>
      {{formatDate(item.date)}}
      <v-divider></v-divider>
    </v-flex>
    <v-flex xs12 v-else>No documents generated yet</v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["form"]
};
</script>

<style>
</style>
