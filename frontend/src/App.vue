<template>
  <div>
    <nav-bar></nav-bar>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";

@Component({
  components: {
    NavBar
  }
})
export default class List extends Vue {
  authUrl: string = process.env.VUE_APP_AUTH_URL;
}
</script>
