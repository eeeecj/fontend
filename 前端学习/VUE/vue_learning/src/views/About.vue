<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a href="" type="button" @click="Home">asjdnaslkd</a>
  </div>
</template>
<script>
export default {
  name: "About",
  data() {
    return {};
  },
  methods: {
    Home() {
      this.$router.push("/Home")
    },
  },
};
</script>