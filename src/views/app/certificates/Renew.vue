<template>
  <v-layout row wrap>
    <v-flex dark xs12 md8 pa-1>
      <v-card>
        <v-toolbar dark color="primary">Application Details</v-toolbar>
        <v-card-title primary-title>
          <span class="subheading font-weight-thin primary--text">Food Product Application</span>
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
            label="Food Product Type"
            :value="foodProductType(form.food_product.type).name"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Food Category"
            :value="foodCategory(form.food_product.categorization).name"
          ></v-text-field>
          <v-textarea
            readonly
            name="name"
            label="Brand Name"
            rows="2"
            :value="form.food_product.brand_name"
          ></v-textarea>
          <v-text-field
            readonly
            name="name"
            label="Product Name"
            :value="form.food_product.product_name"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Company Name (as listed in LTO)"
            :value="form.food_product.company"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Region"
            :value="getRegionName(form.food_product.region)"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="LTO Number"
            :value="form.food_product.license_no"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="LTO Validity"
            :value="formatDate(form.food_product.license_validity)"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Email Address"
            :value="form.food_product.contacts.email"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Landline Number"
            mask="(##) ####-####"
            :value="form.food_product.contacts.landline"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Fax Number"
            mask="(##) ####-####"
            :value="form.food_product.contacts.mobile"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title primary-title>
          <span class="subheading font-weight-thin primary--text">Establishment Information</span>
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
            label="Corresponding company activities"
            :value="establishmentInfo(form.establishment_info.activity).name"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Source Type"
            :value="getEstablishSource(form.establishment_info.type).name"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Country of Origin"
            :value="establishplacesOrigin(form.establishment_info.origin_country).name"
          ></v-text-field>
          <v-text-field
            readonly
            name="Email"
            label="Directly Sourced"
            :value="yesNo(form.establishment_info.directly_source)"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Supplier's Complete Name"
            :value="form.establishment_info.supplier_name"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Supplier's Complete Address"
            :value="form.establishment_info.supplier_address"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Manufacturer's Complete Name"
            :value="form.establishment_info.manufacturer_name"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Manufacturer's Complete Address"
            :value="form.establishment_info.manufacturer_address"
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-title primary-title>
          <span class="subheading font-weight-thin primary--text">Complete List of Ingredients</span>
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
            :headers="[{text:'Ingredients', sortable: false,}]"
            :items="form.ingredients"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <!-- <td>{{ getProdLine(props.item.prod_line).name }}</td> -->
              <td>{{ props.item}}</td>
            </template>
          </v-data-table>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-title primary-title>
          <span class="subheading font-weight-thin primary--text">Product Specifications</span>
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
          <!-- <v-text-field
            readonly
            name="name"
            label="Color"
            :value="physicalParameter(form.product_specification.microbiological[1].parameter)"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Odor"
            :value="form.product_specification.physical.odor"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Taste"
            :value="form.product_specification.physical.tatse"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Texture"
            :value="form.product_specification.physical.texture"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Form"
            :value="form.product_specification.physical.form"
          ></v-text-field>-->
          <v-data-table
            :headers="[{text:'Product Specification', sortable: false},
            {text:'Parameter', sortable: false},
            {text:'Specification', sortable: false}]"
            :items="form.product_specification"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{productSpecs(props.item.type).name}}</td>
              <td>{{getPhysicalParameter(props.item.parameter)}}</td>
              <td>{{props.item.specification}}</td>
            </template>
          </v-data-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title primary-title>
          <span class="subheading font-weight-thin primary--text">Shelf Life and Other information</span>
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
          <v-text-field
            readonly
            name="name"
            label="Shelf Life Declaration (in Months)"
            :value="formatDate(form.shelf.declaration_date)"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Type"
            :value="shelfLifeType(form.shelf.shelf_type).name"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Packaging Material Type/Name"
            :value="form.shelf.packaging_material"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Description of Product in Commercial Presentation"
            :value="form.shelf.description"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Storage Condition Requirements"
            :value="form.shelf.storage_requirements"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Function of the Food material"
            :value="form.shelf.food_material"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Source of Allergen"
            :value="form.shelf.allergen_source"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Lot Code and Interpretation"
            :value="form.shelf.lot_code_interpretation"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="Open Date Marking/ Expiry Date"
            :value="formatDate(form.shelf.date)"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title primary-title>
          <span class="subheading font-weight-thin primary--text">Nutrition Information</span>
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
          <v-text-field
            readonly
            name="name"
            label="Servings Size (grams or ml)"
            :value="form.nutrition_info.serving_size"
          ></v-text-field>
          <v-text-field
            readonly
            name="name"
            label="NUmber of Serving per Container/Pack"
            :value="form.nutrition_info.serving_per_pack"
          ></v-text-field>
          <v-data-table
            :headers="[ {text:'Nutrtion Facts', sortable: false},
                        {text:'Type', sortable: false,},
                        {text:'Amount', sortable: false},
                        {text:'Percent', sortable: false}]"
            :items="form.nutrition_info.servings"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{vitMin(props.item.kind)}}</td>
              <td>{{descNutri(props.item.type).name}}</td>
              <td>{{props.item.amount_per_serving}}</td>
              <td>{{props.item.percent}}%</td>
            </template>
          </v-data-table>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-title primary-title>
          <span class="subheading font-weight-thin primary--text">Nutrition Health Claims</span>
          <v-spacer></v-spacer>
          <v-btn v-if="show_part7" flat icon color="primary" @click="show_part7=false">
            <v-icon>expand_less</v-icon>
          </v-btn>
          <v-btn v-else flat icon color="primary" @click="show_part7=true">
            <v-icon>expand_more</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text v-if="show_part7">
          <!-- <v-text-field readonly name="name" label="Claims" :value="form.claims.claims"></v-text-field>
          <v-text-field readonly name="name" label="Description" :value=" form.claims.desc"></v-text-field>-->
          <v-data-table
            :headers="[{text:'Claims', sortable: false,}, 
                        {text:'Description', sortable: false}]"
            :items="form.claims"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{healthClaims(props.item.claim).name}}</td>
              <td>{{props.item.desc}}</td>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
    <!-- PAYMENTS -->
    <v-flex xs12 md4 pa-1>
      <v-card>
        <v-toolbar dark color="primary">Renew Fee</v-toolbar>
        <v-card-text>
          <v-data-table
            :loading="isLoading"
            :headers="[{text: 'Description', sortable:false}, {text: 'Amount', sortable:false}]"
            :items="fees"
            hide-actions
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.description }}</td>
              <td>₱ {{ numberWithCommas (props.item.amount) }}</td>
            </template>
            <template slot="footer">
              <td>Total</td>
              <td class="font-weight-bold">₱ {{ numberWithCommas(total_amount) }}</td>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
    <!-- DOCUMENTS -->
    <v-flex xs12 md8 pa-1>
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
                <v-card tile class="d-flex" @click="viewFile(n.location)" style="cursor:zoom-in">
                  <pdf
                    v-show="loaded"
                    @loaded="loaded=true"
                    :src="'https://cors-anywhere.herokuapp.com/'+n.location"
                  ></pdf>

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
                <v-card tile class="d-flex" @click="viewFile(n.location)" style="cursor:zoom-in">
                  <pdf
                    v-show="loaded"
                    @loaded="loaded=true"
                    :src="'https://cors-anywhere.herokuapp.com/'+n.location"
                  ></pdf>
                  <v-progress-circular v-show="!loaded" indeterminate color="primary"></v-progress-circular>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>

    <!-- bottom sheet -->
    <v-bottom-sheet persistent hide-overlay inset v-model="show_action">
      <v-card color="success">
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Certificate Renewal</v-list-tile-title>
              <v-list-tile-sub-title>Please review your certificate details before submitting for renewal.</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
            <v-list-tile-action class="mr-2">
              <v-btn outline color="primary" @click="cancelDialog">Cancel</v-btn>
            </v-list-tile-action>
            <v-list-tile-action>
              <!-- <v-btn v-show="curr_step==1" color="primary" @click="curr_step=2">Next</v-btn> -->
              <v-btn :loading="isLoading" color="primary" @click="save">Accept</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-bottom-sheet>
  </v-layout>
</template>

<script>
import pdf from "vue-pdf";
export default {
  components: {
    pdf
  },
  data() {
    return {
      isLoading: false,
      show_action: true,
      loaded: false,
      show_part1: false,
      show_part2: false,
      show_part3: false,
      show_part4: false,
      show_part5: false,
      show_part6: false,
      show_part7: false,
      show_activities: false,
      show_payments: false,
      show_documents: false,
      show_generated: false,
      show_payment_summary: false,
      remaining_balance: 0.0,
      form: {},
      case_details: {},
      payments: [],
      claims: [],
      transaction: [],
      // documentary: [],
      // uploaded_files: [],
      // output_files: [],
      fees_form: {},
      fees: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.isLoading = true;
      this.form = this.$store.state.certificate.view;
      console.log("app overview form data: " + JSON.stringify(this.form));
      this.case_details = this.$store.state.certificate.cases;
      var details = {
        application_type: 2,
        product_type: this.form.food_product.type
      };
      this.$store
        .dispatch("GET_CERTIFICATE_FEES", details)
        .then(result => {
          console.log("get certificate fees: " + JSON.stringify(result));
          this.fees = [];
          this.fees.push({
            description: "Application Fee",
            amount: result.fee
          });
          this.fees.push({
            description: "LRF",
            amount: result.lrf
          });
          this.fees.push({
            description: "Interest",
            amount: result.interest
          }),
            this.fees.push({
              description: "Surcharge",
              amount: result.surcharge
            });

          this.total_amount =
            result.fee + result.lrf + result.interest + result.surcharge;
          this.$notify({
            color: "success",
            message:
              "Registration fee computed! For this application you will have to pay the amount of  ₱ " +
              this.numberWithCommas(this.total_amount)
          });
          this.isLoading = false;
        })
        .catch(err => {
          this.isLoading = false;
        });
      // this.form = this.$store.state.licenses.view_license;
      // this.case_details = this.$store.state.case.view_case;
      // this.$store.dispatch("GET_CERTIFICATE");
      // //get uploaded documents
      // if (this.form.uploaded_files) {
      //   this.form.uploaded_files.forEach(doc => {
      //     if (doc.location) {
      //       this.uploaded_documents.push({
      //         file_name: doc.originalname,
      //         type: doc.contentType,
      //         location: doc.location
      //       });
      //     }
      //   });
      // }
      // //get output documents
      // if (this.form.output_files) {
      //   this.form.output_files.forEach(doc => {
      //     if (doc.location) {
      //       this.output_documents.push({
      //         file_name: doc.originalname,
      //         type: doc.contentType,
      //         location: doc.location
      //       });
      //     }
      //   });
      // }
      //get payment details
      //   this.$store
      //     .dispatch("FIND_PAYMENTS_BY_CASENO", this.form.case_no)
      // .then(result => {
      //   if (result.data.success) {
      //     this.payments = result.data.model;
      //     this.payments.forEach(data => {
      //       if (data.payment_details.status != 0) {
      //         this.transaction.push(data);
      //       }
      //     });
      //     console.log(
      //       "find payment by case number: " + JSON.stringify(this.payments)
      //     );
      //   } else {
      //     this.$notifyError(result.data.errors);
      //   }
      // })
      // .catch(err => {
      //   console.log(err);
      //   this.$notifyError(err);
      // });
    },
    // apply(){

    // },

    cancelDialog() {
      this.$router.push("/app/certificates");
    },

    save() {
      this.$store
        .dispatch("RENEWAL_CERTIFICATE", this.form)
        .then(result => {
          console.log("renewal certificate: " + JSON.stringify(result));
          this.$router.push("/app/certificate/pay");
        })
        .catch(err => {});
    }
    // viewFile(url) {
    //   window.open(url, "_blank");
    // },
    // remainingBalance() {
    //   console.log("case details: " + JSON.stringify(this.case_details));
    //   console.log("form details: " + JSON.stringify(this.form));
    //   console.log("payment details: " + JSON.stringify(this.payments));
    //   var credit = 0;
    //   var debit = 0;
    //   this.payments.forEach(compute => {
    //     if (compute.payment_details.status != 0) {
    //       console.log("compute details data: " + JSON.stringify(compute));
    //       credit += compute.payment_details.total_amount;
    //     } else {
    //       debit = compute.transaction_details.order_payment.total_amount;
    //     }
    //   });
    //   console.log("this is debit: " + JSON.stringify(debit));
    //   console.log("this. is credit: " + JSON.stringify(credit));
    //   this.remaining_balance = debit - credit;
    //   console.log(
    //     "show payment summary: " + JSON.stringify(this.remaining_balance)
    //   );
    //   if (
    //     this.remaining_balance === null ||
    //     this.remaining_balance === undefined ||
    //     this.remaining_balance === 0 ||
    //     debit === null ||
    //     debit === undefined ||
    //     debit === 0 ||
    //     debit === credit
    //   ) {
    //     console.log("show payment summary false ");
    //     this.remaining_balance = 0.0;
    //     if (credit === 0) {
    //       this.remaining_balance = debit;
    //     }
    //     this.show_payment_summary = false;
    //   } else {
    //     console.log("show payment summary true ");
    //     this.show_payment_summary = true;
    //   }

    //   return this.remaining_balance;
    // },

    // paymentSummary() {
    //   console.log(
    //     "payment summary data: " +
    //       JSON.stringify(this.$store.state.payments.fee)
    //   );
    //   console.log("form details: " + JSON.stringify(this.form));
    //   console.log("case details: " + JSON.stringify(this.case_details));
    //   this.$store.commit("SET_FORM", this.form);
    //   this.$store.commit("FEES", {
    //     _id: "5cad5db243fea80e24d01454",
    //     description: "Another Transaction",
    //     appType: this.form.application_type,
    //     productType: this.form.general_info.product_type,
    //     primaryActivity: this.form.general_info.primary_activity,
    //     declaredCapital: this.form.general_info.product_type,
    //     created_by: "default",
    //     date_created: new Date(),
    //     total: this.remaining_balance,
    //     others: 0.0,
    //     interest: 0.0,
    //     surcharge: 0.0,
    //     yearsApplied: (this.form.application_type = 2 ? 2 : 3),
    //     lrf: 0.0,
    //     fee: 0.0
    //   });
    //   this.$router.push("/app/licenses/pay");
    // }
  }
};
</script>

<style>
.compact-form {
  transform: scale(0.875);
}
</style>
