<template>
  <header class="navbar">
    <div class="progress-bar">
      <progress-bar></progress-bar>
    </div>
    <ul class="big-container navbar-content flex is-vertically-centered">
      <li>
        <img src="../assets/logo.png">
      </li>
      <li class="is-aligned-right">
        <a class="login flex is-vertically-centered" href="#" @click.prevent="profileLoginClick()">
          <img class="profile-image" :src="currentUser.profileImage || '../assets/login.png'" alt>
          <span class="login">{{ currentUser.name }}</span>
        </a>
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
import ProgressBar from "@/components/ProgressBar.vue";
import User from "@/models/User";
import config from "@/config";
import "../assets/login.png";

@Component({
  components: {
    AddBar,
    ProgressBar
  }
})
export default class extends Vue {
  get currentUser(): User {
    return this.$store.getters.currentUser;
  }

  get editable() {
    return this.$store.getters.list.editable;
  }

  profileLoginClick() {
    if (this.currentUser.loggedIn) {
      this.$router.push("/me");
    } else {
      this.$modal.show("log-in");
    }
  }

  async created() {
    // check to see if the user is logged in
    try {
      console.log("no user");
      let user = this.$store.dispatch("getUser");
    } catch (err) {
      console.log("User is not logged in");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.progress-bar {
  height: 6px;
}

.navbar {
  top: 0;
  width: 100%;
  background: white;
  box-shadow: 0px 5px 40px 1px #e8e8e8;
}

.navbar-content {
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: #71777e;
  }
}

.profile-image {
  border-radius: 50%;
  margin-right: 10px;
}

.login {
  margin-left: 5px;
}
</style>
