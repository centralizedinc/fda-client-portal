<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-text>
          <v-flex xs12 mt-4>
            <v-text-field
              placeholder="The Tracking ID of the Document Tracking Log given to you"
              name
              box
              label="DocTrack Number."
              id="id"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              placeholder="The Email or telephone/mobile number used during transaction"
              name
              box
              label="Contact Information"
              id="id"
            ></v-text-field>
          </v-flex>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn block color="success">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {};
</script>

<style>
</style>
