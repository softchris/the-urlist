<template>
  <div>
    <div class="addbar container flex is-horizontally-centered">
      <div class="control stretch">
        <label class="control-label" for="vanity-url">Vanity URL</label>
        <input
          :class="{ invalid: !vanityIsAvailable }"
          id="vanity-url"
          v-model="list.vanityUrl"
          type="text"
          @keyup="checkVanityAvailable()"
          :disabled="!list.isNew"
        >
        <p class="error" v-show="!vanityIsAvailable">That vanity URL is already taken</p>
        <p class="live-link">
          <a :href="liveLink" v-show="!list.isNew" target="_new">{{liveLink}}</a>
        </p>
      </div>
      <div class="control stretch">
        <label class="control-label" for="description">Description</label>
        <textarea class="description" id="description" v-model="list.description"></textarea>
      </div>
      <div class="control">
        <label class="control-label is-hidden-mobile" for>&nbsp;</label>
        <button
          :disabled="!canSave"
          class="is-color-primary has-text-white has-text-bold save-button"
          @click="list.isNew ? saveList() : updateList()"
        >Save List</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { debounce } from "typescript-debounce-decorator";
import config from "@/config";

@Component
export default class AddBar extends Vue {
  get canSave() {
    return this.vanityIsAvailable && this.list.links.length > 0 && !this.isBusy;
  }
  isBusy: boolean = false;
  vanityIsAvailable: boolean = true;

  get list() {
    return this.$store.getters.list;
  }

  get liveLink() {
    return `${config.APP_URL}/${this.list.vanityUrl}`;
  }

  async updateList() {
    try {
      await this.$store.dispatch("updateList");
    } catch (err) {
      console.log("Could not save");
    }
  }

  async saveList() {
    try {
      await this.$store.dispatch("saveList");
      this.$router.push(`/${this.list.vanityUrl}`);
    } catch (err) {
      console.log("Could not save");
    }
  }

  @debounce(300, { leading: false })
  async checkVanityAvailable() {
    try {
      this.isBusy = true;
      const available = await this.$store.dispatch(
        "checkVanityAvailable",
        this.list.vanityUrl
      );
      this.vanityIsAvailable = available;
      console.log(this.vanityIsAvailable);
    } catch (err) {
      console.log(err);
    }

    this.isBusy = false;
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
