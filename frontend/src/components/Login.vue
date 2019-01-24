<template>
  <modal name="log-in" width="60%" :adaptive="true" :max-width="500" :min-width="300">
    <div class="login">
      <div class="log flex flex-column">
        <a class="is-aligned-right" href="#" @click.prevent="close()">
          <img src="../assets/close.png">
        </a>
        <div class="flex is-horizontally-centered is-vertically-centered sign-in-banner">
          <h1>Sign in to</h1>
          <img src="../assets/logo.svg">
        </div>
        <div class="flex is-horizontally-centered login-content">
          <a :href="loginUrl" class="twitter-button has-text-white">
            <span>
              <i class="fab fa-twitter twitter-icon"></i>
              <span>with Twitter</span>
            </span>
          </a>
        </div>
        <p>Signing in is cool because you can view, edit and manage any lists that you create. It's nifty.</p>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import config from "../config";

@Component
export default class Login extends Vue {
  get loginUrl() {
    return config.AUTH_URL("twitter", this.$router.currentRoute.fullPath);
  }

  close() {
    this.$modal.hide("log-in");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  margin: 20px;
  text-align: center;
}

.login-content {
  margin: 20px;
}

.twitter-icon {
  padding-right: 20px;
}

.twitter-button {
  background-color: #1cabe9;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  text-align: center;
  text-decoration: none;
}

.sign-in-banner {
  h1 {
    margin: 0px 10px 0px 0px;
  }
  img {
    width: 100px;
  }
}
</style>
