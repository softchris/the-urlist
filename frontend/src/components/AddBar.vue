<template>
  <div>
    <input
      class="input is-primary is-size-2"
      type="text"
      placeholder="Add a link and press enter..."
      v-model="newLink"
      @keyup.enter="addLink()"
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import EventBus from "@/EventBus";

@Component
export default class AddBar extends Vue {
  newLink: string = "";

  addLink() {
    EventBus.$emit("addLink", { url: this.$data.newLink });
    this.newLink = "";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
