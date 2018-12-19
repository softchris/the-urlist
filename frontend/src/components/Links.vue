<template>
  <div>
    <div class="columns" v-show="links.length > 0">
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
          v-model="vanityUrl"
          type="text"
          class="input is-large"
          placeholder="Add a vanity URL"
        >
      </div>
      <div class="column">
        <input
          v-model="description"
          type="text"
          class="input is-large"
          placeholder="Add a description"
        >
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <sortable-list v-model="links">
          <sortable-item v-for="(link, index) in links" :index="index" :key="index">
            <div class="card link">
              <div class="card-content">
                <div class="content">
                  <p>
                    <b>{{ link.title }}</b>
                  </p>
                  <p>{{ link.description }}</p>
                </div>
              </div>
            </div>
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

const SortableList: object = SlickList;
const SortableItem: object = SlickItem;

@Component({
  components: {
    SortableList,
    SortableItem
  }
})
export default class extends Vue {
  description: string = "";
  vanityUrl: string = "";
  links: Array<ILink> = new Array();
  active: boolean = false;

  created() {
    EventBus.$on("addLink", (link: string) => {
      let newLink = {
        url: link,
        title: link,
        description: " ",
        image: " "
      };

      // add an item to the links collection
      this.links.push(newLink);

      // get the open graph info for this link
      ogService
        .Scrape(link)
        .then((result: IOGData) => {
          (newLink.title = result.title),
            (newLink.description = result.description),
            (newLink.image =
              result.image.length > 0 ? result.image[0].url : "");
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  async saveList() {
    this.active = true;
    debugger;
    linkService
      .saveLinks(this.vanityUrl, this.description, this.$data.links)
      .then((list: IList) => {
        this.$store.commit("setActiveList", { list });
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
