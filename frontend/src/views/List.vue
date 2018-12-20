<template>
  <div class="page is-loading">
    <div class="column" v-for="(link, index) in list.links" :index="index" :key="index">
      <link-list :link="link"></link-list>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import linkService from "@/services/link-service";
import IList from "@/models/IList";
import LinkList from "@/components/LinkList.vue";

@Component({
  components: {
    LinkList
  }
})
export default class List extends Vue {
  get list() {
    return this.$store.getters.list;
  }

  created() {
    // get the list from the db based on the url id
    let vanityUrl = this.$route.params.id;
    let list = this.$store.getters.list;

    // check the store for an existing list. If it isn't there, ask the server for it.
    if (list.vanityUrl !== vanityUrl) {
      this.$store.dispatch("getList", vanityUrl);
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
