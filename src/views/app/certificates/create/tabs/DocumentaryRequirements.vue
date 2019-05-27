<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card>
                <v-card-title primary-title>
                    Please upload the necessary documents
                </v-card-title>  
                <span align-center>Upload the Image of the product label</span>
                <uploader @upload="upload"></uploader>
                <span align-center>Please upload the Picture of the Product in Commercial Presentation in all angles and in different packaging sizes and from at least two different perspectives</span>
                <uploader @upload="upload"></uploader>
                <v-select
                    :items="answer"
                    v-model="form.documentary.for_export"
                    item-text="name"
                    item-value="code"
                    label="Is your product for Export"
                ></v-select>
                <span align-center>Upload any of the following, Purchase Order, Request for Quotation, or valid notarized agreement signed by Importing and Exporting parties of the Importing Company</span>
                <uploader @upload="upload"></uploader>
                <v-select
                    :items="answer"
                    v-model="form.documentary.has_claims"
                    item-text="name"
                    item-value="code"
                    label="Do you have Nutrient Content Claim/ Nutrient Function Claim/ Other Function Claims/ Health Claim/ Comparative Claim/ Non-addition claim/ Reduction of disease risk claim/ Other claims?"
                ></v-select>
                <span align-center>Upload documents to substantiate claims, such as technical, nutritional, or health studies or reports, market-research studies, Certificate of Analysis, quantitative analysis and computations, scientific report or studies published in peer-reviewed scientific journals, certificates or certification in compliance with current labelling regulations</span>
                <uploader @upload="upload"></uploader>
                <v-select
                    :items="answer"
                    v-model="form.documentary.has_on_label"
                    item-text="name"
                    item-value="code"
                    label="Do you have any IPO/ Trademark, or logo/ seal (e.g. Sangkap Pinoy, Organic) on your label?"
                ></v-select>
                <span align-center>Upload the document to substantiate use of logo/seal/ certification?</span>
                <uploader @upload="upload"></uploader>
            </v-card>
        </v-flex>
    </v-layout>
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
      answer: [{
          name: "No",
          code: 0
      },
      {
          name: "Yes",
          code: 1
      }
      ]
    };
  },
  methods: {
    upload(data) {
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
