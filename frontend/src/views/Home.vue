<template>
  <div class="flex flex-column full-height main">
    <div class="container">
      <div class="section">
        <div class="flex">
          <div class="app-header">
            <h1>
              <span class="has-text-primary">Group</span> Links,
              <span class="has-text-primary">Save</span> &
              <span class="has-text-primary">Share</span> them with the world!
            </h1>
            <p>Add links to a list, give the list a description and get a URL you can send to anyone.</p>
            <br>
            <p>Login to track, manage and edit your lists</p>
          </div>
          <div class="is-hidden-mobile">
            <img src="../assets/banner-logo-small.png" class="banner-image">
          </div>
        </div>
      </div>
    </div>
    <div class="section"></div>
    <div class="flex landing-footer is-horizontally-centered">
      <div class="home-bottom-background is-hidden-mobile"></div>
      <div class="container home-bottom">
        <div class="section">
          <div class="flex is-horizontally-centered">
            <h2 class="has-text-primary">Get Started</h2>
          </div>
          <new-link @onAddNewLink="addLink"></new-link>
          <div class="flex is-horizontally-centered">
            <img src="../assets/banner-logo-small.png" class="banner-image is-visible-mobile">
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
    this.$store.dispatch("setShowAddBar", false);
  }

  // event emitted by the AddBar component
  addLink(url: string) {
    this.$store.dispatch("newLink", url);
    this.$router.push(`/new`);
  }
}
</script>

<style scoped lang="scss">
.main {
  background-color: #fff;
}

.banner-image {
  min-width: 482px;
}

.landing-footer {
  overflow: hidden;
  flex: 1;
}

.home-bottom {
  overflow: hidden;
  width: 100%;
}

.home-bottom-background {
  position: absolute;
  left: 0;
  right: -25%;
  margin-left: -25%;
  height: 100%;
  max-width: 150%;
  width: 150%;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  background-color: #f9fafc;
}

@media only screen and (min-width: 1000px) {
  .app-header {
    text-align: center;
  }
}
</style>
