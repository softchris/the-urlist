<template>
  <div>
    <div class="addbar container flex is-horizontally-centered">
      <div class="control">
        <label for="vanity-url">Vanity URL</label>
        <input
          :class="{ invalid: !vanityIsAvailable }"
          id="vanity-url"
          v-model="list.vanityUrl"
          type="text"
          @keyup="checkVanityAvailable()"
          :disabled="list.editable && list.vanityUrl.length > 0"
        >
        <p class="error" v-show="!vanityIsAvailable">That vanity URL is already taken</p>
      </div>
      <div class="control">
        <label for="description">Description</label>
        <textarea class="description" id="description" v-model="list.description"></textarea>
      </div>
      <div class="save-button">
        <button class="is-color-primary has-text-white has-text-bold" @click="saveList()">Save List</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { debounce } from "typescript-debounce-decorator";

@Component
export default class AddBar extends Vue {
  active: boolean = false;
  vanityIsAvailable: boolean = true;
  get list() {
    return this.$store.getters.list;
  }

  async saveList() {
    try {
      await this.$store.dispatch("saveList");
      this.$router.push(`/${this.list.vanityUrl}`);
    } catch (err) {
      console.log("could not do something to something");
    }
  }

  @debounce(300, { leading: false })
  async checkVanityAvailable() {
    try {
      const available = await this.$store.dispatch(
        "checkVanityAvailable",
        this.list.vanityUrl
      );
      this.vanityIsAvailable = available;
      console.log(this.vanityIsAvailable);
    } catch (err) {
      console.log(err);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.control {
  padding: 10px 30px 10px 0px;
  flex: 1;
  label {
    padding-bottom: 0.8rem;
    display: block;
  }
}

.save-button {
  margin-bottom: 15px;
  align-self: flex-end;
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
