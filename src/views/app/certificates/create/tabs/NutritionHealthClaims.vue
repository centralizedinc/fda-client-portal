<template>
  <v-form ref="valid">
    <v-container grid-list-md>
      <v-layout row wrap align-center justify-center>
        <template v-for="(item, index) in items">
          <v-flex xs6 :key="index">
            <v-autocomplete
              outline
              label="Claims"
              :rules="[rules.required]"
              hint="Please choose if Nutrition or Health Claims"
              :items="items"
              autocomplete
            ></v-autocomplete>
          </v-flex>
          <v-flex xs5 :key="index">
            <v-text-field
              outline
              name="name"
              label="Description"
              v-model="item.desc"
              :append-outer-icon="index == items.length-1?'far fa-plus-square':''"
              :append-icon="index != items.length-1?'fas fa-backspace':''"
              @click:append-outer="addItem"
              @click:append="removeItem(index)"
            ></v-text-field>
          </v-flex>
          <!-- <v-flex mb-4 :key="index" v-if="index > 0">
            <v-tooltip top>
              <v-btn slot="activator" flat icon color="primary" @click="removeItem(index)">
                <v-icon>far fa-minus-square</v-icon>
              </v-btn>Remove
            </v-tooltip>
          </v-flex>-->
        </template>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    items: ["Nutrition Claims", "Health Claims"],
    rules: {
      required: value => !!value || "This field is required"
    }
  }),
  methods: {
    addItem() {
      this.items.push({
        items: "",
        desc: ""
      });
    },
    removeItem(index) {
      this.items.splice(index, 1);
    }
  }
};
</script>

<style>
</style>
