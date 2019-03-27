<template>
  <v-container grid-list-md text-xs-left>
    <v-layout row wrap v-if="success_confirm">
      <v-flex xs6>
        <v-card class="tCard pa-3 elevation-10">
          <v-card-title primary-title>
            <v-flex xs12>
              <span class="display-2 font-weight-bold">Forgot Password?</span>
            </v-flex>
          </v-card-title>
          <v-card-text>
            <v-flex xs12>
              <span
                class="headline font-weight-light"
              >Hi {{account.username }}! Dont worry, we will help you get a new one.</span>
            </v-flex>
            <v-flex xs12>
              <ul>
                <li
                  class="subheading font-weight-thin pa-2"
                >To complete the password reset process, enter the new password in both fields.</li>
                <li
                  class="subheading font-weight-thin pa-2"
                >Make sure that the entered passwords match. Once you have successfully reset your password, login with your username and new password</li>
              </ul>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 pa-2>
        <!-- <v-layout align-center justify-center> -->
        <!-- <v-flex xs6> -->
        <v-form @submit.prevent="changePassword()">
          <v-card>
            <v-toolbar
              dark
              color="success"
              style="background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%); box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5)"
            >
              <span class="font-weight-light title">New Password</span>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <v-text-field
                class="mt-4"
                outline
                name="name"
                label="Enter your new password"
                :append-icon="value ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (value = !value)"
                :type="value ? 'password' : 'text'"
                v-model="account.password"
              ></v-text-field>
              <v-text-field
                outline
                name="name"
                label="Confirm your password"
                :append-icon="value2 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (value2 = !value2)"
                :type="value2 ? 'password' : 'text'"
                v-model="confirm"
              ></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit" :loader="loading">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
        <!-- </v-flex> -->
        <!-- </v-layout> -->
      </v-flex>
    </v-layout>

    <v-layout row wrap v-else>
      <v-card class="tCard">
        <v-flex xs12 pa-4>
          <span class="display-2 font-weight-bold">Sorry!</span>
        </v-flex>
        <v-flex xs12 pa-4>
          <span
            class="headline font-weight-thin"
          >We cannot proceed in recovering your account this time. It's seems that the confirmation email is already expired.</span>
        </v-flex>
        <v-flex xs12 pa-4>
          <v-btn class="font-weight-light" color="primary" @click="home()">Home</v-btn>
        </v-flex>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      success_confirm: true,
      account_name: "",
      email: "",
      account: "",
      value: true,
      value2: true,
      confirm: "",
      loading: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("LOGOUT");
      this.$store
        .dispatch("CONFIRM_ACCOUNT_RECOVERY", this.$route.query.key)
        .then(result => {
          this.account = result;
          this.success_confirm = true;
        })
        .catch(err => {
          this.success_confirm = false;
        });
    },
    home() {
      this.$router.push("/");
    },
    changePassword() {
      this.loading = true;
      this.$store
        .dispatch("CHANGE_PASSWORD", this.account)
        .then(result => {
          console.log("RESULT: " + JSON.stringify(result));
          this.loading = false;
          this.$notify({
            message: "You have successfully changed your password!",
            color: "success",
            icon: "check_outline"
          });
          this.$router.push("/");
        })
        .catch(error => {
          this.loading = false;
          console.log("ERROR: " + JSON.stringify(error));
          this.$notify({
            message: "Oops! Something went wrong. Please try again.",
            color: "error",
            icon: "error_outline"
          });
        });
    }
  }
};
</script>

<style>
.tCard {
  background-color: transparent !important;
  box-shadow: none !important;
}
</style>
