<template>
  <v-layout row wrap>
    <v-spacer></v-spacer>
    <v-btn
      color="success"
      class="font-weight-light"
      @click="addToListDialog=true"
    >Add Qualified Person to List</v-btn>
    <v-spacer></v-spacer>
    <v-flex xs12 p1-2>
        <qualified-personnel-list
          :show="addToListDialog"
          @cancel="clearForm"
          @add="add"
          title="Qualified Personnel"
        >
          <template slot="content">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field color="green darken-1" label="Last Name" v-model="qualified.lastname"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  color="green darken-1"
                  label="First Name"
                  v-model="qualified.firstname"
                ></v-text-field>
                <v-flex xs12>
                  <v-text-field
                    color="green darken-1"
                    label="Middle Name"
                    v-model="qualified.middlename"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    color="green darken-1"
                    v-model="qualified.designation"
                    :items="designation"
                    hide-no-data
                    hide-selected
                    label="Designation"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12>
                  <v-menu
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
                      color="green darken-1"
                      v-model="qualified.birthday"
                      @input="$refs.menu.save(qualified.birthday)"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    color="green darken-1"
                    label="Email Address"
                    v-model="qualified.email"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field color="green darken-1" label="TIN Number" v-model="qualified.tin"></v-text-field>
                </v-flex>
                <!-- Government Issued Identification -->
                <v-flex xs12>
                  <v-card-title primary-title class="headline">Government Issued Identification</v-card-title>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    color="green darken-1"
                    v-model="qualified.id_type"
                    :items="id_type"
                    hide-no-data
                    hide-selected
                    label="ID Type"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12>
                  <v-text-field color="green darken-1" label="ID Number" v-model="qualified.id_no"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-menu
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
                      label="Expiry"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker
                      color="green darken-1"
                      v-model="qualified.id_expiry"
                      @input="$refs.menu.save(qualified.id_expiry)"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-flex>
            </v-layout>
          </template>
        </qualified-personnel-list>
        <v-data-table
          :headers="headers"
          :items="warehouseList"
          hide-actions
          class="elevation-1"
          pagination.sync="pagination"
          item-key="id"
          loading="true"
          search="search"
        >
          <template slot="items" slot-scope>
            <td>props.item.firstname + "" +item.lastname}}</td>
            <td>props.item.designation}}</td>
            <td>props.item.birthdate}}</td>
            <td>props.item.id_type}}</td>
            <td>props.item.tin}}</td>
            <td>props.item.id_no}}</td>
            <td>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-tooltip top>
                    <v-btn slot="activator" flat icon color="primary">
                      <v-icon small>edit</v-icon>
                    </v-btn>Edit item
                  </v-tooltip>
                </v-flex>
              </v-layout>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {
    QualifiedPersonnelList: () => import("./AddToListDialog.vue")
  },
  props: ["form"],
  data: () => ({
    addToListDialog: false,
    menu: null,
    menu2: null,
    designation: [],
    id_type: [],
    qualified: {
      lastname: "",
      firstname: "",
      middlename: "",
      designation: "",
      birthday: "",
      tin: "",
      id_type: "",
      id_no: "",
      id_expiry: ""
    },
    headers: [
      {
        text: "Name",
        value: ""
      },
      {
        text: "Designation",
        value: ""
      },
      {
        text: "Birthdate",
        value: ""
      },
      {
        text: "TIN",
        value: ""
      },
      {
        text: "Government ID",
        value: ""
      },
      {
        text: "ID Number",
        value: ""
      },
      {
        text: "Actions",
        value: ""
      }
    ]
  }),
  methods: {
    add() {
      this.form.qualified_personnel.push(this.qualified);
      this.clearForm();
    },
    clearForm() {
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
    editItem() {}
  }
};
</script>

<style>
</style>
