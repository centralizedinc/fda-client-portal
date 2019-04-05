<template>
  <v-layout row wrap>
    <v-expansion-panel>
    <v-expansion-panel-content >
      <template v-slot:header>
        <span class="title font-weight-light primary--text">Office Address</span>
      </template>
      <v-layout row wrap>             
          <v-flex xs12>
            <v-divider></v-divider>
            <v-textarea
              color="green darken-1"
              label="Address"
              :rules="[rules.required]"
              v-model="form.addresses.office.address"
              hint="Unit Number, Floor, Building, Lot, Block, Phase, Street"
              class="input-group--focused"
            ></v-textarea>
          </v-flex>
          <v-flex xs12 md6 pa-2>
            <v-autocomplete
              color="green darken-1"
              v-model="form.addresses.office.region"
              :items="regions"
              item-text="name"
              item-value="_id"
              hide-no-data
              hide-selected
              label="Region"
              :rules="[rules.required]"
            ></v-autocomplete>
            <v-autocomplete
              color="green darken-1"
              v-model="form.addresses.office.province"
              :items="filtered_provinces"
              item-text="name"
              item-value="_id"
              hide-no-data
              hide-selected
              label="Province"
              :rules="[rules.required]"
            ></v-autocomplete>
            <v-autocomplete
              color="green darken-1"
              v-model="form.addresses.office.city"
              :items="filtered_cities"
              item-text="name"
              item-value="_id"
              hide-no-data
              hide-selected
              label="City / Town"
              :rules="[rules.required]"
            ></v-autocomplete>
            <v-text-field
              color="green darken-1"
              v-model="form.addresses.office.zipcode"
              label="Zip Code"
              :rules="[rules.required]"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6 pa-2 >
            <v-card>
              <address-map
              :city="form.addresses.office.city"
              :province="form.addresses.office.province"
              :region="form.addresses.office.region"
              :edit="true"
              @pin="setOfficeLocation"
            ></address-map>
            </v-card>      
          </v-flex>
     </v-layout>
    </v-expansion-panel-content>

    <v-expansion-panel-content >
      <template v-slot:header>
        <span class="title font-weight-light primary--text">Warehouse Address</span>
      </template>
      <v-layout row wrap> 
        
        <v-flex xs12>
          <v-divider></v-divider>      
      <!-- Warehouse list -->
      <!-- <v-sheet
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
          </v-btn>We need to know the exact location of your Warehouse <br>This will make it easier for our Inspectors to locate it if necessary. <br>The easier it is for our Inspectors to locate, the faster your application will be processed
        </v-tooltip>
      </v-sheet> -->
      <!-- add button -->
      <v-flex xs12>
        <!-- <v-tooltip top>
          <v-btn
            color="transparent"
            slot="activator"
            large
            block
            @click="addItem"
            style="box-shadow: none !important"
          >
            <v-icon color="success">fas fa-plus fa-3x</v-icon>
          </v-btn>Add new
        </v-tooltip> -->
        <v-spacer></v-spacer>
        <v-btn @click="addItem" color="primary" >
          Add
          <v-icon>edit</v-icon>
        </v-btn>
      </v-flex>

      <warehouse-list
        :show="addToListDialog"
        @submit="submit"
        @cancel="addToListDialog=false"
        title="Warehouse Address"
      >
        <template slot="content">
          <v-checkbox @change="copyAddress" color="primary" label="Same as Office Address"></v-checkbox>
          <v-layout row wrap>
            <v-flex xs12>
            <v-textarea
              color="green darken-1"
              label="Address"
              :rules="[rules.required]"
              v-model="warehouse.address"
              hint="Unit Number, Floor, Building, Lot, Block, Phase, Street"
            ></v-textarea>
          </v-flex>
          <v-flex xs12 md6 pa-2>
            <v-autocomplete
              color="green darken-1"
              v-model="warehouse.region"
              :items="regions"
              item-text="name"
              item-value="_id"
              hide-no-data
              hide-selected
              label="Region"
              :rules="[rules.required]"
            ></v-autocomplete>
            <v-autocomplete
              color="green darken-1"
              v-model="warehouse.province"
              :items="filtered_warehouse_provinces"
              item-text="name"
              item-value="_id"
              @change="getCities"
              hide-no-data
              hide-selected
              label="Province"
              :rules="[rules.required]"
            ></v-autocomplete>
            <v-autocomplete
              color="green darken-1"
              v-model="warehouse.city"
              :items="filtered_warehouse_cities"
              item-text="name"
              item-value="_id"
              hide-no-data
              hide-selected
              label="City / Town"
              :rules="[rules.required]"
            ></v-autocomplete>
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
          <v-flex xs12 md6 pa-2>
            <address-map
              :city="warehouse.city"
              :province="warehouse.province"
              :region="warehouse.region"
              :edit="true"
            ></address-map>
          </v-flex>
          </v-layout>
          
        </template>
      </warehouse-list>
      <v-layout row wrap>
        <v-flex xs12>
          
          <v-data-table :headers="headers" :items="form.addresses.warehouse" class="elevation-1">
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
                        @click="editItem(props.item, props.index)"
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
                        @click="deleteItem(props.index)"
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
      </v-layout>
    </v-expansion-panel-content>

    <v-expansion-panel-content >
      <template v-slot:header>
        <span class="title font-weight-light primary--text">Plant Address</span>
      </template>
      <v-layout row wrap>
        <v-flex xs12>
          <v-divider></v-divider>
          </v-flex>
          <!-- <v-sheet
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
        </v-btn>Select the the Region, Province, City and Zip Code accordingly
      </v-tooltip>
    </v-sheet> -->
      <v-flex xs12>
        <v-textarea
          color="green darken-1"
          label="Address"
          v-model="form.addresses.plant.address"
          :rules="[rules.required]"
          hint="Unit Number, Floor, Building, Lot, Block, Phase, Street"
          class="input-group--focused"
        ></v-textarea>
      </v-flex>
      <v-flex xs12 md6 pa-2>
        <v-autocomplete
          color="green darken-1"
          v-model="form.addresses.plant.region"
          :items="regions"
          item-text="name"
          item-value="_id"
          hide-no-data
          hide-selected
          label="Region"
          :rules="[rules.required]"
        ></v-autocomplete>
        <v-autocomplete
          color="green darken-1"
          v-model="form.addresses.plant.province"
          :items="filtered_plant_provinces"
          item-text="name"
          item-value="_id"
          hide-no-data
          hide-selected
          label="Province"
          :rules="[rules.required]"
        ></v-autocomplete>
        <v-autocomplete
          color="green darken-1"
          v-model="form.addresses.plant.city"
          :items="filtered_plant_cities"
          item-text="name"
          item-value="_id"
          hide-no-data
          hide-selected
          label="City / Town"
          :rules="[rules.required]"
        ></v-autocomplete>
        <v-text-field
          color="green darken-1"
          v-model="form.addresses.plant.zipcode"
          label="Zip Code"
          :rules="[rules.required]"
        ></v-text-field>
      </v-flex>
      
      <v-flex xs12 md6 pa-2>
        <v-card>
          <address-map
          :city="form.addresses.plant.city"
          :province="form.addresses.plant.province"
          :region="form.addresses.plant.region"
          :edit="true"
          @pin="setPlantLocation"
        ></address-map>
        </v-card>        
      </v-flex>        
      </v-layout>
    </v-expansion-panel-content>
  </v-expansion-panel>
  </v-layout>
</template>

<script>
export default {
  components: {
    WarehouseList: () => import("./AddToListDialog.vue"),
    AddressMap: () => import("@/components/AddressMap")
  },
  props: ["form"],
  data: () => ({
    panel:{},
    mode: 0,
    selected_index: -1,
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
  watch: {
    addToListDialog(val) {
      if (!val) this.warehouse = {};
    }
  },
  methods: {
    copyAddress(value){
      
      if(value){
        this.warehouse = this.form.addresses.office
      }else{
        this.warehouse = {}
      }
      
    },
    init() {
      // this.$store.dispatch("GET_REGION").then(result => {
      //   this.regions = this.$store.state.places.regions;
      // });
      this.$store.dispatch("GET_PLACES_REFERENCE").then(locations => {
        if (locations) {
          this.regions = locations.regions;
          this.provinces = locations.provinces;
          this.cities = locations.provinces;
        }
      });
    },
    // getProvinces() {
    //   this.$store
    //     .dispatch("GET_PROVINCE", this.form.addresses.office.region)
    //     .then(result => {
    //       this.provinces = this.$store.state.places.provinces;
    //       return this.$store.dispatch("GET_REGION");
    //     })
    //     .then(result => {
    //       // GET region data
    //       this.regions = this.$store.state.places.regions;
    //     });
    // },
    // getCities() {
    //   this.$store
    //     .dispatch("GET_CITY", this.form.addresses.office.city)
    //     .then(result => {
    //       this.cities = this.$store.state.places.city;
    //       return this.$store.dispatch("GET_PROVINCE");
    //     })
    //     .then(result => {
    //       // GET CITIES data
    //       this.provinces = this.$store.state.places.provinces;
    //     });
    // },
    setOfficeLocation(loc) {
      console.log("setting office location... " + JSON.stringify(loc));
      this.form.addresses.office.location = loc;
    },
    setPlantLocation(loc) {
      console.log("setting plant location... " + JSON.stringify(loc));
      this.form.addresses.plant.location = loc;
    },
    submit() {
      if (this.mode === 0) {
        console.log("index :", this.warehouse);
        this.form.addresses.warehouse.push(this.warehouse);
      } else if (this.mode === 1) {
        this.form.addresses.warehouse[this.selected_index] = this.warehouse;
      }
      this.clearForm();
    },
    clearForm() {
      this.selected_index = -1;
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
        this.form.addresses.warehouse.splice(item, 1);
    },
    editItem(item, index) {
      this.mode = 1;
      this.selected_index = index;
      this.warehouse = item;
      this.addToListDialog = true;
    },
    addItem() {
      this.mode = 0;
      this.warehouse = {
        address: "",
        region: "",
        province: "",
        city: "",
        zipcode: "",
        location: ""
      };
      console.log("index :", this.warehouse);
      this.addToListDialog = true;
    }
  },
  computed: {
    filtered_provinces() {
      // this.form.addresses.office.province = null;
      return this.findProvinces(this.form.addresses.office.region);
    },
    filtered_cities() {
      //  this.form.addresses.office.city = null;
      return this.findCities(this.form.addresses.office.province);
    },
    filtered_warehouse_provinces() {
      return this.findProvinces(this.warehouse.region);
    },
    filtered_warehouse_cities() {
      return this.findCities(this.warehouse.province);
    },
    filtered_plant_provinces() {
      // this.form.addresses.plant.province = null;
      return this.findProvinces(this.form.addresses.plant.region);
    },
    filtered_plant_cities() {
      //  this.form.addresses.plant.city = null;
      return this.findCities(this.form.addresses.plant.province);
    }
  }
};
</script>

<style>
</style>
