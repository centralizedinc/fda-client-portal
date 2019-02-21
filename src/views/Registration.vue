<template>
  <v-layout row wrap>
    <v-flex xs12 md3 pa-2>
      <v-toolbar
        dark
        color="primary"
        style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
      >
        <span class="subheading font-weight-light">Steps 1</span>
        <v-spacer></v-spacer>
        <v-btn flat icon>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-stepper v-model="step_curr" vertical>
        <v-stepper-step step="1">Company Details</v-stepper-step>
        <v-stepper-content step="1"></v-stepper-content>

        <v-stepper-step step="2">Office Address</v-stepper-step>
        <v-stepper-content step="2"></v-stepper-content>

        <v-stepper-step step="3">Authorized Personnel</v-stepper-step>
        <v-stepper-content step="3"></v-stepper-content>

        <v-stepper-step step="4">Identity Proof</v-stepper-step>
        <v-stepper-content step="4"></v-stepper-content>

        <v-stepper-step step="5">Account Details</v-stepper-step>
        <v-stepper-content step="5"></v-stepper-content>
      </v-stepper>
    </v-flex>
    <v-flex xs12 md6 pa-2>
      <!-- Step 1 -->
      <v-card>
        <v-toolbar
          dark
          color="primary"
          style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
        >
          <span class="subheading font-weight-normal">{{steps_headers[step_curr-1]}}</span>
        </v-toolbar>
        <v-progress-linear
          color="warning"
          :indeterminate="false"
          :value="progress"
          class="ma-0"
          height="5"
        ></v-progress-linear>
        <v-card-text>
          <!-- <transition name="fade"> -->
          <v-form v-if="step_curr===1" key="step1">
            <v-text-field
              class="subheading font-weight-light"
              outline
              name="name"
              label="Name of Establishment"
              v-model="account.company.name"
              id="name"
            ></v-text-field>
            <v-text-field
              class="font-weight-light"
              outline
              name="owner"
              label="Establishment Owner"
              v-model="account.company.owner"
              id="owner"
            ></v-text-field>
            <v-text-field
              class="font-weight-light"
              outline
              name="tin"
              label="TIN"
              v-model="account.company.tin"
              mask="###-###-###-###"
              id="tin"
              counter="12"
            ></v-text-field>
          </v-form>

          <v-form v-if="step_curr===2" key="step2">
            <v-textarea
              class="font-weight-light"
              outline
              name="add"
              label="Address"
              v-model="account.company.address.address"
              id="add"
            ></v-textarea>

            <v-select
              class="font-weight-light"
              outline
              :items="items"
              name="region"
              label="Region"
              v-model="account.company.address.region"
              id="region"
            ></v-select>
            <v-select
              class="font-weight-light"
              outline
              name="province"
              label="Province"
              v-model="account.company.address.province"
              id="province"
            ></v-select>
            <v-select
              class="font-weight-light"
              outline
              name="city"
              label="City/Town"
              v-model="account.company.address.city"
              id="city"
            ></v-select>
            <v-text-field
              class="font-weight-light"
              outline
              name="zip"
              label="Zip Code"
              v-model="account.company.address.zipCode"
              id="zip"
            ></v-text-field>
          </v-form>

          <v-form v-else-if="step_curr===3" key="step3">
            <v-layout row wrap>
              <v-flex xs12 md4 pa-1>
                <v-text-field
                  class="font-weight-light"
                  outline
                  name="last"
                  label="Last Name"
                  v-model="account.name.last"
                  id="last"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4 pa-1>
                <v-text-field
                  class="font-weight-light"
                  outline
                  name="first"
                  label="First Name"
                  v-model="account.name.first"
                  id="first"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4 pa-1>
                <v-text-field
                  class="font-weight-light"
                  outline
                  name="mid"
                  label="Middle Name"
                  v-model="account.name.middle"
                  id="mid"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-select
              class="font-weight-light"
              outline
              name="position"
              label="Designation"
              v-model="account.position"
              id="position"
            ></v-select>
            <v-text-field
              class="font-weight-light"
              outline
              name="tin"
              label="TIN"
              v-model="account.tin"
              id="tin"
              mask="###-###-###-###"
              counter="12"
            ></v-text-field>
            <v-text-field
              class="font-weight-light"
              outline
              name="email"
              label="Email Address"
              v-model="account.email"
              id="email"
            ></v-text-field>
            <v-layout row wrap>
              <v-flex xs12 md6 pa-1>
                <v-text-field
                  class="font-weight-light"
                  outline
                  name="phone"
                  label="Phone Number"
                  v-model="account.contact.phone"
                  id="phone"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6 pa-1>
                <v-text-field
                  class="font-weight-light"
                  outline
                  name="mobile"
                  label="Mobile Number"
                  v-model="account.contact.mobile"
                  id="mobile"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>

          <v-form v-else-if="step_curr===4" key="step4">
            <v-select class="font-weight-light" outline label="Government ID"></v-select>
            <v-text-field class="font-weight-light" outline label="ID Number"></v-text-field>
            <v-text-field
              class="font-weight-light"
              outline
              label="Expiry Date"
              placeholder="mm/dd/yyyy"
            ></v-text-field>
          </v-form>

          <v-form v-else-if="step_curr===5" key="step5">
            <v-layout row wrap>
              <v-flex xs12 md4 class="text-md-center" pa-2 mt-3>
                <v-avatar size="120">
                  <img :src="avatar_link" alt="alt">
                </v-avatar>
                <v-btn color="primary" outline small>Change</v-btn>
              </v-flex>
              <v-flex xs12 md8>
                <v-text-field
                  class="font-weight-light"
                  outline
                  label="Username/Email"
                  v-model="account.username"
                ></v-text-field>
                <v-text-field
                  outline
                  name="name"
                  label="Password"
                  v-model="account.password"
                  :append-icon="visible_pass ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (visible_pass = !visible_pass)"
                  :type="visible_pass ? 'password' : 'text'"
                ></v-text-field>
                <v-text-field
                  outline
                  name="name"
                  label="Confirm Passowrd"
                  :append-icon="visible_conf_pass ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (visible_conf_pass = !visible_conf_pass)"
                  :type="visible_conf_pass ? 'password' : 'text'"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <!-- <vue-recaptcha sitekey="6LfrdI0UAAAAANxiZliLI7Gtv7j1QjOXCZcX2EfJ">                            
            </vue-recaptcha>-->
          </v-form>
          <!-- </transition> -->
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" outline @click="back">Back</v-btn>
          <v-btn color="primary" :loading="loading" @click.native="next">Next</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs12 md3 pa-2>
      <v-card>
        <v-toolbar color="fdaOrange">
          <span class="subheading font-weight-light">Help</span>
          <v-spacer></v-spacer>
          <v-btn flat icon>
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <p>Provide us the Establishment Details</p>
          <p>Avoid using numbers on Establishment Owner Field</p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
// import * as schema from 'fda-data-models'
import * as md5 from "@/plugins/md5";
export default {
  components: { VueRecaptcha },
  data() {
    return {
      loading: false,
      account: {
        company: {
          address: {}
        },
        name: {},
        contact: {}
      },
      step_curr: 1,
      progress: 0,
      steps_headers: [
        "Company Details",
        "Office Address",
        "Authorized Personnel",
        "Identity Proof",
        "Account Details"
      ],
      avatar: "",
      visible_pass: true,
      visible_conf_pass: true
    };
  },
  next() {
    if (this.step_curr < 5) {
      this.step_curr++;
      this.progress = this.progress + 20;
      this.$notify({
        message: "this is a sample notification" + this.step_curr
      });
    } else {
      this.submit();
    }
  },
  methods: {
    init() {
      //set default avatar
      this.avatar = md5(Math.floor(Math.random() * 100) + "@gmail.com");
    },
    next() {
      if (this.step_curr < 5) {
        this.step_curr++;
        this.progress = this.progress + 20;
      } else {
        this.submit();
      }
    },
    back() {
      if (this.step_curr > 1) {
        this.step_curr--;
        this.progress = this.progress - 20;
      }
    },
    submit() {
      this.loading = true;
      this.$store
        .dispatch("REGISTER", this.account)
        .then(res => {
          this.loading = false;
          this.$notify({
            message: "Registration Successful",
            color: "primary"
          });
          this.$router.push("/");
        })
        .catch(err => {
          this.loading = false;
          this.$notifyError(err);
        });
    }
  },
  computed: {
    avatar_link() {
      if (this.account.email) {
        this.avatar = md5(this.account.email);
      }
      var link =
        "https://www.gravatar.com/avatar/" + this.avatar + "?d=retro&s=100";
      return link;
    }
  },
  watch: {
    "account.email": function(val, oldVal) {
      this.account.username = val;
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transition: opacity 0.5s;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
