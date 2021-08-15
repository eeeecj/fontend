<template>
  <div>
    <button type="button" @click="flag = true">board</button>
    <button type="button" @click="flag = false">computer</button>
    <board v-if="flag"></board>
    <computer v-else></computer>

    <!-- :is="componentId"为组件名称 -->
    <button type="button" @click="componentId = 'board'">board</button>
    <button type="button" @click="componentId = 'computer'">computer</button>
    <transition name="component-transition" mode="out-in">
      <component :is="componentId"></component>
    </transition>

    ------------------------------------------------------------------------------
    <button @click="a">nsdklsahndfkl;a</button>

    <component :is="$options.components.board"></component>
  </div>
</template>

<script>
import board from "./board.vue";
import computer from "./computer.vue";
export default {
  name: "changeCom",
  data() {
    return {
      flag: true,
      componentId: "board",
    };
  },
  props: {},
  components: {
    board,
    computer,
  },
  methods: {
    a() {
      console.log(this.$options.components);
    },
  },
};
</script>

<style>
.component-transition-enter,
.component-transition-leave-to {
  opacity: 0;
  transform: translateY(80px);
}
.component-transition-enter-active,
.component-transition-leave-active {
  transition: all 1s ease;
}
</style>