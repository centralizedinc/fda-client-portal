<template>
  <v-app>
    <notification></notification>
    <credit-card></credit-card>
    <v-toolbar scroll-off-screen app dark style="background: linear-gradient(45deg, #104b2a 0%, #b5c25a 100%)">
      <!-- <span class="body-1">FDA Portal v3.0</span>   -->
      <v-spacer></v-spacer>
      <v-btn flat @click="$router.push('/')">HOME</v-btn>  
      <v-btn flat @click="$router.push('/')">LOGIN</v-btn>
       <v-btn outline @click="$vuetify.goTo('#signup')">SIGN-UP</v-btn>  
      </v-toolbar>
    <v-container fluid class="bg">
      <router-view></router-view>
    </v-container>
    <v-footer app dark style="background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%)">
      <span class="caption pa-2">Copyright © 2019 FDA All rights reserved. v.{{app_version}}</span>
      <v-spacer></v-spacer>
      <span class="caption pa-2">Food And Drug Administration of the Philippines</span>
    </v-footer>
  </v-app>
</template>

<script>
import notification from "@/components/Notification";
import creditCard from "@/components/CreditCardDialog"
export default {
  components: { notification,creditCard },
  data() {
    return {
      title: ""
    };
  },
  created() {},
  methods: {},
  computed: {
    app_version() {
      return process.env.VUE_APP_VERSION;
    }
  }
};
</script>

<style>
.bg {
  /* The image used */
  background-image: url("https://i.postimg.cc/DfcXBGkW/bg.png");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
