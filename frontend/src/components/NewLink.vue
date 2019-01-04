<template>
  <div>
    <input type="text" id="newUrl" v-model="newLink">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  get newLink() {
    return this.$store.getters.newUrl;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
