<template>
  <div class="links">
    <sortable-list v-model="links" :distance="10" :disabled="editable">
      <sortable-item
        v-for="(link, index) in links"
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
  created() {
    console.log(this.$props.editable);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.links {
  margin-right: 10px;
}
</style>
