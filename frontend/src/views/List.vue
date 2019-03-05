<template>
  <div class="container">
    <div class="section">
      <div>
        <h2 class="has-text-primary">{{ list.description }}</h2>
        <link-list :links="list.links" :editable="false"></link-list>
      </div>
      <div
        class="flex is-horizontally-centered is-vertically-centered"
        v-show="list.vanityUrl.length > 0"
      >
        <not-found v-show="notFound" :vanity="list.vanityUrl"></not-found>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LinkList from "@/components/LinkList.vue";
import NotFound from "@/components/NotFound.vue";

@Component({
  components: {
    LinkList,
    NotFound
  }
})
export default class List extends Vue {
  get list() {
    return this.$store.getters.list;
  }

  notFound: boolean = false;

  async created() {
    // get the list from the db based on the url id
    let vanityUrl = this.$route.params.id;

    try {
      // get the list for this vanity
      await this.$store.dispatch("getList", vanityUrl);
    } catch (err) {
      this.notFound = true;
    }

    // does the logged in user own this list?
    // const ownsList = await this.$store.dispatch("getUserOwnsList");
  }
}
</script>
