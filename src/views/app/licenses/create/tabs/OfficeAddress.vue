<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        label="Address"
        :rules="[rules.required]"
        v-model="form.addresses.office.address"
        hint="Unit Number, Floor, Building, Lot, Block, Phase, Street"
        class="input-group--focused"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        color="green darken-1"
        v-model="form.addresses.office.region"
        :items="region"
        hide-no-data
        hide-selected
        label="Region"
        :rules="[rules.required]"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        color="green darken-1"
        v-model="form.addresses.office.province"
        :items="province"
        hide-no-data
        hide-selected
        label="Province"
        :rules="[rules.required]"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        color="green darken-1"
        v-model="form.addresses.office.city"
        :items="city"
        hide-no-data
        hide-selected
        label="City / Town"
        :rules="[rules.required]"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <v-autocomplete
        color="green darken-1"
        v-model="form.addresses.office.zipcode"
        :items="zip"
        hide-no-data
        hide-selected
        label="Zip Code"
        :rules="[rules.required]"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12>
      <!-- Warehouse list -->
      <v-sheet
        dark
        class="font-weight-normal elevation-2 pl-3 mt-3 mb-4 subheading"
        color="fdaGreen"
        height="35"
        width="calc(100% - 30px)"
        style="border-radius: 0px 0px 12px 12px !important; text-transform: uppercase"
      >Warehouse List
        <v-tooltip top>
          <v-btn slot="activator" flat icon small color="error">
            <v-icon small class="pb-1">fas fa-question fa-move</v-icon>
          </v-btn>Get Help
        </v-tooltip>
      </v-sheet>
      <!-- add button -->
      <v-flex xs12>
        <v-tooltip top>
          <v-btn
            color="transparent"
            slot="activator"
            block
            @click="addToListDialog=true"
            style="box-shadow: none !important"
          >
            <v-icon medium color="success">fas fa-plus fa-3x</v-icon>
          </v-btn>Add new
        </v-tooltip>
      </v-flex>

      <warehouse-list
        :show="addToListDialog"
        @add="add"
        @cancel="addToListDialog=false"
        title="Warehouse Address"
      >
        <template slot="content">
          <v-checkbox label="Same as Office Address"></v-checkbox>
          <v-flex xs12>
            <v-text-field
              color="green darken-1"
              label="Address"
              :rules="[rules.required]"
              v-model="warehouse.address"
              hint="Unit Number, Floor, Building, Lot, Block, Phase, Street"
              class="input-group--focused"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              color="green darken-1"
              v-model="warehouse.region"
              :items="region"
              hide-no-data
              hide-selected
              label="Region"
              :rules="[rules.required]"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              color="green darken-1"
              v-model="warehouse.province"
              :items="province"
              hide-no-data
              hide-selected
              label="Province"
              :rules="[rules.required]"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              color="green darken-1"
              v-model="warehouse.city"
              :items="city"
              hide-no-data
              hide-selected
              label="City / Town"
              :rules="[rules.required]"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              color="green darken-1"
              v-model="warehouse.zipcode"
              :items="zip"
              hide-no-data
              hide-selected
              label="Zip Code"
              :rules="[rules.required]"
            ></v-autocomplete>
          </v-flex>
        </template>
      </warehouse-list>
      <v-layout row wrap>
        <v-flex xs12>
          <v-data-table :headers="headers" :items="addedWarehouse" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{props.item.address}}</td>
              <td>{{props.item.city}}</td>
              <td>{{props.item.province}}</td>
              <td>{{props.item.zipcode}}</td>
              <td>
                <v-layout row wrap>
                  <v-flex xs6>
                    <v-tooltip top>
                      <v-btn slot="activator" flat icon color="primary" @click="deleteItem(item)">
                        <v-icon color="error" small>fas fa-trash-alt</v-icon>
                      </v-btn>Delete item
                    </v-tooltip>
                  </v-flex>
                </v-layout>
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-flex>

    <!-- Plant Address -->
    <v-sheet
      dark
      class="font-weight-normal elevation-2 pl-3 mt-3 mb-4 subheading"
      color="fdaGreen"
      height="35"
      width="calc(100% - 30px)"
      style="border-radius: 0px 0px 12px 12px !important; text-transform: uppercase"
    >Plant Address
      <v-tooltip top>
        <v-btn slot="activator" flat icon small color="error">
          <v-icon small class="pb-1">fas fa-question fa-move</v-icon>
        </v-btn>Get Help
      </v-tooltip>
    </v-sheet>
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field
          color="green darken-1"
          label="Address"
          v-model="form.addresses.plant.address"
          :rules="[rules.required]"
          hint="Unit Number, Floor, Building, Lot, Block, Phase, Street"
          class="input-group--focused"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-autocomplete
          color="green darken-1"
          v-model="form.addresses.plant.region"
          :items="region"
          hide-no-data
          hide-selected
          label="Region"
          :rules="[rules.required]"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs12>
        <v-autocomplete
          color="green darken-1"
          v-model="form.addresses.plant.province"
          :items="province"
          hide-no-data
          hide-selected
          label="Province"
          :rules="[rules.required]"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs12>
        <v-autocomplete
          color="green darken-1"
          v-model="form.addresses.plant.city"
          :items="city"
          hide-no-data
          hide-selected
          label="City / Town"
          :rules="[rules.required]"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs12>
        <v-autocomplete
          color="green darken-1"
          v-model="form.addresses.plant.zipcode"
          :items="zip"
          hide-no-data
          hide-selected
          label="Zip Code"
          :rules="[rules.required]"
        ></v-autocomplete>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  components: {
    WarehouseList: () => import("./AddToListDialog.vue")
  },
  props: ["form"],
  data: () => ({
    addToListDialog: false,
    headers: [
      {
        text: "Address",
        value: "",
        sortable: false
      },
      {
        text: "City/Town",
        value: "",
        sortable: false
      },
      {
        text: "Province",
        value: "",
        sortable: false
      },
      {
        text: "Zip Code",
        value: "",
        sortable: false
      },
      {
        text: "Actions",
        value: "",
        sortable: false
      }
    ],
    addedWarehouse: [],
    region: [],
    province: [],
    city: [],
    zipcode: [],
    warehouse: [],
    rules: {
      required: value => !!value || "This field is required"
    }
  }),
  methods: {
    add() {
      this.form.addresses.warehouse.push(this.warehouse);
      this.addedWarehouse.push(this.warehouse);
      this.clearForm();
    },
    clearForm() {
      this.warehouse = {
        address: "",
        region: "",
        province: "",
        city: "",
        zipcode: "",
        location: ""
      };
      this.addToListDialog = false;
    },
    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.addedWarehouse.splice(item, 1);
    }
  }
};
</script>

<style>
</style>
