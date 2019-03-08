<template>
    <v-layout row wrap>
        <v-flex xs12 class="text-xs-center headline">
            Ownership
        </v-flex>

        <v-flex xs12>
            <span class="body-1">Old Value</span>: <span class="body-2">{{existingForm.estab_details.establishment_owner}}</span>
            <v-text-field
                label="Establishment Owner"
                box :rules="[rules.required]"
                v-model="updatedForm.estab_details.establishment_owner"
            ></v-text-field>
        </v-flex>
        <v-divider></v-divider>
    </v-layout>
</template>

<script>
export default {
  props: ["existingForm", "updatedForm"],
  data() {
    return {
      rules: {
        required: v => !!v || "Required field"
      }
    };
  }
};
</script>

<style>
</style>
