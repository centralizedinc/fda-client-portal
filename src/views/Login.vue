<template>
<<<<<<< HEAD
    <v-layout align-center justify-center>
        <v-flex xs4 pa-2 mt-4>
            <v-card pa-5>
                <v-toolbar color = 'primary' dark>
                    <!-- dark style='background: linear-gradient(45deg, #43A047 0%, #1de9b6 100%)' -->
                    <span class='font-weight-light title'>Login</span>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text transparent>
                    <v-text-field
                        name="name"
                        label="Email/Username"
                        id="id"
                    ></v-text-field>
                    <v-text-field
                        name="name"
                        label="Enter your password"
                        hint="At least 8 characters"
                        min="8"
                        :append-icon="value ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (value = !value)"
                        value="Password"
                        :rules="() => ('The email and password you entered don\'t match')"
                        
                        :type="value ? 'password' : 'text'"
                    ></v-text-field>
                    <v-divider></v-divider>
                    <v-card-actions transparent>                        
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login" class="caption font-weight-light">Login</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
    
=======
  <v-layout align-center justify-center>
    <v-flex xs4 pa-2 mt-4>
      <v-card pa-5>
        <v-toolbar
          color="fdaGold"
          style="background: linear-gradient(45deg, #104b2a 0%, #b5c25a 100%"
        >
          <span class="font-weight-light title">Login</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text transparent>
          <v-text-field name="name" label="Email/Username" id="id"></v-text-field>
          <v-text-field
            name="name"
            label="Enter your password"
            hint="At least 8 characters"
            min="8"
            :append-icon="value ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (value = !value)"
            value="Password"
            :rules="[() => ('The email and password you entered don\'t match')]"
            error
            :type="value ? 'password' : 'text'"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions transparent>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="login" class="caption font-weight-light">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
>>>>>>> 42375a1b8e21eb5f7c780619a36cb8bd8a952af8
</template>

<script>
export default {
  methods: {
    login() {
      this.$store.commit("API_INSTANCE", "my_sample_api_token");
      this.$router.push("/app");
    }
  }
};
</script>

<style>
</style>
