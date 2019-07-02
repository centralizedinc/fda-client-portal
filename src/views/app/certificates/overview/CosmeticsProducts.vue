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
        readonly
        label="Brand Name"
        :value="form.cosmetic_certificate.particular_product.brand_name"
      ></v-text-field>
      <v-text-field
        readonly
        label="Product Name"
        :value="form.cosmetic_certificate.particular_product.product_name"
      ></v-text-field>
      <v-text-field
        readonly
        label="Number of Years applied for"
        :value="form.cosmetic_certificate.particular_product.years_applied"
      ></v-text-field>
      <v-list dense>
        <v-list-tile
          v-for="(item, index) in form.cosmetic_certificate.particular_product.product_variants"
          :key="index"
        >
          <v-list-tile-content>{{item}}:</v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-text-field
        readonly
        label="Product Type"
        :value="form.cosmetic_certificate.particular_product.product_type"
      ></v-text-field>
      <v-text-field
        readonly
        label="Specify"
        v-if="form.cosmetic_certificate.particular_product.product_specify"
        :value="form.cosmetic_certificate.particular_product.product_specify"
      ></v-text-field>
      <v-text-field
        readonly
        label="Intended Use"
        :value="form.cosmetic_certificate.particular_product.intended_use"
      ></v-text-field>
      <v-text-field
        readonly
        label="Product Presentation"
        :value="form.cosmetic_certificate.particular_product.product_presentation"
      ></v-text-field>
      <v-text-field
        readonly
        label="Specify the component of the kit"
        v-if="form.cosmetic_certificate.particular_product.presentation_component"
        :value="form.cosmetic_certificate.particular_product.presentation_component"
      ></v-text-field>
      <v-text-field
        readonly
        label="Specify"
        v-else-if="form.cosmetic_certificate.particular_product.presentation_specify"
        :value="form.cosmetic_certificate.particular_product.presentation_specify"
      ></v-text-field>
      <v-data-table
        :headers="packaging_items"
        :items="form.cosmetic_certificate.particular_product.additional_information"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.packaging_size }}</td>
          <td>{{ props.item.packaging_type }}</td>
          <td>{{ props.item.gtin }}</td>
        </template>
      </v-data-table>
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
        :value="form.cosmetic_certificate.establishment_info.company"
      ></v-text-field>
      <v-text-field
        readonly
        label="Address"
        :value="form.cosmetic_certificate.establishment_info.address"
      ></v-text-field>
      <v-text-field
        readonly
        label="Region"
        :value="form.cosmetic_certificate.establishment_info.region"
      ></v-text-field>
      <v-text-field
        readonly
        label="License No"
        :value="form.cosmetic_certificate.establishment_info.license_no"
      ></v-text-field>
      <v-text-field
        readonly
        label="License Validity"
        :value="form.cosmetic_certificate.establishment_info.license_validity"
      ></v-text-field>
      <v-list dense>
        <v-list-tile
          v-for="(item, index) in form.cosmetic_certificate.establishment_info.contact_info"
          :key="index"
        >
          <v-list-tile-content>{{item.type}}:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ item.details }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-text-field
        readonly
        label="Please select the corresponding company activity/activities"
        :value="form.cosmetic_certificate.establishment_info.activity"
      ></v-text-field>
      <v-text-field
        readonly
        label="Directly Source"
        v-if="form.cosmetic_certificate.establishment_info.directly_source !== null"
        :value="form.cosmetic_certificate.establishment_info.directly_source"
      ></v-text-field>
      <v-text-field
        readonly
        label="Country of Origin"
        v-if="form.cosmetic_certificate.establishment_info.origin_country"
        :value="form.cosmetic_certificate.establishment_info.origin_country"
      ></v-text-field>
      <v-text-field
        readonly
        label="Complete Name of Manufacturer"
        v-if="form.cosmetic_certificate.establishment_info.manufacturer_name"
        :value="form.cosmetic_certificate.establishment_info.manufacturer_name"
      ></v-text-field>
      <v-text-field
        readonly
        label="Complete Address of Manufacturer"
        v-if="form.cosmetic_certificate.establishment_info.manufacturer_address"
        :value="form.cosmetic_certificate.establishment_info.manufacturer_address"
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
      <v-text-field
        readonly
        label="Name"
        :value="form.cosmetic_certificate.company_representative.name"
      ></v-text-field>
      <v-text-field
        readonly
        label="Designation"
        :value="form.cosmetic_certificate.company_representative.designation"
      ></v-text-field>
      <v-list dense>
        <v-list-tile
          v-for="(item, index) in form.cosmetic_certificate.company_representative.contact_info"
          :key="index"
        >
          <v-list-tile-content>{{item.type}}:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ item.details }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
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
      <v-data-iterator
        :items="form.cosmetic_certificate.ingredients"
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
                <h4>{{ props.item.name }}</h4>
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>Variant.:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.variant }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Function:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.function }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Percentage (%) of Ingredient:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.percentage }}</v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
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
      },
      packaging_items: [
        { text: "Packaging Size", value: "packaging_size", sortable: false },
        { text: "Packaging Type", value: "packaging_type", sortable: false },
        { text: "GTIN", value: "gtin", sortable: false }
      ]
    };
  }
};
</script>

<style>
</style>
