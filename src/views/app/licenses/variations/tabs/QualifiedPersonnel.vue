<template>
  <v-container grid-list-xl fluid fill-height>
    <v-layout row wrap child-flex>
      <v-card>
        <v-card-title class="headline">Qualified Personnel
          <v-spacer></v-spacer>
          <v-text-field
            label="Search"
            append-icon="search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="updatedForm.qualified"
          class="elevation-1"
          :loading="loading"
          :search="search"
        >
          <template slot="items" slot-scope="props">
            <td>{{props.item.firstname + " " + props.item.lastname}}</td>
            <td>{{getDesignation(props.item.designation).name}}</td>
            <td>{{props.item.birthday}}</td>
            <td>{{props.item.tin}}</td>
            <td>{{props.item.id_type}}</td>
            <td>{{props.item.id_no}}</td>
            <td>
              <v-tooltip top>
                <v-btn
                  slot="activator"
                  flat
                  icon
                  color="primary"
                  @click="editItem(props.item, props.index)"
                >
                  <v-icon color="success" small>edit</v-icon>
                </v-btn>Edit item
              </v-tooltip>
            </td>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </v-data-table>
      </v-card>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title class="headline">Edit Qualified Personnel</v-card-title>
        <v-card-text>
          <v-flex xs12>
            <v-text-field
              color="green darken-1"
              label="Last Name"
              :rules="[rules.required]"
              v-model="qualified.lastname"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              color="green darken-1"
              label="First Name"
              :rules="[rules.required]"
              v-model="qualified.firstname"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              color="green darken-1"
              label="Middle Name"
              :rules="[rules.required]"
              v-model="qualified.middlename"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              color="green darken-1"
              :rules="[rules.required]"
              v-model="qualified.designation"
              :items="designation"
              hide-no-data
              hide-selected
              label="Designation"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12>
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                color="green darken-1"
                slot="activator"
                v-model="qualified.birthday"
                label="Birthday"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker
                ref="picker"
                v-model="qualified.birthday"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @input="$refs.menu.save(qualified.birthday)"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              color="green darken-1"
              label="Tax Identification Number"
              :rules="[rules.required]"
              v-model="qualified.tin"
              :mask="tin"
            ></v-text-field>
          </v-flex>

          <!-- Government Issued Identification -->
          <v-flex xs12>
            <v-card-title primary-title class="headline">Government Issued Identification</v-card-title>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              color="green darken-1"
              :rules="[rules.required]"
              v-model="qualified.id_type"
              :items="id_type"
              hide-no-data
              hide-selected
              label="ID Type"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              color="green darken-1"
              label="ID Number"
              :rules="[rules.required]"
              v-model="qualified.id_no"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-menu
              ref="menu2"
              :close-on-content-click="false"
              v-model="menu2"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                color="green darken-1"
                slot="activator"
                v-model="qualified.id_expiry"
                :rules="[rules.required]"
                label="Expiry"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker
                no-title
                scrollable
                color="green darken-1"
                v-model="qualified.id_expiry"
              >
                <v-spacer></v-spacer>
                <v-btn flat color="secondary" outline @click="menu2 = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.menu2.save(qualified.id_expiry)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="clearItem">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: ["existingForm", "updatedForm"],
  data() {
    return {
      headers: [
        {
          text: "Name",
          value: "",
          sortable: false
        },
        {
          text: "Designation",
          value: "",
          sortable: false
        },
        {
          text: "Birthdate",
          value: "",
          sortable: false
        },
        {
          text: "TIN",
          value: "",
          sortable: false
        },
        {
          text: "Government ID",
          value: "",
          sortable: false
        },
        {
          text: "ID Number",
          value: "",
          sortable: false
        },
        {
          text: "Actions",
          value: "",
          sortable: false
        }
      ],
      menu: null,
      menu2: null,
      tin: "###-###-###-###",
      designation: [
        "Company Pharmacist",
        "Pharmacy Assistant",
        "Production Manager/Head",
        "Quality Assurance Manager/Head"
      ],
      id_type: [
        "Professional Regulatory Commission",
        "Social Security System",
        "Government Service Insurance System (GSIS)",
        "Commission on Elections (Voter's)",
        "Land Transportation Office (Driver's)",
        "Philippine Passport",
        "Bureau of Immigration (Alien Registration)"
      ],
      search: "",
      loading: false,
      selected_index: -1,
      dialog: false,
      qualified: {},
      rules: {
        required: value => !!value || "This field is required",
        emailRules: v =>
          ((!!v || "E-mail is required") &&
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)) ||
          "E-mail must be valid"
      }
    };
  },
  methods: {
    editItem(item, index) {
      this.selected_index = index;
      this.qualified = item;
      this.dialog = true;
    },
    submit() {
      this.updatedForm.estab_details.products[i] = this.product;
    },
    clearItem() {
      this.selected_index = -1;
      this.qualified = {};
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>
