<template>
  <v-layout row wrap>
    <v-dialog v-model="show" max-width="1000px" transition="dialog-transition">
      <v-card>
        <v-toolbar
          color="primary"
          style="background: linear-gradient(45deg, #f58555 0%, #b5c25a 100%); box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5)"
        >
          <span class="font-weight-light title">Application Overview</span>
        </v-toolbar>
        <!-- <v-card-title primary-title class="headline">Application Overview</v-card-title> -->
        <v-card-text>
          <v-layout align-center>
            <v-item-group v-model="window" class="shrink mr-4" mandatory tag="v-flex">
              <v-item v-for="n in length" :key="n">
                <div slot-scope="{ active, toggle }">
                  <v-btn :input-value="active" icon @click="toggle">
                    <v-icon>mdi-record</v-icon>
                  </v-btn>
                </div>
              </v-item>
            </v-item-group>

            <v-flex>
              <v-window v-model="window" class="elevation-1" vertical>
                <v-window-item v-for="n in length" :key="n">
                  <v-card flat>
                    <v-card-text>
                      <v-layout align-center mb-3>
                        <v-avatar color="grey" class="mr-3"></v-avatar>
                        <strong class="title">Title {{ n }}</strong>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                          <v-icon>mdi-account</v-icon>
                        </v-btn>
                      </v-layout>

                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </v-card-text>
                  </v-card>
                </v-window-item>
              </v-window>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="error" @click="$emit('close')">Close</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    form: {},
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data: () => ({
    length: 3,
    window: 0
  })
};
</script>

<style>
</style>
