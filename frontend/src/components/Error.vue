<template>
  <modal name="log-in" width="60%" :adaptive="true" :max-width="500" :min-width="300">
    <div class="error">
      <div class="flex flex-column">
        <a class="is-aligned-right" href="#" @click.prevent="close()">
          <img src="../assets/close.png">
        </a>
        <div class="flex is-horizontally-centered is-vertically-centered sign-in-banner">
          <h1>Whoops!</h1>
          <img src="../assets/error.svg">
        </div>
        <p>There's been an error.</p>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import config from "../config";

@Component({
  watch: {
    hasError() {
      this.$v.hasStore;
    }
  }
})
export default class Login extends Vue {
  get hasError() {
    return this.$store.getters.appErrorMessage;
  }

  close() {
    this.$modal.hide("error");
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
