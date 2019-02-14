<template>
    <v-layout row wrap>
        <v-flex xs12 class="display">
            <span>Name: </span>{{displayName}}
        </v-flex>
        <v-flex xs12 class="display">
            <span>Email: </span>{{account.email}}
        </v-flex>
        <v-flex xs12>
            <v-text-field label="Username" v-model="account.username"></v-text-field>
        </v-flex>
        <v-flex xs12>
            <v-text-field 
                label="Password" 
                v-model="account.password"
                :append-icon="value ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (value = !value)"
                :type="value ? 'password' : 'text'">
            </v-text-field>
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
  },
  computed: {
    displayName() {
      var name = this.account.name.last ? this.account.name.last : "";
      if (
        name !== "" &&
        this.account.name.first &&
        this.account.name.first !== ""
      )
        name += ", ";
      name += this.account.name.first ? this.account.name.first : "";
      return name;
    }
  },
  watch: {
    account(val) {
      console.log(JSON.stringify(val));
    }
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
