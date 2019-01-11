<template>
  <div class="container add-links">
    <div class="section">
      <new-link @onAddNewLink="addLink"></new-link>
    </div>
    <div class="links">
      <div class="flex is-vertically-centered">
        <h2 class="has-text-primary">Links</h2>
        <span class="is-aligned-right">Drag each link to re-arrange</span>
      </div>
      <link-list :links="list.links"></link-list>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required, url, helpers } from "vuelidate/lib/validators";
import LinkList from "@/components/LinkList.vue";
import NewLink from "@/components/NewLink.vue";

const customURL = helpers.regex(
  "customURL",
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
);

@Component({
  mixins: [validationMixin],
  validations: {
    newLink: {
      required,
      customURL
    }
  },
  components: {
    LinkList,
    NewLink
  }
})
export default class extends Vue {
  newLink: string = "";
  get list() {
    return this.$store.getters.list;
  }

  addLink(url: string) {
    this.$store.dispatch("newLink", url);
    this.newLink = "";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.add-links {
  margin-top: 100px;
}
</style>
