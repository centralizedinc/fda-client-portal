<template>
     <v-layout row wrap>
        <v-flex xs12 p1-2>
           <v-card>
              <div>
      <v-layout column justify-center align-center>
        <v-subheader>Offset Top</v-subheader>
        {{ offsetTop }}
      </v-layout>
      <v-container
        id="scroll-target"
        style="max-height: 400px"
        class="scroll-y"
      >
        <v-layout
          v-scroll:#scroll-target="onScroll"
          column
          align-center
          justify-center
          style="height: 1000px"
        >
        </v-layout>
      </v-container>
    </div>
           </v-card>
        </v-flex>        
    </v-layout>
</template>

<script>
export default {

}
</script>

<style>

</style>
