<template>
  <div class="links">
    <sortable-list v-model="list.links" :distance="10" :disabled="editable" lock-axis="y">
      <sortable-item
        v-for="(link, index) in list.links"
        :index="index"
        :key="index"
        :disabled="!editable"
      >
        <link-preview :link="link" :editable="editable"></link-preview>
      </sortable-item>
    </sortable-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SlickList, SlickItem } from "vue-slicksort";
import LinkPreview from "@/components/LinkPreview.vue";

const SortableList: object = SlickList;
const SortableItem: object = SlickItem;

@Component({
  props: ["links", "editable"],
  components: {
    SortableList,
    SortableItem,
    LinkPreview
  }
})
export default class extends Vue {
  get list() {
    return this.$store.getters.list;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.links {
  margin-right: 10px;
}
</style>
