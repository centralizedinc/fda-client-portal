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
        <v-spacer></v-spacer>
        <v-card-title
          class="headline font-weight-thin"
          style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%); text-transform: uppercase"
        >
          {{title}}
          <v-spacer></v-spacer>
          <v-tooltip top>
            <v-btn slot="activator" flat icon color="black" @click="$emit('cancel')">
              <i class="fas fa-times-circle"></i>
            </v-btn>Close
          </v-tooltip>
          <!-- <v-btn top right absolute color="accent" @click="$emit('cancel')">Cancel</v-btn> -->
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <slot name="content"></slot>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn ripple raised block color="success" @click="$emit('add')">Add</v-btn>
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
