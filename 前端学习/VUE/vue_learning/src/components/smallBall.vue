<template>
  <div>
    <input
      type="button"
      value="加入购物车"
      @click="flag = !flag"
      name=""
      id=""
    />
    <transition
      name="smallball"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div class="ball" v-if="flag"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "smallBall",
  data() {
    return {
      flag: true,
    };
  },
  methods: {
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      el.style.transform="translate(80px,-450px)";
      el.style.transition = "all 1s ease";
      done();
    },
    afterEnter(el) {
      this.flag = !this.flag;
    },
  },
};
</script>

<style>
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #f00;
}
</style>
