<template>
  <div class="flex is-vertically-centered">
    <div class="card link flex is-vertically-centered" @click="go(link.url)">
      <figure class="link-image is-hidden-mobile">
        <img width="64" :src="link.image" :alt="link.title">
      </figure>
      <div class="link-details flex is-vertically-centered">
        <div class="flex flex-column">
          <div class="flex">
            <figure class="link-image is-visible-mobile">
              <img width="24" :src="link.image" :alt="link.title">
            </figure>
            <strong v-line-clamp:10="1" class="link-title">{{ link.title }}</strong>
          </div>
          <div v-line-clamp:20="2" class="link-description">{{ link.description }}</div>
          <div v-line-clamp:10="1" class="link-url">
            <p>{{ link.url }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="is-aligned-right delete" v-show="editable">
      <a class="has-text-bold" @click.prevent="deleteLink(link.id)">
        <img src="../assets/close.png" alt>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  props: ["link", "editable"]
})
export default class extends Vue {
  get list() {
    return this.$store.getters.list;
  }

  deleteLink(id: string) {
    this.$store.dispatch("deleteLink", id);
  }

  go(url: string) {
    window.open(url, "_blank");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.link {
  width: 100%;
  height: 110px;
  cursor: pointer;
  padding-left: 10px;
}

.link-image {
  margin: 0 10px 0 0;
}

.link-details {
  flex: 1;
  padding-right: 10px;
}

.link-title {
  display: block;
  color: #222c38;
  margin-bottom: 5px;
  max-lines: 2;
}

.link-description {
  max-height: 50px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link-url {
  width: 100%;
  overflow: hidden;

  font-size: 12px;
  p {
    margin: 10px 0 0 0;
  }
}

.delete {
  cursor: pointer;
  margin-top: -20px;
  margin-left: 20px;
  transition: margin 400ms linear;
}

@media only screen and (min-width: 1040px) {
  .delete {
    margin-right: -40px;
  }
}

@media only screen and (max-width: 680px) {
  .link-description {
    font-size: 12px;
  }
  .link-title {
    margin-right: 30px;
  }
}
</style>
