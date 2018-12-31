<template>
  <div class="main">
    <section class="container wrapper">
      <nav class="level">
        <div class="level-left"></div>
        <div class="level-right">
          <div class="level-item">
            <h1 class="title has-text-white">Site Name</h1>
          </div>
        </div>
      </nav>
      <router-view/>
    </section>
    <notification></notification>
  </div>

  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>-->
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Notification from "@/components/Notification.vue";

@Component({
  components: {
    Notification
  }
})
export default class List extends Vue {}
</script>


<style lang="scss">
@import "../node_modules/bulma/bulma.sass";

body {
  min-height: 100vh;
}

.main {
  min-height: 100vh;
  padding-top: 20px;
}

.link {
  margin-bottom: 10px;
}

.wrapper {
  flex: 1;
}
</style>
