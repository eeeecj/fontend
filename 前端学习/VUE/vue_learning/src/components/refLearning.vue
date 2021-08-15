<template>
  <div>
    <button @click="show">输出ref</button>
    <p ref="p">REF</p>
    <comment-list ref="comment"></comment-list>
  </div>
</template>

<script>
import CommentList from "./comments.vue";
export default {
  name: "RefLearning",
  data() {
    return {};
  },
  methods: {
    show() {
      //通过ref获取元素内部的内容
      console.log(this.$refs.p.innerText);
      //获取子组件的数据与执行方法
      console.log(this.$refs.comment.comment);
    },
  },
  components: {
    CommentList,
  },
};
</script>

<style>
</style>