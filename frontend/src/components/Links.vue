<template>
  <div>
    <button class="button is-medium" @click="saveList()">Save List</button>
    <hr>
    <SlickList v-model="links">
      <SlickItem v-for="(link, index) in links" :index="index" :key="index">
        <div class="column">
          <div class="card">
            <div class="card-content">{{ link.url }}</div>
          </div>
        </div>
      </SlickItem>
    </SlickList>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SlickList, SlickItem } from "vue-slicksort";
import EventBus from "@/EventBus";
import ILink from "@/models/ILink";

@Component({
  components: {
    SlickList,
    SlickItem
  }
})
export default class extends Vue {
  links: Array<ILink> = new Array();

  created() {
    EventBus.$on("addLink", (link: ILink) => {
      this.$data.links.push(link);
    });
  }

  saveList() {
    // save the list to the server
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
