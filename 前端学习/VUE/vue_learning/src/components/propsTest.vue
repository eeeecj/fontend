<template>
  <div>
    <p>{{ msg }}</p>
    <input type="button" @click="omit" value="执行父组件传递的方法" />
  </div>
</template>

<script>
export default {
  name: "PropsTest",
  data() {
    //   data中的数据不是通过父组件传递过来的，而是其内部私有的
    return {
      func_data: { id: 1, name: "hello" },
    };
  },
  //父组件的元素需要在子组件中定义一下
  //   props中的元素是不可修改的
  props: {
    msg:String,
    func:Function,
  },
  methods: {
    omit() {
      //emit为触发函数
      this.$emit("func", this.func_data);
    },
  },
};
</script>

<style>
</style>