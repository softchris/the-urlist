<template>
  <div class="container content">
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

  async created() {
    // is the user logged in? If not, redirect back to the home screen
    if (!this.$store.getters.currentUser.loggedIn) {
      this.$router.push("/");
    } else {
      this.$store.dispatch("setShowAddBar", true);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
