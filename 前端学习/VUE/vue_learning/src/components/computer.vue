<template>
  <div class="computer">
    <input type="text" v-model="in1" />
    <select name="" id="" v-model="compute">
      <option value="+">+</option>
      <option value="-">-</option>
      <option value="*">*</option>
      <option value="/">/</option>
    </select>
    <input type="text" v-model="in2" />
    <input type="button" value="=" @click="computes" />
    <input type="text" v-bind:value="result" />
  </div>
</template>

<script>
export default {
  name: "computer",
  data() {
    return {
      in1: 0,
      in2: 0,
      compute: "+",
      result: 0,
    };
  },
  methods: {
    computes() {
      //也可使用eval()替代,将字符串转为语句执行
      switch (this.compute) {
        case "+":
          this.result = parseFloat(this.in1) + parseFloat(this.in2);
          break;
        case "-":
          this.result = parseFloat(this.in1) - parseFloat(this.in2);
          break;
        case "*":
          this.result = parseFloat(this.in1) * parseFloat(this.in2);
          break;
        case "/":
          this.result = parseFloat(this.in1) / parseFloat(this.in2);
      }
    },
  },
};
</script>

<style>
</style>