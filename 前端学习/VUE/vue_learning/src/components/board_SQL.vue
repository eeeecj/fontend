<template>
  <div class="board">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">添加品牌</h3>
      </div>
      <div class="panel-body form-inline">
        <label for="">
          Id:
          <input type="text" class="form-control" name="" id="" v-model="id" />
        </label>
        <label for="">
          Name:
          <input
            type="text"
            class="form-control"
            name=""
            id=""
            v-model="name"
            @keyup.enter="add"
          />
          <!-- 按键修饰符 -->
        </label>

        <input
          type="button"
          class="btn btn-primary"
          name=""
          id=""
          value="确认"
          @click="add"
        />
        <label for="">
          搜索名称关键字:
          <!-- 在vue中,在调用时,都是以 v- 开头 -->
          <input type="text" v-model="keywords" v-focus />
        </label>
      </div>
    </div>

    <table class="table table-bordered table-hover table-striped">
      <thead>
        <tr>
          <td>Id</td>
          <td>Name</td>
          <td>Time</td>
          <td>operation</td>
        </tr>
      </thead>
      <tbody>
        <!-- 利用search方法传参动态显示表格 -->
        <tr v-for="item in search(keywords)" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.ctime }}</td>
          <td><a @click="remove(item.id)">删除</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "board_SQL",
  data() {
    return {
      list: [],
      id: null,
      name: "",
      keywords: "",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$http.get("getInfo").then((Response) => {
        this.list = Response.body;
      });
    },
    add() {
      this.$http
        .post(
          "getInfo/",
          { name: this.name, id: this.id, ctime: new Date().toString() },
          { emulateJSON: true }
        )
        .then((Response) => {
          this.init();
        });
    },
    remove(ID) {
      this.$http
        .delete("getInfo/" + ID)
        .then((Response) => {
          this.init();
        });
    },
    search(keywords) {
      return this.list.filter((item) => {
        if (item.name.indexOf(keywords) != -1) {
          return true;
        }
      });
    },
  },
  filters: {},
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>

<style>
</style>