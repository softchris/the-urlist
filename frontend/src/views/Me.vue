<template>
  <div class="content big-container">
    <h2 class="has-text-primary">My Collections</h2>
    <div class="columns">
      <div class="column is-one-quarter">
        <div class="list-item">
          <div class="list-item-content">
            <div
              class="placeholder flex flex-column is-horizontally-centered is-vertically-centered"
              @click="addNewList()"
            >
              <div>+</div>
              <div>Create new collection</div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-one-quarter" v-for="list in myLists" :key="list.vanityUrl">
        <div class="list-item" @click="editList(list.vanityUrl)">
          <div class="background flex">
            <img class="is-aligned-right" src="../assets/bg.png" alt>
          </div>
          <div class="card list-item-content">
            <div class="card-content list-item-content-details">
              <div class="badge link-count">{{ list.links.length }} Links</div>
              <h3>{{ list.vanityUrl }}</h3>
              <p>{{ list.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Me extends Vue {
  get myLists() {
    return this.$store.getters.myLists;
  }

  created() {
    this.$store.dispatch("setListEditable", false);

    // this.$store.dispatch("getMyLists");
  }

  addNewList() {
    this.$router.push("/new");
  }

  editList(vanityUrl: string) {
    this.$router.push(`/${vanityUrl}`);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.background {
  z-index: -9999;
  position: relative;
}

.list-item {
  margin-right: 20px;
  cursor: pointer;
  .list-item-content {
    height: 175px;
    margin-top: -20px;
    margin-right: 10px;
    padding-top: 20px;
  }
  .list-item-content-details {
    padding-left: 20px;
  }
}

.placeholder {
  height: 195px;
  box-sizing: border-box;
  border-style: dashed;
  margin-top: 15px;
  border-color: #979797;
  border-width: 2px;
}

.link-count {
  position: absolute;
  margin-top: -55px;
}
</style>
