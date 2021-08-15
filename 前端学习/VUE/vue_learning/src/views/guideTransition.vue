<template>
  <div>
    <router-link to="/guideTransition/aaaa">a</router-link>
    <router-link to="/guideTransition/bbbb">b</router-link>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "guideTransition",
  data() {
    return {
      transitionName: "",
    };
  },
  watch: {
    $route(to, from) {
      console.log(to.path);
    },
  },
  beforeRouteUpdate(to, from, next) {
    const toDeap = to.path.split("/").length;
    const fromDeap = from.path.split("/").length;
    this.transitionName = toDeap < fromDeap ? "slide-right" : "slide-right";
    next();
  },
  methods: {
    getPath() {
      console.log(this.$route.path);
    },
  },
};
</script>

<style>
.slide-left-enter,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-300px);
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 1s ease;
}
.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(300px);
}
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 1s ease;
}
</style>