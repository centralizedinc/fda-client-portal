<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-text-field label="Username" v-model="account.username"></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        label="Password"
        v-model="account.password"
        :append-icon="value ? 'visibility_off' : 'visibility'"
        :append-icon-cb="() => (value = !value)"
        :type="value ? 'password' : 'text'"
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["account"],
  data() {
    return {
      value: true
    };
  }
};
</script>

<style>
.display {
  font-size: 16px;
}
.display span {
  font-weight: bold;
}
</style>
