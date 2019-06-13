<template>
  <v-form ref="form" v-model="valid">
    <v-container grid-list-md>
      <v-layout row wrap justify-center align-center>
        <!-- <v-flex xs6>
          <v-autocomplete
            outline
            :rules="[rules.required]"
            label="Physical Parameters"
            hint="e.g. powder, liquid, gel, etc."
            persistent-hint
            :items="physicalSpecs"
            autocomplete
          ></v-autocomplete>
        </v-flex>
        <v-flex xs5>
          <v-text-field outline :rules="[rules.required]" name="name" label="Specification" id="id"></v-text-field>
        </v-flex>
        <v-flex mb-4>
          <v-tooltip top>
            <v-btn slot="activator" flat icon color="primary">
              <v-icon>far fa-plus-square</v-icon>
            </v-btn>Add New
          </v-tooltip>
        </v-flex>
        <v-divider></v-divider>-->
        <v-toolbar dark flat color="primary" class="elevation-5">
          <span class="title font-weight-light">Parameter & Specification</span>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <v-btn slot="activator" outline small icon @click="addNewSpecs">
              <v-icon>edit</v-icon>
            </v-btn>Add New
          </v-tooltip>
        </v-toolbar>
        <v-flex xs12>
          <v-data-table :headers="headers" :items="specs_list" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
              <tr @click="viewItem(props.item, props.index)" style="cursor:pointer">
                <td>{{props.item.prod_spec}}</td>
                <td>{{props.item.parameter}}</td>
                <td>{{props.item.specs}}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
        <v-dialog
          v-model="dialogSpecs"
          scrollable
          persistent
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar dark color="primary">
              <span class="title font-weight-light">New Ingredient</span>
              <v-spacer></v-spacer>
              <v-btn flat icon @click="dialogSpecs=false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid">
                <v-container grid-list-md>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-autocomplete
                        v-model="selected_specs"
                        outline
                        :rules="[rules.required]"
                        label="Product Specification"
                        hint="You are required to fill in both Chemical and Microbiological specification"
                        persistent-hint
                        :items="prodSpecs"
                        item-text="name"
                        item-value="_id"
                        autocomplete
                      ></v-autocomplete>
                    </v-flex>
                    <!-- show only for physical -->
                    <v-flex xs12 v-if="selected">
                      <v-autocomplete
                        outline
                        :rules="[rules.required]"
                        label="Parameter"
                        persistent-hint
                        :items="physicalParameter"
                        item-text="name"
                        item-value="_id"
                        autocomplete
                      ></v-autocomplete>
                    </v-flex>
                    <!-- default -->
                    <v-flex xs12 v-else>
                      <v-text-field outline name="name" label="Parameter" id="id"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field outline name="name" label="Specification" id="id"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions v-if="add">
              <v-spacer></v-spacer>
              <v-btn outline color="primary" @click="dialogSpecs=false">Cancel</v-btn>
              <v-btn color="primary">Add</v-btn>
            </v-card-actions>
            <v-card-actions v-else>
              <v-spacer></v-spacer>
              <v-btn outline color="error">Delete</v-btn>
              <v-btn color="primary">Edit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: ["form", "prodSpecs" , "physicalParameter"],
  data: () => ({
    dialogSpecs: false,
    selected_specs: "",
    selected: true,
    add: true,
    index: null,
    valid: true,
    specs_list: [],
    physicalParameter: [],
    prodSpecs: [
      // "Physical (e.g. powder, liquid, gel, etc)",
      // "Chemical (e.g. Moisture Content, Water Activity, pH, etc)",
      // "Microbiological (e.g. Coliforms)"
    ],
    headers: [
      {
        text: "Type",
        value: "type"
      },
      {
        text: "Parameter",
        value: "parameter"
      },
      {
        text: "Specification",
        value: "specs"
      }
    ],
    rules: {
      required: value => !!value || "This field is required"
    }
  }),
  created() {
    this.init();
  },
  methods: {
    addNewSpecs() {
      this.add = true;
      this.dialogSpecs = true;
    },
    init() {
      this.prodSpecs = this.$store.state.foodCertificate.product_specification;
      console.log(
        "food specification data: " + JSON.stringify(this.prodSpecs)
      );
      // this.physicalParameter = this.$store.state.foodCertificate.physical_parameter;
      // console.log("physical parameter: " + JSON.stringify(this.physicalParameter));
      // this.vm_items = this.$store.state.foodCertificate.minerals;
      // console.log("minerals data: " + JSON.stringify(this.minerals));
    }
  },
  // watch: {
  //   selected_specs(val) {
  //     if (val === "Physical (e.g. powder, liquid, gel, etc)") {
  //       this.physicalParameter = ["Color", "Odor", "Taste", "Texture", "Form"];
  //     } else {
  //       this.selected = false;
  //     }
  //   }
  // }
};
</script>

<style>
.data-row:hover {
  cursor: pointer;
}
</style>
