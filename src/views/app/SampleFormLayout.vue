<template>
  <v-layout row wrap>
    <v-card>
      <v-spacer></v-spacer>
      <v-card-title class="headline ml-3 mt-3 text-capitalize">
        <slot :name="'header-step-' + step"></slot>
      </v-card-title>

      <v-window v-model="onboarding">
        <v-window-item v-for="n in length" :key="`card-${n}`">
          <v-card style="box-shadow: none  !important;" pa-5 height="200">
            <v-container id="scroll-target" style="max-height: 200px" class="scroll-y pa-5">
              <v-layout
                v-scroll:#scroll-target="onScroll"
                column
                style="height: 200px"
                align-center
                justify-center
                tag="v-card-text"
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
        <v-item-group v-model="onboarding" class="text-xs-center" mandatory>
          <v-item v-for="n in length" :key="`btn-${n}`">
            <v-btn slot-scope="{ active, toggle }" :input-value="active" icon @click="toggle">{{n}}</v-btn>
          </v-item>
        </v-item-group>
        <v-btn flat @click="next">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    length: 3,
    onboarding: 0
  }),

  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
    onScroll(e) {
      e.target.scrollTop;
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
</style>