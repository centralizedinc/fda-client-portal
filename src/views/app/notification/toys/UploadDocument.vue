<template>
  <v-layout row wrap>
    <v-flex xs12>
      <uploader @upload="upload"></uploader>
    </v-flex>
  </v-layout>
</template>

<script>
import Uploader from "@/components/Uploader";

export default {
  props: ["form"],
  components: {
    Uploader
  },
  data() {
    return {
      uploads: false
    };
  },
  methods: {
    upload(data) {
      console.log("document upload data: " + JSON.stringify(data));
      this.$emit("upload", data);
      this.form.output_files.push({
        type: "foodSupplement",
        form_data: data.formData,
        uploadedFiles: data.uploadedFiles
      });
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
