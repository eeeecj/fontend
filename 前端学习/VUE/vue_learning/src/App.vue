<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/learning">Learning</router-link>|
      <router-link to="/setting">Setting</router-link>|
      <router-link to="/loginlimit">loginlimit</router-link> |
      <router-link to="/guidetransition">guideTransition</router-link>
    </div>
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      :duration="{enter:500,leave:500}"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  // .v-enter,
  // .v-leave-to {
  //   opacity: 0;
  //   transform: translateX(180px);
  // }
  // .v-enter-active,
  // .v-leave-active {
  //   transition: all 1s ease;
  // }
}
</style>
