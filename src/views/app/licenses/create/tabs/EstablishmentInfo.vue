<template>
<v-form v-model="isValid" ref="vform">
  <v-layout row wrap>
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        :rules="[rules.required]"
        required
        label="Name of Establishment"
        v-model="form.estab_details.establishment_name"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        label="Establishment Owner"
        :rules="[rules.required]"
        required
        v-model="form.estab_details.establishment_owner"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        label="TIN"
        :mask="tin"
        :rules="[rules.required]"
        hint="Establishment's registered Tax Identification Number"
        class="input-group--focused"
        v-model="form.estab_details.tin"
      ></v-text-field>
    </v-flex>
    <!-- <ul>
      <li
        class="text-danger"
      >For single proprietorship reflect the name of the person indicated in the DTI registration certificate.</li>
      <li
        class="text-danger"
      >For corporation/partnership/cooperative reflect the name of the corporation/partnership/cooperative as indicated in the SEC/CDA registration</li>
      <li
        class="text-danger"
      >For government owned or controlled corporation reflect the name of the agency as indicated in the charter.</li>
    </ul> -->

    <v-sheet
      dark
      class="font-weight-normal elevation-2 pl-3 mt-3 mb-4 subheading"
      color="fdaGreen"
      height="40"
      width="calc(100% - 10px)"
      style="border-radius: 0px 0px 12px 12px !important; text-transform: uppercase"
    >
      Contact Information
      <!-- <v-tooltip top>
        <v-btn slot="activator" flat icon small color="error">
          <v-icon small class="pb-1">fas fa-question fa-move</v-icon>
        </v-btn>Note: Please indicate "N/A" for Not Applicable
        <br>Email must be valid. Contact numbers should be active
      </v-tooltip> -->
    </v-sheet>
    <!-- <p class="category ml-5">Note: Please indicate "N/A" for Not Applicable</p> -->
    <v-layout row wrap>
      <v-flex xs5 ml-5>
        <v-text-field
          color="green darken-1"
          :rules="[rules.required, rules.email]"
          label="1. Email Address"
          v-model="form.estab_details.email"
          :disabled="form.application_type=== 2"
          hint="Establishment's main email address. If possible, enter an email address that is not specific to an employee"
          class="input-group--focused"
        ></v-text-field>
      </v-flex>
      <v-flex xs5 ml-5>
        <v-text-field
          color="green darken-1"
          :rules="[rules.required]"
          label="2. Landline Number"
          :mask="phone"
          v-model="form.estab_details.landline"
          :disabled="form.application_type===2"
          hint="Establishment's primary landline number"
          class="input-group--focused"
        ></v-text-field>
      </v-flex>
      <v-flex xs5 ml-5>
        <v-text-field
          color="green darken-1"
          :rules="[rules.required]"
          label="3. Fax Number"
          :mask="phone"
          v-model="form.estab_details.fax"
          :disabled="form.application_type===2"
        ></v-text-field>
      </v-flex>
      <v-flex xs5 ml-5>
        <v-text-field
          :rules="[rules.required]"
          label="4. Mobile Number"
          :mask="mobile"
          v-model="form.estab_details.mobile"
          :disabled="form.application_type===2"
          hint="Establishment's or administrator's mobile number"
          class="input-group--focused"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-sheet
      dark
      class="font-weight-normal elevation-2 pl-3 mb-3 mt-3 subheading"
      color="fdaGreen"
      height="40"
      width="calc(100% - 10px)"
      style="border-radius: 0px 0px 12px 12px !important; text-transform: uppercase"
    >
      Product Line
      <!-- <v-tooltip top>
        <v-btn slot="activator" flat icon small color="error">
          <v-icon small class="pb-1">fas fa-question fa-move</v-icon>
        </v-btn>Please add all applicable product line
      </v-tooltip> -->
      <!-- <v-btn outline icon >
        <v-icon>add</v-icon>
      </v-btn> -->
    </v-sheet>

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
         
        <!-- <v-flex xs2 :key="index" >
              <v-btn flat small icon @click="addItem" v-if="index == form.estab_details.products.length-1">
                <v-icon color="primary">add</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn flat small icon @click="removeItem(index)" v-if="index > 0">
                <v-icon color="primary">fas fa-trash-alt fa-lg</v-icon>
              </v-btn>          
        </v-flex> -->
      </template>
    </v-layout>
    <!-- add button -->
    <!-- <v-flex xs12>
      <v-tooltip top>
        <v-btn
          color="transparent"
          slot="activator"
          large
          hover
          block
          @click="addItem"
          style="box-shadow: none !important"
        >
          <v-icon color="success">fas fa-plus fa-3x</v-icon>
        </v-btn>Add new
      </v-tooltip>
    </v-flex> -->
  </v-layout>
  </v-form>
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
    var line = [];

    productLine.forEach(element => {
      this.products.push(element.name);
    });
    console.log("created############: " + JSON.stringify(this.products));
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
};
</script>

<style>
</style>
