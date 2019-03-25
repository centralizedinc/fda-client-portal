<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-tooltip top>
        <v-btn
          class="mt-0"
          color="transparent"
          slot="activator"
          large
          block
          @click="addItem()"
          style="box-shadow: none !important"
        >
          <v-icon color="success">fas fa-plus fa-3x</v-icon>
        </v-btn>Add Qualified Person to List
      </v-tooltip>
    </v-flex>

    <qualified-personnel-list
      :show="addToListDialog"
      @submit="submit"
      @cancel="addToListDialog=false"
      title="Qualified Personnel"
    >
      <template slot="content">
        <v-layout row wrap>
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
        </v-layout>
      </template>
    </qualified-personnel-list>

    <v-layout row wrap>
      <v-flex xs12>
        <v-data-table :headers="headers" :items="form.qualified" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{props.item.firstname + " " + props.item.lastname}}</td>
            <td>{{props.item.designation}}</td>
            <td>{{props.item.birthday}}</td>
            <td>{{props.item.tin}}</td>
            <td>{{props.item.id_type}}</td>
            <td>{{props.item.id_no}}</td>
            <td>
              <v-layout row wrap>
                <v-flex xs3>
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
                </v-flex>
                <v-flex xs3>
                  <v-tooltip top>
                    <v-btn
                      slot="activator"
                      flat
                      icon
                      color="primary"
                      @click="deleteItem(props.index)"
                    >
                      <v-icon color="error" small>fas fa-trash-alt</v-icon>
                    </v-btn>Delete item
                  </v-tooltip>
                </v-flex>
              </v-layout>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  components: {
    QualifiedPersonnelList: () => import("./AddToListDialog.vue")
  },
  props: ["form"],
  data: () => ({
    mode: 0,
    addToListDialog: false,
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
    selected_index: -1,
    qualified: {},
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
    addedPersonnel: [],

    rules: {
      required: value => !!value || "This field is required",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    addToListDialog(val) {
      if (!val) this.qualified = {};
    }
  },
  methods: {
    submit() {
      if (this.mode === 0) {
        //CREATE
        this.form.qualified.push(this.qualified);
      } else if (this.mode === 1) {
        //EDIT
        this.form.qualified[this.selected_index] = this.qualified;
      }
      this.clearForm();
    },
    clearForm() {
      this.selected_index = -1;
      this.qualified = {
        lastname: "",
        firstname: "",
        middlename: "",
        designation: "",
        birthday: "",
        tin: "",
        id_type: "",
        id_no: "",
        id_expiry: ""
      };
      this.addToListDialog = false;
    },
    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.form.qualified.splice(item, 1);
    },
    editItem(item, index) {
      this.mode = 1;
      this.selected_index = index;
      this.qualified = item;
      this.addToListDialog = true;
    },
    addItem() {
      this.mode = 0;
      this.qualified = {};
      this.addToListDialog = true;
    }
  }
};
</script>

<style>
</style>
