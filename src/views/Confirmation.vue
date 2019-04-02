<template>
  <v-layout row wrap v-if="success_confirm">
    <v-flex xs12 pa-4>
      <span class="display-2 font-weight-bold">Congratulations!</span>
    </v-flex>
    <v-flex xs12 pa-4>
      <span class="headline font-weight-thin">
        Your account
        <b>({{account_name}})</b> is already confirmed. Please wait while we process your application.
      </span>
    </v-flex>
    <v-flex xs12 pa-4>
      <span class="headline font-weight-thin">
        Account Approval will take 1-2 working days. Expect an email in
        <b>{{email}}</b> notifying you of the activation status.
      </span>
    </v-flex>
    <v-flex xs12 pa-4>
      <v-btn class="font-weight-light" color="fdaGreen" @click="home">Login</v-btn>
    </v-flex>
  </v-layout>
  <v-layout row wrap v-else>
    <v-flex xs12 pa-4>
      <span class="display-2 font-weight-bold">Sorry!</span>
    </v-flex>
    <v-flex xs12 pa-4>
      <span
        class="headline font-weight-thin"
      >Could not verify your account. It's seems that the confirmation email is already expired.</span>
    </v-flex>
    <v-flex xs12 pa-4>
      <v-btn class="font-weight-light" color="primary" @click="resend">Re-send Confirmation</v-btn>
    </v-flex>
    <v-dialog v-model="dialog" persistent max-width="300px" transition="dialog-transition">
      <v-card>
        <v-toolbar dark color="primary" style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
          <span class="title font-weight-light">Confirmation</span>
        </v-toolbar>
        <v-card-text>
          <span class="font-weight-thin">Confirmation already sent to your email.</span>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="home()">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      success_confirm: false,
      account_name: "",
      email: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store
        .dispatch("CONFIRM", this.$route.query.key)
        .then(res => {
          this.account_name = res.username;
          this.email = res.email;
          this.success_confirm = true;
        })
        .catch(err => {
          console.log(err);
          this.success_false = false;
        });
    },
    home() {
      this.$router.push("/");
    },
    resend() {
      this.dialog = true;
    }
  }
};
</script>

<style>
</style>
