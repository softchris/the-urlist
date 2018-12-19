<template>
  <div class="card link">
    <div class="card-content">
      <div class="content">
        <p>
          <b>{{ link.title }}</b>
        </p>
        <p>{{ link.description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  props: ["link"]
})
export default class extends Vue {
  created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
