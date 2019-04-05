<template>
  <v-container grid-list-xl fluid fill-height>
    <v-layout row wrap child-flex justify-center align-center>
      <v-card flat>
          <v-card-title class="headline">
              Products
              <v-spacer></v-spacer>
              <v-text-field
                  label="Search"
                  append-icon="search"
                  single-line
                  hide-details
                  v-model="search">
              </v-text-field>
          </v-card-title>
          <v-tooltip bottom>
            <v-btn slot="activator" fab right bottom small absolute icon color="success" @click="addItem">
                <v-icon>add</v-icon>
            </v-btn>Add New Product
          </v-tooltip>
          <v-data-table
              :headers="headers"
              :items="updatedForm.estab_details.products"
              class="elevation-1"
              :loading="loading"
              :search="search">
              <template slot="items" slot-scope="props">
                  <td>{{ getProdLine(props.item.prod_line).name }}</td>
                  <td>{{ props.item.remarks }}</td>
                  <td>
                      <v-tooltip bottom v-if="!props.item.read_only">
                          <v-btn slot="activator" flat icon color="primary" @click="editItem(props.item, props.index)">
                              <v-icon>edit</v-icon>
                          </v-btn>Edit
                      </v-tooltip>
                      <v-tooltip bottom v-if="!props.item.read_only">
                          <v-btn slot="activator" flat icon color="error" @click="removeItem(props.index)">
                              <v-icon>fas fa-trash-alt fa-lg</v-icon>
                          </v-btn>Remove
                      </v-tooltip>
                  </td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                  Your search for "{{ search }}" found no results.
              </v-alert>
          </v-data-table>
      </v-card>
    </v-layout>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="500px"
        transition="dialog-transition">
        <v-card>
            <v-card-title class="headline">
                {{ selected_index > -1 ? "Edit Product": "New Product"}}
            </v-card-title>
            <v-card-text>
                <v-flex xs12>
                    <v-autocomplete
                        :items="prod_lines"
                        hide-selected
                        box
                        item-text="name"
                        item-value="_id"
                        v-model="product.prod_line"
                        label="Product Line">
                    </v-autocomplete>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                        v-model="product.remarks"
                        box
                        label="Remarks">
                    </v-text-field>
                </v-flex>
            </v-card-text>
            <v-card-actions>
                <v-btn flat outline color="secondary" @click="clearProduct">Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="submit">
                    {{ selected_index > -1 ? "Save": "Submit"}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: ["existingForm", "updatedForm"],
  data() {
    return {
      headers: [
        {
          text: "Product Line",
          value: "prod_line"
        },
        {
          text: "Remarks",
          value: "remarks"
        },
        {
          text: "Action",
          value: "action"
        }
      ],
      search: "",
      loading: false,
      selected_index: -1,
      dialog: false,
      product: {
        prod_line: "",
        remarks: ""
      }
    };
  },
  computed: {
    prod_lines() {
      var items = [];
      this.$store.state.products.prod_line.forEach(item => {
        var index = this.updatedForm.estab_details.products.findIndex(
          x => x.prod_line.toString() === item._id.toString()
        );
        if (
          item.product_type === this.existingForm.general_info.product_type &&
          (index === -1 || this.product.prod_line === item._id)
        )
          items.push(item);
      });
      return items;
    }
  },
  methods: {
    addItem() {
      this.selected_index = -1;
      this.product = {
        prod_line: "",
        remarks: ""
      };
      this.dialog = true;
    },
    editItem(item, index) {
      this.selected_index = index;
      this.product = item;
      this.dialog = true;
    },
    removeItem(index) {
      this.updatedForm.estab_details.products.splice(index, 1);
    },
    submit() {
      var i = this.updatedForm.estab_details.products.findIndex(x => x.prod_line === this.product.prod_line);
      if (i > -1) {
        this.updatedForm.estab_details.products[i] = this.product;
      } else {
        this.updatedForm.estab_details.products.push(this.product);
      }
      this.clearProduct();
    },
    clearProduct() {
      this.selected_index = -1;
      this.product = {
        prod_line: "",
        remarks: ""
      };
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>
