<template>
  <v-form v-model="isValid" ref="form">
    <v-container grid-list-md>
      <v-layout row wrap align-center justify-center>
        <template v-for="(item, index) in form.claims">
          <v-flex xs6 :key="`a${index}`">
            <v-autocomplete
              v-model="item.claim"
              outline
              label="Claims"
              :rules="[rules.required]"
              hint="Please choose if Nutrition or Health Claims"
              persistent-hint
              :items="nutritionHealthClaims"
              item-text="name"
              item-value="_id"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs5 :key="`b${index}`">
            <v-text-field
              outline
              name="name"
              label="Description"
              v-model="item.desc"
              :append-outer-icon="index == form.claims.length-1?'far fa-plus-square':''"
              :append-icon="index != form.claims.length-1?'fas fa-backspace':''"
              @click:append-outer="addItem"
              @click:append="removeItem(index)"
            ></v-text-field>
          </v-flex>
          <v-flex mb-4 :key="index" v-if="index > 0">
            <v-tooltip top>
              <v-btn slot="activator" flat icon color="primary" @click="removeItem(index)">
                <v-icon>far fa-minus-square</v-icon>
              </v-btn>Remove
            </v-tooltip>
          </v-flex>
        </template>
      </v-layout>
    </v-container>
    <v-btn color="primary" @click="proceed">Continue</v-btn>
    <v-btn flat @click="cancel">Cancel</v-btn>
  </v-form>
</template>

<script>
export default {
  props: ["form", "nutritionHealthClaims"],
  data: () => ({
    isValid: true,
    nutrition_health_claims: [],
    claims: "",
    description: "",
    rules: {
      required: value => !!value || "This field is required"
    }
  }),
  created() {
    this.init();
  },

  methods: {
    addItem() {
      console.log(
        "add item claim first data: " + JSON.stringify(this.form.claims)
      );
      this.form.claims.push({
        claim: "",
        desc: ""
      });
      // this.claims = ""
      // this.description = ""
      console.log("add item claim data: " + JSON.stringify(this.form.claims));
    },
    proceed() {
      this.$emit("next", 8);
    },
    cancel() {
      this.$emit("next", 6);
    },
    validate() {
      this.$refs.form.validate();
      return this.isValid;
    },
    removeItem(index) {
      this.form.claims.splice(index, 1);
    },
    init() {
      // this.nutrition_health_claims = this.$store.state.foodCertificate.nutrition_health_claims
      console.log(
        "nutrition health claims data: " +
          JSON.stringify(this.nutrition_health_claims)
      );
    }
  }
};
</script>

<style>
</style>
