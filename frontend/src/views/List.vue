<template>
  <div class="page is-loading">
    <div class="column is-half" v-for="(link, index) in list.links" :index="index" :key="index">
      <div class="card">
        <div class="card-content">{{ link }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import linkService from "@/services/link-service";
import IList from "@/models/IList";

@Component
export default class List extends Vue {
  get list() {
    return this.$store.state.activeList;
  }

  created() {
    // get the list from the db based on the url id
    let vanityUrl = this.$route.params.id;

    // check the store for an existing list. If it isn't there, ask the server for it.
    if (this.$store.getters.activeList.vanityUrl !== vanityUrl) {
      linkService.getLinks(vanityUrl).then((list: IList) => {
        this.$store.commit("setActiveList", { list });
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.page {
  height: 100%;
}
</style>
