<template>
  <div>
    <div class="section">
      <p>Enter a link and press enter</p>
      <input ref="newLink" type="text" id="newLink" v-model="newLink" @keyup.enter="addLink()">
    </div>
    <div class="links">
      <div class="flex is-vertically-centered">
        <h2 class="has-text-primary">Links</h2>
        <span class="is-aligned-right">Drag each link to re-arrange</span>
      </div>
      <link-list :links="list.links" :editable="list.editable"></link-list>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required, url, helpers } from "vuelidate/lib/validators";
import LinkList from "@/components/LinkList.vue";

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
    LinkList
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
