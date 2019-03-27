<template>
  <div>
    <!-- <v-container grid-list-xl> -->
    <v-layout row wrap>
      <v-flex xs12 md3></v-flex>
      <v-flex xs12 md6>
        <v-card>
          <v-toolbar
            dark
            color="primary"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >
            <span class="title font-weight-thin">Change Password Request</span>
          </v-toolbar>
          <v-card-text>
            <v-layout row wrap>
              <span
                class="headline font-weight-light pa-2 mb-2"
              >Change your password in 3 easy steps. This will keep your new password secure</span>
              <ol>
                <li>Enter your current password and submit</li>
                <li>A link to change your password will be sent to your registered email address</li>
                <li>Check your email address and click the link provided</li>
              </ol>
              <v-divider class="mt-3"></v-divider>
              <v-flex xs12 class="mt-2 ml-1 subheading">Username: {{account.username}}</v-flex>
              <v-flex xs12 class="mt-2 ml-1 subheading">Email: {{maskEmail(account.email)}}</v-flex>
              <v-flex xs12 class="mt-2">
                <v-text-field
                  outline
                  @keypress.enter="dialog=true"
                  :append-icon="show_password ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required]"
                  :type="show_password ? 'text' : 'password'"
                  name="input-10-2"
                  label="Enter your Current Password"
                  @click:append="show_password = !show_password"
                  v-model="old_password"
                ></v-text-field>
              </v-flex>
              <!-- <span class="red--text ml-3">*</span>
              <i class="ml-3">
                Change Password Request
                <b>link</b> will be sent to your
                <b>registered email</b>.
              </i>-->
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <!-- <v-spacer></v-spacer> -->
            <v-btn block color="success" class="font-weight-light" @click="dialog=true">Submit</v-btn>
            <!-- <v-spacer></v-spacer> -->
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md3></v-flex>
    </v-layout>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-toolbar
          dark
          color="primary"
          style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
        >
          <span class="title font-weight-thin">Confirmation</span>
        </v-toolbar>
        <v-card-text
          class="title font-weight-thin"
        >Are you sure you want to change your password? This action cannot be undone.</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="error" outline @click="dialog=false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" :loading="loading" :disabled="loading" @click="submit">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- </v-container> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      account: {},
      old_password: "",
      show_password: "",
      dialog: false,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.account = this.$store.state.user_session.user;
      console.log("#### My account" + JSON.stringify(this.account));
    },
    isEmpty(str) {
      return !str || str === null || str === "";
    },
    maskEmail(email) {
      var masked_email = "";
      if (email && email.indexOf("@") !== -1) {
        var end_index = email.indexOf("@");
        masked_email = email.substring(0, 1);
        var i = email.substring(1, end_index - 1).length;
        while (i > 0) {
          masked_email += "*";
          i--;
        }
        masked_email += email.substring(end_index - 1, email.length);
      }
      return masked_email;
    },
    submit() {
      this.loading = true;
      if (!this.isEmpty(this.old_password)) {
        this.account.password = this.old_password;
        this.$store
          .dispatch("REQUEST_RESET_PASSWORD", this.old_password)
          .then(result => {
            console.log("result.data :", result.data);
            this.loading = false;
            this.dialog = false;
            if (result.data.success) {
              this.$notify({
                message: "Reset password request has been sent to your email.",
                color: "success",
                icon: "check_circle"
              });
              this.$store.dispatch("LOGOUT");
              this.$router.push("/");
            } else {
              this.$notifyError(result.data.errors);
            }
          })
          .catch(err => {
            this.dialog = false;
            this.loading = false;
            console.log(err);
            this.$notifyError(err);
          });
        // } else if (this.new_password !== this.confirm_password) {
        //   this.loading = false;
        //   this.$notify({
        //     message: "New password does not match the confirm password.",
        //     icon: "error_outline",
        //     color: "error"
        //   });
      } else {
        this.loading = false;
        this.dialog = false;
        this.$notify({
          message: "Please enter your old password.",
          icon: "error_outline",
          color: "error"
        });
      }
    }
  }
};
</script>

<style>
.title--header {
  background: linear-gradient(45deg, #104b2a 0%, #b5c25a 100%);
}
</style>