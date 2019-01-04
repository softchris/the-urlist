<template>
  <header class="navbar">
    <ul class="navbar-content flex is-vertically-centered">
      <li>
        <img src="../assets/logo.png">
      </li>
      <li class="flex is-vertically-centered is-aligned-right">
        <img src="../assets/login.png" alt>
        <div class="login">
          <a href="login" class="login">Login / Sign Up</a>
        </div>
      </li>
    </ul>
    <add-bar v-show="editable"></add-bar>
  </header>
  <!-- <nav class="level">
    <div class="level-left"></div>
    <div class="level-right">
      <div class="level-item">
        <a class="has-text-white" :href="authUrl">Login with Twitter</a>
      </div>
    </div>
  </nav>-->
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AddBar from "@/components/AddBar.vue";
import config from "@/config";

@Component({
  components: {
    AddBar
  }
})
export default class extends Vue {
  get editable() {
    return this.$store.getters.list.editable;
  }
  // authUrl = config.AUTH_URL;
  // created() {
  //   // see if we can get the current logged in user
  //   this.$store.dispatch("getUser").then(user => {
  //     console.log(user);
  //   });
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navbar {
  background: white;
  box-shadow: 0px 5px 40px 1px #e8e8e8;
}

.navbar-content {
  height: 100%;
  max-width: 1344px;
  margin: auto;
  padding: 1rem 2rem 1rem 2rem;
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: #71777e;
  }
}

.login {
  margin-left: 5px;
}
</style>
