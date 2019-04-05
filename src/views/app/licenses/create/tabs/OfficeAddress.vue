<template>
    <v-layout row wrap>
        <v-toolbar dark flat color="primary" class="elevation-5">
            <span class="title font-weight-light">Address List</span>
            <v-spacer></v-spacer>
            <!-- <v-btn outline @click="addAddress">Add</v-btn> -->
            <v-tooltip top>
                <v-btn slot="activator" @click="addAddress" fab outline small icon >
                <v-icon>edit</v-icon> 
            </v-btn>Add Address
            </v-tooltip>
            
        </v-toolbar>
        <v-flex xs12>                                     
            <v-data-table
                :headers="headers"
                :items="address_list">
                <template slot="items" slot-scope="props">
                    <td>{{props.item.type}}</td>
                    <td>{{props.item.address}}</td>
                    <td>{{getCityName(props.item.city)}}</td>
                    <td>{{getProvinceName(props.item.province)}}</td>
                     <td>{{getRegionName(props.item.region)}}</td>
                    <td>{{props.item.zipcode}}</td>
                    <td>
                        <v-tooltip top>
                      <v-btn
                        slot="activator"
                        flat
                        icon
                        color="primary"
                        @click="deleteAddress(props.index)"
                      >
                        <v-icon color="error" small>fas fa-trash-alt</v-icon>
                      </v-btn>Delete item
                    </v-tooltip>
                    </td>
                </template>            
            </v-data-table>
        </v-flex> 
        <v-dialog
            v-model="showDialog"
            scrollable 
            persistent
            max-width="600px"
            transition="dialog-transition"
        >
        <v-card>
            <v-toolbar dark color="primary" class="tStyle">
                <span class="title font-weight-light">New Address</span>
                <v-spacer></v-spacer>
                <v-tooltip top>
            <v-btn slot="activator" flat icon color="black" @click="showDialog = false">
              <v-icon>fas fa-times-circle fa-1x</v-icon>
            </v-btn>Close
          </v-tooltip>
            </v-toolbar>
            <v-card-text>
                <v-form v-model="isValid" ref="vform">
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-select
                            :items="['Head Office', 'Branch', 'Warehouse', 'Plant']"
                            v-model="address.type"
                            label="Address Type"
                        ></v-select>
                        <v-textarea
                        color="green darken-1"
                        label="Address"
                        :rules="[rules.required]"
                        v-model="address.address"
                        hint="Unit Number, Floor, Building, Lot, Block, Phase, Street"
                        ></v-textarea>
                    </v-flex>
                    <v-flex xs12 md6 pa-2>
                        <v-autocomplete
                        color="green darken-1"
                        v-model="address.region"
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
                        v-model="address.province"
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
                        v-model="address.city"
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
                        v-model="address.zipcode"
                        label="Zip Code"
                        mask="####"
                        :rules="[rules.required]"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6 pa-2>
                        <address-map
                        :city="address.city"
                        :province="address.province"
                        :region="address.region"
                        :edit="true"
                        ></address-map>
                    </v-flex>
                </v-layout>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outline color="primary" @click="showDialog=false">Cancel</v-btn>
                <v-btn color="success" @click="submit">Add</v-btn>
            </v-card-actions>
        </v-card>
            
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    components: {
        AddressMap: () => import("@/components/AddressMap")
    },
    props: ["form"],
    data(){
        return {
            isValid:true,
            address:{},
            address_list:[],
            regions:[],
            provinces:[],
            cities:[],
            showDialog: false,
            rules: {required: value => !!value || "This field is required"},
            headers: [
                 {
                    text: "Address Type",
                    value: "type"
                },
                {
                    text: "Address",
                    value: "address"
                },
                {
                    text: "City/Town",
                    value: "city"
                },
                {
                    text: "Province",
                    value: "province"
                },
                {
                    text: "Zip Code",
                    value: "zipCode"
                },
                ,
                {
                    text: "Regions",
                    value: "region",
                    sortable: false
                },
                {
                    text: "Actions",
                    value: "actions"
                }
            ]
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            this.address_list = this.form.address_list?this.form.address_list:[];            
            this.$store.dispatch("GET_PLACES_REFERENCE").then(locations => {
                if (locations) {
                    this.regions = locations.regions;
                    this.provinces = locations.provinces;
                    this.cities = locations.provinces;
                }
            });
        },
        addAddress(){
            this.address={};
            this.showDialog = true;
        },
        validate(){
            var valid = false;
            for(var i=0; i<this.address_list.length; i++){
                if(this.address_list[i].type==='Head Office'){
                    valid=true;
                    this.form.address_list = this.address_list;
                    break;
                }
            }
            return valid;
        },
        submit(){
            this.$refs.vform.validate()
            if(this.isValid){
                this.address_list.push(this.address);
                this.showDialog = false;
            }else{
                this.$notifyError([{message: 'Fill-up required fields.'}])
            }            
        },
        deleteAddress(item){
             confirm("Are you sure you want to delete this item?") &&
            this.address_list.splice(item, 1);
        }
    },
    computed:{
        filtered_provinces(){
            return this.findProvinces(this.address.region);
        },
        filtered_cities(){
            return this.findCities(this.address.province);
        }
    }

}
</script>

<style>
.tStyle {
    background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%);
}
</style>
