<template>
  <section class="container full main">
    <nav class="level">
      <div class="level-left"></div>
      <div class="level-right">
        <div class="level-item">
          <h1 class="title has-text-white">Site Name</h1>
        </div>
      </div>
    </nav>
    <router-view/>
  </section>
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>-->
</template>

<style lang="scss">
@import "../node_modules/bulma/bulma.sass";

.full {
  height: 100%;
}

.link {
  margin-bottom: 10px;
}

.main {
  padding-top: 20px;
}

body,
html {
  height: 100%;
}
</style>
