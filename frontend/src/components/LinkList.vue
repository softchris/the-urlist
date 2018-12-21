<template>
  <div class="box link">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img :src="link.image" :alt="link.title">
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ link.title }}</strong>
            <br>
            {{ link.description }}
          </p>
        </div>
      </div>
      <button class="delete" @click="deleteLink(link.id)" v-show="editable"></button>
    </article>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  props: ["link", "editable"]
})
export default class extends Vue {
  deleteLink(id: string) {
    this.$store.dispatch("deleteLink", id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
