<template>
    <v-layout row wrap>
        <v-flex dark xs12 md6 pa-1>
        <v-card v-if="curr_step==1">
            <v-toolbar dark color="primary">
            Application Details            
            </v-toolbar>
            <v-card-title primary-title>
            <span class="subheading font-weight-thin primary--text">General Information</span>
            <v-spacer></v-spacer>
            <v-btn v-if="show_part1" flat icon color="primary"  @click="show_part1=false">
                <v-icon>expand_less</v-icon>
            </v-btn>
            <v-btn v-else flat icon color="primary" @click="show_part1=true">
                <v-icon>expand_more</v-icon>
            </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="compact-form" v-if="show_part1">
            <v-text-field
                readonly
                name="name"
                label="Product Type"
                
                :value="getProduct(form.general_info.product_type)"
            ></v-text-field>
            <v-text-field
                readonly
                name="name"
                label="Primary Activity"
                
                :value="getPrimary(form.general_info.primary_activity)"
            ></v-text-field>
            <v-textarea
                readonly
                name="name"
                label="Additional Activities"
                rows="2"
                :value="getAdditionalActivies(form.general_info.addtl_activity)"
            ></v-textarea>
            <v-text-field
                readonly
                name="name"
                label="Declared Capital"
                
                :value="getDeclared(form.general_info.declared_capital)"
            ></v-text-field> 
            </v-card-text>
            <v-divider></v-divider>
            <v-card-title primary-title>
            <span class="subheading font-weight-thin primary--text">Establishment Details</span>
            <v-spacer></v-spacer>
            <v-btn v-if="show_part2" flat icon color="primary"  @click="show_part2=false">
                <v-icon>expand_less</v-icon>
            </v-btn>
            <v-btn v-else flat icon color="primary" @click="show_part2=true">
                <v-icon>expand_more</v-icon>
            </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="compact-form" v-if="show_part2">
            <v-text-field
                readonly
                name="name"
                label="Name of Establishment"
                
                :value="form.estab_details.establishment_name"
            ></v-text-field> 
            <v-text-field
                readonly
                name="name"
                label="Establishment Owner"
                
                :value="form.estab_details.establishment_owner"
            ></v-text-field> 
            <v-text-field
                readonly
                name="name"
                label="TIN"
                
                :value="form.estab_details.tin"
            ></v-text-field> 
            <v-text-field
                readonly
                name="Email"
                label="Declared Capital"
                
                :value="form.estab_details.email"
            ></v-text-field> 
            <v-text-field
                readonly
                name="name"
                label="Landline"
                
                :value="form.estab_details.landline"
            ></v-text-field> 
            <v-text-field
                readonly
                name="name"
                label="Fax Number"
                
                :value="form.estab_details.fax"
            ></v-text-field> 
            <v-text-field
                readonly
                name="name"
                label="Mobile Number"
                
                :value="form.estab_details.mobile"
            ></v-text-field> 
            </v-card-text>

            <v-divider></v-divider>
            <v-card-title primary-title>
            <span class="subheading font-weight-thin primary--text">Product Line</span>
            <v-spacer></v-spacer>
            <v-btn v-if="show_part3" flat icon color="primary"  @click="show_part3=false">
                <v-icon>expand_less</v-icon>
            </v-btn>
            <v-btn v-else flat icon color="primary" @click="show_part3=true">
                <v-icon>expand_more</v-icon>
            </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-if="show_part3">
            <v-data-table
                :headers="[{text:'Product Line', sortable: false,}, {text:'Remarks', sortable: false}]"
                :items="form.estab_details.products"
                hide-actions
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                <td>{{ getProdLine(props.item.prod_line).name }}</td>
                <td>{{ props.item.remarks }}</td>
                </template>
                
            </v-data-table>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-title primary-title>
            <span class="subheading font-weight-thin primary--text">Establishment Address</span>
            <v-spacer></v-spacer>
            <v-btn v-if="show_part4" flat icon color="primary"  @click="show_part4=false">
                <v-icon>expand_less</v-icon>
            </v-btn>
            <v-btn v-else flat icon color="primary" @click="show_part4=true">
                <v-icon>expand_more</v-icon>
            </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-if="show_part4">
            <v-data-table
                :headers="[{text:'Type', sortable: false,}, 
                            {text:'Address', sortable: false},]"
                :items="form.address_list"
                hide-actions
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                <td>{{ props.item.type }}</td>
                <td>{{ props.item.address }}</td>
                <!-- <td>{{ getCityName(props.item.city) }}</td>
                <td>{{ getProvinceName(props.item.province) }}</td>
                <td>{{ getRegionName(props.item.region) }}</td>
                <td>{{ props.item.zipcode }}</td> -->
                </template>
                
            </v-data-table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-title primary-title>
            <span class="subheading font-weight-thin primary--text">Authorized Officer</span>
            <v-spacer></v-spacer>
            <v-btn v-if="show_part5" flat icon color="primary"  @click="show_part5=false">
                <v-icon>expand_less</v-icon>
            </v-btn>
            <v-btn v-else flat icon color="primary" @click="show_part5=true">
                <v-icon>expand_more</v-icon>
            </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="compact-form" v-if="show_part5">
            <v-text-field
                readonly
                name="name"
                label="Last Name"                                        
                :value="form.auth_officer.lastname"
            ></v-text-field>
            <v-text-field
                readonly
                name="name"
                label="First Name"                                        
                :value="form.auth_officer.firstname"
            ></v-text-field>
            <v-text-field
                readonly
                name="name"
                label="Designation"                                        
                :value="getDesignation(form.auth_officer.designation).name"
            ></v-text-field>
            <v-text-field
                readonly
                name="name"
                label="Email"                                        
                :value="form.auth_officer.email"
            ></v-text-field>
            <v-text-field
                readonly
                name="name"
                label="Id Type"                                        
                :value="getIdType(form.auth_officer.id_type).name"
            ></v-text-field>
            <v-text-field
                readonly
                name="name"
                label="Id Number"                                        
                :value="form.auth_officer.id_no"
            ></v-text-field>
            <v-text-field
                readonly
                name="name"
                label="Id Expiry"                                        
                :value="form.auth_officer.id_expiry"
            ></v-text-field>
            <v-text-field
                readonly
                name="name"
                label="Address"                                        
                :value="form.auth_officer.mail_add.address"
            ></v-text-field>
            <v-text-field
                readonly
                name="name"
                label="City"                                        
                :value="getCityName(form.auth_officer.mail_add.city)"
            ></v-text-field>
            <v-text-field
                readonly
                name="name"
                label="Province"                                        
                :value="getProvinceName(form.auth_officer.mail_add.province)"
            ></v-text-field>
            <v-text-field
                readonly
                name="name"
                label="Region"                                        
                :value="getRegionName(form.auth_officer.mail_add.region)"
            ></v-text-field>
            <v-text-field
                readonly
                name="name"
                label="Zip Code"                                        
                :value="form.auth_officer.mail_add.zipcode"
            ></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-title primary-title>
            <span class="subheading font-weight-thin primary--text">Qualified Personnel</span>
            <v-spacer></v-spacer>
            <v-btn v-if="show_part6" flat icon color="primary"  @click="show_part6=false">
                <v-icon>expand_less</v-icon>
            </v-btn>
            <v-btn v-else flat icon color="primary" @click="show_part6=true">
                <v-icon>expand_more</v-icon>
            </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-if="show_part6">
            <v-data-table
                :headers="[{text:'Designation', sortable: false,}, 
                            {text:'Lastname', sortable: false},
                            {text:'Firstname', sortable: false}]"
                :items="form.qualified"
                hide-actions
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                <td>{{ getDesignation(props.item.designation).name }}</td>
                <td>{{ props.item.lastname }}</td>
                <td>{{ props.item.firstname }}</td>
                <!-- <td>{{ props.item.middlename }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.tin }}</td> -->
                </template>
                
            </v-data-table>
            </v-card-text>
            <!-- <v-divider></v-divider>
            <v-card-title primary-title>
            <span class="subheading font-weight-thin primary--text">Uploaded Files</span>
            <v-spacer></v-spacer>
            <v-btn v-if="show_part7" flat icon color="primary"  @click="show_part7=false">
                <v-icon>expand_less</v-icon>
            </v-btn>
            <v-btn v-else flat icon color="primary" @click="show_part7=true">
                <v-icon>expand_more</v-icon>
            </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-if="show_part7">
                <v-container grid-list-sm fluid>
                    <v-layout row wrap>
                    <v-flex v-for="(n, indx) in uploaded_documents" :key="indx" xs4 d-flex>
                        <v-card tile class="d-flex" @click="viewFile(n.location)" style="cursor:zoom-in">
                        <pdf v-show="loaded" @loaded="loaded=true" :src="'https://cors-anywhere.herokuapp.com/'+n.location"></pdf>                        
                        <v-progress-circular v-show="!loaded" indeterminate color="primary"></v-progress-circular>
                        </v-card>
                    </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text> -->
        </v-card>
        <v-card v-else>
            <v-toolbar dark color="primary">
            Upload Files (if necessary)            
            </v-toolbar>
            <document-upload @upload="uploadFile"></document-upload>
        </v-card>
        </v-flex>
        <v-flex dark xs12 md6 pa-1>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card >
                    <v-toolbar dark color="primary">
                        Renewal Fee
                    </v-toolbar>
                    <v-card-text>
                        <v-data-table
                            :headers="[{text: 'Description', sortable:false}, {text: 'Amount', sortable:false}]"
                            :items="fees"
                            hide-actions
                        >
                            <template slot="items" slot-scope="props">
                                <td>{{ props.item.description }}</td>
                                <td>₱ {{ numberWithCommas (props.item.amount) }}</td>
                                </template>
                                <template slot="footer">
                                <td >Total</td>
                                <td class="font-weight-bold" >₱ {{ numberWithCommas(total_amount) }}</td> 
                            </template>
                        </v-data-table>                     
                    </v-card-text>
                </v-card>
            </v-flex>            
            </v-layout>      
        </v-flex>
         <v-bottom-sheet persistent hide-overlay inset v-model="show_action">
             <v-card color="success">
                <v-list>
                    <v-list-tile>
                        <v-list-tile-content>
                        <v-list-tile-title>License Renewal</v-list-tile-title>
                        <v-list-tile-sub-title>Please review your license details before submitting for renewal.</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-spacer></v-spacer>
                        <v-list-tile-action class="mr-2">
                            <v-btn :disabled="isLoading" outline color="primary">Cancel</v-btn>
                        </v-list-tile-action>
                        <v-list-tile-action >
                            <v-btn v-show="curr_step==1" color="primary" @click="curr_step=2">Next</v-btn>
                            <v-btn :loading="isLoading" v-show="curr_step==2" color="primary" @click="apply">Accept</v-btn>
                        </v-list-tile-action>                       
                    </v-list-tile>
                </v-list>
            </v-card>
         </v-bottom-sheet>
    </v-layout>
</template>

<script>
export default {
    components:{
        "DocumentUpload":()=>import('@/views/registration/tabs/DocumentsUpload.vue')
    },
    data(){
        return{
            form:{},
            charges:{},
            fees:[],
            total_amount:0,
            formData:null,
            uploadedFiles:[],
            curr_step:1,
            show_action:true,
            show_part1:false,
            show_part2:false,
            show_part3:false,
            show_part4:false,
            show_part5:false,
            show_part6:false,
            show_part7:false,
            isLoading:false
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            this.form = JSON.parse(JSON.stringify(this.$store.state.licenses.renewal_license));
            this.form.application_type= 2
            this.form.base_license= this.form.license_no
            //clear fields
            delete this.form._id
            delete this.form.auto_id
            delete this.form.license_no
            delete this.form.created_by
            delete this.form.date_created
            delete this.form.date_modified
            delete this.form.status
            delete this.form.is_existing
            delete this.output_files
            console.log("RENEWAL: " + JSON.stringify(this.form))
            //fees
            var details = {
                    productType: this.form.general_info.product_type,
                    primaryActivity: this.form.general_info.primary_activity,
                    declaredCapital: this.form.general_info.declared_capital,
                    appType: this.form.application_type
                };
                this.$store.dispatch("GET_FEES", details).then(result => {
                    console.log('GETTING FEES:' + JSON.stringify(result));
                    this.charges = result;
                    this.fees=[];
                    this.fees.push({
                        description: 'Application Fee',
                        amount: result.fee
                    })
                    this.fees.push({
                        description: 'LRF',
                        amount: result.lrf
                    })
                    this.fees.push({
                        description: 'Interest',
                        amount: result.interest
                    }),
                    this.fees.push({
                        description: 'Surcharge',
                        amount: result.surcharge
                    })
                    this.tab = 1;
                    this.total_amount = result.total
                    this.$notify({color:'success',message:'Please review your license details before submitting. For this application you will have to pay the amount of  ₱ ' + this.numberWithCommas(this.total_amount)})
                });
        },
        apply() {
            this.isLoading=true;
            this.$store.dispatch("APPLY_LICENSE", {license: this.form,upload: this.formData})
            .then(result => {
                
                this.isLoading=false;
                if (result.success) {
                    this.$notify({
                    message:
                        "Successfully applied a Renewal License with Case No.: " +
                        result.model.license.case_no,
                    color: "success",
                    icon: "check_circle"
                    });
                    console.log('############# RESULT: '+JSON.stringify(result))
                    this.$store.commit("SET_FORM", result.model.license);           
                    this.$store.commit('FEES', this.charges);
                    this.$router.push('/app/licenses/pay')
                } else {
                    this.$notifyError(result.errors);
                }
            })
            .catch(err => {
                this.isLoading=false;
                console.log("ERROR: " + err);
                this.$notifyError(err);
            });
        },
        uploadFile(data) {
            this.formData = data.formData;
            this.uploadedFiles = data.uploadedFiles;
        }
    },    
}
</script>

<style>
.compact-form {
    transform: scale(0.875);
}
</style>
