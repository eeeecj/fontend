<template>
  <div>
    <comment-box @postComment="loadComment"></comment-box>
    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="(item, index) in comment"
        :key="'comment' + index"
      >
        <span class="badge">评论人：{{ item.name }} </span>
        {{ item.content }}
      </li>
    </ul>
  </div>
</template>

<script>
import CommentBox from "./comment-box.vue";
export default {
  name: "CommentList",
  data() {
    return {
      comment: [
        { id: Date.now(), name: "李白", content: "天生我才必有用" },
        { id: Date.now(), name: "李白", content: "劝君更敬一杯酒" },
      ],
      list: null,
    };
  },
  components: {
    CommentBox,
  },
  created() {
    this.loadComment();
  },
  methods: {
    postComment(data) {
      this.comment.push(data);
    },
    loadComment() {
      //从本地加载列表
      var list = JSON.parse(localStorage.getItem("ctms") || "[]");
      this.comment = list;
    },
  },
};
</script>

<style>
</style>