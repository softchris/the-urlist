<template>
  <div>
    <div class="columns" v-show="list.links.length > 0">
      <div class="column is-narrow">
        <button
          :class="{'is-loading': active }"
          :disabled="active"
          class="button is-large save-button"
          @click="saveList()"
        >Save List</button>
      </div>
      <div class="column">
        <input
          v-model="list.vanityUrl"
          type="text"
          class="input is-large"
          placeholder="Add a vanity URL"
        >
      </div>
      <div class="column">
        <input
          v-model="list.description"
          type="text"
          class="input is-large"
          placeholder="Add a description"
        >
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <sortable-list v-model="list.links">
          <sortable-item v-for="(link, index) in list.links" :index="index" :key="index">
            <link-list :link="link"></link-list>
          </sortable-item>
        </sortable-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SlickList, SlickItem } from "vue-slicksort";
import EventBus from "@/EventBus";
import IList from "@/models/IList";
import ILink from "@/models/ILink";
import { IOGData } from "@/models/IOGData";
import linkService from "@/services/link-service";
import ogService from "@/services/og-service";
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
export default class extends Vue {
  active: boolean = false;

  get list() {
    return this.$store.getters.list;
  }

  async saveList() {
    this.active = true;

    linkService
      .saveLinks(this.list)
      .then((list: IList) => {
        this.$store.commit("setList", list);
        this.$router.push(`/${list.vanityUrl}`);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.active = false;
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.save-button {
  margin-bottom: 20px;
}
</style>
