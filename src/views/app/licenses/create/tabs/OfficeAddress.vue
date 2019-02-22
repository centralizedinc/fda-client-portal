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
        :items="regions"
        item-text="name"
        @change="getProvinces"
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
        :items="provinces"
        @change="getCities"
        item-text="name"
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
        :items="cities"
        item-text="name"
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
        :items="zipcodes"
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
            <v-icon small class="pb-1">fas fa-question</v-icon>
          </v-btn>Get Help
        </v-tooltip>
      </v-sheet>
      <!-- add button -->
      <v-flex xs12>
        <v-tooltip top>
          <v-btn
            color="transparent"
            slot="activator"
            large
            block
            @click="addToListDialog=true"
            style="box-shadow: none !important"
          >
            <v-icon color="success">fas fa-plus fa-3x</v-icon>
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
              :items="regions"
              item-text="name"
              @change="getProvinces"
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
              :items="provinces"
              item-text="name"
              @change="getCities"
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
              :items="cities"
              item-text="name"
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
              :items="zipcodes"
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
                  <v-flex xs3>
                    <v-tooltip top>
                      <v-btn
                        slot="activator"
                        flat
                        icon
                        color="primary"
                        @click="editItem(props.item)"
                      >
                        <v-icon color="success" small>edit</v-icon>
                      </v-btn>Edit item
                    </v-tooltip>
                  </v-flex>
                  <v-flex xs3>
                    <v-tooltip top>
                      <v-btn
                        slot="activator"
                        flat
                        icon
                        color="primary"
                        @click="deleteItem(props.item)"
                      >
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
          :items="regions"
          item-text="name"
          item-value="_id"
          @change="getProvinces"
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
          :items="provinces"
          item-text="name"
          item-value="_id"
          @change="getCities"
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
          :items="cities"
          item-text="name"
          item-value="_id"
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
          :items="zipcodes"
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
    regions: [],
    provinces: [],
    cities: [],
    zipcodes: [],
    warehouse: {},
    rules: {
      required: value => !!value || "This field is required"
    }
  }),
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("GET_REGION").then(result => {
        this.regions = this.$store.state.places.regions;
      });
    },
    getProvinces() {
      this.$store
        .dispatch("GET_PROVINCE", this.form.addresses.office.region)
        .then(result => {
          this.provinces = this.$store.state.places.provinces;
          return this.$store.dispatch("GET_REGION");
        })
        .then(result => {
          // GET region data
          this.regions = this.$store.state.places.regions;
        });
    },
    getCities() {
      this.$store
        .dispatch("GET_CITY", this.form.addresses.office.city)
        .then(result => {
          this.cities = this.$store.state.places.city;
          return this.$store.dispatch("GET_PROVINCE");
        })
        .then(result => {
          // GET CITIES data
          this.provinces = this.$store.state.places.provinces;
        });
    },
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
    },
    editItem(item) {
      this.warehouse = Object.assign({}, item);
      this.addToListDialog = true;
    }
  }
};
</script>

<style>
</style>
