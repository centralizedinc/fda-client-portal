<template>
    <v-layout row wrap>
        <v-toolbar dark flat color="primary" class="elevation-5">
            <span class="title font-weight-light">Address List</span>
            <v-spacer></v-spacer>
            <!-- <v-btn outline @click="addAddress">Add</v-btn> -->
            <v-tooltip top>
                <v-btn slot="activator" @click="addAddress" outline small icon >
                <v-icon>edit</v-icon> 
            </v-btn>Add Address
            </v-tooltip>
            
        </v-toolbar>
        <v-flex xs12>                                     
            <v-data-table
                hide-actions
                :headers="headers"
                :items="address_list">
                <template slot="items" slot-scope="props">
                    <tr @click="viewItem(props.item, props.index)">
                        <td>{{props.item.type}}</td>
                        <td>{{props.item.address}}</td>
                        <td>{{getCityName(props.item.city)}}</td>
                        <td>{{getProvinceName(props.item.province)}}</td>
                        <td>{{getRegionName(props.item.region)}}</td>
                        <td>{{props.item.zipcode}}</td>                        
                    </tr>
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
                <v-btn flat icon @click="showDialog=false">
                    <v-icon>close</v-icon>
                </v-btn>
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
                        <v-textarea rows="2"
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
                        @pin="setCoordinates"
                        ></address-map>
                    </v-flex>
                </v-layout>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions v-if="isAdd">
                <v-spacer></v-spacer>
                <v-btn outline color="primary" @click="showDialog=false">Cancel</v-btn>
                <v-btn color="primary" @click="submit">Add</v-btn>
            </v-card-actions>
            <v-card-actions v-else>
                <v-spacer></v-spacer>
                <v-btn outline color="error" @click="deleteItem()">Delete</v-btn>
                <v-btn color="primary" @click="editItem()">Edit</v-btn>
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
            isAdd:true,
            index:null,
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
                    text: "Regions",
                    value: "region",
                    sortable: false
                },
                {
                    text: "Zip Code",
                    value: "zipCode"
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
            this.isAdd=true;
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
        viewItem(item, indx){
            this.index = indx;
            this.isAdd=false;
            this.address=JSON.parse(JSON.stringify(item));
            this.showDialog = true;
        },
        editItem(){
            this.address_list.splice(this.index,1,this.address)
            this.showDialog = false;
        },
        deleteItem() {
            if(confirm("Are you sure you want to delete this item?")){
                this.address_list.splice(this.index, 1)
                this.showDialog = false;
            } 
             
        },
        setCoordinates(coordinates){
            this.address.location = coordinates;
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
