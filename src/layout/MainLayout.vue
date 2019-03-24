<template>
  <v-app>
    <notification></notification>
    <v-toolbar dark style="background: linear-gradient(45deg, #104b2a 0%, #b5c25a 100%)">{{title}}</v-toolbar>
    <v-container fluid class="bg">
      <router-view></router-view>
    </v-container>
    <v-footer dark style="background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%)">
      <span class="caption">Copyright © 2019 FDA All rights reserved. v.{{app_version}}</span>
      <v-spacer></v-spacer>
      <span class="caption">Food And Drug Administration of the Philippines</span>
    </v-footer>
  </v-app>
</template>

<script>
import notification from "@/components/Notification";
export default {
  components: { notification },
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
