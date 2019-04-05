<template>
    <!-- <v-navigation-drawer right temporary app v-model="show" width="600"> -->
        <v-dialog
            v-model="show"
            scrollable fullscreen 
            persistent :overlay="false"
            transition="dialog-bottom-transition"
        >                    
            <v-card>
                <v-toolbar>
                    <span class="headline font-weight-light primary--text">Application Summary</span>
                    <!-- <v-btn color="primary">accept & submit</v-btn> -->
                    <v-spacer></v-spacer>
                    <!-- <v-btn outline color="primary" @click="close()">Cancel</v-btn> -->
                    
                    <v-btn flat icon color="primary" @click="close()">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex xs12 md4 pa-2 d-flex>                            
                            <v-card>
                                <v-card-title primary-title>
                                    <div class="subheading primary--text">General Information</div>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="isFinal" @click="goTo(1)" outline icon color="primary">
                                        <v-icon>edit</v-icon>
                                    </v-btn>                                     
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
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
                            </v-card>                           
                        </v-flex>

                        <!-- step #2 -->
                        <v-flex xs12 md4 pa-2 d-flex>                            
                            <v-card>
                                <v-card-title primary-title>
                                    <div class="subheading primary--text">Establishment Information</div>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="isFinal" @click="goTo(2)" outline icon color="primary">
                                        <v-icon>edit</v-icon>
                                    </v-btn>                                     
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
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
                            </v-card>                           
                        </v-flex>

                        <!-- step #2 -->
                        <v-flex xs12 md4 pa-2 d-flex>                            
                            <v-card>
                                <v-card-title primary-title>
                                    <div class="subheading primary--text">Product Line</div>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="isFinal" @click="goTo(2)" outline icon color="primary">
                                        <v-icon>edit</v-icon>
                                    </v-btn>                                     
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>                                    
                                    <span v-for="(item, index) in form.estab_details.products" :key="index">
                                        <div class="pa-1 subheading font-weight-light primary--text">Product #{{index+1}}</div>
                                        <v-divider vertical></v-divider>
                                        <v-text-field
                                            readonly
                                            name="name"
                                            label="Product Line"
                                            
                                            :value="getProductLine(item.prod_line)"
                                        ></v-text-field> 
                                        <v-textarea rows="2"
                                            readonly
                                            name="name"
                                            label="Remarks"                                        
                                            :value="item.remarks"
                                        ></v-textarea>
                                    </span>
                                     
                                </v-card-text>
                            </v-card>                           
                        </v-flex>

                        <!-- step #4 -->
                        <v-flex xs12 md4 pa-2 d-flex>                            
                            <v-card>
                                <v-card-title primary-title>
                                    <div class="subheading primary--text">Establishment Address</div>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="isFinal" @click="goTo(3)" outline icon color="primary">
                                        <v-icon>edit</v-icon>
                                    </v-btn>                                     
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <span v-for="(item, index) in form.address_list" :key="index">
                                        <div class="pa-1 subheading font-weight-light primary--text">Address #{{index+1}}</div>
                                        <v-divider vertical></v-divider>
                                        <v-text-field
                                            readonly
                                            name="name"
                                            label="Type"
                                            
                                            :value="item.type"
                                        ></v-text-field> 
                                        <v-textarea rows="2"
                                            readonly
                                            name="name"
                                            label="Address"                                        
                                            :value="item.address"
                                        ></v-textarea>
                                        <v-text-field
                                            readonly
                                            name="name"
                                            label="City"                                        
                                            :value="getCityName(item.city)"
                                        ></v-text-field>
                                        <v-text-field
                                            readonly
                                            name="name"
                                            label="Province"                                        
                                            :value="getProvinceName(item.province)"
                                        ></v-text-field>
                                        <v-text-field 
                                            readonly
                                            name="name"
                                            label="Region"                                        
                                            :value="getRegionName(item.region)"
                                        ></v-text-field>
                                        <v-text-field
                                            readonly
                                            name="name"
                                            label="Zipcode"                                        
                                            :value="item.zipcode"
                                        ></v-text-field>
                                    </span>
                                </v-card-text>
                            </v-card>                           
                        </v-flex>

                        <!-- step #2 -->
                        <v-flex xs12 md4 pa-2 d-flex>                            
                            <v-card>
                                <v-card-title primary-title>
                                    <div class="subheading primary--text">Authorized Officer</div>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="isFinal" @click="goTo(4)" outline icon color="primary">
                                        <v-icon>edit</v-icon>
                                    </v-btn>                                     
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
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
                                        :value="form.auth_officer.designation"
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
                                        :value="form.auth_officer.id_type"
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
                            </v-card>                           
                        </v-flex>

                        <!-- step #6 -->
                        <v-flex xs12 md4 pa-2 d-flex>                            
                            <v-card>
                                <v-card-title primary-title>
                                    <div class="subheading primary--text">Qualified Personnel</div>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="isFinal" outline @click="goTo(5)" icon>
                                        <v-icon>edit</v-icon>
                                    </v-btn>                                     
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <span v-for="(item, index) in form.qualified" :key="index">
                                        <div class="pa-1 subheading font-weight-light primary--text">Pesonnel #{{index+1}}</div>
                                        <v-divider vertical></v-divider>
                                        <v-text-field
                                            readonly
                                            name="name"
                                            label="Last Name"                                            
                                            :value="item.lastname"
                                        ></v-text-field> 
                                        <v-text-field
                                            readonly
                                            name="name"
                                            label="First Name"                                            
                                            :value="item.firstname"
                                        ></v-text-field> 
                                        <v-text-field
                                            readonly
                                            name="name"
                                            label="Middle Name"                                            
                                            :value="item.middlename"
                                        ></v-text-field> 
                                        <v-text-field
                                            readonly
                                            name="name"
                                            label="Birthdate"                                            
                                            :value="item.birthday"
                                        ></v-text-field>
                                        <v-text-field
                                            readonly
                                            name="name"
                                            label="Designation"                                            
                                            :value="item.designation"
                                        ></v-text-field>
                                        <v-text-field
                                            readonly
                                            name="name"
                                            label="Email"                                            
                                            :value="item.email"
                                        ></v-text-field>
                                        <v-text-field
                                            readonly
                                            name="name"
                                            label="TIN"                                            
                                            :value="item.tin"
                                        ></v-text-field>
                                        <v-text-field
                                            readonly
                                            name="name"
                                            label="Id Type"                                            
                                            :value="item.id_type"
                                        ></v-text-field>
                                        <v-text-field
                                            readonly
                                            name="name"
                                            label="Id Number"                                            
                                            :value="item.id_no"
                                        ></v-text-field>
                                        <v-text-field
                                            readonly
                                            name="name"
                                            label="Id Expiration"                                            
                                            :value="item.id_expiry"
                                        ></v-text-field>
                                    </span>
                                </v-card-text>
                            </v-card>                           
                        </v-flex>

                        <!-- step #2 -->
                        <v-flex xs12 md6 pa-2 d-flex>                            
                            <v-card>
                                <v-card-title primary-title>
                                    <div class="subheading primary--text">Documents</div>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="isFinal" @click="goTo(6)" icon outline>
                                        <v-icon>edit</v-icon>
                                    </v-btn>                                     
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-flex v-for="item in uploadedFiles" :key="item.name" xs12 md4 pa-2 d-flex>
                                            <v-card>
                                            <v-toolbar
                                                dark
                                                color="fdaGreen"
                                                style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
                                            >
                                                {{prettify(item.name)}}
                                            </v-toolbar>
                                            <v-card-text>
                                                <v-layout row wrap align-center justify-center ma-0>
                                                    <v-img
                                                    v-if="item.type !== 'application/pdf'"
                                                    :src="item.url"
                                                    class="grey lighten-2"
                                                    max-height="200"
                                                    max-width="100"
                                                    contain
                                                    >
                                                        <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                                                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                        </v-layout>
                                                    </v-img>
                                                    <v-img v-else src="https://www.acts.co.za/shop/wp-content/uploads/2017/11/filetype_pdf-278.png"></v-img>
                                                </v-layout>
                                                
                                                
                                                
                                            </v-card-text>
                                            </v-card>
                                        </v-flex>
                                        </v-layout>
                                </v-card-text>
                            </v-card>                           
                        </v-flex>  

                        <!-- step #2 -->
                        <v-flex xs12 md6 pa-2 d-flex>                            
                            <v-card>
                                <v-card-title primary-title>
                                    <div class="subheading primary--text">Account Credentials</div>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="isFinal" @click="goTo(7)" icon outline>
                                        <v-icon>edit</v-icon>
                                    </v-btn>                                     
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <v-text-field
                                            readonly
                                            name="name"
                                            label="Last Name"                                            
                                            :value="account.name.last"
                                        ></v-text-field>
                                    <v-text-field
                                            readonly
                                            name="name"
                                            label="First Name"                                            
                                            :value="account.name.first"
                                        ></v-text-field>
                                    <v-text-field
                                        readonly
                                        name="name"
                                        label="Middle Name"                                            
                                        :value="account.name.middle"
                                    ></v-text-field>
                                    <v-text-field
                                            readonly
                                            name="name"
                                            label="Username"                                            
                                            :value="account.username"
                                        ></v-text-field>
                                </v-card-text>
                            </v-card>                           
                        </v-flex>                                                                                       

                        
                    </v-layout>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions v-if="isFinal">
                    <v-spacer></v-spacer>
                    <v-btn outline color="primary" @click="close()">Cancel</v-btn>
                    <v-btn color="primary" @click="accept" :loading="loading">Accept & Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- </v-navigation-drawer> -->
</template>

<script>
export default {
    props:["show", "form", "account", "uploadedFiles", "isFinal"],
    data(){
        return{
            loading:false,
        }        
    },
    watch:{
        show(){
            this.show?this.loading=false:null
        }
    },
    methods:{       
        prettify(name) {
            if (name.length > 15) {
                return name.substring(0, 15) + " ...";
            } else {
                return name;
            }
        },
         close(){
            this.$emit('close')
        },
        goTo(page){
            this.$emit('edit', page)
        },
        accept(){
            this.loading = true;
            this.$emit('accept')
        }
    }

}
</script>

<style>

</style>
