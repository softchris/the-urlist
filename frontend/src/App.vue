<template>
  <div>
    <nav-bar></nav-bar>
    <router-view/>
    <login></login>
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
import Login from "@/components/Login.vue";
import "@fortawesome/fontawesome-free/js/all";
// import Notification from "@/components/Notification.vue";

@Component({
  components: {
    NavBar,
    Login
  }
})
export default class List extends Vue {
  authUrl: string = process.env.VUE_APP_AUTH_URL;
}
</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto");
@import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

// @import "../node_modules/bulma/bulma.sass";
$primary-color: #20ae96;
$primary-color-hover: #31a490;
$primary-color-active: #2a8d7c;

body {
  background-color: #f9fafc;
  padding: 0;
  margin: 0;
  font-family: "Roboto", sans-serif;
  color: #222c38;
  font-size: 18px;
}

.full-height {
  min-height: 100vh;
}

.section {
  margin-bottom: 25px;
}

.big-container {
  height: 100%;
  max-width: 1344px;
  margin: auto;
  padding: 1rem 2rem 1rem 2rem;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  position: relative;
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

.card {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 5px 40px 1px #e8e8e8;
  margin-bottom: 1em;
}

input,
textarea {
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

input {
  font-size: 2.25rem;
}

textarea {
  font-size: 1rem;
}

.is-color-primary {
  background-color: $primary-color;
}

.has-text-white {
  color: #fff;
}

.has-background-white {
  background-color: white;
}

.has-text-primary {
  color: $primary-color;
}

.has-text-bold {
  font-weight: bold;
}

h1 {
  font-size: 30px;
  font-weight: 300;
  line-height: 1.33;
}

h2 {
  font-size: 30px;
  font-weight: 500;
}

h3 {
  font-size: 20px;
}

.badge {
  background-color: $primary-color;
  border-radius: 20px;
  color: white;
  padding: 2px 10px;
}

.is-aligned-right {
  margin-left: auto;
}

.x {
  text-decoration: none;
  color: inherit;
}

.columns {
  display: flex;
  flex-flow: row wrap;
}

.column {
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  &.is-one-quarter {
    width: 25%;
    flex: none;
  }
}
</style>
