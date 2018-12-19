<template>
  <div>
    <div class="level">
      <input
        class="input is-size-2 is-rounded"
        type="text"
        placeholder="Add a link and press enter..."
        v-model="newLink"
        @keyup.enter="addLink()"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import EventBus from "@/EventBus";

@Component
export default class AddBar extends Vue {
  newLink: string = "";

  addLink() {
    EventBus.$emit("addLink", this.newLink);
    this.newLink = "";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
