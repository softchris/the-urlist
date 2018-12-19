<template>
  <div>
    <section>
      <AddBar></AddBar>
    </section>
    <section class="section">
      <Links></Links>
    </section>
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
export default class Home extends Vue {}
</script>

<style>
</style>

