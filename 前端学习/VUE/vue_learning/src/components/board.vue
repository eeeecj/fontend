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
          <input type="text" v-model="keywords" v-focus v-color="'blue'" />
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
          <td>{{ item.ctime | dateFormater }}</td>
          <td><a @click="remove(item.id)">删除</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "board",
  data() {
    return {
      list: [
        { id: 1, name: "奔驰", ctime: new Date() },
        { id: 2, name: "宝马", ctime: new Date() },
      ],
      id: null,
      name: "",
      keywords: "",
    };
  },
  methods: {
    //添加对象
    add() {
      this.list.push({ id: this.id, name: this.name, ctime: new Date() });
    },
    //移除对象
    remove(ID) {
      // 在some中,如果return true,则立即终止循环
      this.list.some((item, i) => {
        if (item.id == ID) {
          this.list.splice(i, 1);
          return true;
        }
      });
      //   方法二
      // this.list.findIndex(item=>{
      //     if (item.id==ID){
      //         return true;
      //     }
      // })
    },
    search(keyword) {
      var new_list = [];
      this.list.forEach((item) => {
        //   indexOf 查询字符串中是否包含另一字符串,若不存在返回-1
        if (item.name.indexOf(keyword) != -1) {
          new_list.push(item);
        }
      });
      return new_list;
      //方法二
      return this.list.filter((item) => {
        if (item.name.includes(keywords)) {
          return true;
        }
      });
    },
  },
  filters: {
    // 语法为 Vue.filter("name",function(data){}),回调函数第一个参数始终为 过滤器 管道传输过来的值
    myFilter(data, item) {
      return item + data;
    },
    dateFormater(date) {
      var dt = new Date(date);
      var year = dt.getFullYear();
      var month = dt.getMonth() + 1;
      var day = dt.getDate();
      var hour = dt.getHours();
      var minute = dt.getMinutes();
      var second = dt.getSeconds();
      //利用padStart(num,str)填充字符串至指定位数
      var timeString =
        year.toString().padStart(4, "0") +
        "-" +
        month.toString().padStart(2, "0") +
        "-" +
        day.toString().padStart(2, "0") +
        " " +
        hour.toString().padStart(2, "0") +
        ":" +
        minute.toString().padStart(2, "0") +
        ":" +
        second.toString().padStart(2, "0");
      return timeString;
      //使用模板字符串
      var timeString2 = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      console.log(timeString2);
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
    color: {
      bind(el, binding) {
        //自定义设置字体颜色指令
        el.style.color = binding.value;
      },
    },
  },
};
</script>

<style>
</style>