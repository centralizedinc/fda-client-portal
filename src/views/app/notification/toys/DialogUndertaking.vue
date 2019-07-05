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
            I undertake to respond to and cooperate fully with the regulatory authority with regard to any subsequent post-marketing activity initiated by the authority.
            <br>
            <br>I undertake to ensure that the product’s technical and safety information is made readily available to the regulatory authority concerned (“the Authority”) and to keep records of the distribution of the products for product recall purposes.
            <br>
            <br>I undertake to notify the Authority of fatal or life threatening serious adverse event as soon as possible by telephone, facsimile transmission, e-mail or in writing, and in any case, not later than 7 calendar upon knowledge of the adverse event.
            <br>
            <br>I declare that the particulars given in this notification are true and correct.
            <br>
            <br>I undertake to ensure that if and when directed by the regulatory authority I will recall the product from the market, and discontinue selling/ supplying the product
            <br>
            <br>I understand that I shall be responsible for ensuring that each consignment of my product continues to meet all the legal requirements, and conforms to all the standards and specifications of the product that I have declared to the Authority.
            <br>
            <br>I declare that our product does not contain any restricted or banned substances that can be harmful/ hazardous/ life threatening to children and infants.
            <br>
            <br>I understand that I cannot place reliance on the acceptance of my product notification by the authority in any legal proceedings concerning my product, in the event that my product has failed to conform to any of the standards or specifications that I had previously declared to the Authority.
            <br>
            <br>I understand that I will need to comply with all the labeling requirements as stipulated by Republic Act 10620, otherwise known as “ Toy and Game Safety Labeling Act of 2013”, and its implementing rules and regulations.
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
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>
