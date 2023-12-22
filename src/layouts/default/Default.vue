<template>
  <v-app>
    <default-bar />

    <div class="content">
      <default-view />
    </div>
  </v-app>
</template>

<script lang="ts" setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
</script>

<style scoped>
  .content {
    display: grid;
    place-items: center;
    min-height: 100vh;
  }
</style>