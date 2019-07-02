<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md8 pa-1 v-if="show_page(1)">
        <v-card>
          <v-toolbar dark color="primary">Select variation category then click next</v-toolbar>
          <v-progress-linear v-show="isLoading" :indeterminate="true"></v-progress-linear>
          <v-card-text v-show="!isLoading">
            <v-checkbox
              color="primary"
              v-for="(item, index) in variations"
              :key="index"
              :label="item.description"
              v-model="selected_variations"
              :value="item.code"
            ></v-checkbox>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 md8 pa-1 v-else-if="show_page(2)">
        <v-card class="ma-1" v-if="show_section('VR1')">
          <v-toolbar dark color="primary">{{variations[0].description}}</v-toolbar>
          <v-card-text>
            <v-text-field label="Brand Name" v-model="form.food_product.brand_name" outline></v-text-field>
          </v-card-text>
        </v-card>

        <v-card class="ma-1" v-if="show_section('VR2')">
          <v-toolbar dark color="primary">{{variations[1].description}}</v-toolbar>
          <v-card-text>
            <v-text-field label="Product Name" v-model="form.food_product.product_name" outline></v-text-field>
          </v-card-text>
        </v-card>

        <!-- Company Name -->
        <v-card class="ma-1" v-if="show_section('VR3')">
          <v-toolbar dark color="primary">{{variations[2].description}}</v-toolbar>
          <v-card-text>
            <v-text-field label="Company Name" v-model="form.food_product.company" outline></v-text-field>
          </v-card-text>
        </v-card>

        <v-card class="ma-1" v-if="show_section('VR4')">
          <v-toolbar dark color="primary">{{variations[3].description}}</v-toolbar>
          <v-card-text>
            <v-text-field
              label="Supplier Name"
              v-model="form.establishment_info.supplier_name"
              outline
            ></v-text-field>
            <v-text-field
              label="Supplier Address"
              v-model="form.establishment_info.supplier_address"
              outline
            ></v-text-field>
          </v-card-text>
        </v-card>

        <v-card class="ma-1" v-if="show_section('VR5')">
          <v-toolbar dark color="primary">{{variations[4].description}}</v-toolbar>
          <v-card-text>
            <span
              class="caption"
            >*eg. Glass Bottle; Polyethylene Terephthalate (PET); Polyethylene; Polypropylene; Cellophane; Paper (such as Glassine, Vegetable Parchment); Can coated with Oleoresinous, Phenolic, Epoxy or Vinyl; Polyamide;Aluminum; etc</span>
            <v-text-field
              label="Product Commercial Presentation"
              v-model="form.shelf.packaging_material"
              outline
            ></v-text-field>
          </v-card-text>
        </v-card>

        <v-card class="ma-1" v-if="show_section('VR6')">
          <v-toolbar dark color="primary">{{variations[5].description}}</v-toolbar>
          <v-card-text>
            <span
              class="caption"
            >*eg. Individually Wrapped in Pillow Packs inside Laminated Plastic Pack, In Bottle, In Box, In 90g (2sachets x 45g) carton box</span>
            <v-text-field
              label="Product Commercial Presentation"
              v-model="form.shelf.description"
              outline
            ></v-text-field>
          </v-card-text>
        </v-card>

        <v-card class="ma-1" v-if="show_section('VR7')">
          <v-toolbar dark color="primary">{{variations[6].description}}</v-toolbar>
          <v-card-text>
            <span class="caption">*For Alcoholic Beverages without Shelf Life, indicate 0 (Zero)</span>
            <v-text-field
              label="Shelf Life Declaration (in Months)"
              v-model="form.shelf.declaration_date"
              outline
            ></v-text-field>
          </v-card-text>
        </v-card>

        <v-card class="ma-1" v-if="show_section('VR8')">
          <v-toolbar dark color="primary">{{variations[7].description}}</v-toolbar>
          <v-card-text>
            <uploader @upload="uploadFile"></uploader>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 md4 pa-1>
        <v-card>
          <v-toolbar dark color="primary">Variation Fee</v-toolbar>
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
    </v-layout>
    <v-bottom-sheet dark persistent hide-overlay :value="true">
      <v-card dark color="success">
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>License Variation</v-list-tile-title>
              <v-list-tile-sub-title
                v-if="show_page(1)"
              >Step 1 - Select variation category then click next</v-list-tile-sub-title>
              <v-list-tile-sub-title v-else-if="show_page(2)">Step 2 - Update License Details</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
            <v-list-tile-action class="mr-2">
              <v-btn :disabled="isLoading" outline @click="page=1">Cancel</v-btn>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn :loading="isLoading" v-show="show_page(1)" color="primary" @click="next()">Next</v-btn>
              <v-btn
                :loading="isLoading"
                v-show="show_page(2)"
                color="primary"
                @click="submit()"
              >Accept</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import variations from "./variations.json";
import Uploader from "@/components/Uploader";

export default {
  components: {
    Uploader
  },
  data() {
    return {
      variations: variations,
      rules: {
        required: value => !!value || "This field is required",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      },
      page: 1,
      fees: [],
      isLoading: false,
      total_amount: 0,
      base_form: {},
      form: {},
      selected_variations: [],
      form_data: null,
      uploaded_files: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.base_form = this.$store.state.certificate.view;
      this.form = this.deepCopy(this.$store.state.certificate.view);
      console.log("this.form :", this.form);
      this.form.application_type = 1;
      this.form.general_info.application_type = 1;
      this.form.base_certificate = this.form.certificate_no;

      //clear fields
      delete this.form._id;
      delete this.form.auto_id;
      delete this.form.certificate_no;
      delete this.form.created_by;
      delete this.form.date_created;
      delete this.form.date_modified;
      delete this.form.status;
    },
    show_page(val) {
      return this.page === val;
    },
    show_section(code) {
      return this.selected_variations.includes(code);
    },
    uploadFile(file) {
      this.form_data = file.formData;
      this.uploaded_files = file.uploadedFiles;
    },
    next() {
      /**
       * TODOs:
       * computation of fees not correct!!!
       * computation should include if the variation type
       */
      this.isLoading = true;
      var details = {
        application_type: 1
      };
      this.$store
        .dispatch("GET_CERTIFICATE_FEES", details)
        .then(result => {
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
          this.page = 2;
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
    },
    submit() {
      this.isLoading = true;
      var variated_values = [];
      this.selected_variations.forEach(element => {
        console.log(element);

        switch (element) {
          case "VR1":
            variated_values.push({
              code: element,
              old_value: this.base_form.food_product.brand_name,
              new_value: this.form.food_product.brand_name
            });
            break;
          case "VR2":
            variated_values.push({
              code: element,
              old_value: this.base_form.food_product.product_name,
              new_value: this.form.food_product.product_name
            });
            break;
          case "VR3":
            variated_values.push({
              code: element,
              old_value: this.base_form.food_product.company,
              new_value: this.form.food_product.company
            });
            break;
          case "VR4":
            variated_values.push({
              code: element,
              old_value: this.base_form.establishment_info.supplier_name,
              new_value: this.form.establishment_info.supplier_name
            });
            variated_values.push({
              code: element,
              old_value: this.base_form.establishment_info.supplier_address,
              new_value: this.form.establishment_info.supplier_address
            });
            break;
          case "VR5":
            variated_values.push({
              code: element,
              old_value: this.base_form.shelf.packaging_material,
              new_value: this.form.shelf.packaging_material
            });
            break;
          case "VR6":
            variated_values.push({
              code: element,
              old_value: this.base_form.shelf.description,
              new_value: this.form.shelf.description
            });
            break;
          case "VR7":
            variated_values.push({
              code: element,
              old_value: this.base_form.shelf.declaration_date,
              new_value: this.form.shelf.declaration_date
            });
            break;
          case "VR8":
            variated_values.push({
              code: element,
              old_value: this.base_form.uploaded_files,
              new_value: this.uploaded_files
            });
            break;
        }
      });
      console.log(JSON.stringify(variated_values));

      this.$store
        .dispatch("VARIATE_CERTIFICATE", {
          form_data: this.form_data,
          certificate: this.form,
          variation: {
            variations: [],
            variated_values
          }
        })
        .then(model => {
          this.isLoading = false;
          this.$notify({
            message:
              "Successfully applied for Certificate Variation with Case No.: " +
              model.case_details.case_no,
            color: "success",
            icon: "check_circle"
          });
          console.log(
            "set form to be passed data: " + JSON.stringify(model.certificate)
          );
          this.$store.commit("SET_FORM", model.certificate);
          this.$router.push("/app/certificate/pay");
        })
        .catch(err => {
          this.isLoading = false;
          console.log("Saving variation err :", err);
          this.$notifyError(err);
        });
    }
  }
};
</script>

<style>
</style>
