<template>
<div v-if="!loaded">
    <v-layout justify-center align-center fill-height>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-layout>
</div>
<div v-else>
<v-layout row wrap v-if="success_confirm" justify-center align-center>
    <v-flex xs8 mt-5>
      <v-flex xs8 pa-4>
        <span class="display-2 font-weight-bold">Congratulations!</span>
    </v-flex>
    <v-flex xs12 pa-4>
        <span class="headline font-weight-thin">
        Your account,
        <b>{{account_name}}</b> is already confirmed. Please wait while we process your application.
      </span>
    </v-flex>
    <v-flex xs12 pa-4>
        <span class="headline font-weight-thin">
        Account Approval will take 1-2 working days. Expect an email in
        <b>{{email}}</b> notifying you of the activation status.
      </span>
    </v-flex>
    <v-flex xs12 pa-4>
        <v-btn class="font-weight-light" color="primary" @click="home">Login</v-btn>
    </v-flex>
    </v-flex>
</v-layout>
<v-layout row wrap align-center justify-center v-else>
    <v-flex xs8 mt-5>
        <v-flex xs12 pa-4>
            <span class="display-2 font-weight-bold">Sorry!</span>
        </v-flex>
        <v-flex xs12 pa-4>
            <span
        class="headline font-weight-thin"
      >Could not verify your account. It's seems that the confirmation email is already expired.</span>
        </v-flex>
        <!-- <v-flex xs12 pa-4>
            <v-btn class="font-weight-light" color="primary" @click="resend">Re-send Confirmation</v-btn>
        </v-flex> -->
    </v-flex>

    <v-dialog v-model="dialog" persistent max-width="400px" transition="dialog-transition">
        <v-card>
            <v-toolbar dark color="primary" style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
                <span class="title font-weight-light">Confirmation</span>
            </v-toolbar>
            <v-card-text>
                <span class="font-weight-light subheading">Confirmation already sent to your email.</span>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="home()">Ok</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-layout>
</div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            success_confirm: false,
            account_name: "",
            email: "", 
            loaded:false,
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.$store
                .dispatch("CONFIRM", this.$route.query)
                .then(res => {
                    this.loaded = true;
                    this.account_name = res.username;
                    this.email = res.email;
                    this.success_confirm = true;
                })
                .catch(err => {
                    this.loaded = true;
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
