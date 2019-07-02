<template>
  <v-form ref="form" v-model="isValid">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs6>
          <v-text-field outline :rules="[rules.required]" label="Serving Size (grams or ml)"></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            outline
            :rules="[rules.required]"
            label="Number of Serving per Container/Pack"
          ></v-text-field>
        </v-flex>
        <!-- amt per serving -->
        <!-- <v-flex xs12>
          <v-card>
            <v-data-table :headers="headers" :items="nutritionServing" hide-actions>
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td>
                  <v-edit-dialog
                    large
                    :return-value.sync="props.item.aps"
                    lazy
                    @save="save"
                    @cancel="cancel"
                    @open="open"
                    @close="close"
                  >
                    {{ props.item.aps }}
                    <template v-slot:input>
                      <v-text-field
                        hint="Input corresponding amount per serving"
                        v-model="props.item.aps"
                        label="Amount per serving"
                        single-line
                        :rules="[rules.required, rules.counter]"
                        maxlength="5"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>

                <td class="text-xs-left">
                  <v-edit-dialog
                    :return-value.sync="props.item.reni"
                    large
                    lazy
                    @save="save"
                    @cancel="cancel"
                    @open="open"
                    @close="close"
                  >
                    <div>{{ props.item.reni }}</div>
                    <template v-slot:input>
                      <v-text-field
                        v-model="props.item.reni"
                        label="%RENI"
                        hint="N/A if not applicable"
                        single-line
                        :rules="[rules.required, rules.counter]"
                        maxlength="5"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>
                  <v-icon
                    small
                    class="mr-2"
                    @click="editItem(props.item)"
                  >
                    edit
                  </v-icon>
                </td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>-->
        <v-snackbar :top="y === 'top'" v-model="snack" :timeout="3000" :color="snackColor">
          {{ snackText }}
          <v-btn flat @click="snack = false">Close</v-btn>
        </v-snackbar>
        <br>
        <!-- Vitamins & Minerals -->
        <v-flex xs12>
          <v-toolbar dark flat color="primary" class="elevation-5">
            <span class="title font-weight-light">Vitamins & Minerals</span>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <v-btn slot="activator" outline small icon @click="addNew">
                <v-icon>edit</v-icon>
              </v-btn>Add New
            </v-tooltip>
          </v-toolbar>
        </v-flex>

        <v-dialog v-model="dialogVm" scrollable max-width="500px" transition="dialog-transition">
          <v-card>
            <v-toolbar dark color="primary">
              <span class="title font-weight-light">New</span>
              <v-spacer></v-spacer>
              <v-btn flat icon @click="dialogVm=false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-form v-if="valid">
                <v-container grid-list-md>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-autocomplete
                        outline
                        label="Nutrition Facts"
                        hint="Choose one"
                        persistent-hint
                        v-model="choice"
                        :items="vitMin"
                        item-text="name"
                        item-value="_id"
                        autocomplete
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs12>
                      <v-autocomplete
                        outline
                        label="Nutrision"
                        hint="Choose one"
                        persistent-hint
                        :items="vitMinHolder"
                        v-model="type"
                        item-text="name"
                        item-value="_id"
                        autocomplete
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        outline
                        name="name"
                        v-model="amount_per_serving"
                        label="Amount per Serving"
                        id="id"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        outline
                        name="name"
                        hint="N/A if not applicable"
                        v-model="percent"
                        label="%RENI, for Locally Manufactured Products "
                        id="id"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
              <v-form v-else>
                <v-container grid-list-md>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-text-field
                        label="Vitamins or Minerals"
                        :value="choice"
                        disabled
                        v-model="kind"
                        outline
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="Nutrision" :value="type" v-model="type" disabled outline></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        outline
                        name="name"
                        v-model="amount_per_serving"
                        label="Amount per Serving"
                        id="id"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        outline
                        name="name"
                        hint="N/A if not applicable"
                        v-model="percent"
                        label="%RENI, for Locally Manufactured Products "
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
              <v-btn outline color="primary" @click="dialogVm=false">Cancel</v-btn>
              <v-btn color="primary" @click="addVitMin">Add</v-btn>
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
    <v-btn flat @click="back">Cancel</v-btn>
  </v-form>
</template>

<script>
export default {
  props: ["form", "vitamins", "minerals", "nutrition_information"],
  data: () => ({
    add: false,
    isValid: true,
    dialogVm: false,
    pagination: {},
    y: "top",
    snack: false,
    snackColor: "",
    snackText: "",
    valid: true,
    vitMinHolder: {},
    type: "",
    amount_per_serving: "",
    percent: "",
    choice: null,
    vitMin: [
      {
        name: "Vitamin",
        _id: 0
      },
      {
        name: "Minerals",
        _id: 1
      },
      {
        name: "Food Labels",
        _id: 2
      }
    ],
    rules: {
      required: value => !!value || "This field is required",
      counter: value => value.length <= 5 || "Max 5 characters"
    },
    headers: [
      {
        text: "Nutrition Information",
        align: "left",
        value: "nut_info",
        sortable: false,
        width: "1px"
      },
      {
        text: "Amount per Serving",
        sortable: false,
        width: "1px",
        value: "aps"
      },
      {
        text: "%RENI for Locally Manufactured Products",
        value: "reni",
        sortable: false,
        width: "1px"
      },
      {
        text: "",
        value: "",
        sortable: false,
        width: "1px"
      }
    ],
    nutritionServing: [
      // {
      //   nut_info: "Calories (kcal)",
      //   aps: "",
      //   reni: ""
      // },
      // {
      //   nut_info: "Total Fat (g)",
      //   aps: "",
      //   reni: ""
      // },
      // {
      //   nut_info: "Saturated Fat (g)",
      //   aps: "",
      //   reni: ""
      // },
      // {
      //   nut_info: "Trans Fat (g)",
      //   aps: "",
      //   reni: ""
      // },
      // {
      //   nut_info: "Cholesterol (mg)",
      //   aps: "",
      //   reni: ""
      // },
      // {
      //   nut_info: "Sodium (mg)",
      //   aps: "",
      //   reni: ""
      // },
      // {
      //   nut_info: "Total Carbohydrates (g)",
      //   aps: "",
      //   reni: ""
      // },
      // {
      //   nut_info: "Sugar (g)",
      //   aps: "",
      //   reni: ""
      // }
    ],
    vm_items: [
      // "Vitamin C (mg)",
      // "Thiamin (mg)",
      // "Riboflavin (mg)",
      // "Niacin NE (mg)",
      // "Folate DFE (ug)",
      // "Vitamin B6 (mg)",
      // "Vitamin B12 (ug)",
      // "Vitamin A RE (IU)",
      // "Vitamin D (IU)",
      // "Vitamin E (IU)",
      // "Vitamin K (ug)",
      // { divider: true },
      // " Calcium (mg)",
      // "Iron (mg)",
      // "Iodine (ug)",
      // "Magnesium (mg)",
      // "Phosphorus (mg)",
      // "Zinc (mg)",
      // "Selenium (ug)",
      // "Flouride (mg)",
      // "Manganese (mg)"
    ]
  }),
  created() {
    this.init();
  },
  methods: {
    addNew() {
      this.add = true;
      this.dialogVm = true;
    },
    proceed() {
      this.$emit("next", 7);
    },
    back() {
      this.$emit("next", 5);
    },
    validate() {
      this.$refs.form.validate();
      return this.isValid;
    },
    addVitMin() {
      this.dialogVm = false;
      this.form.nutrition_info.servings.push({
        type: this.type,
        kind: this.choice,
        amount_per_serving: this.amount_per_serving,
        percent: this.percent
      });
    },
    editItem(item) {
      this.add = true;
      this.dialogVm = true;
      this.valid = false;
      console.log("edit item data: " + JSON.stringify(item));
      this.choice = item.type;
      this.type = item.kind;
      this.amount_per_serving = item.amount_per_serving;
      this.percent = item.percent;
    },
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Note that this is a required field";
    },
    open() {
      this.snack = true;
      this.snackColor = "warning";
      this.snackText = "This is a required field";
    },
    close() {
      console.log("Dialog closed");
    },
    init() {
      // this.nutritionServing = this.$store.state.foodCertificate.nutrition_information;
      console.log(
        "nutrition information data: " + JSON.stringify(this.nutritionServing)
      );
      // this.vitamins = this.$store.state.foodCertificate.vitamins;
      console.log("vitamins data: " + JSON.stringify(this.vitamins));
      // this.minerals = this.$store.state.foodCertificate.minerals;
      console.log("minerals data: " + JSON.stringify(this.minerals));
    }
  },
  watch: {
    choice(val) {
      this.vitMinHolder = {};
      if (val == 0) {
        this.vitMinHolder = this.vitamins;
      } else if (val == 1) {
        this.vitMinHolder = this.minerals;
      } else if (val == 2) {
        this.vitMinHolder = this.nutrition_information;
      }
    }
    // nutrition_information(val){
    //   console.log("nutrition_information data: " + JSON.stringify(val))

    //   val.forEach(element => {
    //     this.form.nutrition_info.servings.push({
    //     type: element._id,
    //     kind: "2",
    //     amount_per_serving: "0",
    //     percent: "NOT APPLICABLE"
    //     })
    //   });

    // }
  }
};
</script>

<style scoped>
</style>

