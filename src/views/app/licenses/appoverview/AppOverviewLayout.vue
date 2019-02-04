<template>
  <div>
    <application-summary :show="showAppView" @close="showAppView=false">
      <template slot="header-1">Header 1</template>
      <template slot="content-1">
        <v-card>
          <v-card-title primary-title>title 1</v-card-title>
          <v-card-text>Content 1</v-card-text>
        </v-card>
      </template>
      <template slot="header-2">Header 2</template>
      <template slot="content-2">Content 2</template>
      <template slot="header-3">Header 3</template>
      <template slot="content-3">Content 3</template>
    </application-summary>
  </div>
</template>

<script>
export default {
  components: {
    ApplicationSummary: () => import("@/components/ApplicationOverview")
  },
  data() {
    return {
      showAppView: false
    };
  }
};
</script>