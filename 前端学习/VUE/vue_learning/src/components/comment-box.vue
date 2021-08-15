<template>
  <div>
    <div class="form-group">
      <label for="">评论人：</label>
      <input type="text" class="form-control" name="" id="" v-model="name" />
    </div>
    <div class="form-group">
      <label for="">评论内容：</label>
      <textarea class="form-control" v-model="content"></textarea>
    </div>
    <div class="form-group">
      <input
        type="button"
        class="btn btn-primary"
        value="发表评论"
        @click="addLocalstorage"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentBox",
  data() {
    return {
      name: "",
      content: "",
    };
  },
  props: {
    postComment: Function,
  },
  methods: {
    add() {
      this.$emit("postComment", {
        name: this.name,
        content: this.content,
        id: Date.now(),
      });
    },
    addLocalstorage() {
      var comment = { id: Date.now(), name: this.name, content: this.content };
      var list = JSON.parse(localStorage.getItem("ctms") || "[]"); //避免无法取得localstorage
      list.unshift(comment);
      //保存评论至localstorage
      localStorage.setItem("ctms", JSON.stringify(list));
      this.name = "";
      this.content = "";
      this.$emit("postComment")
    },
  },
};
</script>

<style>
</style>