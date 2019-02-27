<template>
  <div class="container content">
    <div class="section">
      <new-link @onAddNewLink="addLink"></new-link>
    </div>
    <div class="flex is-vertically-centered">
      <h2 class="has-text-primary">Links</h2>
      <span class="is-aligned-right">Drag each link to re-arrange</span>
    </div>
    <link-list :links="list.links" :editable="true"></link-list>
    <button
      v-if="list.links.length > 0 && !list.isNew"
      class="delete-button button is-color-danger has-text-white"
      @click="deleteList"
    >
      Delete This List
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required, url, helpers } from "vuelidate/lib/validators";
import LinkList from "@/components/LinkList.vue";
import NewLink from "@/components/NewLink.vue";
import DeleteList from "@/components/DeleteList.vue";

/* eslint-disable */
const customURL = helpers.regex(
  "customURL",
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
);
/* eslint-enable */

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
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch("setShowAddBar", true);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("setShowAddBar", false);
    next();
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

  deleteList() {
    this.$modal.show(
      DeleteList,
      {
        vanityUrl: this.list.vanityUrl
      },
      {
        width: "60%",
        adaptive: true,
        minWidth: 300,
        maxWidth: 500
      }
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.add-links {
  margin-top: 100px;
}

.delete-button {
  width: 100%;
}
</style>
