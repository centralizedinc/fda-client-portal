<template>
  <div class="xs-center">
    <v-dialog
      v-model="show"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title
          primary-title
          class="headline"
          style="background: linear-gradient(45deg, #CAD0A0 0%, #b5c25a 100%)"
        >{{title}}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <slot name="content"></slot>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="accent" @click="$emit('cancel')">Cancel</v-btn>
          <v-btn color="success" @click="$emit('add')">Add</v-btn>
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
    },
    title: {
      type: String
    }
  }
};
</script>

<style>
</style>
