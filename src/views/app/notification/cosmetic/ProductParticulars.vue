<template>
  <v-form ref="form">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs5>
          <v-text-field
            name="name"
            v-model="form.particular_product.brand_name"
            label="Brand Name"
            outline
            color="green darken-1"
          ></v-text-field>
        </v-flex>
        <v-flex xs5>
          <v-text-field
            name="name"
            v-model="form.particular_product.product_name"
            label="Product Name"
            outline
            color="green darken-1"
          ></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-autocomplete
            outline
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
          <v-data-table :headers="headersVariants" :items="form.product_variants" class="elevation-1">
            <template v-slot:items="props">
              <td>{{ props.item.name }}</td>
              <td class="justify-center">
                <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                <v-icon small @click="deleteItem(props.item)">delete</v-icon>
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
                      <v-text-field outline name="name" label="Variant/Shade Name" id="id"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outline color="primary" @click="close">Cancel</v-btn>
              <v-btn color="primary" @click="save">Save</v-btn>
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
          ></v-autocomplete>
        </v-flex>

        <v-flex xs6>
          <v-text-field name="name" v-model="form.particular_product.intended_use" label="Intended Use" outline color="green darken-1"></v-text-field>
        </v-flex>

        <v-flex xs6>
          <v-autocomplete
            outline
            pa-2
            v-model="form.particular_product.product_presentation"
            :items="prodPresentation"
            item-text="name"
            item-value="_id"
            hide-no-data
            hide-selected
            label="Product Presentation"
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
          <v-data-table :headers="headersProdInfo" :items="form.additional_information" class="elevation-1">
            <template v-slot:items="props">
              <td>{{ props.item.packaging_size }}</td>
              <td>{{ props.item.packaging_type }}</td>
              <td>{{ props.item.gtin }}</td>
              <td class="justify-center">
                <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                <v-icon small @click="deleteItem(props.item)">delete</v-icon>
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
                      <v-text-field outline name="name" v-model="form.particular_product.packaging_size" label="Packaging Size" id="id"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field outline name="name" v-model="form.particular_product.packaging_type" label="Packaging Type" id="id"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field outline name="name" v-model="form.particular_product.gtin" label="GTIN" id="id"></v-text-field>
                    </v-flex>
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
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: ["form"],
  data: () => ({
    isValid: true,
    add: false,
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
    prodPresentation: [
      "Single product",
      "A range of product variants similar in composition for the same use but differs in colours, flavours etc",
      "Palette(s) in a range of one product type",
      "Combination products in a single kit",
      "Others"
    ],
    noOfYearsApplied: ["1", "2", "3"],
    variants: [],
    prod_info: [],
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
    initialize() {},
    editItem(item) {
      this.editedIndex = this.variants.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogForVariant = true;
    },
    deleteItem(item) {
      const index = this.variants.indexOf(item);
      this.$notify("Are you sure you want to delete this item?") &&
        this.variants.splice(index, 1);
    },
    close() {
      this.dialogForVariant = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.variants[this.editedIndex], this.editedItem);
      } else {
        this.variants.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style>
</style>