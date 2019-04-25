<template>
    <v-layout row wrap>
       <v-flex xs12 md8 pa-1 v-if="curr_step==1">
           <v-card v-for="(item, index) in variations" :key="index" class="ma-1" >
               <v-toolbar dark color="primary">
                   {{item.title}}
               </v-toolbar>
               <v-card-text>
                   <v-checkbox 
                        color="primary"
                        v-for="(field, i) in item.items" 
                        :key="i" 
                        :label="field.description" 
                        v-model="selected_variations" 
                        :disabled="field.disabled"
                        :value="field.code">
                    </v-checkbox>
               </v-card-text>
           </v-card>            
       </v-flex>
       <v-flex xs12 md8 pa-1 v-else>
           <v-card class="ma-1" v-if="show_section('MN1')">
                <v-toolbar dark color="primary">
                  {{variations[0].items[0].description}}
               </v-toolbar>
               <v-card-text>
                   <product-line :form="form"></product-line>
               </v-card-text>
            </v-card>

            <v-card class="ma-1" v-if="show_section('MN4')">
                <v-toolbar dark color="primary">
                  {{variations[0].items[3].description}}
               </v-toolbar>
               <v-card-text>
                   <v-text-field
                        color="green darken-1"
                        :rules="[rules.required]"
                        required
                        label="Name of Establishment"
                        v-model="form.estab_details.establishment_name"
                    ></v-text-field>
               </v-card-text>
            </v-card>

            <v-card class="ma-1"  v-if="show_section('MN5')">
                <v-toolbar dark color="primary">
                  {{variations[0].items[4].description}}
               </v-toolbar>
               <v-card-text>
                   <qualified-personnel :form="form"></qualified-personnel>
               </v-card-text>
            </v-card>

            <v-card class="ma-1"  v-if="show_section('MJ1')">
                <v-toolbar dark color="primary">
                  {{variations[1].items[0].description}}
               </v-toolbar>
               <v-card-text>
                   <v-text-field
                        color="green darken-1"
                        :rules="[rules.required]"
                        required
                        label="Name of Establishment"
                        v-model="form.estab_details.establishment_name"
                    ></v-text-field>
               </v-card-text>
            </v-card>

            <v-card class="ma-1" v-if="show_section('MJ2')">
                <v-toolbar dark color="primary">
                  {{variations[1].items[1].description}}
               </v-toolbar>
               <v-card-text>
                    <v-text-field
                        color="green darken-1"
                        label="Establishment Owner"
                        :rules="[rules.required]"
                        required
                        v-model="form.estab_details.establishment_owner"
                    ></v-text-field>
               </v-card-text>
            </v-card>

            <v-card class="ma-1" v-if="show_section('MJ3')">
                <v-toolbar dark color="primary">
                  {{variations[1].items[2].description}}
               </v-toolbar>
               <v-card-text>
                   <office-address :form="form"></office-address>
               </v-card-text>
            </v-card>
       </v-flex>

       <v-flex xs12 md4 pa-1>
           <v-card >
                <v-toolbar dark color="primary">
                    Variation Fee
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
       <v-bottom-sheet dark persistent hide-overlay :value="true">
             <v-card dark color="success">
                <v-list>
                    <v-list-tile>
                        <v-list-tile-content>
                        <v-list-tile-title>License Variation</v-list-tile-title>
                        <v-list-tile-sub-title v-if="curr_step == 1">Step 1 - Select variation category then click next</v-list-tile-sub-title>
                        <v-list-tile-sub-title v-else>Step 2 - Update License Details</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-spacer></v-spacer>
                        <v-list-tile-action class="mr-2">
                            <v-btn :disabled="isLoading" outline @click="curr_step=1">Cancel</v-btn>
                        </v-list-tile-action>
                        <v-list-tile-action >
                            <v-btn v-show="curr_step==1" color="primary" @click="next()">Next</v-btn>
                            <v-btn :loading="isLoading" v-show="curr_step==2" color="primary" @click="submit()">Accept</v-btn>
                        </v-list-tile-action>                       
                    </v-list-tile>
                </v-list>
            </v-card>
         </v-bottom-sheet>
    </v-layout>    
</template>

<script>
import variations from "./variations/variations.json";

export default {
    components:{
        ProductLine:() => import('@/views/app/licenses/variations/sections/ProductLine.vue'),
        QualifiedPersonnel:() => import('@/views/app/licenses/variations/sections/QualifiedPersonnel.vue'),
        OfficeAddress:() => import('@/views/app/licenses/variations/sections/OfficeAddress.vue'),
    },
    data(){
        return {
            charges:{},
            fees:[],
            total_amount:0,
            variations: variations,
            curr_step:1,
            isLoading:false,
            selected_variations:[],
            form:{},
            base_form:{},
            rules: {
                required: value => !!value || "This field is required",
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "Invalid e-mail.";
                }
            }
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.base_form = this.$store.state.licenses.variation_license
            this.form = this.deepCopy(this.$store.state.licenses.variation_license)
            this.form.application_type = 1;
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
        },
        show_section(code){
            return this.selected_variations.indexOf(code)>-1?true:false
        },
        next(){
            /**
             * TODOs:
             * computation of fees not correct!!!
             * computation should include if the variation type
             */
            var details = {
                productType: this.form.general_info.product_type,
                primaryActivity: this.form.general_info.primary_activity,
                declaredCapital: this.form.general_info.declared_capital,
                appType: this.form.application_type
            };
            this.$store.dispatch("GET_FEES", details).then(result => {
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
                this.curr_step = 2;
                this.total_amount = result.total
                this.$notify({color:'success',message:'Registration fee computed! For this application you will have to pay the amount of  ₱ ' + this.numberWithCommas(this.total_amount)})
            });
           
        },
        submit(){
            var variated_values = [];
            this.selected_variations.forEach(element=>{
                console.log(element)
               
                switch(element){
                    case 'MN1':
                        variated_values.push({
                            code: element,
                            old_value: this.base_form.estab_details.products,
                            new_value: this.form.estab_details.products
                        })
                        break;
                    case 'MN4':
                        variated_values.push({
                            code: element,
                            old_value: this.base_form.estab_details.establishment_name,
                            new_value: this.form.estab_details.establishment_name
                        })
                        break;
                    case 'MN5':
                        variated_values.push({
                            code: element,
                            old_value: this.base_form.qualified,
                            new_value: this.form.qualified
                        })
                        break;
                    case 'MJ1':
                        variated_values.push({
                            code: element,
                            old_value: this.base_form.estab_details.establishment_name,
                            new_value: this.form.estab_details.establishment_name
                        })
                        break;
                    case 'MJ2':
                        variated_values.push({
                            code: element,
                            old_value: this.base_form.estab_details.establishment_owner,
                            new_value: this.form.estab_details.establishment_owner
                        })
                        break;
                    case 'MJ3':
                        variated_values.push({
                            code: element,
                            old_value: this.base_form.address_list,
                            new_value: this.form.address_list
                        })
                        break;                    
                }                
            })
            console.log(JSON.stringify(variated_values))

            this.$store.dispatch("VARIATE_LICENSE", {
                license: this.form,
                variation: {
                    variations:[],
                    variated_values
                }
            })
            .then(result => {
                console.log("Saving variation result :", result);
                if (result.success) {
                    this.$notify({
                    message:
                        "Successfully applied for License Variation with Case No.: " +
                        result.model.case_details.case_no,
                    color: "success",
                    icon: "check_circle"
                    });
                    this.$store.commit("SET_FORM", result.model.license);
                    this.$store.commit('FEES', this.charges);
                    this.$router.push('/app/licenses/pay');
                        
                } else {
                    this.$notifyError(result.errors);
                }
            })
            .catch(err => {
            console.log("Saving variation err :", err);
            this.$notifyError(err);
            });
        }

    }
}
</script>

<style>

</style>
