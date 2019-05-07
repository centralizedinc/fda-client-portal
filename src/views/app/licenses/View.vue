<template>
  <v-layout row wrap>
    <v-flex dark xs12 md6 pa-1>
      <v-card>
        <v-toolbar dark color="primary">Application Details</v-toolbar>
        <v-card-title primary-title>
          <span class="subheading font-weight-thin primary--text">General Information</span>
          <v-spacer></v-spacer>
          <v-btn v-if="show_part1" flat icon color="primary" @click="show_part1=false">
            <v-icon>expand_less</v-icon>
          </v-btn>
          <v-btn v-else flat icon color="primary" @click="show_part1=true">
            <v-icon>expand_more</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="compact-form" v-if="show_part1">
          <v-text-field readonly name="name" label="Case Number" :value="form.case_no"></v-text-field>
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
          <v-btn v-if="show_part2" flat icon color="primary" @click="show_part2=false">
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
            mask="###-###-###-###"
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
            mask="(##) ####-####"
            :value="form.estab_details.landline"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Fax Number"
            mask="(##) ####-####"
            :value="form.estab_details.fax"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Mobile Number"
            mask="(##) ####-####"
            :value="form.estab_details.mobile"
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-title primary-title>
          <span class="subheading font-weight-thin primary--text">Product Line</span>
          <v-spacer></v-spacer>
          <v-btn v-if="show_part3" flat icon color="primary" @click="show_part3=false">
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
          <v-btn v-if="show_part4" flat icon color="primary" @click="show_part4=false">
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
              <td>{{ props.item.zipcode }}</td>-->
            </template>
          </v-data-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title primary-title>
          <span class="subheading font-weight-thin primary--text">Authorized Officer</span>
          <v-spacer></v-spacer>
          <v-btn v-if="show_part5" flat icon color="primary" @click="show_part5=false">
            <v-icon>expand_less</v-icon>
          </v-btn>
          <v-btn v-else flat icon color="primary" @click="show_part5=true">
            <v-icon>expand_more</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="compact-form" v-if="show_part5">
          <v-text-field readonly name="name" label="Last Name" :value="form.auth_officer.lastname"></v-text-field>
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
          <v-text-field readonly name="name" label="Email" :value="form.auth_officer.email"></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Id Type"
            :value="getIdType(form.auth_officer.id_type).name"
          ></v-text-field>
          <v-text-field readonly name="name" label="Id Number" :value="form.auth_officer.id_no"></v-text-field>
          <v-text-field readonly name="name" label="Id Expiry" :value="form.auth_officer.id_expiry"></v-text-field>
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
          <v-btn v-if="show_part6" flat icon color="primary" @click="show_part6=false">
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
              <td>{{ props.item.tin }}</td>-->
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex dark xs12 md6 pa-1>
      <v-layout row wrap>
        <v-flex xs12 pa-1>
          <v-card>
            <v-toolbar dark color="primary">
              Activities
              <v-spacer></v-spacer>
              <v-btn v-if="show_activities" flat icon @click="show_activities=false">
                <v-icon>expand_less</v-icon>
              </v-btn>
              <v-btn v-else flat icon @click="show_activities=true">
                <v-icon>expand_more</v-icon>
              </v-btn>
            </v-toolbar>
            <v-data-table
              v-if="show_activities"
              :headers="[{text:'Task Name', sortable: false,}, 
                          {text:'Date Started', sortable: false},
                          {text:'Date Completed', sortable: false},
                          {text:'Remarks', sortable: false}]"
              :items="case_details.activities"
              hide-actions
              class="elevation-1">
              <template slot="items" slot-scope="props">
                <td>{{ getTask(props.item.task_id).name }}</td>
                <td>{{ formatDate(props.item.date_started) }}</td>
                <td>{{ formatDate(props.item.date_completed) }}</td>
                <td>{{ props.item.remarks }}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>

        <v-flex xs12 pa-1>
          <v-card>
            <v-toolbar dark color="primary">
              Payments
              <v-spacer></v-spacer>
              <v-btn v-if="show_payments" flat icon @click="show_payments=false">
                <v-icon>expand_less</v-icon>
              </v-btn>
              <v-btn v-else flat icon @click="show_payments=true">
                <v-icon>expand_more</v-icon>
              </v-btn>
            </v-toolbar>
            <v-data-table
              v-if="show_payments"
              :headers="[{text:'Transaction ID', value: 'transaction_id', sortable: false,}, 
                        {text:'Date', value: 'transaction_id', sortable: false},
                        {text:'Mode', value: 'transaction_id', sortable: false},
                        {text:'Amount', value: 'transaction_id', sortable: false}]"
              :items="transaction"
              hide-actions
              class="elevation-1">
              <template slot="items" slot-scope="props">
                <td>{{props.item.transaction_id}}</td>
                <td>{{ formatDate(props.item.date_created) }}</td>
                <td>{{ getModeOfPayment(props.item.payment_details.mode_of_payment) }}</td>
                <td>₱ {{ formatCurrency(props.item.payment_details.total_amount) }}</td>
                <!-- <td>{{ props.item.transaction_id }}</td>
                <td>{{ formatDate(props.item.date_created) }}</td>
                <td>{{ formatCurrency(props.item.payment_details.total_amount) }}</td>
                <td>{{ getModeOfPayment(props.item.payment_details.mode_of_payment) }}</td> -->
              </template>
            </v-data-table>

            <v-footer height="auto" v-if="show_payments">
              <v-btn
                color="success"
                v-if="show_payment_summary"
                @click="paymentSummary"
              >Payment</v-btn>
              <v-spacer></v-spacer>
              Remaining Balance: ₱ {{formatCurrency(remainingBalance())}}
              <v-spacer></v-spacer>
            </v-footer>
          </v-card>
        </v-flex>

        <v-flex xs12 pa-1>
          <v-card>
            <v-toolbar dark color="primary">Documents</v-toolbar>
            <v-card-title primary-title>
              <span class="subheading font-weight-thin primary--text">Files Uploaded</span>
              <v-spacer></v-spacer>
              <v-btn v-if="show_documents" flat icon color="primary" @click="show_documents=false">
                <v-icon>expand_less</v-icon>
              </v-btn>
              <v-btn v-else flat icon color="primary" @click="show_documents=true; loaded=false">
                <v-icon>expand_more</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-if="show_documents">
              <v-container grid-list-sm fluid>
                <v-layout row wrap>
                  <v-flex v-for="(n, indx) in uploaded_documents" :key="indx" xs4 d-flex>
                    <v-card
                      tile
                      class="d-flex"
                      @click="viewFile(n.location)"
                      style="cursor:zoom-in"
                    >
                      <pdf
                        v-show="loaded"
                        @loaded="loaded=true"
                        :src="'https://cors-anywhere.herokuapp.com/'+n.location"
                      ></pdf>
                      <!-- <v-progress-linear v-show="!loaded" :indeterminate="true"></v-progress-linear> -->
                      <v-progress-circular v-show="!loaded" indeterminate color="primary"></v-progress-circular>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-title primary-title>
              <span class="subheading font-weight-thin primary--text">Generated Files</span>
              <v-spacer></v-spacer>
              <v-btn v-if="show_generated" flat icon color="primary" @click="show_generated=false">
                <v-icon>expand_less</v-icon>
              </v-btn>
              <v-btn v-else flat icon color="primary" @click="show_generated=true">
                <v-icon>expand_more</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-if="show_generated">
              <v-container grid-list-sm fluid>
                <v-layout row wrap>
                  <v-flex v-for="(n, indx) in output_documents" :key="indx" xs4 d-flex>
                    <v-card
                      tile
                      class="d-flex"
                      @click="viewFile(n.location)"
                      style="cursor:zoom-in"
                    >
                      <pdf
                        v-show="loaded"
                        @loaded="loaded=true"
                        :src="'https://cors-anywhere.herokuapp.com/'+n.location"
                      ></pdf>
                      <!-- <v-progress-linear v-show="!loaded" :indeterminate="true"></v-progress-linear> -->
                      <v-progress-circular v-show="!loaded" indeterminate color="primary"></v-progress-circular>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  components:{
      pdf
    },
  data(){
    
    return{
      loaded:false,
      show_part1:false,
      show_part2:false,
      show_part3:false,
      show_part4:false,
      show_part5:false,
      show_part6:false,
      show_activities:false,
      show_payments:false,
      show_documents:false,
      show_generated:false,
      show_payment_summary: false,
      remaining_balance: 0.00,
      form:{
        general_info:{},
        estab_details:{},
        auth_officer:{
          mail_add:{}
        }
      },
      case_details:{

      },
      payments:[],
      transaction:[],
      uploaded_documents:[],
      output_documents:[],
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){
      
      this.form = this.$store.state.licenses.view_license
      this.case_details = this.$store.state.case.view_case
      this.$store.dispatch("GET_REFERENCES");
      //get uploaded documents
      if(this.form.uploaded_files){
        this.form.uploaded_files.forEach(doc=>{
          if(doc.location){
            this.uploaded_documents.push({
              file_name: doc.originalname,
              type:doc.contentType,
              location:doc.location
            })
          }
        })
      }
      //get output documents
      if(this.form.output_files){
        this.form.output_files.forEach(doc=>{
          if(doc.location){
            this.output_documents.push({
              file_name: doc.originalname,
              type:doc.contentType,
              location:doc.location
            })
          }
        })
      }
      //get payment details
      this.$store.dispatch('FIND_PAYMENTS_BY_CASENO', this.form.case_no)
      .then(result => {
        if(result.data.success){
          this.payments = result.data.model
          this.payments.forEach(data =>{
            if(data.payment_details.status != 0){
              this.transaction.push(data)
            }
          })
          console.log("find payment by case number: " + JSON.stringify(this.payments))
        }else{
          this.$notifyError(result.data.errors)
        }
      })
      .catch(err=>{
        console.log(err)
        this.$notifyError(err)
      })
    },
    viewFile(url){
      window.open(url, '_blank')
    },
    remainingBalance(){
      console.log("case details: " + JSON.stringify(this.case_details))
      console.log("form details: " + JSON.stringify(this.form))
      console.log("payment details: " + JSON.stringify(this.payments))
      var credit = 0
      var debit = 0
      this.payments.forEach(compute => {
        if(compute.payment_details.status != 0){
        console.log("compute details data: " + JSON.stringify(compute))
        debit = compute.transaction_details.order_payment.total_amount
        credit += compute.payment_details.total_amount
        }
      })
      console.log("this is debit: " + JSON.stringify(debit))
      console.log("this. is credit: " + JSON.stringify(credit))
      this.remaining_balance = debit - credit
      console.log("show payment summary: " + JSON.stringify(this.remaining_balance))
        if(this.remaining_balance === null || this.remaining_balance === undefined || this.remaining_balance === 0 ||
         debit === null || debit === undefined || debit === 0 || debit === credit){
        console.log("show payment summary false ")
        this.show_payment_summary = false
        }else{
          console.log("show payment summary true ")
          this.show_payment_summary = true
        }
      
      
      return this.remaining_balance
    },
    paymentSummary(){
      console.log("payment summary data: " + JSON.stringify(this.$store.state.payments.fee))
      console.log("form details: " + JSON.stringify(this.form))
      console.log("case details: " + JSON.stringify(this.case_details))
      this.$store.commit('SET_FORM', this.form)
      this.$store.commit('FEES',{
          _id:"5cad5db243fea80e24d01454",
          description:"Another Transaction",
          appType: this.form.application_type, 
          productType: this.form.general_info.product_type,
          primaryActivity: this.form.general_info.primary_activity,
          declaredCapital: this.form.general_info.product_type,
          created_by:"default",
          date_created: new Date(),
          total:this.remaining_balance,
          others:0.00,
          interest:0.00,
          surcharge:0.00,
          yearsApplied: this.form.application_type = 2 ? 2 : 3,
          lrf:0.00,
          fee:0.00
      })
      this.$router.push("/app/licenses/pay");
    }
  }
}
</script>

<style>
.compact-form {
  transform: scale(0.875);
}
</style>
