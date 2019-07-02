<template>
  <v-card>
    <v-toolbar dark color="primary">Application Details</v-toolbar>

    <!-- Particulars of the Product -->
    <v-card-title primary-title>
      <span class="subheading font-weight-thin primary--text">Particulars of the Product</span>
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
      <v-text-field
        label="Brand Name"
        readonly
        :value="form.toy_certificate.particular_product.brand_name"
      ></v-text-field>
      <v-text-field
        label="Product Type"
        readonly
        :value="form.toy_certificate.particular_product.product_type"
      ></v-text-field>
      <template v-if="form.toy_certificate.particular_product.product_use">
        <v-text-field
          label="Product Use"
          readonly
          :value="form.toy_certificate.particular_product.product_use"
        ></v-text-field>
        <v-text-field
          label="Mass (in kilograms) of the child for whom the toy is intended"
          readonly
          :value="form.toy_certificate.particular_product.mass_of_child"
        ></v-text-field>
        <v-text-field
          label="If appropriate, the maximum number of children that may safely use the equipment simultaneously"
          readonly
          :value="form.toy_certificate.particular_product.if_appropriate"
        ></v-text-field>
      </template>
      <v-text-field
        v-else-if="form.toy_certificate.particular_product.exemption_reason"
        label="Exemption for the reason that"
        readonly
        :value="form.toy_certificate.particular_product.exemption_reason"
      ></v-text-field>
      <v-data-iterator
        :items="form.toy_certificate.particular_product.product_details"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        content-tag="v-layout"
        row
        wrap
      >
        <template v-slot:item="props">
          <v-flex xs12 sm6 md4 lg3>
            <v-card>
              <v-card-title>
                <h4>{{ props.item.item }}</h4>
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>Model No.:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.model }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Stock Keeping Unit (SKU):</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.sku }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Age Grading:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.age_grading }}</v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
    </v-card-text>

    <!-- Establishment Information -->
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
        label="Company Name"
        :value="form.toy_certificate.establishment_info.company"
      ></v-text-field>
      <v-text-field
        readonly
        label="Address"
        :value="form.toy_certificate.establishment_info.address"
      ></v-text-field>
      <v-text-field readonly label="Region" :value="form.toy_certificate.establishment_info.region"></v-text-field>
      <v-text-field
        readonly
        label="License No"
        :value="form.toy_certificate.establishment_info.license_no"
      ></v-text-field>
      <v-text-field
        readonly
        label="License Validity"
        :value="form.toy_certificate.establishment_info.license_validity"
      ></v-text-field>
      <v-list dense>
        <v-list-tile
          v-for="(item, index) in form.toy_certificate.establishment_info.contact_info"
          :key="index"
        >
          <v-list-tile-content>{{item.type}}:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ item.details }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-text-field
        readonly
        label="Please select the corresponding company activity/activities"
        :value="form.toy_certificate.establishment_info.activity"
      ></v-text-field>
      <v-text-field
        readonly
        label="Directly Source"
        v-if="form.toy_certificate.establishment_info.directly_source !== null"
        :value="form.toy_certificate.establishment_info.directly_source"
      ></v-text-field>
      <v-text-field
        readonly
        label="Country of Origin"
        v-if="form.toy_certificate.establishment_info.origin_country"
        :value="form.toy_certificate.establishment_info.origin_country"
      ></v-text-field>
      <v-text-field
        readonly
        label="Complete Name of Manufacturer"
        v-if="form.toy_certificate.establishment_info.manufacturer_name"
        :value="form.toy_certificate.establishment_info.manufacturer_name"
      ></v-text-field>
      <v-text-field
        readonly
        label="Complete Address of Manufacturer"
        v-if="form.toy_certificate.establishment_info.manufacturer_address"
        :value="form.toy_certificate.establishment_info.manufacturer_address"
      ></v-text-field>
    </v-card-text>

    <!-- Person Representing the Local Company -->
    <v-card-title primary-title>
      <span class="subheading font-weight-thin primary--text">Person Representing the Local Company</span>
      <v-spacer></v-spacer>
      <v-btn v-if="show_part3" flat icon color="primary" @click="show_part3=false">
        <v-icon>expand_less</v-icon>
      </v-btn>
      <v-btn v-else flat icon color="primary" @click="show_part3=true">
        <v-icon>expand_more</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="compact-form" v-if="show_part3">
      <v-text-field readonly label="Name" :value="form.toy_certificate.company_representative.name"></v-text-field>
      <v-text-field
        readonly
        label="Designation"
        :value="form.toy_certificate.company_representative.designation"
      ></v-text-field>
      <v-list dense>
        <v-list-tile
          v-for="(item, index) in form.toy_certificate.company_representative.contact_info"
          :key="index"
        >
          <v-list-tile-content>{{item.type}}:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ item.details }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    form: {
      type: Object
    }
  },
  data() {
    return {
      show_part1: false,
      show_part2: false,
      show_part3: false,
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      }
    };
  }
};
</script>

<style>
</style>
