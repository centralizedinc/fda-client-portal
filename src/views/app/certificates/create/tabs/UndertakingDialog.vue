<template>
  <div class="xs-center">
    <v-dialog
      v-model="show"
      scrollable
      :overlay="false"
      max-width="800px"
      transition="dialog-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="fdaGreen"
          style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
        >
          <span class="font-weight-light headline">Declaration</span>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <v-btn slot="activator" flat icon color="black" @click="close">
              <v-icon>fas fa-times-circle fa-1x</v-icon>
            </v-btn>Close
          </v-tooltip>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <span class="body-2 font-weight-light">
            I undertake to notify the Authority of any adverse event, fatal or life threatening serious adverse event as soon as possible by telephone, facsimile transmission, email or in writing, and in any case, no later than 48 hours after first knowledge.
            <br><br>I undertake to act immediately on potential food safety concerns should my product source or origin declare/announce/notify a product recall order or any actions taken involving safety issues, and I am responsible to stop distribution or remove product from the outlets or take appropriate actions and inform the Authority on risk management actions undertaken and/or to be undertaken.
            <br><br>I declare that the particulars given in this product registration are true, all data, and information of relevance in relation to the registration have been supplied and that the documents enclosed are authentic or true copies.
            <br><br>I understand that I shall be responsible for ensuring that each consignment of my product continues to meet all the legal requirements, and conforms to all the standards and specifications of the product that I have declared to the Authority.
            <br><br>I understand that I cannot place reliance on the acceptance of my product registration by the authority in any legal proceedings concerning my product, in the event that my product has failed to conform to any of the standards or specifications that I had previously declared to the Authority.
            <br><br>I understand that I will need to comply with all the labeling requirements as stipulated by Administrative Order No. 2014-0030 and other pertinent laws and regulations associated with labeling.
            <br><br>I undertake to declare truthful product information and shall not cause the dissemination of any false, deceptive or misleading advertisement by print, radio, television, outdoor advertisement or other medium for the purpose of inducing or which is likely to induce directly or indirectly the purchase of the product.
            <br><br>I understand that any change or variation in the formulation of registered product will require new registration to the Authority and the subject shall be treated as new product.
            <br><br>I hereby agree and affirm full responsibility for the safety of my product/s and agree to indemnify and/or hold FDA free and harmless against any issues that may arise in the manufacture, import, export, distribute, transfer, promote, advertise, sponsor, sell, offer for sale, and where appropriate the use and testing, and marketing of my food product/s
            <br><br>
          </span>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn block flat color="primary" @click.native.stop="apply">I accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  
  methods: {
    apply() {
      this.$emit("proceed");
    },
    close() {
      this.$emit('close');
    }

  }
};
</script>

<style>
</style>
