<template>
  <div>
    <div class="addbar container flex is-horizontally-centered">
      <div class="control">
        <label for="vanity-url">Vanity URL</label>
        <input id="vanity-url" v-model="list.vanityUrl" type="text">
      </div>
      <div class="control">
        <label for="description">Description</label>
        <input id="description" v-model="list.description" type="text">
      </div>
      <div class="save-button">
        <button class="is-color-primary has-text-white has-text-bold" @click="saveList()">Save List</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AddBar extends Vue {
  active: boolean = false;
  get list() {
    return this.$store.getters.list;
  }

  saveList() {
    this.$store
      .dispatch("saveList")
      .then(() => {
        this.$router.push(`/${this.list.vanityUrl}`);
      })
      .catch(err => {
        console.log(err);
      });
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
  margin-bottom: 10px;
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
