<template>
  <div>
    <div class="addbar container flex is-horizontally-centered">
      <div class="control stretch">
        <label class="control-label" for="vanity-url">Vanity URL</label>
        <input
          :class="{ invalid: !vanityIsValid }"
          id="vanity-url"
          ref="vanityUrl"
          v-model="list.vanityUrl"
          type="text"
          :disabled="!list.isNew"
          @blur="checkVanity"
        />
        <p class="error" v-show="!vanityIsValid">{{ validationError }}</p>
        <p class="live-link">
          <a :href="liveLink" v-show="!list.isNew" target="_new">{{
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
          :disabled="list.links.length === 0"
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
const customVanity = helpers.regex("customVanity", /^([a-zA-Z0-9_\-])+$/);
/* eslint-enable */

@Component({
  mixins: [validationMixin],
  validations: {
    vanityUrl: {
      customVanity
    }
  }
})
export default class AddBar extends Vue {
  get canSave() {
    return this.vanityIsValid && this.list.links.length > 0 && !this.isBusy;
  }
  isBusy: boolean = false;
  vanityIsValid: boolean = true;
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

  async saveList() {
    await this.checkVanity();

    if (this.canSave) {
      try {
        this.isBusy = true;

        this.list.isNew
          ? await this.$store.dispatch("saveList")
          : await this.$store.dispatch("updateList");

        this.$router.push(`/${this.list.vanityUrl}`);
      } catch (err) {
        // TODO
      } finally {
        this.isBusy = false;
      }
    }
  }

  setVanityInvalid() {
    this.vanityIsValid = false;
    this.validationError = "That is not a valid vanity URL";
  }

  async checkVanityAvailable() {
    try {
      this.isBusy = true;
      const available = await this.$store.dispatch(
        "checkVanityAvailable",
        this.list.vanityUrl
      );
      this.vanityIsValid = available;
      this.validationError = "That URL is not available";
    } catch (err) {
      // TODO
    } finally {
      this.isBusy = false;
    }
  }

  @debounce(300, { leading: false })
  async checkVanity() {
    this.$v.$invalid && this.setVanityInvalid();
    !this.$v.$invalid && (await this.checkVanityAvailable());
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
