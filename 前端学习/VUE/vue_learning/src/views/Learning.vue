<template>
  <div class="Learning">
    <run_light />
    <computer />
    <Learning_com msg="Welcome" />
    <board />
    <vue-resource></vue-resource>
    <board_SQL />
    <Transitions />
    <list-group></list-group>
    <change-com></change-com>
    <small-ball></small-ball>
    <props-test :msg="'hello'" @func="show"></props-test>
    <comment-list></comment-list>
    <ref-learning></ref-learning>
  </div>
</template>
<script>
import Learning_com from "@/components/Learning_com.vue";
import run_light from "@/components/run_light.vue";
import computer from "@/components/computer.vue";
import board from "@/components/board.vue";
import vueResource from "@/components/vueResource.vue";
import board_SQL from "@/components/board_SQL.vue";
import Transitions from "@/components/transition_test.vue";
import listGroup from "@/components/list_group.vue";
import changeCom from "@/components/changeCom.vue";
import smallBall from "@/components/smallBall.vue";
import PropsTest from "@/components/propsTest.vue";
import CommentList from "@/components/comments.vue";
import RefLearning from "@/components/refLearning.vue"

export default {
  name: "Learning",
  components: {
    Learning_com,
    run_light,
    computer,
    board,
    vueResource,
    board_SQL,
    Transitions,
    listGroup,
    changeCom,
    smallBall,
    PropsTest,
    CommentList,
    RefLearning
  },
  data() {
    return {
      post_test: null,
    };
  },
  methods: {
    show(data) {
      this.post_test = data;
      console.log(data);
    },
  },
};
</script>

<style>
</style>