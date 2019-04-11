<template>
    <v-container grid-list-md>
        <v-layout row wrap v-if="page === 1 && !paymentDialog">
            <v-card>
                <v-card-text>
                    <v-flex xs12 v-for="(item, index) in variations" :key="index" mb-3>
                        <span class="title">{{item.title}}</span>
                        <v-checkbox 
                        color="primary"
                            v-for="(field, i) in item.items" 
                            :key="i" 
                            :label="field.description" 
                            v-model="selected_variations" 
                            :disabled="field.disabled"
                            :value="field.code">
                        </v-checkbox>
                        <v-divider></v-divider>
                    </v-flex>
                    <v-btn 
                        color="primary"
                        @click="page=2"
                        :disabled="selected_variations.length===0" 
                        block>Continue
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-layout>
        <v-layout row wrap v-else-if="page === 2 && !paymentDialog">
            <v-card>
                <v-card-text>
                    <v-flex xs12 v-if="checkVariation(['MN1'])">
                        <product-line 
                            :existingForm="existingForm" 
                            :updatedForm="updatedForm">
                        </product-line>
                        <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs12 v-if="checkVariation(['MN5'])">
                      <qualified-personnel 
                          :existingForm="existingForm" 
                          :updatedForm="updatedForm">
                      </qualified-personnel>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs12 mt-2 mb-4>
                      <change-form 
                        :variations="selected_variations"
                        :existingForm="existingForm" 
                        :updatedForm="updatedForm">
                      </change-form>
                    </v-flex>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="secondary" flat outline @click="page=1">Back</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="confirmDialog=true">Submit Changes</v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
        <payment-summary
        v-else-if="paymentDialog"
        @close="confirmDialog=false"
        :form="updatedForm"
        :charges="charges"
        ></payment-summary>
        <confirm-to-review-app
            :show="confirmDialog"
            @close="confirmDialog=false"
            @overview="confirmDialog=false;showAppOverview=true"
            @submit="submit">
        </confirm-to-review-app>
        <application-overview :show="showAppOverview" @close="showAppOverview=false;confirmDialog=true;">
            <app-summary slot="appsummary" :form="updatedForm"></app-summary>
            <app-data slot="appdata" :form="updatedForm"></app-data>
            <uploaded-files slot="uploadedfiles" :form="updatedForm"></uploaded-files>
            <output-docs slot="outputdocs" :form="updatedForm"></output-docs>
            <!-- <app-history slot="apphistory" :form="updatedForm"></app-history> -->
            <payment slot="paymentdetails" :form="updatedForm" :charges="charges"></payment>
        </application-overview>
    </v-container>
</template>

<script>
import variations from "./variations/variations.json";
import tabs from "./variations";

export default {
  components: tabs,
  data() {
    return {
      page: 1,
      variations: variations,
      selected_variations: [],
      existingForm: {
        general_info: {},
        estab_details: {
          products: []
        },
        addresses: {
          office: {},
          warehouse: [],
          plant: {}
        },
        auth_officer: {
          mail_add: {}
        },
        qualified: [],
        uploaded_files: []
      },
      updatedForm: {
        general_info: {},
        estab_details: {
          products: []
        },
        addresses: {
          office: {},
          warehouse: [],
          plant: {}
        },
        auth_officer: {
          mail_add: {}
        },
        qualified: [],
        uploaded_files: []
      },
      charges: {},
      paymentDialog: false,
      confirmDialog: false,
      showAppOverview: false
    };
  },
  computed: {
    variation_items() {
      return this.variations[0].items.concat(this.variations[1].items);
    },
    variations_data() {
      var items = [];
      this.selected_variations.forEach(variation => {
        var item = this.deepCopy(this.variation_items).find(
          x => x.code === variation
        );
        item.fields = undefined;
        items.push(item);
      });
      return items;
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.existingForm = this.$store.state.licenses.variation_license;
      this.updatedForm = this.deepCopy({
        application_type: 1,
        general_info: this.existingForm.general_info,
        estab_details: this.existingForm.estab_details,
        addresses: this.existingForm.addresses,
        auth_officer: this.existingForm.auth_officer,
        qualified: this.existingForm.qualified,
        uploaded_files: this.existingForm.uploaded_files
      });
      this.updatedForm.estab_details.products = [];
      this.existingForm.estab_details.products.forEach(product => {
        product.read_only = true;
        this.updatedForm.estab_details.products.push(this.deepCopy(product));
      });
    },
    checkCode(code) {
      if (code === "MN4") {
        if (
          this.selected_variations.indexOf("MJ1") > -1 &&
          this.selected_variations.indexOf("MJ3") > -1
        ) {
          var i = this.selected_variations.indexOf("MN4");
          if (i > -1) {
            this.selected_variations.splice(i, 1);
          }
          return false;
        }
        return true;
      }
      return true;
    },
    checkVariation(codes) {
      for (let i = 0; i < codes.length; i++) {
        if (this.selected_variations.indexOf(codes[i]) > -1) {
          return true;
        }
      }
      return false;
    },
    getVariationValues(code) {
      var item = this.variation_items.find(x => x.code === code);
      var items = [];
      if (item && item.fields) {
        item.fields.forEach(field => {
          var old_value = this.getValue(this.existingForm, field),
            new_value = this.getValue(this.updatedForm, field);
          if (old_value !== new_value) items.push({ old_value, new_value });
        });
      }
      return items;
    },
    getValue(arr, item_key) {
      var keys = item_key.split("."),
        value = null;
      keys.forEach(key => {
        value = value ? value[key] : arr[key];
      });
      var output =
        typeof value === "string"
          ? value
          : this.replaceAll(JSON.stringify(value), '"', "'");
      return JSON.parse(
        '{ "' + keys[keys.length - 1] + '" : "' + output + '" }'
      );
    },
    submit() {
      var variations = this.variations_data;
      var variated_values = [];
      this.selected_variations.forEach(code => {
        variated_values = variated_values.concat(this.getVariationValues(code));
      });
      console.log("this.updatedForm :", this.updatedForm);
      console.log("variations :", variations);
      console.log("variated_values :", JSON.stringify(variated_values));
      this.$store
        .dispatch("VARIATE_LICENSE", {
          license: this.updatedForm,
          variation: {
            variations,
            variated_values
          }
        })
        .then(result => {
          console.log("Saving variation result :", result);
          if (result.success) {
            this.$notify({
              message:
                "Successfully applied a Variation of License with Case No.: " +
                result.model.case_details.case_no,
              color: "success",
              icon: "check_circle"
            });
            this.$store.commit("SET_FORM", result.model);
            this.confirmDialog = false;
            
            //find fees
            var details = {
                productType: this.updatedForm.general_info.product_type,
                primaryActivity: this.updatedForm.general_info.primary_activity,
                declaredCapital: this.updatedForm.general_info.declared_capital,
                appType: this.updatedForm.application_type
              };
            return this.$store.dispatch("GET_FEES", details)
                
          } else {
            this.$notifyError(result.errors);
          }
        })
        .then(payment_fees =>{
          this.charges = payment_fees;
          this.paymentDialog = true;
        })
        .catch(err => {
          console.log("Saving variation err :", err);
          this.$notifyError(err);
        });
    }
  }
};
</script>

<style>
</style>
