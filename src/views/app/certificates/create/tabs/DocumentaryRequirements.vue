<template>
  <v-container grid-list-md>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <v-card height="350px">
          <v-container grid-list-md>
            <v-layout row wrap justify-center>
              <v-flex xs3>
                <span class="caption font-weight-light">1. Upload the Image of the product label</span>
              </v-flex>
              <v-flex xs9>
                <uploader @upload="upload"></uploader>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card height="350px">
          <v-container grid-list-md>
            <v-layout row wrap justify-center>
              <v-flex xs3>
                <span
                  class="caption font-weight-light"
                >2. Please upload the Picture of the Product in Commercial Presentation in all angles and in different packaging sizes and from at least two different perspectives</span>
              </v-flex>
              <v-flex xs9>
                <uploader @upload="upload"></uploader>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-container grid-list-md>
            <v-layout row wrap justify-center>
              <v-flex xs12>
                <v-autocomplete
                  outline
                  :items="answer"
                  item-text="name"
                  item-value="code"
                  label="Is your product for Export"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs3>
                <span
                  class="caption font-weight-light"
                >3. Upload any of the following, Purchase Order, Request for Quotation, or valid notarized agreement signed by Importing and Exporting parties of the Importing Company</span>
              </v-flex>
              <v-flex xs9>
                <uploader @upload="upload"></uploader>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-container grid-list-md>
            <v-layout row wrap justify-center>
              <v-flex xs12>
                <v-autocomplete
                  outline
                  :items="answer"
                  item-text="name"
                  item-value="code"
                  label="Do you have Nutrient Content Claim/ Nutrient Function Claim/ Other Function Claims/ Health Claim/ Comparative Claim/ Non-addition claim/ Reduction of disease risk claim/ Other claims?"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs3>
                <span
                  class="caption font-weight-light"
                >4. Upload documents to substantiate claims, such as technical, nutritional, or health studies or reports, market-research studies, Certificate of Analysis, quantitative analysis and computations, scientific report or studies published in peer-reviewed scientific journals, certificates or certification in compliance with current labelling regulations</span>
              </v-flex>
              <v-flex xs9>
                <uploader @upload="upload"></uploader>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-container grid-list-md>
            <v-layout row wrap justify-center>
              <v-flex xs12>
                <v-autocomplete
                  outline
                  :items="answer"
                  item-text="name"
                  item-value="code"
                  label="Do you have any IPO/ Trademark, or logo/ seal (e.g. Sangkap Pinoy, Organic) on your label?"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs3>
                <span
                  class="caption font-weight-light"
                >5. Upload the document to substantiate use of logo/seal/ certification</span>
              </v-flex>
              <v-flex xs9>
                <uploader @upload="uploadLogo"></uploader>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Uploader from "@/components/Uploader";

export default {
  components: {
    Uploader
  },
  data() {
    return {
      uploads: false,
      answer: [
        {
          name: "No",
          code: false
        },
        {
          name: "Yes",
          code: true
        }
      ]
    };
  },
  methods: {
    upload(data) {
      console.log("upload document requirements data: " + JSON.stringify(data))
      this.$emit("upload", data);
      this.uploads = true;
    },
    validate() {
      return this.uploads;
    }
  }
};
</script>

<style>
</style>
