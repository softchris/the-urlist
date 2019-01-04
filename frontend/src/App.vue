<template>
  <div>
    <progress-bar></progress-bar>
    <nav-bar></nav-bar>
    <router-view/>
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
import NavBar from "@/components/NavBar.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import Notification from "@/components/Notification.vue";

@Component({
  components: {
    Notification,
    NavBar,
    ProgressBar
  }
})
export default class List extends Vue {
  authUrl: string = process.env.VUE_APP_AUTH_URL;
}
</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto");

// @import "../node_modules/bulma/bulma.sass";
$primary-color: #2bad96;
$primary-color-hover: #31a490;
$primary-color-active: #2a8d7c;

body {
  background-color: #f9fafc;
  padding: 0;
  margin: 0;
  font-family: "Roboto", sans-serif;
  color: #71777e;
  font-size: 18px;
}

.section {
  margin-top: 75px;
  margin-bottom: 25px;
}

.container {
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
}

*:focus {
  outline: none;
}

.flex {
  display: flex;
  &.is-vertically-centered {
    align-items: center;
  }
  &.is-horizontally-centered {
    justify-content: center;
  }
  &.flex-column {
    flex-direction: column;
  }
}

button {
  height: 2.75em;
  border-radius: 4px;
  font-size: 1.25rem;
  line-height: 1.5;
  border: 1px solid transparent;
  padding-left: 0.75em;
  padding-right: 0.75em;
  background: inherit;
  cursor: pointer;
  &.is-color-primary:hover {
    background-color: $primary-color-hover;
  }
  &.is-color-primary:active {
    background-color: $primary-color-active;
  }
}

input {
  font-size: 2.25rem;
  height: 3.5rem;
  border-radius: 4px;
  border: 1px solid transparent;
  border-color: #979797;
  line-height: 1.5;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
}

.is-color-primary {
  background-color: $primary-color;
}

.has-text-white {
  color: #fff;
}

.has-text-primary {
  color: $primary-color;
}

.has-text-bold {
  font-weight: bold;
}

h2 {
  font-size: 2rem;
}

.is-aligned-right {
  margin-left: auto;
}
</style>
