<template>
  <div>
    <nav-bar></nav-bar>
    <router-view/>
    <login></login>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";
import Login from "@/components/Login.vue";

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
</style>
