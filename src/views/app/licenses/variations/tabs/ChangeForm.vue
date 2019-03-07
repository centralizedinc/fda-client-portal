<template>
    <v-container grid-list-xl>
      <business-name 
        v-if="variationContains(['MN4', 'MJ1'])"
        :existingForm="existingForm"
        :updatedForm="updatedForm">
      </business-name>
      <ownership 
        v-if="variationContains(['MJ2'])"
        :existingForm="existingForm"
        :updatedForm="updatedForm">
      </ownership>
      <authorized-personel 
        v-if="variationContains(['MN5'])"
        :existingForm="existingForm"
        :updatedForm="updatedForm">
      </authorized-personel>
      <address 
        v-if="variationContains(['MN4', 'MJ3'])"
        :existingForm="existingForm"
        :updatedForm="updatedForm">
      </address>
    </v-container>
</template>

<script>
export default {
  components: {
    Address: () => import('./Address.vue'),
    AuthorizedPersonel: () => import('./AuthorizedPersonel.vue'),
    BusinessName: () => import('./BusinessName.vue'),
    Ownership: () => import('./Ownership.vue')
  },
  props: ["variations", "existingForm", "updatedForm"],
  methods: {
    variationContains(codes) {
      for (let i = 0; i < codes.length; i++) {
        if (this.variations.indexOf(codes[i]) > -1) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>

<style>
.selected-row {
  color: gray;
  background: gray;
}
</style>
