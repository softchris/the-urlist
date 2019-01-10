<template>
  <div>
    <div class="section">
      <new-link @onAddNewLink="addLink"></new-link>
    </div>
    <div class="links">
      <div class="flex is-vertically-centered">
        <h2 class="has-text-primary">Links</h2>
        <span class="is-aligned-right">Drag each link to re-arrange</span>
      </div>
      <sortable-list v-model="list.links" :distance="10">
        <sortable-item
          v-for="(link, index) in list.links"
          :index="index"
          :key="index"
          disabled="true"
        >
          <link-preview :link="link"></link-preview>
        </sortable-item>
      </sortable-list>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SlickList, SlickItem } from "vue-slicksort";
import { validationMixin } from "vuelidate";
import { required, url, helpers } from "vuelidate/lib/validators";
import LinkPreview from "@/components/LinkPreview.vue";
import NewLink from "@/components/NewLink.vue";
import EventBus from "../EventBus";

const SortableList: object = SlickList;
const SortableItem: object = SlickItem;

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
    SortableList,
    SortableItem,
    LinkPreview,
    NewLink
  }
})
export default class extends Vue {
  active: boolean = false;
  newLink: string = "";
  get list() {
    return this.$store.getters.list;
  }

  addLink(url: string) {
    if (!this.$v.$invalid) {
      debugger;
      this.$store.dispatch("addLink", url);
      this.newLink = "";
    }
    // else {
    //   EventBus.$emit(
    //     "notification/show",
    //     `That doesn't appear to be a valid URL`
    //   );
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.save-button {
  margin-bottom: 20px;
}
</style>
