<template>
  <v-layout row wrap>
 <v-toolbar dark flat color="primary" class="elevation-5">            <span class="title font-weight-light">Personnel List</span>
            <v-spacer></v-spacer>
            <v-tooltip top>
                <v-btn slot="activator" @click="addItem" fab outline small icon >
                <v-icon>edit</v-icon> 
            </v-btn>Add Personnel
            </v-tooltip>
           
        </v-toolbar>
    <v-flex xs12>
    </v-flex>

    <v-dialog
      v-model="addToListDialog" 
      scrollable 
            persistent
            max-width="600px"
            transition="dialog-transition"
    >
    
     <v-card>
      <v-toolbar dark color="primary">
        <span class="title font-weight-light">New Personnel</span>
        <v-spacer></v-spacer>
        <v-btn flat icon @click="addToListDialog=false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
     
        <v-card-text>
          <v-form ref="vform" v-model="isValid">
            <v-layout row wrap>
              <v-flex xs12 pa-2>
            <v-autocomplete
              color="green darken-1"
              :rules="[rules.required]"
              v-model="qualified.designation"
              :items="designations"
              item-text="name"
              item-value="_id"
              hide-no-data
              hide-selected
              label="Designation"
            ></v-autocomplete>
          </v-flex>
            <v-flex xs12 md4 pa-2>
              <v-text-field
                color="green darken-1"
                label="Last Name"
                :rules="[rules.required]"
                v-model="qualified.lastname"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md4 pa-2>
              <v-text-field
                color="green darken-1"
                label="First Name"
                :rules="[rules.required]"
                v-model="qualified.firstname"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md4 pa-2>
              <v-text-field
                color="green darken-1"
                label="Middle Name"
                :rules="[rules.required]"
                v-model="qualified.middlename"
              ></v-text-field>
            </v-flex>
           
          <v-flex xs12 md4 pa-2>
            <v-text-field
              color="green darken-1"
              label="Email"
              :rules="[rules.required]"
              v-model="qualified.email"
            ></v-text-field>
          </v-flex>         
          <v-flex xs12 md4 pa-2>
            <v-text-field
              color="green darken-1"
              label="TIN"
              :rules="[rules.required]"
              v-model="qualified.tin"
              :mask="tin"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4 pa-2>
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px">
              <v-text-field
                color="green darken-1"
                slot="activator"
                v-model="qualified.birthday"
                label="Birthday"
                append-icon="event"
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

          <!-- Government Issued Identification -->
          <!-- <v-flex xs12>
            <v-card-title primary-title class="headline">Government Issued Identification</v-card-title>
          </v-flex> -->
          <v-flex xs12 md4 pa-2>
            <v-autocomplete
              color="green darken-1"
              :rules="[rules.required]"
              v-model="qualified.id_type"
              :items="id_types"
              item-text="name"
              item-value="_id"
              hide-no-data
              hide-selected
              label="ID Type"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12 md4 pa-2>
            <v-text-field
              color="green darken-1"
              label="ID Number"
              :rules="[rules.required]"
              v-model="qualified.id_no"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4 pa-2>
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
                color="primary"
                slot="activator"
                v-model="qualified.id_expiry"
                :rules="[rules.required]"
                label="Expiry"
                append-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker
                no-title
                scrollable
                color="primary"
                v-model="qualified.id_expiry"
              >
                <v-spacer></v-spacer>
                <v-btn  color="primary" outline @click="menu2 = false">Cancel</v-btn>
                <v-btn  color="success" @click="$refs.menu2.save(qualified.id_expiry)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
          </v-form>
          
        </v-card-text>
        <v-divider></v-divider>
        
        <v-card-actions v-if="mode">
          <v-spacer></v-spacer>
          <v-btn outline color="error" @click="deleteItem()">DELETE</v-btn>
          <v-btn color="primary" @click="addToListDialog=false">EDIT</v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-spacer></v-spacer>
          <v-btn outline color="primary" @click="addToListDialog=false">Cancel</v-btn>
          <v-btn color="success" @click="submit">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- <qualified-personnel-list
      :show="addToListDialog"
      @submit="submit"
      @cancel="addToListDialog=false"
      title="Qualified Personnel"
    >
      <template slot="content">
        
      </template>
    </qualified-personnel-list> -->

    <v-layout row wrap>
      <v-flex xs12>
        <v-data-table :headers="headers" :items="form.qualified" hide-actions class="elevation-1">
          <template slot="items" slot-scope="props">
            <tr @click="editItem(props.item, props.index)">
              <td>{{props.item.firstname + " " + props.item.lastname}}</td>
              <td>{{getDesignation(props.item.designation).name}}</td>
              <td>{{props.item.birthday}}</td>
              <td>{{props.item.tin}}</td>
              <td>{{getIdType(props.item.id_type).name}}</td>
              <td>{{props.item.id_no}}</td>
            </tr>
            <!-- <td>
              <v-layout row wrap>
                <v-flex xs6 pa-1>
                  <v-tooltip top>
                    <v-btn
                      slot="activator"
                      flat
                      icon
                      color="primary"
                      @click="editItem(props.item, props.index)"
                    >
                      <v-icon color="primary" small>edit</v-icon>
                    </v-btn>Edit item
                  </v-tooltip>
                </v-flex>
                <v-flex xs6 pa-1>
                  <v-tooltip top>
                    <v-btn
                      slot="activator"
                      flat
                      icon
                      color="primary"
                      @click="deleteItem(props.index)"
                    >
                      <v-icon color="primary" small>fas fa-trash-alt</v-icon>
                    </v-btn>Delete item
                  </v-tooltip>
                </v-flex>
              </v-layout>
            </td> -->
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  props: ["form"],
  data: () => ({
    index: null,
    isValid: true,
    mode: 0,
    addToListDialog: false,
    menu: null,
    menu2: null,
    tin: "###-###-###-###",
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
  created() {
    this.init();
  },
  computed: {
    id_types() {
      return this.$store.state.references.id_types;
    },
    designations() {
      var datas = this.$store.state.references.designations;
      if (datas) return datas.filter(x => x.type === 1);
      else return [];
    }
  },
  methods: {
    init() {
      // load ID TYPES and DESIGNATIONS
      this.$store.dispatch("GET_REFERENCES");
    },
    submit() {
      this.$refs.vform.validate();
      if (this.isValid) {
        if (this.mode === 0) {
          //CREATE
          this.form.qualified.push(this.qualified);
        } else if (this.mode === 1) {
          //EDIT
          this.form.qualified[this.selected_index] = this.qualified;
        }
        this.clearForm();
      } else {
        this.$notifyError([{ message: "Fill-up required fields" }]);
      }
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
    deleteItem() {
      if (confirm("Are you sure you want to delete this item?")) {
        this.form.qualified.splice(this.selected_index, 1);
      }
      this.addToListDialog = false;
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
      this.isValid = true;
      this.addToListDialog = true;
    },
    validate() {
      return this.form.qualified && this.form.qualified.length > 0;
    }
  }
};
</script>

<style>
.tStyle {
  background: linear-gradient(45deg, #104b2a 0%, #b5c25a 100%);
}
</style>
