<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-text-field
        color="green darken-1"
        label="Address"
        :rules="[rules.required]"
        v-model="form.addresses.office.address"
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
      <v-card-title primary-title class="headline">Warehouse List
        <v-tooltip top>
          <v-btn slot="activator" fab medium small color="fdaGreen" @click="addToListDialog=true">
            <v-icon medium color="fdaSilver">add</v-icon>
          </v-btn>Add Warehouse to List
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn slot="activator" flat icon color="error">
            <i class="fas fa-question fa-lg"></i>
          </v-btn>Get Help
        </v-tooltip>
      </v-card-title>

      <warehouse-list
        :show="addToListDialog"
        @cancel="clearForm"
        @add="add"
        title="Warehouse Address"
      >
        <template slot="content">
          <v-checkbox label="Same as Office Address"></v-checkbox>
          <v-flex xs12>
            <v-text-field color="green darken-1" label="Address" v-model="warehouse.address"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              color="green darken-1"
              v-model="warehouse.region"
              :items="region"
              hide-no-data
              hide-selected
              label="Region"
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
            ></v-autocomplete>
          </v-flex>
        </template>
      </warehouse-list>
      <v-layout row wrap>
        <v-flex xs12>
          <v-data-table
            :headers="headers"
            :items="warehouseList"
            hide-actions
            class="elevation-1"
            pagination.sync="pagination"
            item-key="id"
            loading="true"
            search="search"
          >
            <template slot="items" slot-scope>
              <td>props.item.address}}</td>
              <td>props.item.city + " " + props.item.town}}</td>
              <td>props.item.province}}</td>
              <td>props.item.zipcode}}</td>
              <td>
                <v-layout row wrap>
                  <v-flex xs6>
                    <v-tooltip top>
                      <v-btn slot="activator" flat icon color="primary">
                        <v-icon small>edit</v-icon>
                      </v-btn>Edit item
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
    <v-flex xs12 mt-3>
      <v-card-title primary-title class="headline">Plant Address</v-card-title>
    </v-flex>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            color="green darken-1"
            label="Address"
            v-model="form.addresses.plant.address"
            :rules="[rules.required]"
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
    </v-card-text>
    <div></div>
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
        value: ""
      },
      {
        text: "City/Town",
        value: ""
      },
      {
        text: "Province",
        value: ""
      },
      {
        text: "Zip Code",
        value: ""
      },
      {
        text: "Actions",
        value: ""
      }
    ],
    warehouseList: [],
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
    }
  },
  editItem() {
    this.addToListDialog = true;
  }
};
</script>

<style>
</style>
