<template>
  <v-form v-model="isValid" ref="form">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            name="name"
            v-model="form.particular_product.brand_name"
            :rules="[rules.required]"
            label="Brand Name"
            outline
            color="green darken-1"
          ></v-text-field>
        </v-flex>
        <!-- Product Details Info -->
        <v-toolbar dark flat color="primary" class="elevation-5">
          <span class="title font-weight-light">Additional Product Information</span>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <v-btn slot="activator" outline small icon @click="dialogProdInfo=true">
              <v-icon>edit</v-icon>
            </v-btn>Add New
          </v-tooltip>
        </v-toolbar>
        <v-flex xs12 pb-4>
          <v-data-table
            :headers="headersProdInfo"
            :items="form.particular_product.product_details"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.item }}</td>
              <td>{{ props.item.model }}</td>
              <td>{{ props.item.sku }}</td>
              <td>{{ props.item.age_grading }}</td>
              <td class="justify-center">
                <v-icon small class="mr-2" @click="editItem(props.index)">edit</v-icon>
                <v-icon small @click="deleteItem(props.index)">delete</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-flex>
        <v-dialog
          v-model="dialogProdInfo"
          scrollable
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar dark color="primary">
              <span class="title font-weight-light">New</span>
              <v-spacer></v-spacer>
              <v-btn flat icon @click="dialogProdInfo=false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-container grid-list-md>
                  <v-layout row wrap>
                    <span
                      class="caption font-weight-light pb-3"
                    >Product information, including existing packaging sizes and their corresponding Global Trade Identification Number (GTIN) may be updated here. Please note that once information has been submitted, it will no longer be modifiable. Hence, any change to the provided information would merit a new notification application.</span>
                    <v-flex xs12>
                      <v-text-field
                        outline
                        :rules="[rules.required]"
                        name="name"
                        v-model="item"
                        label="Packaging Item"
                        id="id"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        outline
                        :rules="[rules.required]"
                        name="name"
                        v-model="model"
                        label="Packaging Model"
                        id="id"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        outline
                        :rules="[rules.required]"
                        name="name"
                        v-model="sku"
                        label="Stock Keeping Unit (SKU)"
                        id="id"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-autocomplete
                        ref="grading"
                        :rules="[rules.required]"
                        v-model="grading"
                        :items="age"
                        label="Age Grading"
                        placeholder="Select Age Grading"
                        required
                        outline
                      ></v-autocomplete>
                    </v-flex>
                    <!-- <v-flex xs12>
                      <v-text-field
                        outline
                        name="name"
                        v-model="form.particular_product.age_grading"
                        label="Age Grading"
                        id="id"
                      ></v-text-field>
                    </v-flex>-->
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outline color="primary" @click="dialogProdInfo =false">Cancel</v-btn>
              <v-btn color="primary" @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-flex xs12>
          <v-autocomplete
            outline
            :rules="[rules.required]"
            required
            color="green darken-1"
            v-model="form.particular_product.product_type"
            :items="toyProduct"
            item-text="name"
            item-value="_id"
            hide-no-data
            hide-selected
            label="Product Type"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs5>
          <v-autocomplete
            ref="use"
            :rules="[rules.required]"
            v-model="use"
            :items="prodUse"
            label="Product Use"
            placeholder="Select Product Use"
            required
            outline
          ></v-autocomplete>
        </v-flex>
        <!-- <v-flex xs5>
          <v-text-field
            name="name"
            :rules="[rules.required]"
            v-model="form.particular_product.product_use"
            label="Product Use"
            outline
            color="green darken-1"
          ></v-text-field>
        </v-flex>-->
        <v-flex xs5>
          <v-text-field
            name="name"
            :rules="[rules.required]"
            v-model="form.particular_product.mass_of_child"
            label="Product Mass of Child"
            outline
            color="green darken-1"
          ></v-text-field>
        </v-flex>
        <v-flex xs5>
          <v-text-field
            name="name"
            :rules="[rules.required]"
            v-model="form.particular_product.if_appropriate"
            label="if Appropriate"
            outline
            color="green darken-1"
          ></v-text-field>
        </v-flex>
        <!-- <v-flex xs12>
          <v-text-field
            name="name"
            :rules="[rules.required]"
            v-model="form.particular_product.exemption_reason"
            label="Product Exemption Reason"
            outline
            color="green darken-1"
          ></v-text-field>
        </v-flex>-->
        <v-flex xs5>
          <v-autocomplete
            ref="exemption"
            :rules="[rules.required]"
            v-model="form.particular_product.exemption_reason"
            :items="exempt"
            item-text="name"
            item-value="_id"
            label="Product Exemption Reason"
            placeholder="Select Product Exemption Reason"
            required
            outline
          ></v-autocomplete>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn color="primary" @click="proceed">Continue</v-btn>
    <v-btn flat @click="cancel">Cancel</v-btn>
  </v-form>
</template>

<script>
export default {
  props: ["form", "toyProduct", "exempt"],
  data: () => ({
    isValid: true,
    add: false,
    rules: {
      required: value => !!value || "This field is required"
    },
    dialogForVariant: false,
    dialogProdInfo: false,
    product_details: "",
    toyProductType: "",
    item: "",
    model: "",
    sku: "",
    grading: "",
    age: [
      "0 Months+",
      "1 Months+",
      "2 Months+",
      "3 Months+",
      "1+",
      "2+",
      "3+",
      "4+"
    ],
    prodUse: ["For Indoor Use", "For Outdoor Use"],
    use: null,
    exemption: null,
    // exempt: [
    // "The toy is intended for children fourteen(14)years and above",
    // "The toy is for display or exhibit purposes and is not to be marketed in the Philippines",
    // "The toy is for adult collectors use",
    // "The toy is for personal use",
    // "The toy is intended for donations/charity/missionary work"
    // ],
    headersProdInfo: [
      {
        text: "Product Item",
        align: "left",
        sortable: false,
        value: "item"
      },
      {
        text: "Product Model",
        align: "left",
        sortable: false,
        value: "model"
      },
      {
        text: "SKU",
        align: "left",
        sortable: false,
        value: "sku"
      },
      {
        text: "Age Grading",
        align: "left",
        sortable: false,
        value: "age_grading"
      }
    ],
    editedIndex: -1,
    editedItem: {
      name: ""
    },
    defaultItem: {
      name: ""
    }
  }),

  created() {
    this.initialize();
  },
  computed: {
    toyProduct() {
      console.log(
        "this.$store.state.products.productType" +
          JSON.stringify(this.$store.state.products.productType)
      );
      console.log(
        "this.$store.state.products.prod_line" +
          JSON.stringify(this.$store.state.products.prod_line)
      );
      var prod_line = "";
      var toys = [];
      this.$store.state.products.productType.forEach(element => {
        if (element.name == "Toy and Child Care Article") {
          prod_line = element._id;
        }
      });
      console.log("5c106cb7b19f7a29c4096ad0: " + JSON.stringify(prod_line));
      this.$store.state.products.prod_line.forEach(line => {
        if (line.product_type == prod_line) {
          console.log("prod_line: " + JSON.stringify(line.product_type));
          toys.push(line);
        }
      });
      console.log("toys data: " + JSON.stringify(toys));
      return toys;
    },
    prod_lines() {
      console.log(
        "this.$store.state.products.productType" +
          JSON.stringify(this.$store.state.products.productType)
      );
      console.log(
        "this.$store.state.products.prod_line" +
          JSON.stringify(this.$store.state.products.prod_line)
      );
      var prod_line = "";
      var toys = [];
      this.$store.state.products.productType.forEach(element => {
        if (element.name == "Toys") {
          prod_line = element._id;
        }
      });
      console.log("5c106cb7b19f7a29c4096ad0: " + JSON.stringify(prod_line));
      this.$store.state.products.prod_line.forEach(line => {
        if (line.product_type == prod_line) {
          console.log("prod_line: " + JSON.stringify(line.product_type));
          toys.push(line);
        }
      });
      console.log("toys data: " + JSON.stringify(toys));
      return toys;
    }
    // exempt() {
    //   console.log(
    //     "exempt toys certificate: " +
    //       JSON.stringify(this.$store.state.toysCertifiacte.toys_exemption)
    //   );
    //   return this.$store.state.toysCertifiacte.toys_exemption;
    // }
  },
  watch: {
    particular(val) {
      console.log(
        "particular data: " + JSON.stringify(this.form.toy_certificate)
      );
    },
    toyProductType() {
      this.form.particular_product.product_line = this.toyProductType;
      console.log("type", this.form.particular_product.type);
      this.category.forEach(data => {
        console.log("foodProductType:", data);
      });
    }
  },
  methods: {
    proceed() {
      if (this.validate()) {
        this.$emit("next", 2);
      } else {
        this.$notifyError([{ message: "Fill-up required fields." }]);
      }
    },
    cancel() {
      this.$emit("next", 1);
    },
    validate() {
      this.$refs.form.validate();
      return this.isValid;
    },
    submit() {
      this.$refs.form.validate();
      if (this.isValid) {
        this.isValid = false;
      } else {
        this.$notifyError([{ message: "Fill-up required fields." }]);
      }
    },
    initialize() {},
    editItem(index) {
      this.editedIndex = index;
      this.dialogProdInfo = true;
      var data = this.form.particular_product.product_details[index];
      this.item = data.item;
      this.model = data.model;
      this.sku = data.sku;
      this.grading = data.age_grading;

      // this.editedIndex = this.variants.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      // this.dialogForVariant = true;
    },
    deleteItem(index) {
      this.form.particular_product.product_details.splice(index, 1);
      // const index = this.variants.indexOf(item);
      // this.$notify("Are you sure you want to delete this item?") &&
      //   this.variants.splice(index, 1);
    },
    close() {
      this.item = "";
      this.model = "";
      this.sku = "";
      this.grading = "";
      this.dialogProdInfo = false;
      // setTimeout(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem);
      //   this.editedIndex = -1;
      // }, 300);
    },
    save() {
      if (
        !this.isEmpty(this.item) &&
        !this.isEmpty(this.model) &&
        !this.isEmpty(this.sku) &&
        !this.isEmpty(this.grading) &&
        this.editedIndex > -1
      ) {
        console.log("edit save");
        this.form.particular_product.product_details[
          this.editedIndex
        ].item = this.item;
        this.form.particular_product.product_details[
          this.editedIndex
        ].model = this.model;
        this.form.particular_product.product_details[
          this.editedIndex
        ].sku = this.sku;
        this.form.particular_product.product_details[
          this.editedIndex
        ].age_grading = this.grading;
        console.log(
          "edit data: " +
            JSON.stringify(
              this.form.particular_product.product_details[this.editedIndex]
            )
        );
        this.editedIndex = -1;
        this.close();
      } else if (
        !this.isEmpty(this.item) &&
        !this.isEmpty(this.model) &&
        !this.isEmpty(this.sku) &&
        !this.isEmpty(this.grading)
      ) {
        console.log("save data:");
        this.form.particular_product.product_details.push({
          item: this.item,
          model: this.model,
          sku: this.sku,
          age_grading: this.grading
        });
        this.close();
      }
      //   if (this.editedIndex > -1) {
      //     Object.assign(this.variants[this.editedIndex], this.editedItem);
      //   } else {
      //     this.variants.push(this.editedItem);
      //   }
      //   this.close();
      // }
    }
  }
};
</script>

<style>
</style>
