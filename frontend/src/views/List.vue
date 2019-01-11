<template>
  <div class="container">
    <div class="section">
      <h2 class="has-text-primary">{{ list.description }}</h2>
      <link-list :links="list.links" editable="false"></link-list>
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

  created() {
    // get the list from the db based on the url id
    let vanityUrl = this.$route.params.id;

    if (this.list.vanityUrl != vanityUrl) {
      this.$store.dispatch("getList", { vanityUrl: vanityUrl, editable: true });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
