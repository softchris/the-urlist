<template>
  <div class="flex flex-column full-height main">
    <div class="container">
      <div class="section">
        <div class="flex">
          <div>
            <h1>
              <span class="has-text-primary">Group</span> Links,
              <span class="has-text-primary">Save</span> &
              <span class="has-text-primary">Share</span> it with the world!
            </h1>
            <p>Add links to a list, give the list a description and get a URL you can send to anyone.</p>
            <p>Login to track, manage and edit your lists</p>
          </div>
          <img src="../assets/banner-logo-small.png">
        </div>
      </div>
    </div>
    <div class="section"></div>
    <div class="flex landing-footer is-horizontally-centered">
      <div class="landing-bottom is-full-height">
        <div class="container">
          <div class="section">
            <div class="flex is-horizontally-centered">
              <h2 class="has-text-primary">Get Started</h2>
            </div>
            <new-link @onAddNewLink="addLink"></new-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NewLink from "@/components/NewLink.vue";

@Component({
  components: {
    NewLink
  }
})
export default class Home extends Vue {
  created() {
    this.$store.dispatch("initList", false);
  }

  // event emitted by the
  addLink(url: string) {
    this.$store.dispatch("addLink", url);
    this.$router.push(`/new`);
  }
}
</script>

<style scoped lang="scss">
img {
  max-width: 100%;
  height: auto;
}

.landing-footer {
  overflow: hidden;
  flex: 1;
}

.landing-bottom {
  min-width: 150%;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  background-color: #f9fafc;
}
</style>
