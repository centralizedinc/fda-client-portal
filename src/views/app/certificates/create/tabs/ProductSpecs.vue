<template>
  <v-form ref="form" v-model="isValid">
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
          <v-data-table
            :headers="headers"
            :items="form.product_specification"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <!-- <tr @click="viewItem(props.item, props.index)" style="cursor:pointer"> -->
              <td>{{productSpecs(props.item.type).name}}</td>
              <td>{{getPhysicalParameter(props.item.parameter)}}</td>
              <td>{{props.item.specification}}</td>
              <td>
                <v-icon small class="mr-2" @click="editItem(props.item, props.index)">edit</v-icon>
                <v-icon small @click="deleteItem(props.index)">delete</v-icon>
              </td>
              <!-- </tr> -->
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
              <v-form v-model="isValid">
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
                    <v-flex xs12 v-if="selected === true">
                      <v-autocomplete
                        outline
                        :rules="[rules.required]"
                        label="Parameter"
                        persistent-hint
                        v-model="parameter"
                        :items="physicalParameter"
                        item-text="name"
                        item-value="_id"
                        autocomplete
                      ></v-autocomplete>
                    </v-flex>
                    <!-- default -->
                    <v-flex xs12 v-else>
                      <v-text-field
                        outline
                        name="name"
                        v-model="parameter"
                        label="Parameter"
                        id="id"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        outline
                        name="name"
                        v-model="specification"
                        label="Specification"
                        id="id"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions v-if="add">
              <v-spacer></v-spacer>
              <v-btn outline color="primary" @click="dialogSpecs=false">Cancel</v-btn>
              <v-btn color="primary" @click="saveSpecs">Add</v-btn>
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
    <v-btn color="primary" @click="proceed">Continue</v-btn>
    <v-btn flat @click="cancel">Cancel</v-btn>
  </v-form>
</template>

<script>
export default {
  props: ["form"],
  data: () => ({
    dialogSpecs: false,
    selected_specs: "",
    selected: true,
    add: true,
    index: null,
    spec: null,
    physical: "",
    parameter: "",
    specification: "",
    isValid: true,
    specs_list: [],
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
    editedIndex: -1,
    rules: {
      required: value => !!value || "This field is required"
    }
  }),
  methods: {
    addNewSpecs() {
      this.add = true;
      this.dialogSpecs = true;
      this.selected_specs = "";
      this.parameter = "";
      this.specification = "";
    },
    proceed() {
      this.$emit("next", 5);
    },
    cancel() {
      this.editedIndex = -1;
      this.$emit("next", 3);
    },
    validate() {
      this.$refs.form.validate();
      return this.isValid;
    },
    saveSpecs() {
      this.dialogSpecs = false;
      console.log("this spec data: " + JSON.stringify(this.spec));
      // if(this.spec.name == "Physical"){
      //   console.log("save specs physical")
      //   var phy = this.physicalParameter.find(x => x._id === this.parameter)
      //   console.log("selected physical data: " + JSON.stringify(this.parameter))
      //   console.log("physical data: " + JSON.stringify(this.physicalParameter))
      //   console.log("this is phy data: " + JSON.stringify(phy))
      //   if(phy.name == "Color"){
      //     this.form.product_specification.physical.color = this.specification
      //   }else if(phy.name == "Odor"){
      //     this.form.product_specification.physical.odor = this.specification
      //   }else if(phy.name == "Taste"){
      //     this.form.product_specification.physical.taste = this.specification
      //   }else if(phy.name == "Texture"){
      //     this.form.product_specification.physical.texture = this.specification
      //   }else if(phy.name == "Form"){
      //     this.form.product_specification.physical.form = this.specification
      //   }
      //   // specification
      // }else if(this.spec.name == "Chemical"){
      //   this.form.product_specification.chemical.push({
      //     parameter: this.parameter,
      //     specification: this.specification
      //   })
      //   console.log("save specs chemical")
      // }else if(this.spec.name == "Microbiological"){
      //   this.form.product_specification.microbiological.push({
      //     parameter: this.parameter,
      //     specification: this.specification
      //   })
      //   console.log("save specs microbiological")
      // }
      if (this.editedIndex > -1) {
        console.log("editedIndex!!!");
        Object.assign(this.form.product_specification[this.editedIndex], {
          type: this.spec._id,
          parameter: this.parameter,
          specification: this.specification
        });
        this.editedIndex = -1;
        console.log(
          "product specification data: " +
            JSON.stringify(this.form.product_specification)
        );
      } else {
        this.form.product_specification.push({
          type: this.spec._id,
          parameter: this.parameter,
          specification: this.specification
        });
      }

      console.log(
        "product specification data: " +
          JSON.stringify(this.form.product_specification)
      );
      // this.specs_list.push({
      //   prod_spec: this.spec._id,
      //   parameter: this.parameter,
      //   specs: this.specification
      // });
    },
    editItem(item, index) {
      console.log("editItem data: " + JSON.stringify(index));
      this.editedIndex = this.form.product_specification.indexOf(item);
      this.add = true;
      this.dialogSpecs = true;
      this.selected_specs = item.type;
      this.parameter = item.parameter;
      this.specification = item.specification;
    },
    deleteItem(index) {
      this.form.product_specification.splice(index, 1);
    }
  },
  watch: {
    selected_specs(val) {
      this.spec = this.prodSpecs.find(x => x._id === val);
      console.log("selected data: " + JSON.stringify(this.spec));
      if (this.spec && this.spec.name === "Physical") {
        console.log("selected specs  true data: " + JSON.stringify(val));
        this.selected = true;
        // this.physicalParameter = ["Color", "Odor", "Taste", "Texture", "Form"];
      } else {
        console.log("selected specs false data: " + JSON.stringify(val));
        this.selected = false;
      }
    }
  },
  computed: {
    prodSpecs() {
      return this.deepCopy(
        this.$store.state.foodCertificate.product_specification
      );
    },
    physicalParameter() {
      return this.deepCopy(
        this.$store.state.foodCertificate.physical_parameter
      );
    }
  }
};
</script>

<style>
.data-row:hover {
  cursor: pointer;
}
</style>
