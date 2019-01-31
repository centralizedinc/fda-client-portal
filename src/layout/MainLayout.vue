<template>
  <v-app>
    <notification></notification>
    <!-- <v-parallax src="https://i.postimg.cc/XYmyNYy9/FDASlider1-1920x675.png" height="850"> -->
      <v-toolbar dark style="background: linear-gradient(45deg, #104b2a 0%, #b5c25a 100%)">
        {{title}}
      </v-toolbar>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
      <v-footer dark style="background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%)">
        <span class="caption">Copyright © 2019 FDA All rights reserved.</span>
      <v-spacer></v-spacer>
      <span class="caption">Food And Drugs Administration of the Philippines</span>
      </v-footer>
    <!-- </v-parallax> -->
  </v-app>
</template>

<script>
import notification from '@/components/Notification'
export default {
  components:{notification},
  data(){
    return{
      title:""
    }
  },
  created(){
    
  },
  methods:{

  }
};
</script>

<style>
</style>
