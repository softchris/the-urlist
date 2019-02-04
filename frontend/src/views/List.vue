<template>
  <div class="container">
    <div class="section">
      <h2 class="has-text-primary">{{ list.description }}</h2>
      <link-list :links="list.links" :editable="false"></link-list>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
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

  async created() {
    this.$store.dispatch("setShowAddBar", false);

    // get the list from the db based on the url id
    let vanityUrl = this.$route.params.id;

    // get the list for this vanity
    await this.$store.dispatch("loadList", vanityUrl);

    // does the logged in user own this list?
    // const ownsList = await this.$store.dispatch("getUserOwnsList");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
