<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-spacer></v-spacer>
        <v-card-title class="headline ml-3 mt-2 pt-3" style="padding: 2px;">
          <slot :name="'header-step-' + step"></slot>
        </v-card-title>
        <v-window v-model="onboarding">
          <template v-for="st in steps">
            <v-window-item :key="st">
              <v-card style="box-shadow: none  !important;" height="calc(100% - 80px)">
                <v-progress-linear></v-progress-linear>
                <v-container
                  mt-3
                  id="scroll-target"
                  style="max-height: calc(100% - 80px)"
                  class="scroll-target scroll-y"
                >
                  <v-layout
                    mt-3
                    column
                    style="height: calc(100% - 80px)"
                    align-center
                    justify-center
                  >
                    <slot :name="'content-step-' + st"></slot>
                  </v-layout>
                </v-container>
              </v-card>
            </v-window-item>
          </template>
        </v-window>
        <v-card-actions class="justify-space-between">
          <v-tooltip top>
            <v-btn slot="activator" flat @click="prev" v-if="step > 1">
              <v-icon color="primary">fas fa-chevron-circle-left</v-icon>
            </v-btn>Previous
          </v-tooltip>

          <v-spacer></v-spacer>
          <v-item-group v-model="onboarding" text-xs-center mandatory>
            <v-item class="step" v-for="n in steps" :key="n">
              <v-btn
                slot-scope="{ active}"
                :input-value="active"
                icon
                @click="$emit('changePage', n)"
              >{{n}}</v-btn>
            </v-item>
          </v-item-group>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <v-btn slot="activator" color="primary" flat @click="next">
              <span v-if="steps === step">{{submitText}}</span>
              <v-icon v-else color="primary">fas fa-chevron-circle-right</v-icon>
            </v-btn>Next
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: 1
    },
    steps: {
      type: Number,
      default: 1
    },
    submitAt: {
      type: Number
    },
    submitText: {
      type: String,
      default: "Submit"
    }
  },
  data: () => ({
    length: 4,
    onboarding: 0
  }),
  watch: {
    step(val) {
      this.onboarding = val - 1;
    }
  },
  methods: {
    next() {
      if (this.steps === this.step) {
        //last step
        this.$emit("submit");
      } else {
        this.$emit("next");
      }
    },
    prev() {
      // this.onboarding =
      //   this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
      this.$emit("prev");
      // console.log("formlayout prev is clicked: " + JSON.stringify(this.onboarding))
    },
    onScroll(e) {
      // e.target.scrollTop;
    }
  }
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
  border-radius: 2px 20px;
  /* transform: skew(-10deg) !important; */
}
.scroll-y {
  overflow-y: scroll;
}
/* .v-card__title {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    padding: 2px;
  } */
</style>