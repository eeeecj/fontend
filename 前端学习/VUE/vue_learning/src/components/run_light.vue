<template>
  <div class="run_light">
    <input type="button" value="浪起来" @click="lang" />
    <input type="button" value="低调" @click="end" />
    <p v-text="msg"></p>
  </div>
</template>

<script>
export default {
  name: "run_light",
  data() {
    return {
      msg: "猥琐发育、别浪！",
      intervalId: null,
    };
  },
  methods: {
    //VUE中想要访问data中的数据，需要使用this指针
    lang() {
      //使用箭头函数可使内部箭头函数this实例与外部this实例保持一致
      //也可用var _this=this替代
      if (this.intervalId == null) {
        this.intervalId = setInterval(() => {
          var start = this.msg.substring(0, 1);
          var end = this.msg.substring(1);
          this.msg = end + start;
        }, 400);
      }
    },
    end() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    },
  },
};
</script>

<style>
</style>