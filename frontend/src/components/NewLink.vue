<template>
  <div>
    <p>Enter a link and press enter</p>
    <input ref="newLink" type="text" id="newLink" v-model="newLink" @keyup.enter="addLink()">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required, url, helpers } from "vuelidate/lib/validators";

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
  }
})
export default class extends Vue {
  newLink: string = "";

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
