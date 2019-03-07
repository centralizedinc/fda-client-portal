<template>
    <v-container grid-list-xl>
        <v-layout row wrap>
          <v-flex xs12 v-for="(item, index) in items" :key="index">
            <span class="body-1">Old Value</span>: <span class="body-2">{{getOldValue(item.key)}}</span>
            <!-- Business Name -->
            <v-text-field 
              v-if="item.key === 'estab_details.establishment_name'"
              :label="item.field"
              box :rules="[rules.required]"
              v-model="updatedForm.estab_details.establishment_name">
            </v-text-field>

            <!-- Ownership -->
            <v-text-field
              v-if="item.key === 'estab_details.establishment_owner'"
              :label="item.field"
              box :rules="[rules.required]"
              v-model="updatedForm.estab_details.establishment_owner"
            ></v-text-field>

            <!-- Address -->
            <v-text-field
              v-if="item.key === 'addresses.office.address'"
              :label="item.field"
              box :rules="[rules.required]"
              v-model="updatedForm.addresses.office.address"
            ></v-text-field>
            
            <!-- Personel -->
            <v-text-field
              v-if="item.key === 'auth_officer.lastname'"
              :label="item.field"
              box :rules="[rules.required]"
              v-model="updatedForm.auth_officer.lastname"
            ></v-text-field>

            <v-text-field
              v-if="item.key === 'auth_officer.firstname'"
              :label="item.field"
              box :rules="[rules.required]"
              v-model="updatedForm.auth_officer.firstname"
            ></v-text-field>

            <v-text-field
              v-if="item.key === 'auth_officer.middlename'"
              :label="item.field"
              box :rules="[rules.required]"
              v-model="updatedForm.auth_officer.middlename"
            ></v-text-field>
            
            <v-text-field
              v-if="item.key === 'auth_officer.email'"
              :label="item.field"
              box :rules="[rules.required, rules.email]"
              v-model="updatedForm.auth_officer.email"
            ></v-text-field>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  props: ["variations", "existingForm", "updatedForm"],
  data() {
    return {
      items: [],
      businessName: [
        {
          field: "Business Name",
          key: "estab_details.establishment_name"
        }
      ],
      address: [
        {
          field: "Address",
          key: "addresses.office.address"
        }
      ],
      personnel: [
        {
          field: "Last Name",
          key: "auth_officer.lastname"
        },
        {
          field: "First Name",
          key: "auth_officer.firstname"
        },
        {
          field: "Middle Name",
          key: "auth_officer.middlename"
        },
        {
          field: "Email",
          key: "auth_officer.email"
        }
      ],
      ownership: [
        {
          field: "Establishment Ownership",
          key: "estab_details.establishment_owner"
        }
      ],
      rules: {
        required: v => !!v || "Required field",
        email: v =>
          (!!v || "E-mail is required") &&
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.items = [];

      // Business Name
      if (this.variationContains(["MN4", "MJ1"]))
        this.items = this.items.concat(this.businessName);
      // Address
      if (this.variationContains(["MN4", "MJ3"]))
        this.items = this.items.concat(this.address);
      // Personnel
      if (this.variationContains(["MN5"]))
        this.items = this.items.concat(this.personnel);
      // Ownership
      if (this.variationContains(["MJ2"]))
        this.items = this.items.concat(this.ownership);
    },
    variationContains(codes) {
      for (let i = 0; i < codes.length; i++) {
        if (this.variations.indexOf(codes[i]) > -1) {
          return true;
        }
      }
      return false;
    },
    getOldValue(item_key) {
      var value = null;
      item_key.split(".").forEach(key => {
        value = value ? value[key] : this.existingForm[key];
      });
      return value;
    }
  }
};
</script>

<style>
.selected-row {
  color: gray;
  background: gray;
}
</style>
