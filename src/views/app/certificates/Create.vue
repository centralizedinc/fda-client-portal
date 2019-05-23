<template>
  <v-layout row justify-center>
    <v-navigation-drawer id="nav" ref="nav" v-model="nav" hide-overlay width="350" app>
      <v-toolbar light>
        <span class="body-1 font-weight-light">Food Product Registration</span>
        <v-spacer></v-spacer>
        <v-btn flat icon @click="nav=false">
          <v-icon large>chevron_left</v-icon>
        </v-btn>
      </v-toolbar>
      <v-progress-linear style="top: -15px" height="3" :value="completion"></v-progress-linear>
      <v-tabs v-model="tab">
        <v-tab>
          <span class="caption">STEPS</span>
        </v-tab>
        <v-tab>
          <span class="caption">FEES</span>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-stepper v-model="e1" vertical>
            <v-stepper-step @click="proceed(1)" style="cursor:pointer" :complete="e1 > 1" step="1">
              <span class="title font-weight-thin pa-1">Food Product</span>
              <span class="caption font-weight-thin pa-1">Fill out all necessary information</span>
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step @click="proceed(2)" style="cursor:pointer" :complete="e1 > 2" step="2">
              <span class="title font-weight-thin pa-1">Establishment Information</span>
              <span
                class="caption font-weight-thin pa-1"
              >Select the corresponding company activity/activities</span>
            </v-stepper-step>
            <v-divider></v-divider>
            <!-- <v-stepper-step @click="proceed(3)" style="cursor:pointer" :complete="e1 > 3" step="3">
              <span class="title font-weight-thin pa-1">Complete List of Ingredients</span>
              <span
                class="caption font-weight-thin pa-1"
              >Please indicate one ingredient per data entry.</span>
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step @click="proceed(4)" style="cursor:pointer" :complete="e1 > 4" step="4">
              <span class="title font-weight-thin pa-1">Product Specifications</span>
              <span
                class="caption font-weight-thin pa-1"
              >Ensure the completeness and accuracy of the details for the parameters and specifications in coherence with FDA Standards (eg, Philippine National Standards, Administrative Orders, and other relevant issuances)</span>
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step @click="proceed(5)" style="cursor:pointer" :complete="e1 > 5" step="5">
              <span class="title font-weight-thin pa-1">Shelf Life and Other information</span>
              <span
                class="caption font-weight-thin pa-1"
              >The length of time that a commodity may be stored without becoming unfit for use, consumption, or sale.</span>
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step @click="proceed(6)" style="cursor:pointer" :complete="e1 > 6" step="6">
              <span class="title font-weight-thin pa-1">Document Upload</span>
              <span
                class="caption font-weight-thin pa-1"
              >Please upload documents to determine conformance to the standard/s of product identity. For food supplement (if applicable), please upload safety data (e.g. LD50 toxicity tests). For the list of standards or issuances (e.g. PNS, Codex standards, FDA Issuances, local or international standards) please refer to the CFRR Product Registration Manual of Procedure/ Handbook.</span>
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step @click="proceed(7)" style="cursor:pointer" :complete="e1 > 7" step="7">
              <span id="step7" class="title font-weight-thin pa-1">
                Payment
                <a href="#step7">#</a>
              </span>
              <span
                class="caption font-weight-thin pa-1"
              >We will sent you an email with a confirmation link. Please check your email.</span>
            </v-stepper-step> -->
          </v-stepper>
        </v-tab-item>
        <v-tab-item>
          <v-divider></v-divider>
          <v-data-table
            :headers="[{text: 'Description', sortable:false}, {text: 'Amount', sortable:false}]"
            :items="fees"
            hide-actions
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.description }}</td>
              <td>₱ {{ numberWithCommas (props.item.amount) }}</td>
            </template>
            <template slot="footer">
              <td>Total</td>
              <td class="font-weight-bold">₱ {{ numberWithCommas(total_amount) }}</td>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs-items>
    </v-navigation-drawer>
    <v-flex xs1 d-flex align-center align-content-center>
      <v-btn @click="back()" large flat icon color="primary">
        <v-icon x-large>chevron_left</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs10>
      <v-card>
        <v-card-title style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
          <span class="headline font-weight-thin white--text">{{headers[e1-1]}} - Step {{e1}} of 7</span>
          <v-spacer></v-spacer>
          <v-progress-circular color="primary" :rotate="270" size="50" :value="completion">
            <span class="caption">{{completion}}%</span>
          </v-progress-circular>
        </v-card-title>
        <v-card-text>
          {{stepComponent}}
          <keep-alive>
            <!-- <transition name="slide-fade"> -->
            <component
              :is="stepComponent"
              :form="form"
              :account="account"
              ref="curr_step"
              @upload="uploadFile"
            />
            <!-- </transition> -->
          </keep-alive>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="loading" outline color="primary" @click="back">Cancel</v-btn>
          <v-btn color="primary" @click="next" :loading="loading">Next</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs1 d-flex align-center align-content-center>
      <v-btn @click="next()" large flat icon color="primary">
        <v-icon x-large>chevron_right</v-icon>
      </v-btn>
    </v-flex>
    <application-summary 
            :account="account" 
            :form="form" 
            :uploadedFiles="uploadedFiles"
            :show="showSummary"
            :is-final="isFinal" 
            @close="hideSummary"
            @edit="editPage"
            @accept="submit">
        </application-summary>
        <fab-button 
            @review="isFinal=false;showSummary=true" 
            @upload="$refs.file.click()"
            @save="saveTempFile" 
            :buttons="[{label:'Preview', icon:'search', action:'review'},{label:'Save and Continue Later', icon:'save', action:'save'}]" 
            :hide-default="true"></fab-button>       
        <a ref="link" href="" id="a" style="display:none">click here to download your file</a>
  </v-layout>
</template>

<script>
import GeneralInfo from "@/views/registration/tabs/GeneralInfo.vue";
import ApplicationSummary from "@/views/registration/Summary.vue";
import FabButton from "@/components/FabButtons.vue";

export default {
  components: {
    // step1: GeneralInfo,
    //todo: create a loading component for async components...
    "step1": () => ({
      component: import("@/views/app/certificates/create/tabs/Amendment.vue")
    }),
    step2: () => (import("@/views/app/certificates/create/tabs/FoodProductAppForm.vue")
    ),
    // step3: () =>
    //   import("@/views/app/certificates/create/tabs/EstablishmentInfo.vue"),
    // step4: () =>
    //   import("@/views/registration/tabs/AuthorizedOfficerDetails.vue"),
    // step5: () => import("@/views/registration/tabs/QualifiedPersonnel.vue"),
    // step6: () => import("@/views/registration/tabs/DocumentsUpload.vue"),
    // step7: () => import("@/views/registration/tabs/Account.vue"),
    // PaymentSummary: () => import("@/views/app/payment/PaymentSummary.vue"),
    ApplicationSummary,
    FabButton
  },

  data() {
    return {
      loading: false,
      total_amount: 0,
      fees: [],
      charges: null,
      tab: 0,
      form: {
        name:{}
      },
      account: {
        name: {}
      },
      e1: 1,
      nav: true,
      isFinal: false,
      headers: [
        "Food Product Application Form",
        "Establishment Information",
        "Complete List of Ingredients",
        "Product Specifications",
        "Shelf Life and Other information",
        "Document Upload",
        "Payment"
      ],
      uploadedFiles: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log("Welecome Certificate create!!!")
    },
    back() {
      this.e1--;
      if (this.e1 == 0) {
        this.$router.push("/");
      }
      this.tab = 0
    },
    proceed(step) {
      if(this.$refs.curr_step.validate()){
            this.e1=step;
        }else{
            this.$notifyError([{message:"Fill-up required fields."}])
        }
    },
    next() {
      this.loading = true;
      this.e1++;
      this.$vuetify.goTo(0);
      this.loading = false;
      this.tab = 0;
    },
    // hideSummary() {
    //   this.showSummary = false;
    // },
    // editPage(page) {
    //   this.e1 = page;
    //   this.$notify({
    //     color: "success",
    //     message:
    //       "You may now edit the details for Step " +
    //       this.e1 +
    //       " - " +
    //       this.headers[this.e1 - 1]
    //   });
    // },
    uploadFile(data) {
      this.formData = data.formData;
      this.uploadedFiles = data.uploadedFiles;
    },
    // saveTempFile() {
    //   this.form.current_step = this.e1;
    //   var filename =
    //     this.form.estab_details.establishment_name +
    //     "_" +
    //     new Date().getTime() +
    //     ".fda";
    //   var content = new Buffer(
    //     JSON.stringify({ form: this.form, account: this.account })
    //   ).toString("base64");
    //   this.$refs.link.setAttribute(
    //     "href",
    //     "data:text/plain;charset=utf-8," + encodeURIComponent(content)
    //   );
    //   this.$refs.link.setAttribute("download", filename);
    //   this.$refs.link.click();
    //   this.$notify({
    //     message: "Saving your Application Details - " + filename,
    //     color: "success"
    //   });
    // },
    submit() {
      this.loading = true;
    },
    watch: {
      e1() {
        if (!this.nav) {
          this.nav = true;
        }
      }
    },
    computed: {
      completion() {
        console.log("completion this is e1: " + JSON.stringify(this.e1))
        console.log("completion parse int: " + JSON.stringify(parseInt(((this.e1 - 1) / 7) * 100)))
        return parseInt(((this.e1 - 1) / 7) * 100);
      },
      stepComponent() {
        console.log("step component: " + JSON.stringify(this.e1))
        return "step" + this.e1;
      }
    }
  }
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.1s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
