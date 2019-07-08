<template>
  <v-form v-model="isValid" ref="form">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs5>
          <v-text-field
            name="name"
            :rules="[rules.required]"
            v-model="form.particular_product.brand_name"
            label="Brand Name"
            outline
            color="green darken-1"
          ></v-text-field>
        </v-flex>
        <v-flex xs5>
          <v-text-field
            name="name"
            :rules="[rules.required]"
            v-model="form.particular_product.product_name"
            label="Product Name"
            outline
            color="green darken-1"
          ></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-autocomplete
            outline
            :rules="[rules.required]"
            color="green darken-1"
            item-text="name"
            item-value="_id"
            hide-no-data
            v-model="form.particular_product.years_applied"
            :items="noOfYearsApplied"
            hide-selected
            label="Years"
            hint="Number of Years applied"
          ></v-autocomplete>
        </v-flex>

        <!-- Product Variants -->
        <v-toolbar dark flat color="primary" class="elevation-5">
          <span class="title font-weight-light">Variant/Shade Name</span>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <v-btn slot="activator" outline small icon @click="dialogForVariant=true">
              <v-icon>edit</v-icon>
            </v-btn>Add New
          </v-tooltip>
        </v-toolbar>
        <v-flex xs12 pb-4>
          <v-data-table
            :headers="headersVariants"
            :items="form.particular_product.product_variants"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item }}</td>
              <td class="justify-center">
                <v-icon small class="mr-2" @click="editItem(props.item, props.index, 1)">edit</v-icon>
                <v-icon small @click="deleteItem(props.index, 1)">delete</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-flex>
        <v-dialog
          v-model="dialogForVariant"
          scrollable
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar dark color="primary">
              <span class="title font-weight-light">Add New Variant/Shade</span>
              <v-spacer></v-spacer>
              <v-btn flat icon @click="dialogForVariant=false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-container grid-list-md>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-text-field
                        outline
                        :rules="[rules.required]"
                        name="name"
                        v-model="variant"
                        label="Variant/Shade Name"
                        id="id"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outline color="primary" @click="close">Cancel</v-btn>
              <v-btn color="primary" @click="save(1)">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-flex xs12>
          <v-autocomplete
            outline
            pa-2
            v-model="form.particular_product.product_type"
            :items="prod_lines"
            item-text="name"
            item-value="_id"
            hide-no-data
            hide-selected
            label="Product Line"
            :rules="[rules.required]"
          ></v-autocomplete>
        </v-flex>

        <v-flex xs6>
          <v-text-field
            name="name"
            v-model="form.particular_product.intended_use"
            label="Intended Use"
            outline
            color="green darken-1"
            :rules="[rules.required]"
          ></v-text-field>
        </v-flex>

        <v-flex xs6>
          <v-autocomplete
            outline
            pa-2
            v-model="form.particular_product.product_presentation"
            :items="product_presentation"
            item-text="name"
            item-value="_id"
            hide-no-data
            hide-selected
            label="Product Presentation"
            :rules="[rules.required]"
          ></v-autocomplete>
        </v-flex>

        <!-- Additional Prod Info -->
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
            :items="form.particular_product.additional_information"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.packaging_size }}</td>
              <td>{{ props.item.packaging_type }}</td>
              <td>{{ props.item.gtin }}</td>
              <td class="justify-center">
                <v-icon small class="mr-2" @click="editItem(props.item, props.index, 2)">edit</v-icon>
                <v-icon small @click="deleteItem(props.index, 2)">delete</v-icon>
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
                        name="name"
                        v-model="packaging_size"
                        label="Packaging Size"
                        id="id"
                        type="number"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        outline
                        name="name"
                        v-model="packaging_type"
                        label="Packaging Type"
                        id="id"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        outline
                        name="name"
                        v-model="gtin"
                        label="GTIN"
                        id="id"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outline color="primary" @click="close">Cancel</v-btn>
              <v-btn color="primary" @click="save(2)">Save</v-btn>
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
  props: ["form", "product_presentation"],
  data: () => ({
    isValid: true,
    add: false,
    rules: {
      required: value => !!value || "This field is required"
    },
    dialogForVariant: false,
    dialogProdInfo: false,
    product_variants: "",
    headersVariants: [
      {
        text: "Variants/Shade Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      {
        text: "Actions",
        align: "left",
        sortable: false,
        value: "actions"
      }
    ],
    headersProdInfo: [
      {
        text: "Product Size",
        align: "left",
        sortable: false,
        value: "size"
      },
      {
        text: "Product Type",
        align: "left",
        sortable: false,
        value: "type"
      },
      {
        text: "GTIN",
        align: "left",
        sortable: false,
        value: "gtin"
      },
      {
        text: "Actions",
        align: "left",
        sortable: false,
        value: "actions"
      }
    ],
    // prodPresentation: [
    //   "Single product",
    //   "A range of product variants similar in composition for the same use but differs in colours, flavours etc",
    //   "Palette(s) in a range of one product type",
    //   "Combination products in a single kit",
    //   "Others"
    // ],
    noOfYearsApplied: ["1", "2", "3"],
    variants: [],
    prod_info: [],
    variant: "",
    packaging_size: "",
    packaging_type: "",
    gtin: "",
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
    variants_items() {
      return this.form.particular_product.product_variants;
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
      var cosme = [];
      this.$store.state.products.productType.forEach(element => {
        if (element.name == "Cosmetic") {
          prod_line = element._id;
        }
      });
      console.log("5c106cb7b19f7a29c4096ad0: " + JSON.stringify(prod_line));
      this.$store.state.products.prod_line.forEach(line => {
        if (line.product_type == prod_line) {
          console.log("prod_line: " + JSON.stringify(line.product_type));
          cosme.push(line);
        }
      });
      console.log("cosme data: " + JSON.stringify(cosme));
      return cosme;
    }
  },
  watch: {
    particular(val) {
      console.log(
        "particular data: " + JSON.stringify(this.form.cosmetic_certificate)
      );
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
    initialize() {},
    editItem(item, index, val) {
      this.editedIndex = index;
      if (val == 1) {
        this.variant = this.form.particular_product.product_variants[index];
        this.dialogForVariant = true;
      } else if (val == 2) {
        this.editedIndex = index;
        var data = this.form.particular_product.additional_information[index];
        this.packaging_size = data.packaging_size;
        this.packaging_type = data.packaging_type;
        this.gtin = data.gtin;
        this.dialogProdInfo = true;
      }
    },
    deleteItem(index, val) {
      if (val == 1) {
        // const index = this.variants.indexOf(item);
        // this.$notify("Are you sure you want to delete this item?") &&
        this.form.particular_product.product_variants.splice(index, 1);
        console.log(
          "delete item data product variants: " +
            JSON.stringify(this.form.particular_product.product_variants)
        );
      } else if (val == 2) {
        this.form.particular_product.additional_information.splice(index, 1);
        console.log(
          "delete item data additional information: " +
            JSON.stringify(this.form.particular_product.additional_information)
        );
      }
    },
    close() {
      this.dialogForVariant = false;
      this.dialogProdInfo = false;
      this.variant = "";
      this.packaging_size = "";
      this.packaging_type = "";
      this.gtin = "";
      // setTimeout(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem);
      //   this.editedIndex = -1;
      // }, 300);
    },
    save(val) {
      if (val == 1) {
        if (!this.isEmpty(this.variant) && this.editedIndex > -1) {
          console;
          // Object.assign(
          // this.form.particular_product.product_variants[
          //   this.editedIndex
          // ].replace("", this.variant);
          this.form.particular_product.product_variants[
            this.editedIndex
          ] = this.variant;
          // );
          console.log(
            "edit this data: " +
              JSON.stringify(this.form.particular_product.product_variants)
          );
          this.editedIndex = -1;
        } else if (!this.isEmpty(this.variant)) {
          console.log("variant push data: " + JSON.stringify(this.variant));
          this.form.particular_product.product_variants.push(this.variant);
        }
        this.close();
      } else if (val == 2) {
        // console.log("isempty: " + !this.isEmpty(this.packaging_size));
        if (
          !this.isEmpty(this.packaging_size) &&
          !this.isEmpty(this.packaging_type) &&
          !this.isEmpty(this.gtin)
        ) {
          console.log(
            "val data: " +
              JSON.stringify(val) +
              " size: " +
              JSON.stringify(this.packaging_size) +
              " type: " +
              JSON.stringify(this.packaging_type) +
              " gtin: " +
              JSON.stringify(this.gtin)
          );
          this.form.particular_product.additional_information.push({
            packaging_size: this.packaging_size,
            packaging_type: this.packaging_type,
            gtin: this.gtin
          });
          this.packaging_size = "";
          this.packaging_type = "";
          this.gtin = "";

          // this.dialogProdInfo = false;
          this.close();
        }
      }
    }
  }
};
</script>

<style>
</style>
