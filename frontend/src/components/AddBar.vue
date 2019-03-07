<template>
  <div>
    <div class="addbar container flex is-horizontally-centered">
      <div class="control stretch">
        <label class="control-label" for="vanity-url">Vanity URL</label>
        <input
          :class="{ invalid: $v.vanityUrl.$error }"
          id="vanity-url"
          ref="vanityUrl"
          type="text"
          :disabled="!list.isNew"
          @input="setVanityUrl($event.target.value)"
          v-show="list.isNew"
        />
        <input
          id="vanity-url"
          ref="vanityUrl"
          type="text"
          disabled="disabled"
          v-model="list.vanityUrl"
          v-if="!list.isNew"
        />
        <div>
          <p class="error" v-show="$v.vanityUrl.$error">
            {{ validationError }}
          </p>
        </div>
        <p class="live-link">
          <a :href="liveLink" v-if="!list.isNew" target="_new">{{
            liveLink
          }}</a>
        </p>
      </div>
      <div class="control stretch">
        <label class="control-label" for="description">Description</label>
        <textarea
          class="description"
          id="description"
          v-model="list.description"
        ></textarea>
      </div>
      <div class="control">
        <label class="control-label is-hidden-mobile" for>&nbsp;</label>
        <button
          :disabled="!canSave"
          class="is-color-primary has-text-white has-text-bold save-button"
          @click="saveList"
        >
          Publish
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { debounce } from "typescript-debounce-decorator";
import { validationMixin } from "vuelidate";
import { helpers } from "vuelidate/lib/validators";
import config from "@/config";

/* eslint-disable */
// disable eslint which doesn't like the escapes in the regex
const mustBeValidUrl = (value: string, vm: AddBar) => {
  console.log(value);
  vm.validationError = "Only letters, numbers and dashes";
  // only accepts alphanumeric and dashes
  return /^(^$|[a-zA-Z0-9_\-])+$/.test(value);
};
/* eslint-enable */

const mustBeUnique = async (value: string, vm: AddBar) => {
  if (!vm.list.isNew) return true;

  vm.validationError = "That Vanity URL is not available";
  // we don't run this validator if the url isn't valid in the first place
  if (helpers.req(value) && mustBeValidUrl(value, vm)) {
    // check with the backend to see if the vanity is available
    return await vm.$store.dispatch("checkVanityAvailable", value);
  } else return true;
};

@Component({
  mixins: [validationMixin],
  validations: {
    vanityUrl: {
      mustBeValidUrl,
      mustBeUnique
    }
  }
})
export default class AddBar extends Vue {
  get canSave() {
    return !this.$v.$invalid && this.list.links.length > 0 && !this.isBusy;
  }
  isBusy: boolean = false;
  validationError: string = "";

  get list() {
    return this.$store.getters.list;
  }

  get liveLink() {
    return `${config.APP_URL}/${this.list.vanityUrl}`;
  }

  get vanityUrl() {
    return this.$store.getters.list.vanityUrl;
  }

  @debounce(300, { leading: false })
  setVanityUrl(value: string) {
    this.list.vanityUrl = value.trim();
    this.$v.$touch();
  }

  async saveList() {
    this.isBusy = true;
    try {
      this.list.isNew
        ? await this.$store.dispatch("saveList")
        : await this.$store.dispatch("updateList");

      this.$router.push(`/${this.list.vanityUrl}`);
    } catch (err) {
      // handle this
    } finally {
      this.isBusy = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.control {
  padding: 10px 10px 0px;
  &.stretch {
    flex: 1 1 200px;
  }
}

.control-label {
  padding-bottom: 0.8rem;
  display: block;
}

.save-button {
  padding: 10px 10px 10px;
}

.live-link {
  margin-top: 10px;
  font-size: 12px;
}

@media only screen and (max-width: 700px) {
  .addbar {
    display: block;
  }
  .control {
    padding-right: 5px;
  }
}
</style>
