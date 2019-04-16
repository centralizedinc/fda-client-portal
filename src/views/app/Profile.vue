<template>
  <v-layout row wrap>
    <!-- Temporary -->

    <v-flex xs12 md6 offset-md3 pa-2>
      <v-card>
        <v-toolbar
          dark
          color="primary"
          style="background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%); box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5)"
        >
          <span class="title font-weight-thin">User Account</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-layout align-center justify-center pa-3>
          <v-hover>
            <v-avatar
              :color="random_color"
              slot-scope="{ hover }"
              class="elevation-5 chooseAvatar"
              size="150"
              @click="$refs.image.click()"
            >
              <v-img v-if="avatar" :src="avatar" alt="avatar">
                <v-expand-transition>
                  <div v-if="hover" class="transition-fast-in-fast-out green darken-4 body-1 v-card--reveal white--text">                    
                    Change<br>Avatar
                  </div>
                </v-expand-transition>
              </v-img>
              <span v-else class="white--text display-1">{{alias}}</span>              
              <input
                type="file"
                name="avatar"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
              >
            </v-avatar>
          </v-hover>
        </v-layout>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field label="First Name" outline v-model="account.name.first"></v-text-field>
              <v-text-field label="Last Name" outline v-model="account.name.last"></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>

    <!-- <v-flex xs12 md4 pa-2>
            <v-card>
                <v-toolbar dark color="primary" style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
                    <span class="title font-weight-light">Company Details</span>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-text-field label="Name of Establishment" :disabled="true"></v-text-field>
                    <v-text-field label="Establishment Owner"></v-text-field>
                    <v-text-field label="TIN" mask="###-###-###-###"></v-text-field>
                    <v-textarea label="Office Address"></v-textarea>
                    <v-select :items="items" label="Region"></v-select>
                    <v-select :items="items" label="Province"></v-select>
                    <v-select :items="items" label="City/Town"></v-select>
                    <v-text-field label="Zip code"></v-text-field>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 md4 pa-2>
            <v-card>
                <v-toolbar dark color="primary" style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
                    <span class="title font-weight-light">User Details</span>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-text-field label="Last Name"></v-text-field>
                    <v-text-field label="First Name"></v-text-field>
                    <v-text-field label="Middle Name"></v-text-field>
                    <v-text-field label="TIN" mask="###-###-###-###"></v-text-field>
                    <v-text-field label="Email Address"></v-text-field>
                    <v-text-field label="Phone Number"></v-text-field>
                    <v-text-field label="Mobile Number"></v-text-field>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 md4 pa-2>
            <v-card>
                <v-toolbar dark color="primary" style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
                    <span class="title font-weight-light">User Account</span>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-layout align-center justify-center>
                        <v-avatar class="elevation-5 chooseAvatar" size="100" v-if="imageUrl" @click="pickFile">
                            <img :src="imageUrl" alt="avatar">
                            <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
                        </v-avatar>
                    </v-layout>
                    <v-layout align-center justify-center>
                        <v-flex xs12 class="text-xs-center">
                            <v-btn small flat ripple color="primary" @click="pickFile">
                                Choose avatar
                            </v-btn>
                            <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
                        </v-flex>
                    </v-layout>
                    <v-text-field label="Username"></v-text-field>
                    <v-text-field label="Password" type="password" :disabled="true" value="12345678"></v-text-field>
                </v-card-text>
            </v-card>
    </v-flex>-->
    <!-- <v-spacer></v-spacer>
                        <v-btn style="bottom: 40px"
                        color="blue darken-2"
                        dark
                        fab
                        bottom
                        right
                        absolute
                      >
                        <v-icon>save</v-icon>
    </v-btn>-->
    <v-layout column class="fab-container">
      <v-tooltip top>
        <v-btn slot="activator" large fab color="success" @click="dialog=true">
          <v-icon>save</v-icon>
        </v-btn>Save Changes
      </v-tooltip>
    </v-layout>
    <v-dialog v-model="dialog" max-width="300px" transition="dialog-transition">
      <v-card>
         <v-toolbar dark color="primary" style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
                <span class="title font-weight-light">Confirmation</span>
            </v-toolbar>
        <v-card-text>Do you want to save any changes ?</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" outline flat @click="dialog=false">Cancel</v-btn>
          <v-btn
            color="primary"
            @click="save()"
            :loading="avatar_loading"
            :disabled="avatar_loading"
          >Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    random_color:'#' + ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6),
    dialog: false,
    account: {
      avatar: {
        location: ""
      }
    },
    formData: {},
    file_uploader: {},
    avatar_loading: false,
    avatar: null
  }),
  created() {
    this.init();
  },
  methods: {
    init() {
      this.account = this.deepCopy(this.$store.state.user_session.user);
      if (!this.account.avatar) this.account.avatar = {};
      this.avatar = this.account.avatar.location;
    },
    onFilePicked(event) {
      console.log(event.target.files[0]);
      this.formData = new FormData();
      this.formData.append(
        event.target.name,
        event.target.files[0],
        event.target.files[0].name
      );
      this.account.avatar.location = URL.createObjectURL(event.target.files[0]);
      this.avatar = this.account.avatar.location;
    },
    save() {
      this.avatar_loading = true;
      console.log("PROFILE: " + JSON.stringify(this.account));
      this.$store
        .dispatch("UPDATE_ACCOUNT", {
          account: this.account,
          avatar: this.formData
        })
        .then(result => {
          console.log("result :", result);
          this.dialog = false;
          this.avatar_loading = false;
          if (result.success) {
            this.$notify({
              message: "Your account has been updated!",
              color: "success",
              icon: "check_circle"
            });
          } else {
            this.$notifyError(result.errors);
          }
          // this.$store.dispatch('LOGOUT')
          // this.$router.push('/')
        })
        .catch(error => {
          this.dialog = false;
          this.avatar_loading = false;
          this.$notifyError(error);
        });
    }
  },
  computed:{
    alias(){
      if(this.account.name && this.account.name.first && this.account.name.last){
        return this.account.name.first.substring(0,1).toUpperCase() + this.account.name.last.substring(0,1).toUpperCase()
      }else{
        return ""
      }
    }
  }
};
</script>

<style>
.chooseAvatar:hover {
  cursor: pointer;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
  /* height: 100%; */
}
</style>
