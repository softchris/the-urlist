<template>
  <div class="container">
    <div class="section">
      <Links></Links>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AddBar from "@/components/AddBar.vue"; // @ is an alias to /src
import Links from "@/components/Links.vue";

@Component({
  components: {
    AddBar,
    Links
  }
})
export default class Home extends Vue {
  created() {
    this.$store.dispatch("initList", true);
  }
}
</script>

<style>
</style>

