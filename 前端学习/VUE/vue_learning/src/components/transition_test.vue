<template>
  <div id="demo">
    <button v-on:click="show = !show">Toggle</button>
    <transition name="fade">
      <p v-if="show">You are my Destiony</p>
    </transition>
    <transition
      name="transition-class"
      enter-active-class="animate__animated animate__slideInDown"
      leave-active-class="animate__animated animate__slideOutUp"
      :duration="duration"
    >
      <p v-show="show">You are my only love</p>
    </transition>
    <input type="button" @click="flag = !flag" value="到碗里去" />
    <transition
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
  name: "Transitions",
  data() {
    return {
      show: true,
      duration: { enter: 500, leave: 3000 },
      flag: false
    };
  },
  methods: {
    //第一个参数:el,表示动画要执行的元素
    beforeEnter(el) {
      //动画入场之前,动画并未开始,可进行初始化

      el.style.transform = "translate(0,0)"; //设置小球开始之前的起始位置
    },
    enter(el,done) {
      //动画开始之后的样式,可设置动画完成之后的结束状态
      
      el.offsetWidth;//该语句没有实际意义,但是没有该语句动画不显示
      el.style.transform = "translate(150px,-450px)"; //结束状态
      el.style.transition = "all 1s ease"; //设置过渡时长
      done()
      //在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。
      //done为afterEnter的引用
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
  background-color: #0f0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(180px);
}
</style>
