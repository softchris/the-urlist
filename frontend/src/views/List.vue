<template>
  <div class="container">
    <div class="section">
      <h2 class="has-text-primary">{{ list.description }}</h2>
      <div class="columns">
        <div class="column">
          <sortable-list v-model="list.links">
            <sortable-item v-for="(link, index) in list.links" :index="index" :key="index">
              <link-list :link="link" :editable="false"></link-list>
            </sortable-item>
          </sortable-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SlickList, SlickItem } from "vue-slicksort";
import LinkList from "@/components/LinkList.vue";

const SortableList: object = SlickList;
const SortableItem: object = SlickItem;

@Component({
  components: {
    SortableList,
    SortableItem,
    LinkList
  }
})
export default class List extends Vue {
  get list() {
    return this.$store.getters.list;
  }

  created() {
    //XQHtCQS

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
