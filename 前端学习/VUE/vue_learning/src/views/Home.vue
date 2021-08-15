<template>
  <transition name="home">
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
  </transition>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data() {
    return {
      duration: { enter: 400, leave: 1000 },
    };
  },
  components: {
    HelloWorld,
  },
};
</script>
<style >
.home-enter,
.home-leave-to {
  opacity: 0;
  /* transform:translateY(180px) */
}
.home-enter-active,
.home-leave-active {
  transition: all 5s ease;
}
</style>