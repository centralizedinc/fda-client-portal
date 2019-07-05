<template>
  <v-form ref="form">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-toolbar dark flat color="primary" class="elevation-5">
          <span class="title font-weight-light">Product Ingredient List</span>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <v-btn slot="activator" outline small icon @click="dialogProdIng=true">
              <v-icon>edit</v-icon>
            </v-btn>Add New
          </v-tooltip>
        </v-toolbar>
        <v-flex xs12 pb-4>
          <v-data-table :headers="headersProdIng" :items="form.ingredients" class="elevation-1">
            <template v-slot:items="props">
              <td>{{ props.item.variant }}</td>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.function }}</td>
              <td>{{ props.item.percentage }}</td>
              <td class="justify-center">
                <v-icon small class="mr-2" @click="editItem(props.index)">edit</v-icon>
                <v-icon small @click="deleteItem(props.index)">delete</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-flex>
        <v-dialog
          v-model="dialogProdIng"
          scrollable
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-toolbar dark color="primary">
              <span class="title font-weight-light">Add New Product Ingredient</span>
              <v-spacer></v-spacer>
              <v-btn flat icon @click="close">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-container grid-list-md>
                  <v-layout row wrap>
                    <span class="caption font-weight-light pb-3">
                      <ul>
                        <li>
                          <b>Variant-</b> N/A if not applicable
                        </li>
                        <li>
                          <b>Full Ingredient Name-</b>Use INCI or approved nomenclature in standard references
                        </li>
                        <li>
                          <b>Function-</b> Required for ingredients with restrictions and/or limitations as per the ASEAN Cosmetic Ingredient Annexes
                        </li>
                        <li>
                          <b>Percentage (%) of Ingredient-</b>Required for ingredients with restrictions and/or limitations as per the ASEAN Cosmetic Ingredient Annexes
                        </li>
                      </ul>
                    </span>
                    <v-flex xs6>
                      <v-text-field outline name="name" v-model="variant" label="Variant" id="id"></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field
                        outline
                        name="name"
                        v-model="name"
                        label="Full Ingredient Name"
                        id="id"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field
                        outline
                        name="name"
                        v-model="functions"
                        label="Function"
                        id="id"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field
                        outline
                        name="name"
                        hint="Function Percentage (%) of Ingredient "
                        label="Function % of Ingredient "
                        v-model="percentage"
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
              <v-btn outline color="primary" @click="close()">Cancel</v-btn>
              <v-btn color="primary" @click="save()">Save</v-btn>
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
    dialogProdIng: false,
    headersProdIng: [
      {
        text: "Variant",
        align: "left",
        sortable: false,
        value: "variant"
      },
      {
        text: "Full Ingredient Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      {
        text: "Function",
        align: "left",
        sortable: false,
        value: "function"
      },
      {
        text: "Percentage (%) of Ingredient",
        align: "left",
        sortable: false,
        value: "percentage"
      },
      {
        text: "Actions",
        align: "left",
        sortable: false,
        value: "actions"
      }
    ],
    prod_ing: [],
    variant: "",
    name: "",
    functions: "",
    percentage: "",
    editedIndex: -1
  }),
  methods: {
    close() {
      this.dialogProdIng = false;
      this.variant = "";
      this.name = "";
      this.functions = "";
      this.percentage = "";
      this.editedIndex = -1;
    },
    save() {
      if (
        !this.isEmpty(this.variant) &&
        !this.isEmpty(this.name) &&
        !this.isEmpty(this.functions) &&
        !this.isEmpty(this.percentage) &&
        this.editedIndex > -1
      ) {
        Object.assign(this.form.ingredients[this.editedIndex]);
        this.close();
      } else if (
        !this.isEmpty(this.variant) &&
        !this.isEmpty(this.name) &&
        !this.isEmpty(this.functions) &&
        !this.isEmpty(this.percentage)
      ) {
        this.form.ingredients.push({
          variant: this.variant,
          name: this.name,
          function: this.functions,
          percentage: this.percentage
        });
        this.close();
      }
    },
    editItem(index) {
      this.dialogProdIng = true;
      this.editedIndex = index;
      var data = this.form.ingredients[index];
      this.variant = data.variant;
      this.name = data.name;
      this.functions = data.function;
      this.percentage = data.percentage;
    },
    deleteItem(index) {
      this.form.ingredients.splice(index, 1);
    }
  }
};
</script>

<style>
</style>
