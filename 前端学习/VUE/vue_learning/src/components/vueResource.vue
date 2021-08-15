<template>
  <div class="vueResource">
    <input type="button" name="" id="" @click="getInfo" value="get请求" />
  </div>
</template>

<script>
export default {
  name: "vueResource",
  data() {
    return {};
  },
  methods: {
    getInfo() {
      //通过.then输出函数
      this.$http
        .get("http://jsonplaceholder.typicode.com/users", {})
        .then((Response) => {
          console.log(Response);
        });
      this.$http
        .post(
          "http://jsonplaceholder.typicode.com/users",
          {},
          { emulateJSON: true }
        )
        .then((Response) => {
          console.log(Response);
        });
      this.$http
        .jsonp("http://jsonplaceholder.typicode.com/users")
        .then((Response) => {
          console.log(Response);
        });
    },
  },
};
</script>

<style>
</style>