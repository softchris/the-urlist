<template>
  <div>
    <div class="control has-icons-left has-icons-right">
      <input
        class="input is-size-2 is-rounded"
        type="url"
        placeholder="Add a link and press enter..."
        v-model="newURL"
        @keyup.enter="addLink()"
      >
      <span class="icon is-small is-right">
        <i class="fas fa-exclamation-triangle"></i>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required, url, helpers } from "vuelidate/lib/validators";
import EventBus from "@/EventBus";

const customURL = helpers.regex(
  "customURL",
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
);

@Component({
  mixins: [validationMixin],
  validations: {
    newURL: {
      required,
      customURL
    }
  }
})
export default class AddBar extends Vue {
  newURL: string = "";

  created() {
    this.$store.dispatch("clearList");
  }

  addLink() {
    if (!this.$v.$invalid) {
      this.$store.dispatch("addLink", this.newURL);
      this.newURL = "";
    } else {
      EventBus.$emit(
        "notification/show",
        `That doesn't appear to be a valid URL`
      );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
