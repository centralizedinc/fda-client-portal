<template>
    <v-layout row wrap>
        <v-flex xs12 md3 pa-2>
            <v-toolbar dark color="primary">
                <span class="subheading font-weight-light">Steps 1</span>
                <v-spacer></v-spacer>
                <v-btn flat icon>
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-stepper v-model="step_curr" vertical>
                <v-stepper-step step="1">
                Company Details
                </v-stepper-step>
                <v-stepper-content step="1">
                </v-stepper-content>

                <v-stepper-step step="2">
                Office Address
                </v-stepper-step>
                <v-stepper-content step="2">
                </v-stepper-content>

                <v-stepper-step step="3">
                Authorized Personnel
                </v-stepper-step>
                <v-stepper-content step="3">
                </v-stepper-content>

                <v-stepper-step step="4">
                Identity Proof
                </v-stepper-step>
                <v-stepper-content step="4">
                </v-stepper-content>

                <v-stepper-step step="5">
                Account Details
                </v-stepper-step>
                <v-stepper-content step="5">
                </v-stepper-content>
            </v-stepper>
        </v-flex>
        <v-flex xs12 md6 pa-2>
            <!-- Step 1 -->            
            <v-card>
                <v-toolbar dark color="primary">
                    <span class="subheading font-weight-normal">{{steps_headers[step_curr-1]}}</span>
                </v-toolbar>
                <v-progress-linear color="warning" :indeterminate="false" :value="progress" class="ma-0" height="5"></v-progress-linear>
                <v-card-text>
                   <!-- <transition name="fade"> -->
                    <v-form v-if="step_curr===1" key="step1">
                        <v-text-field class="subheading font-weight-light"
                            name="name"
                            label="Name of Establishment"
                            v-model="account.company.name"
                            id="name"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="owner"
                            label="Establishment Owner"
                            v-model="account.company.owner"
                            id="owner"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="tin"
                            label="TIN"
                            v-model="account.company.tin"
                            mask="###-###-###-###"
                            id="tin"
                            counter="12"
                        ></v-text-field>
                    </v-form>

                    <v-form v-if="step_curr===2" key="step2">
                        <v-text-field class="subheading font-weight-light"
                            name="add"
                            label="Address"
                            v-model="account.company.address.address"
                            id="add"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="region"
                            label="Region"
                            v-model="account.company.address.region"
                            id="region"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="province"
                            label="Province"
                            v-model="account.company.address.province"
                            id="province"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="city"
                            label="City/Town"
                            v-model="account.company.address.city"
                            id="city"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="zip"
                            label="Zip Code"
                            v-model="account.company.address.zipCode"
                            id="zip"
                        ></v-text-field>
                    </v-form>

                    <v-form v-else-if="step_curr===3" key="step3">
                        <v-text-field class="font-weight-light"
                            name="last"
                            label="Last Name"
                            v-model="account.name.last"
                            id="last"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="first"
                            label="First Name"
                            v-model="account.name.first"
                            id="first"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="mid"
                            label="Middle Name"
                            v-model="account.name.middle"
                            id="mid"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="position"
                            label="Designation"
                            v-model="account.position"
                            id="position"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="tin"
                            label="TIN"
                            v-model="account.tin"
                            id="tin"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="email"
                            label="Email Address"
                            v-model="account.email"
                            id="email"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="phone"
                            label="Phone Number"
                            v-model="account.contact.phone"
                            id="phone"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="mobile"
                            label="Mobile Number"
                            v-model="account.contact.mobile"
                            id="mobile"
                        ></v-text-field>
                    </v-form>

                    <v-form v-else-if="step_curr===4" key="step4">
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="Government ID"
                            id="id"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="ID Number"
                            id="id"
                        ></v-text-field>
                        <v-text-field class="font-weight-light"
                            name="name"
                            label="Expiry Date"
                            placeholder="mm/dd/yyyy"
                            id="id"
                        ></v-text-field>                        
                    </v-form>

                    <v-form v-else-if="step_curr===5" key="step5">
                        <v-layout row wrap>
                            <v-flex xs12 md4 class="text-md-center" pa-2 mt-3>
                                <v-avatar
                                    size="120"
                                >
                                    <img :src="avatar_link" alt="alt">
                                </v-avatar>
                                <v-btn color="primary" outline small>Change</v-btn>
                            </v-flex>
                            <v-flex xs12 md8>
                                <v-text-field class="font-weight-light"
                                    name="name"
                                    label="Username/Email"
                                    id="id"
                                ></v-text-field>
                                <v-text-field
                                    name="name"
                                    label="Password"
                                    :append-icon="visible_pass ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (visible_pass = !visible_pass)"
                                    :type="visible_pass ? 'password' : 'text'"
                                ></v-text-field>
                                <v-text-field
                                    name="name"
                                    label="Confirm Passowrd"
                                    :append-icon="visible_conf_pass ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (visible_conf_pass = !visible_conf_pass)"
                                    :type="visible_conf_pass ? 'password' : 'text'"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        
                         
                        <!-- <vue-recaptcha sitekey="6LfrdI0UAAAAANxiZliLI7Gtv7j1QjOXCZcX2EfJ">                            
                        </vue-recaptcha>                                                                                           -->
                    </v-form>
                   <!-- </transition> -->
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                     <v-btn color="secondary" outline @click="back">Back</v-btn>
                    <v-btn color="primary" @click="next">Next</v-btn>
                </v-card-actions>
            </v-card>
           
        </v-flex>
        <v-flex xs12 md3 pa-2>
            <v-toolbar dark color="secondary">
                <span class="subheading font-weight-light">Help</span>
                <v-spacer></v-spacer>
                <v-btn flat icon>
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card>
                <v-card-text>
                    <p>Provide us the Establishment Details</p>
                    <p>Avoid using numbers on Establishment Owner Field</p>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
// import * as schema from 'fda-data-models'
function md5(d){return rstr2hex(binl2rstr(binl_md5(rstr2binl(d),8*d.length)))}function rstr2hex(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function rstr2binl(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function binl2rstr(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function binl_md5(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
export default {
    components: { VueRecaptcha },
    data(){
        return{
            account:{
                company:{
                    address:{}
                },
                name:{},
                contact:{}
            },
            step_curr:1,
            progress:0,
            steps_headers:[
                "Company Details",
                "Office Address",
                "Authorized Personnel",
                "Identity Proof",
                "Account Details"
            ],
            avatar:"",
            visible_pass:true,
            visible_conf_pass: false,
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            //set default avatar                    
            this.avatar = md5(Math.floor(Math.random()*100) + "@gmail.com") 
            this.$notify({icon: 'hearing',message:"this is a sample notification3", color:"error"})                    
        },
        next(){
            if(this.step_curr < 5){
                this.step_curr++;
                this.progress = this.progress + 20;
                this.$notify({message:"this is a sample notification" + this.step_curr}) 
            }else{
                this.submit();
            }
            
        },
        back(){
            if(this.step_curr > 1){
                this.step_curr--;
                this.progress = this.progress - 20;
            }
            
        },
        submit(){
            this.$store.dispatch('REGISTER', {account:this.account, vm:this})
        }
    },
    computed:{
        avatar_link(){
            if(this.account.email){
                this.avatar = md5(this.account.email)
            }
            var link = "https://www.gravatar.com/avatar/"+this.avatar+"?d=retro&s=100"
            console.log("AVATAR LINK: " + link)
            return link;
        }
    }
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transition: opacity .5s;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
