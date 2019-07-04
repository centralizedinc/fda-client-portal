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
            I hereby declare on behalf of my company that the product in the notification meets all the requirements of the ASEAN Cosmetic Directive, its Annexes and Appendices, which have been transposed into local legislation.
            <br>
            <br>I undertake to
            <br>
            <br>Ensure that the product’s technical and safety information is made readily available to the regulatory authority concerned (“the Authority”) and to keep records of the distribution of the products for product recall purposes;
            <br>
            <br>Notify the Authority of fatal or life threatening serious adverse event 2 as soon as possible by telephone, facsimile transmission, email or in writing, and in any case, no later than 7 calendar days after first knowledge;
            <br>
            <br>Complete the Adverse Cosmetic Event Report Form 3 within 8 calendar days from the date of my notification to the Authority in para 2ii. above, and to provide any other information as may be requested by the Authority;
            <br>
            <br>Report to the Authority of all other serious adverse events that are not fatal or life threatening as soon as possible, and in any case, no later than 15 calendar days after first knowledge, using the Adverse Cosmetic Event Report Form;
            <br>
            <br>Notify the Authority of any change in the particulars submitted in this notification;
            <br>
            <br>Ensure that if and when directed by the authority I will recall the product from the market, and discontinue selling or supplying the product
            <br>
            <br>I declare that the particulars given in this notification are true, all data, and information of relevance in relation to the notification have been supplied and that the documents enclosed are authentic or true copies.
            <br>
            <br>I understand that I shall be responsible for ensuring that each consignment of my product continues to meet all the legal requirements, and conforms to all the standards and specifications of the product that I have declared to the Authority.
            <br>
            <br>I understand that I cannot place reliance on the acceptance of my product notification by the authority in any legal proceedings concerning my product, in the event that my product has failed to conform to any of the standards or specifications that I had previously declared to the Authority.
            <br>
            <br>I have examined the latest revisions of the Annexes II to VII of the ASEAN Cosmetic Ingredient Listing as published in the latest amendment of the ASEAN Cosmetic Directive and confirmed that the product in this notification does not contain any prohibited substances and is in compliance with the restrictions and conditions stipulated in the Annexes.
            <br>
            <br>I undertake to respond to and cooperate fully with the regulatory authority with regard to any subsequent post-marketing activity initiated by the authority.
          </span>
          <span
            class="caption font-weight-light"
          >(2) As defined in the Guide Manual for the Industry on Adverse Event Reporting of Cosmetics Products</span>
          <span
            class="caption font-weight-light"
          >(3) Set out in Appendix I to the Guide Manual for the Industry on Adverse Event Reporting of Cosmetics Products</span>
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
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>
