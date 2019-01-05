<template>
  <div class="link flex is-vertically-centered">
    <figure class="link-image">
      <img width="64" :src="link.image" :alt="link.title">
    </figure>
    <div class="link-details flex is-vertically-centered">
      <div class="flex flex-column">
        <strong class="link-title">{{ link.title }}</strong>
        <div class="link-description">{{ link.description }}</div>
        <div class="link-url">
          <p>{{ link.url }}</p>
        </div>
      </div>
    </div>
    <div class="is-aligned-right delete">
      <a class="has-text-bold" @click.prevent="deleteLink(link.id)" v-show="editable">x</a>
    </div>
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

  go(url: string) {
    window.location.assign(url);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.link {
  width: 100%;
  height: 126px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 5px 40px 1px #e8e8e8;
  margin-bottom: 1em;
}

.link-details {
  flex: 1;
}

.link-title {
  display: block;
  color: #222c38;
  margin-bottom: 5px;
}

.link-description {
  max-height: 50px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link-url {
  font-size: 12px;
  p {
    margin: 10px 0 0 0;
  }
}

.delete {
  cursor: pointer;
  margin-right: 20px;
  margin-left: 20px;
  transition: margin 400ms linear;
}

@media only screen and (min-width: 1040px) {
  .delete {
    margin-right: -40px;
  }
  .link-details {
    padding-right: 40px;
  }
}

@media only screen and (max-width: 500px) {
  .link-description {
    display: none;
  }
}
</style>
