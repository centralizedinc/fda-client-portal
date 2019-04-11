<template>
  <v-container grid-list-xl>
    <v-layout row align-center justify-center>
      <v-flex xs6>
        <v-card v-if="valid">
          <v-card-title
            class="headline white--text font-weight-light"
            color="primary"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >Reset Password</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  outline
                  @keypress.enter="dialog=true"
                  :append-icon="new_password_show ? 'visibility_off' : 'visibility'"
                  :rules="[rules.required, rules.check_password]"
                  :type="new_password_show ? 'text' : 'password'"
                  name="new_password"
                  label="Enter your New Password"
                  @click:append="new_password_show = !new_password_show"
                  v-model="account.password"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  outline
                  @keypress.enter="dialog=true"
                  :append-icon="confirm_password_show ? 'visibility_off' : 'visibility'"
                  :rules="[rules.required, rules.match_password]"
                  :type="confirm_password_show ? 'text' : 'password'"
                  name="confirm_password"
                  label="Confirm Password"
                  @click:append="confirm_password_show = !confirm_password_show"
                  v-model="confirm_password"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              color="primary"
              :loading="loading"
              :disabled="loading"
              block
              @click="dialog=true"
            >Reset</v-btn>
          </v-card-actions>
        </v-card>
        <v-layout row wrap v-else>
          <v-flex xs12 pa-4>
            <span class="display-2 font-weight-bold">Sorry!</span>
          </v-flex>
          <v-flex xs12 pa-4>
            <span class="headline font-weight-light">It seems like your session has been expired</span>
          </v-flex>
          <v-flex xs12 pa-4>
            <v-btn class="font-weight-light" color="primary" @click="home()">Home</v-btn>
          </v-flex>
        </v-layout>
        <v-dialog v-model="dialog" width="270">
          <v-card>
            <v-toolbar
              dark
              color="primary"
              style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
            >
              <span class="title font-weight-light">Confirmation</span>
            </v-toolbar>
            <v-card-text
              class="title font-weight-light"
              @keypress.enter="reset"
            >Do you want to proceed?</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="secondary" outline @click="dialog=false">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" :loading="loading" :disabled="loading" @click="reset">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      account: {},
      valid: false,
      dialog: false,
      new_password_show: false,
      confirm_password: "",
      confirm_password_show: false,
      loading: false,
      rules: {
        required: v => !!v || "Required field"
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store
        .dispatch("CONFIRM_RESET_PASSWORD", this.$route.params.token)
        .then(result => {
          if (result.data.success) {
            console.log("this.account :", result.data.model);
            this.account = result.data.model;
            var _self = this;
            this.rules.match_password = v =>
              _self.account.password === _self.confirm_password ||
              "New password does not match the confirm password.";
            this.rules.check_password = v =>
              _self.checkPassword(v) ||
              "Password must be at least one number, one lowercase, one uppercase and at least six characters";
            this.valid = true;
          } else {
            this.valid = false;
          }
        })
        .catch(err => {
          console.log("### CONFIRM_RESET_PASSWORD err :", err);
          this.$notifyError(err);
        });
    },
    validate() {
      this.loading = true;
      if (this.isEmpty(this.account.password)) {
        this.loading = false;
        this.dialog = false;
        this.$notify({
          message: "New password is a required field",
          icon: "error_outline",
          color: "error"
        });
        return false;
      } else if (this.isEmpty(this.confirm_password)) {
        this.loading = false;
        this.dialog = false;
        this.$notify({
          message: "Confirm password is a required field",
          icon: "error_outline",
          color: "error"
        });
        return false;
      } else if (this.account.password !== this.confirm_password) {
        this.loading = false;
        this.dialog = false;
        this.$notify({
          message: "New password does not match the confirm password.",
          icon: "error_outline",
          color: "error"
        });
        return false;
      }
      return true;
    },
    reset() {
      this.loading = true;
      if (this.validate()) {
        this.$store
          .dispatch("RESET_PASSWORD", this.account)
          .then(result => {
            this.loading = false;
            if (result.data.success) {
              this.dialog = false;
              this.$notify({
                message: "Password successfully reset",
                color: "success",
                icon: "check_circle"
              });
              this.$router.push("/");
            } else {
              this.loading = false;
              this.dialog = false;
              this.$notifyError(result.data.errors);
            }
          })
          .catch(err => {
            this.loading = false;
            this.dialog = false;
            console.log("### RESET_PASSWORD err :", err);
            this.$notifyError(err);
          });
      }
    },
    home() {
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
