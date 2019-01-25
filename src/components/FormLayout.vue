<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-spacer></v-spacer>
        <v-card-title class="headline ml-3 mt-2 pt-3" style="padding: 2px;">
          <slot :name="'header-step-' + step"></slot>
        </v-card-title>
        <v-window v-model="onboarding">
          <v-window-item v-for="n in length" :key="`card-${n}`">
            <v-card style="box-shadow: none  !important;">
              <v-progress-linear></v-progress-linear>
              <v-container id="scroll-target" class="scroll-y" style="max-height: 1000vh">
                <v-layout
                  v-scroll:#scroll-target="onScroll"
                  column
                  style="height: 280px"
                  align-center
                  justify-center
                >
                  <slot :name="'content-step-' + step"></slot>
                </v-layout>
              </v-container>
            </v-card>
          </v-window-item>
        </v-window>
        <v-card-actions class="justify-space-between">
          <v-btn flat @click="prev">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-item-group v-model="onboarding" text-xs-center mandatory>
            <v-item class="step" v-for="n in steps" :key="`btn-${n}`">
              <v-btn
                slot-scope="{ active, toggle}"
                :input-value="active"
                icon
                @click="$emit('changePage', n)"
              >{{n}}</v-btn>
            </v-item>
          </v-item-group>
          <!-- <v-btn
                
                :complete="step > 2" step="2"
              >asdasd
          </v-btn>-->
          <v-btn flat @click="next">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
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
    },
    hidePrevOnLastStep: {
      type: Boolean,
      default: false
    },
    hideSubmit: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    length: 3,
    onboarding: 0
  }),
  watch: {
    step(val) {
      this.onboarding = val - 1;
    }
  },
  methods: {
    next() {
      // this.onboarding =
      //   this.onboarding + 1 === length ? 0 : this.onboarding + 1;
      this.$emit("next");
      // console.log("formlayout next clicked: " + JSON.stringify(this.onboarding))
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