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
        >
          {{title}}
          <v-spacer></v-spacer>
          <v-tooltip top>
            <v-btn slot="activator" flat icon color="error" @click="$emit('cancel')">
              <i class="fas fa-2x fa-times-circle fa-spin"></i>
            </v-btn>Close
          </v-tooltip>
          <!-- <v-btn top right absolute color="accent" @click="$emit('cancel')">Cancel</v-btn> -->
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <slot name="content"></slot>
        </v-card-text>
        <v-card-actions>
          <v-btn block color="success" @click="$emit('add')">Add</v-btn>
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
