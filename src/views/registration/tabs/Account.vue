<template>

  
  <v-card>
    
    <v-card-text> 
              
      <v-form ref="vform" v-model="isValid">
        <v-layout row wrap>
          <v-flex xs12 pa-1 align-center justify-center >
              <v-avatar style="left: 40%" size="120" :color="random_color">
                <span class="white--text display-1">{{alias}}</span>
              </v-avatar>              
          </v-flex>          
          <v-flex xs12 pa-1>
            <v-text-field :rules="[rules.required]" label="Last Name" v-model="account.last_name"></v-text-field>
            <v-text-field :rules="[rules.required]" label="First Name" v-model="account.first_name"></v-text-field>
            <v-text-field 
              label="Email" 
              v-model="account.email"
              :rules="[rules.required, rules.email]"></v-text-field>
          </v-flex>         
          <v-flex xs12>
            <v-text-field label="Username" 
                  :rules="[rules.required]"
                  v-model="account.username"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="Password"
              v-model="account.password"
              :append-icon="value ? 'visibility_off' : 'visibility'"
              @click:append="() => (value = !value)"
              :type="value ? 'password' : 'text'"
              :rules="[rules.required]"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="Confirm Password"
              v-model="confirm"
              :append-icon="conf_show ? 'visibility_off' : 'visibility'"
              @click:append="() => (conf_show = !conf_show)"
              :type="conf_show ? 'password' : 'text'"
              :rules="[rules.required, rules.confirm]"
            ></v-text-field>
          </v-flex>
      </v-layout>
    </v-form>
  </v-card-text>
  </v-card>
  
  
</template>

<script>
export default {
  props: ["account"],
  data() {
    return {
      isValid:true,
      value: true,
      conf_show:true,
      confirm:"",
      rules: {
        required: value => !!value || "This field is required",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        confirm: value =>{
          return value===this.account.password || "Password doesn't match"
        }
      },
      random_color:'#' + ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6)
    };
  },
  created(){
    this.init();
  },
  methods:{
    init(){
    },
    validate(){
      this.$refs.vform.validate()
      return this.isValid
    },
    // randomColor(){
    //   return '#' + ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6);
    // }
  },
  computed:{
    alias(){
      if(this.account.first_name && this.account.last_name){
        console.log(this.account.first_name.substring(0,1) + this.account.last_name.substring(0,1))
        return this.account.first_name.substring(0,1).toUpperCase() + this.account.last_name.substring(0,1).toUpperCase()
      }else{
        return ""
      }
    }
  }
};
</script>

<style>
.display {
  font-size: 16px;
}
.display span {
  font-weight: bold;
}
</style>
