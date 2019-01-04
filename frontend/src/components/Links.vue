<template>
  <div>
    <div class="section">
      <p>Enter a link and press enter to add it below</p>
      <input ref="newLink" type="text" id="newLink" v-model="newLink" @keyup.enter="addLink()">
    </div>
    <div class="links">
      <div class="flex is-vertically-centered">
        <h2 class="has-text-primary">Links</h2>
        <span class="is-aligned-right">Drag each link to re-arrange</span>
      </div>
      <sortable-list v-model="list.links" :distance="10">
        <sortable-item v-for="(link, index) in list.links" :index="index" :key="index">
          <link-list :link="link" :editable="true"></link-list>
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
import LinkList from "@/components/LinkList.vue";
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
    LinkList,
    NewLink
  }
})
export default class extends Vue {
  active: boolean = false;
  newLink: string = "";
  get list() {
    return this.$store.getters.list;
  }

  addLink() {
    if (!this.$v.$invalid) {
      this.$store.dispatch("addLink", this.newLink);
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
