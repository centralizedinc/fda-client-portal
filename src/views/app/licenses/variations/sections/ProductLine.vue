<template>
    <v-layout row wrap>
      <template v-for="(item, index) in form.estab_details.products">
        <v-flex xs4 :key="item._id" pa-2>
          <v-autocomplete pa-2
            v-model="item.prod_line"
            :items="prod_lines"
            item-text="name"
            item-value="_id"
            hide-no-data
            hide-selected
            :rules="[rules.required]"
            label="Product Line"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs8 :key="index" pa-2>
          <v-text-field
            color="primary"
            :rules="[rules.required]"
            label="Remarks"
            v-model="item.remarks"
            :append-outer-icon="index == form.estab_details.products.length-1?'far fa-plus-square':''"
            :append-icon="index != form.estab_details.products.length-1?'fas fa-backspace':''"
            @click:append-outer="addItem"
            @click:append="removeItem(index)"
          ></v-text-field>
        </v-flex>
      </template>
    </v-layout>
</template>

<script>
export default {
     props: ["form"],
  data: () => ({
    isValid:true,
    phone: "(##) #### - ####",
    mobile: "(####) - ### - ####",
    tin: "###-###-###-###",
    products: [],
    rules: {
      required: value => !!value || "This field is required",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),
  created() {
    var productLine = this.$store.state.products.prod_line;
  },
  computed: {
    prod_lines() {
      var items = [];
      this.$store.state.products.prod_line.forEach(item => {
        if (item.product_type === this.form.general_info.product_type)
          items.push(item);
      });
      return items;
    }
  },
  methods: {
    addItem() {
      this.form.estab_details.products.push({
        prod_line: "",
        remarks: ""
      });
    },
    removeItem(index) {
      console.log(index);
      this.form.estab_details.products.splice(index, 1);
    },
    validate(){
      this.$refs.vform.validate();      
      return this.isValid;
    }
  }
}
</script>

<style>

</style>
