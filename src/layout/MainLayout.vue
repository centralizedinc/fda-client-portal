<template>
  <v-app>
    <v-parallax src="https://i.postimg.cc/XYmyNYy9/FDASlider1-1920x675.png" height="850">
      <!-- <v-toolbar dark style="background: linear-gradient(45deg, #104b2a 0%, #b5c25a 100%)"></v-toolbar> -->
      <v-container fluid>
        <router-view></router-view>
      </v-container>
      <v-footer dark style="background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%)"></v-footer>
    </v-parallax>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
</style>
