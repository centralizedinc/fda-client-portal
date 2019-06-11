<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card>
                <v-card-text>
                    <v-switch label="Allow Notification" v-model="allow_notif" @change="dialog=true"></v-switch>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-dialog
            v-model="dialog" persistent
            max-width="500px"
            transition="dialog-transition">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card>
                        <v-card-text>
                            By clicking continue, you will{{allow_notif ? '': ' NOT'}} going to receive notifications.
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="error" flat @click="init">Cancel</v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" flat @click="subscribe">Continue</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
  data() {
    return {
      allow_notif: false,
      show_dialog: true,
      dialog: false
    };
  },
  watch: {
    // allow_notif(val) {
    //   console.log("watch");
    //   if (this.show_dialog) this.dialog = true;
    // }
    // dialog(val) {
    //   if (val) {
    //     this.temp_allow_notif = this.allow_notif;
    //   } else {
    //     this.allow_notif = this.temp_allow_notif;
    //   }
    // }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log("isSubscribed :", window.fda_pwa.isSubscribed);
      this.allow_notif = window.fda_pwa.isSubscribed;
      this.dialog = false;
      // this.temp_allow_notif = window.fda_pwa.isSubscribed;
    },
    subscribe() {
      console.log("allow :", this.allow_notif);
      window.fda_pwa
        .setSubscription(
          this.$store.state.user_session.user._id,
          this.allow_notif
        )
        .then(result => {
          if (this.allow_notif) window.fda_pwa.sendWelcomeNofitication();
          this.init();
        })
        .catch(err => this.init());
    }
  }
};
</script>

<style>
</style>
