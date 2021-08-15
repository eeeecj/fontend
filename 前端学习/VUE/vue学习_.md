# [v-cloak、v-text 、v-html](https://v3.cn.vuejs.org/guide/template-syntax.html#%E6%8F%92%E5%80%BC)

1. v-cloak 可避免因网络不好造成代码渲染不成功问题

```Html
    {{msg}}
    <p v-text="msg"></p>
    <div v-html="html"></div>
    <!-- 避免网络不好造成vue加载缓慢行程部分插件显示不正常 -->
    <div v-cloak>ststst</div>
```

# [v-bind , v-on](https://v3.cn.vuejs.org/guide/events.html)

```Html
    <!-- myTitle 绑定事件 -->
    <!-- .stop阻止冒泡 -->
    <input type="button" :value="myTitle+'123'" v-on:click.stop="alter">
```

## 走马灯实现

```HTML
<template>
  <div class="run_light">
    <input type="button" value="浪起来" @click="lang" />
    <input type="button" value="低调" @click="end" />
    <p v-text="msg"></p>
  </div>
</template>

<script>
export default {
  name: "run_light",
  data() {
    return {
      msg: "猥琐发育、别浪！",
      intervalId: null,
    };
  },
  methods: {
    //VUE中想要访问data中的数据，需要使用this指针
    lang() {
      //使用箭头函数可使内部箭头函数this实例与外部this实例保持一致
      //也可用var _this=this替代
      if (this.intervalId == null) {
        this.intervalId = setInterval(() => {
          var start = this.msg.substring(0, 1);
          var end = this.msg.substring(1);
          this.msg = end + start;
        }, 400);
      }
    },
    end() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    },
  },
};
</script>
```

# [修饰符](https://v3.cn.vuejs.org/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)

1. .stop 阻止冒泡
2. .prevent 阻止默认事件
3. .capture 添加事件监听器使用事件捕获模式
4. .self 只有时间在该元素本身时触发
5. .once 事件只触发一次

# [v-model](https://v3.cn.vuejs.org/guide/forms.html#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95)

```html
<div>
  <!-- v-model唯一一个双向数据绑定指令  -->
  <!-- v-model只能运用于表单元素 -->
  <h4 v-text="input_msg"></h4>
  <input type="text" name="" id="" v-model="input_msg" />
</div>
```

```javascript
 data() {
    return {
      html:"<p>hello</p>",
      myTitle:"按钮",
      input_msg:""
    };
  }
```

## 计算器实现

```html
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
        //eval("parseInt(this.in1)"+this.compute+"parseInt(this.in2)")
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
```

# [CLass 使用样式](https://v3.cn.vuejs.org/guide/class-and-style.html#%E7%BB%91%E5%AE%9A-html-class)

1. 数组\
   使用 v-bind 绑定数据
   ```html
   <h1 :class="['thin', 'color']">大</h1>
   ```
2. 数组中使用表达式
   ```html
   <h1 :class="['thin', 'color',flag?'active':'']">大</h1>
   ```
3. 使用类
   ```html
   <h1 :class="['thin', 'color',{'active':flag}]">大</h1>
   ```
4. 直接使用对像
   ```html
   <h1 :class="{red:true,italic:true,thin:true}">大</h1>
   ```

# [v-for](https://v3.cn.vuejs.org/guide/list.html)

1. 迭代数组
   ```html
   <p v-for="item in list1" :key="item">{{item}}</p>
   ```
   ```javascript
    data() {
        return {
        list1: [1, 2, 3, 4, 5],
        };
    },
   ```
2. 迭代数组对象

   ```html
   <p v-for="(user, index) in list2" :key="'list2' + index">
     {{ user.id }}:{{ user.name }}
   </p>
   ```

   ```javascript
     data() {
        return {

            list2: [
            { id: 1, name: "张三" },
            { id: 2, name: "李四" },
            ],
        };
      },
   ```

3. 迭代对象
   ```html
   <p v-for="(val, key, index) in list3" :key="'list3' + index">
     {{ val }}:{{ key }},{{ index }}
   </p>
   ```
   ```javascript
   data() {
     return {
       list3: {
         id: 1,
         name: "王五",
         gender: "男",
       },
     };
   },
   ```
4. 循环次数
   ```html
   <p v-for="count in 10" :key="'count' + count">{{ count }}</p>
   ```

## 品牌案例

```html
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
            @click.enter="add"
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
          <input type="text" v-model="keywords" />
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
          <td>{{ item.ctime|dateFormater }}</td>
          <td><a @click="remove(item.id)">删除</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
```

```html
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
  };
</script>
```

# [v-if , v-show](https://v3.cn.vuejs.org/guide/conditional.html#v-if)

1. v-if 每次都会重新删除创建元素
2. v-show 只是切换元素的 display:none 样式
   - v-if 有较高的切换性能消耗
   - v-show 有较高的初始渲染消耗

# [过滤器](https://v3.cn.vuejs.org/guide/migration/filters.html#%E6%A6%82%E8%A7%88)

1. 方法一
   ```javascript
   {
     {
       name | filter;
     }
   }
   ```
2. 定义语法
   1. 全局过滤器
   ```javascript
   // 语法为 Vue.filter("name",function(data){}),回调函数第一个参数始终为 过滤器 管道传输过来的值
   Vue.filter("myFilter", function (item, data) {
     return item + data;
   });
   ```
   2. 局部过滤器
   ```javascript
   filters: {
   // 语法为 Vue.filter("name",function(data){}),回调函数第一个参数始终为 过滤器 管道传输过来的值
   myFilter(data, item) {
     return item + data;
   },}
   ```

# [按键修饰符](https://v3.cn.vuejs.org/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)

1. Vue 为最常用的键提供了别名：

- .enter
- .tab
- .delete (捕获“删除”和“退格”键)
- .esc
- .space
- .up
- .down
- .left
- .right<br>

2. 可在 main.js 下定义按键修饰符

```javascript
//自定义按键修饰符
Vue.config.keyCodes.f2 = 113;
```

# [自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)

1. 全局定义
   ```javascript
   Vue.directive("focus", {
     // 当被绑定的元素插入到 DOM 中时……
     inserted: function (el) {
       // 聚焦元素 el.focus()
     },
   });
   ```
2. 局部定义
   ```javascript
   directives: {
     focus: { // 指令的定义
     inserted: function (el) {
        el.focus()
     }
    }
   }
   ```
3. 使用
   ```html
   <input v-focus />
   ```
   一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  - 和样式有关的操作在 bind 中使用
- inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  - 和 JS 有关的操作在 inserted 中定义
- update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

4. 获取属性值
   ```html
   <input v-color="blue" />
   ```
   ```javascript
   directives: {
    color: {
      bind(el, binding) {
        //自定义设置字体颜色指令
        el.style.color = binding.expression;
      },
    },
   },
   ```
   指令钩子函数会被传入以下参数：

- el：指令所绑定的元素，可以用来直接操作 DOM。
- binding：一个对象，包含以下 property：
  - name：指令名，不包括 v- 前缀。
  - value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
  - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
  - expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
  - arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
  - modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。

5. 函数简写
   在很多时候，你可能想在 bind 和 update 时触发相同行为，而不关心其它的钩子。比如这样写：
   ```javascript
   directives: {
    color(el,binding){
      el.style.color=binding.expression
    }
   },
   ```

# [生命周期](https://cn.vuejs.org/v2/guide/instance.html)

![生命周期](https://cn.vuejs.org/images/lifecycle.png)

1. 创建阶段生命周期函数

   1. `beforeCreate(){}` 表示实例完全被创建出来之前执行

      - 该阶段 methods 方法与 data 数据都没有初始化

   2. `created(){}` 实例完全创建后执行

      - methods 与 data 均已初始化
      - 若要操作 methods 方法与 data 数据,最早在此执行

   3. `beforeMounted(){}` 在将 VUE 渲染的模板挂载在页面之前执行

      - 页面中元素内容并没有得到 VUE 模板更新,只是模板字符串

   4. `mounted(){}` 将内存中的 VUE 模板挂载到页面
      - 实例已完全挂载至页面
      - 若要操作页面中的元素,最早在`mounted(){}`中进行
      - VUE 实例已经初始化完毕

2. 运行阶段生命周期函数

   1. `beforeUpdate(){}`

      - 根据 data 中的数据变化次数进行执行
      - 界面还没有更新,data 已经被改变

   2. `update(){}`
      - 页面已将与数据同步

3. 销毁阶段生命周期函数
   1. `beforeDestroy(){}`
      - 此阶段 data 与 methods 都为可用状态
   2. `destroy(){}`
      - 此阶段组件已完全被销毁
      - 组件中的 data 与 methods 不可用

# 发起 get,post,jsonp 请求

## 配置 jsonPlaceholder 建立虚假数据库

1. 安装
   1. 建立文件夹
   2. 进入文件夹,输入
      ```
      npm install json-server
      ```
   3. 配置 package.json 文件夹
   ```json
   {
     "name": "jsonserver",
     "version": "1.0.0",
     "description": "test restful api",
     "main": "index.js",
     "scripts": {
       "json:server": "json-server --watch db.json",
       "json:server:remote": "json-server http://jsonplaceholder.typicode.com/db"
     },
     "author": "",
     "license": "ISC",
     "dependencies": {
       "json-server": "^0.16.3"
     }
   }
   ```
   4. 建立 db.json
   ```json
   {
     "users": [
       {
         "name": "Henry",
         "phone": "333-444-555",
         "id": 1
       },
       {
         "name": "adfasdf",
         "phone": "fasdfasfd",
         "email": "asdfasfd",
         "id": 3
       }
     ],
     "xxx": [
       {
         "aa": "absbs"
       }
     ]
   }
   ```
   5. 启动
   ```
   npm run server:json
   ```

## [vue-resource](https://github.com/pagekit/vue-resource/blob/develop/docs/http.md)

执行网址
http://jsonplaceholder.typicode.com/users

### 配置

1.  安装

```javascript
npm install vue-resource
```

2. main.js

```javascript
import VueResource from "vue-resource";
window.Vue = Vue;
Vue.use(VueResource);
```

3. 参数列表\
   https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
4. 使用

   1. get

   ```javascript
   this.$http
     .get("http://jsonplaceholder.typicode.com/users", {})
     .then((Response) => {
       console.log(Response);
     });
   ```

   2. post

      - post 请求只接受表单格式,应添加 `content type` 为 `application/x-www-form-urlencoded`
      - vue-resource 中只需要修改`emulateJSON`为`true`即可

   ```javascript
   this.$http
     .post(
       "http://jsonplaceholder.typicode.com/users",
       {},
       { emulateJSON: true }
     )
     .then((Response) => {
       console.log(Response);
     });
   ```

   3. jsonp
      - 跨域请求

   ```javascript
   this.$http
     .jsonp("http://jsonplaceholder.typicode.com/users")
     .then((Response) => {
       console.log(Response);
     });
   ```

### 利用 vue-resource 访问数据库资源

```html
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
```

```javascript
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
      this.$http.get("http://localhost:3000/getInfo").then((Response) => {
        this.list = Response.body;
      });
    },
    add() {
      this.$http
        .post(
          "http://localhost:3000/getInfo/",
          { name: this.name, id: this.id, ctime: new Date().toString() },
          { emulateJSON: true }
        )
        .then((Response) => {
          this.init();
        });
    },
    remove(ID) {
      this.$http
        .delete("http://localhost:3000/getInfo/" + ID)
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
```

### 配置全局数据接口

1. 配置 URL
   配置了请求的根域名的时候,在每次发起 http 请求的时候,请求应以相对路径开头,前面不能带 '/'.

```javascript
Vue.http.options.root = "http://localhost:3000/";
```

```javascript
this.$http.delete("getInfo/" + ID).then((Response) => {
  this.init();
});
```

2. 配置 emulateJSON

```javascript
Vue.http.options.emulateJSON = true;
```

## [axios](https://github.com/axios/axios)

# [过渡动画](https://cn.vuejs.org/v2/guide/transitions.html)

1. v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

2. v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

3. v-enter-to：2.1.8 版及以上定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。

4. v-leave：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

5. v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

6. v-leave-to：2.1.8 版及以上定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。

![动画](https://cn.vuejs.org/images/transition.png)

若使用 v-开头(相同的名称),会造成多个 transition 共用一个动画

```html
<template>
  <div id="demo">
    <button v-on:click="show = !show">Toggle</button>
    <transition name="fade">
      <!-- 定义动画的名称 -->
      <p v-if="show">You are my Destiony</p>
    </transition>
  </div>
</template>
```

```javascript
<script>
export default {
  name: "Transitions",
  data() {
    return {
      show: true,
    };
  },
};
</script>
```

```css
<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s;

}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(180px);
}
</style>
```

## [使用 animate.css 类](https://cn.vuejs.org/v2/guide/transitions.html)

1. 安装
   ```
   npm install animate.css
   ```
2. 配置
   ```javascript
   import animated from "animate.css";
   Vue.use(animated);
   ```
3. 使用\
    使用 animate 时,需要添加最基本的类 animated\
    我们可以通过以下 attribute 来自定义过渡类名：
   - enter-class
   - enter-active-class
   - enter-to-class (2.1.8+)
   - leave-class
   - leave-active-class
   - leave-to-class (2.1.8+)
     注意 animate.css
     使用:duration 设置入场时间与离场时间

```html
<transition
  name="transition-class"
  enter-active-class="animate__animated animate__slideInDown"
  leave-active-class="animate__animated animate__slideOutUp"
  :duration="{enter:400,leave:1000}"
>
  <p v-show="show">You are my only love</p>
</transition>
```

## [半场动画钩子函数](https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-%E9%92%A9%E5%AD%90)

### 实现购物袋小球动画

```html
<input type="button" @click="flag = !flag" value="到碗里去" />
<transition
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter"
>
  <div class="ball" v-if="flag"></div>
</transition>
```

```javascript
<script>
export default {
  name: "Transitions",
  data() {
    return {
      flag: false
    };
  },
  methods: {
    //第一个参数:el,表示动画要执行的元素
    beforeEnter(el) {
      //动画入场之前,动画并未开始,可进行初始化

      el.style.transform = "translate(0,0)"; //设置小球开始之前的起始位置
    },
    enter(el,done) {
      //动画开始之后的样式,可设置动画完成之后的结束状态

      el.offsetWidth;//该语句没有实际意义,但是没有该语句动画不显示
      el.style.transform = "translate(150px,-450px)"; //结束状态
      el.style.transition = "all 1s ease"; //设置过渡时长
      done()
      //在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。
      //done为afterEnter的引用
    },
    afterEnter(el) {
      this.flag = !this.flag;
    },
  },
};
</script>
```

```css
<style>
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #0f0;
}
</style>
```

## [列表动画](https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%97%E8%A1%A8%E8%BF%87%E6%B8%A1)

1. 使用 v-for 渲染的标签无法使用 transition 渲染实现动画效果，需要使用 transition-group 实现
2. appear 可实现页面加载时的动画效果
3. tag 可指定 transition 渲染的标签类型，不指定则渲染为 span 标签

### 实现列表组

```html
<template>
  <div class="list-group">
    <div>
      <label for="">
        ID:
        <input type="text" v-model="id" />
      </label>
      <label for="">
        Name:
        <input type="text" v-model="name" />
      </label>
      <button type="button" class="btn btn-primary" @click="add">添加</button>
    </div>

    <!-- <ul> -->
    <!-- 在实现列表过渡的时候，若元素是v-for渲染出来的，不能使用transition，需要使用transition-group -->
    <transition-group appear tag="ul">
      <!-- appear实现页面加载时入场动画效果 -->
      <!-- tag属性指定transition渲染为什么元素，不指定默认为span标签 -->
      <li v-for="(item, index) in list" :key="item.id" @click="remove(index)">
        {{ item.id }}--{{ item.name }}
      </li>
    </transition-group>
    <!-- </ul> -->
  </div>
</template>
```

```javascript
<script>
export default {
  name: "listGroup",
  data() {
    return {
      list: [
        { id: 1, name: "赵高" },
        { id: 2, name: "秦桧" },
        { id: 3, name: "魏忠贤" },
      ],
      id: null,
      name: "",
    };
  },
  methods: {
    add() {
      this.list.push({ id: this.id, name: this.name });
      this.id = null;
      this.name = "";
    },
    remove(id) {
      this.list.splice(id, 1);
    },
  },
};
</script>
```

```css
<style>
li {
  border: 1px dashed #999;
  margin: 5px;
  line-height: 35px;
  padding-left: 5px;
  width: 100%;
}
li:hover {
  background-color: hotpink;
  transition: all 0.4s ease;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(80px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
/* 设置元素在位移时候的效果 */
/* 固定写法 */
/* .v-move 与.v-leave-active配合使用，可以实现列表后续元素渐渐飘上的效果。 */
.v-move {
  transition: all 0.6s ease;
}
.v-leave-active {
  position: absolute;
}
</style>
```

# [组件](https://cn.vuejs.org/v2/guide/components-registration.html)

利用组件实现不同的功能，组件与模块化不同：

- 模块化是从代码逻辑角度划分，保证每个功能模块单一
- 组件化是从 UI 界面的角度划分，方便 UI 组件重用

### 命名方式

1. 如果使用 Vue.component 定义全局组件的时候，组件名臣使用“驼峰命名”，则在引用组件的时候需要把大写驼峰改为小写字母，两单词之前使用 - 链接
2. 若不使用驼峰，则直接拿名称即可使用

##

- 组件模板只能拥有唯一一个根元素

1. 定义全局组件

   1. 方式 1

   ```javascript
   var com1 = Vue.extend({
     template: "<h1> Hello WORLD</h1>",
   });
   Vue.component("myCom1", com1);
   ```

   ```html
   <my-com1></my-com1>
   ```

   简写

   ```javascript
   Vue.component(
     "myCom1",
     Vue.extend({
       template: "<h1> Hello WORLD</h1>",
     })
   );
   ```

   2. 方式 2

   ```javascript
   Vue.component("myCom2", {
     template: "<h1> Hello WORLD</h1>",
   });
   ```

   3. 方式 3
      在 VUE 控制实例外创建 template 组件结构

   ```html
   <template id="tem1">
     <div>
       <h1>这是一个组件</h1>
     </div>
   </template>
   ```

   ```javascript
   Vue.component("myCom3", {
     template: "#tem1",
   });
   ```

2. 定义私有组件
   ```html
   <template id="tem2">
     <div>
       <h1>这是一个私有组件</h1>
     </div>
   </template>
   ```
   ```javascript
   components: {
     mycom4: {
       template: "#tem2";
     }
   }
   ```

## 组件中 data

- 组件中 data 只能为一个 function，返回一个对象
- 组件中 data 使用方式与实例中完全一样

```html
<template id="tem3">
  <div>
    <h1>这是一个组件{{msg}}</h1>
  </div>
</template>
```

```javascript
Vue.component("myCom3", {
  template: "#tem1",
  data() {
    return {
      msg: "组件自身数组",
    };
  },
});
```

## [组件切换](https://cn.vuejs.org/v2/api/#component)

### v-if 与 v-else 实现

当有多个实现切换时，此方法不太实用

```html
<template>
  <div>
    <button type="button" @click="flag=true">board</button>
    <button type="button" @click="flag=false">computer</button>
    <board v-if="flag"></board>
    <computer v-else></computer>
  </div>
</template>
```

```javascript
<script>
import board from "./board.vue";
import computer from "./computer.vue";
export default {
name: "changeCom",
data() {
 return {
   flag: true,
 };
},
components: {
 board,
 computer,
},
};
</script>
```

### [component 组件](https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6)

```html
<!-- 使用方法切换componentId名称 -->
<button type="button" @click="componentId = 'board'">board</button>
<button type="button" @click="componentId = 'computer'">computer</button>
<component :is="componentId"></component>
```

```javascript
<script>
import board from "./board.vue";
import computer from "./computer.vue";
export default {
  name: "changeCom",
  data() {
    return {
      flag: true,
      componentId: "board",
    };
  },
  props: {

  },
  components: {
    board,
    computer,
  }
};
</script>
```

获取已经定义或组件传入的组件：
![](https://latex.codecogs.com/gif.latex?options.components)可获得当前可获得的组件对象

```html
<component :is="options.components.board"></component>
```

### [computed](https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7)

- computed 计算属性可以直接当作 data 属性使用
- data 中的数据发生变化时，会重新计算计算属性的值

```javascript
computed:{
  "fullname":function(){
    return this.firstname+'-'+this.lastname
  }
}
```

### [组件切换模式（动画）](https://cn.vuejs.org/v2/guide/transitions.html)

使用`transition`将`component`包裹

```html
<button type="button" @click="componentId = 'board'">board</button>
<button type="button" @click="componentId = 'computer'">computer</button>
<transition name="component-transition" mode="out-in">
  <component :is="componentId"></component>
</transition>
```

```javascript
<script>
  import board from "./board.vue";
  import computer from "./computer.vue";
  export default {
    name: "changeCom",
    data() {
      return {
        flag: true,
        componentId: "board",
      };
    },
    props: {},
    components: {
      board,
      computer,
    },
  };
</script>
```

```css
<style>
.component-transition-enter,
.component-transition-leave-to {
  opacity: 0;
  transform: translateY(80px);
}
.component-transition-enter-active,
.component-transition-leave-active {
  transition: all 1s ease;
}
</style>
```

## [父组件向子组件传值](https://cn.vuejs.org/v2/guide/components-props.html)

- 子组件无法访问父组件 data 上的数据和函数

1. 通过`v-bind:`数据绑定的形式传递数据

   ```html
   <template>
     <div>
       <p>{{ msg }}</p>
     </div>
   </template>
   ```

   ```javascript
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
   },
   };
   </script>
   ```

2. 通过方法子组件向父组件传值

   ```html
   <template>
     <div>
       <input type="button" @click="omit" value="执行父组件传递的方法" />
     </div>
   </template>
   ```

   ```javascript
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
   ```

   父组件中

   ```html
   <props-test :msg="'hello'" @func="show"></props-test>
   ```

   ```javascript
   data() {
    return {
      post_test: null,
    };
   },
   methods: {
    show(data) {
      //获得子组件数据
      this.post_test = data;
      console.log(data);
    },
   },
   ```

## 评论列表

1. 通过向子组件传值实现
   ```html
   <template>
     <div>
       <comment-box @postComment="postComment"></comment-box>
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
   ```
   ```javascript
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
   methods: {
    postComment(data) {
      this.comment.push(data);
    },
   },
   };
   </script>
   ```
   commet_box.vue 组件

```html
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
        @click="add"
      />
    </div>
  </div>
</template>
```

```javascript
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
  },
};
</script>
```

2. 通过 localstorage 实现

   ```html
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
   ```

   ```javascript
   <script>
   import CommentBox from "./comment-box.vue";
   export default {
    name: "CommentList",
    data() {
      return {
        comment: [],
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
      loadComment() {
        //从本地加载列表
        var list = JSON.parse(localStorage.getItem("ctms") || "[]");
        this.comment = list;
      },
    },
   };
   </script>
   ```

commet_box.vue 组件

```html
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
```

```javascript
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
```

# [ref 获取 DOM 元素与组件](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E8%AE%BF%E9%97%AE%E5%AD%90%E7%BB%84%E4%BB%B6%E5%AE%9E%E4%BE%8B%E6%88%96%E5%AD%90%E5%85%83%E7%B4%A0)

```html
<template>
  <div>
    <button @click="show">输出ref</button>
    <p ref="p">REF</p>
    <comment-list ref="comment"></comment-list>
  </div>
</template>
```

```javascript
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
```

# 路由

## 后端路由

1. URL 地址对应服务器资源

## 前端路由

1. 通过 hash(#)实现，http 请求中不包含 hash 中的内容，实现单页面应用程序跳转。
2. 不同链接对应不同组件，不存在页面刷新

## vue-router

1. 安装
   ```
   npm install vue-router
   ```
2. mian.js 中
   ```javascript
   import Vue from "vue";
   import VueRouter from "vue-router";
   Vue.use(VueRouter);
   ```
3. 建立 index.js 文件

   ```javascript
   import Vue from "vue";
   import VueRouter from "vue-router";
   import Home from "../views/Home.vue";

   Vue.use(VueRouter);

   //配置路由地址
   const routes = [
     {
       //path 为监听地址对象
       path: "/",
       name: "Home",
       //component 为导入的组件或地址所指示的组件
       component: Home,
     },
     {
       path: "/about",
       name: "About",
       component: "../views/About.vue",
     },
   ];
   //建立路由实例
   const router = new VueRouter({
     routes,
   });
   //暴露路由
   export default router;
   ```

4. 建立导航栏 App.vue
   ```html
   <template>
     <div id="app">
       <div id="nav">
         <router-link to="/">Home</router-link> |
         <router-link to="/about">About</router-link> |
         <router-link to="/learning">Learning</router-link>
       </div>
       <!-- 占位符，表示需要渲染的组件 -->
       <router-view />
     </div>
   </template>
   ```
   使用 a 标签实现跳转(不推荐)
   在使用 a 标签中，路由地址前需添加‘#’符
   ```html
   <a href="#/about">跳转about</a>
   ```

### router-link

router-link 默认渲染为 a 标签，若要渲染为其他标签可使用 tag 属性

```html
<router-link to="/about">关于</router-link>
<router-link to="/about" tag="span">关于</router-link>
```

[实现导航的高亮显示，选中的导航栏会添加`.router-link-active`类](https://router.vuejs.org/zh/api/#active-class)

```css
.router-link-exact-active {
  color: #42b983;
}
```

[路由传递参数](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96)

- `/about/1`与`/about/2`会映射到相同的路由
- 因路由相同，组件会被复用，因此不执行生命钩子函数
- 使用`this.$route.params`获取路由传递的参数

1. 使用查询字符串不需要更改路由：?id=10&name=zhangsan
   通过 query 获取值

```javascript
this.$route.query.id;
```

2. `:id`实现

```javascript
const routes = [
  {
    path: "/about/:id", //{id:'??'}
    name: "About",
    component: "../views/About.vue",
  },
];
```

获取值

```javascript
this.$route.params.id;
```

3. 使用`watch`检测参数的变化

```javascript
watch:{
  $route(to,from){
    //响应变化
  }
}
```

4. 使用 props 取代路由参数与$route 的耦合

```javascript
const User = {
  props: ["id"],
  template: "<div>User {{ id }}</div>",
};
const router = new VueRouter({
  routes: [
    { path: "/user/:id", component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: "/user/:id",
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false },
    },
  ],
});
```

5. 使用动态函数

```javascript
const router = new VueRouter({
  routes: [
    {
      path: "/search",
      component: SearchUser,
      props: (route) => ({ query: route.query.q }),
    },
  ],
});
```

### [错误处理](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E6%8D%95%E8%8E%B7%E6%89%80%E6%9C%89%E8%B7%AF%E7%94%B1%E6%88%96-404-not-found-%E8%B7%AF%E7%94%B1)

- 使用通配符（\*）匹配任意路径
  ```javascript
  {path:'*',component:''}
  ```
- 使用通配符处理错误时，需要将`{path:"*"}`放在路由最后面，用于处理客户端 404 错误。
- 当使用通配符时，会自动添加 pathMatch 参数至`$route.params`
  ```javascript
  this.$router.push("/hslAIDH");
  this.$router.params.pathMatch; //hslAIDH
  ```

## 嵌套路由

```javascript
const router = new VueRouter({
  routes: [
    {
      path: "/user/:id",
      component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: "profile",
          component: UserProfile,
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: "posts",
          component: UserPosts,
        },
      ],
    },
  ],
});
```

## 编程式导航

1. router.push()

   ```javascript
   // 字符串
   router.push("home");

   // 对象
   router.push({ path: "home" });

   // 命名的路由
   router.push({ name: "user", params: { userId: "123" } });

   // 带查询参数，变成 /register?plan=private
   router.push({ path: "register", query: { plan: "private" } });
   ```

   注意，如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：

   ```javascript
   const userId = "123";
   router.push({ name: "user", params: { userId } }); // -> /user/123
   router.push({ path: `/user/${userId}` }); // -> /user/123
   // 这里的 params 不生效
   router.push({ path: "/user", params: { userId } }); // -> /user
   ```

2. router.go()
   ```javascript
   // 在浏览器记录中前进一步，等同于 history.forward()
   router.go(1);
   // 后退一步记录，等同于 history.back()
   router.go(-1);
   // 前进 3 步记录
   router.go(3);
   // 如果 history 记录不够用，那就默默地失败呗
   router.go(-100);
   router.go(100);
   ```

## [命名视图](https://router.vuejs.org/zh/guide/essentials/named-views.html#%E5%B5%8C%E5%A5%97%E5%91%BD%E5%90%8D%E8%A7%86%E5%9B%BE)

有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 sidebar (侧导航) 和 main (主内容) 两个视图。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default。

- 使用不同的名称会去相应的路径下寻找命名的路由组件

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

```javascript
const router = new VueRouter({
  routes: [
    {
      path: "/",
      components: {
        default: Foo,
        a: Bar,
        b: Baz,
      },
    },
  ],
});
```

- [使用 vue 建立嵌套复杂布局](https://router.vuejs.org/zh/guide/essentials/named-views.html#%E5%B5%8C%E5%A5%97%E5%91%BD%E5%90%8D%E8%A7%86%E5%9B%BE)
  - `viewsLayout.vue`为显示页面，主要页面布局
  - `UserSettingNav.vue`为显示导航栏的组件
  - `EmailSubscription.vue`为显示内容页面 1
  - `UserProfile.vue`与`UserProfile.vue`为显示页面 2
  - `index.js` 为控制路由的文件

1. index.js

```javascript
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/setting", // #/setting
    component: () => import("../views/viewsLayout.vue"), //外层路由传递的组件
    children: [
      {
        path: "emails", // #/setting/emails
        component: () => import("../components/layout/EmailSubscription.vue"), //内层路由传递的组件
      },
      {
        path: "profile", // #/setting/profile
        components: {
          default: () => import("../components/layout/UserProfile.vue"), //内层路由传递的组件一
          helper: () => import("../components/layout/UserProfilePreview.vue"), //内层路由传递的命名的组件
        },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
```

2. viewsLayout.vue

```html
<template>
  <div class="us">
    <h1>User Setting</h1>
    <!-- 导航栏 -->
    <user-setting-nav></user-setting-nav>
    <!-- 接受子组件默认组件 -->
    <router-view class="us__content"></router-view>
    <!-- 接受命名组件 -->
    <router-view
      name="helper"
      class="us__content us__content--helper"
    ></router-view>
  </div>
</template>
<script>
  import UserSettingNav from "../components/layout/UserSettingsNav.vue";
  export default {
    name: "UserSetting",
    components: {
      UserSettingNav,
    },
  };
</script>
```

3. UserProfile.vue

```html
<template>
  <div>
    <h3>Edit your profile</h3>
  </div>
</template>

<script>
  export default {
    name: "UserProfile",
  };
</script>
```

4. UserProfilePreview.vue

```html
<template>
  <div>
    <h3>Preview of your profile</h3>
  </div>
</template>

<script>
  export default {
    name: "UserProfilePreview",
  };
</script>
```

## [重定向](https://router.vuejs.org/zh/guide/essentials/redirect-and-alias.html#%E9%87%8D%E5%AE%9A%E5%90%91)

```javascript
const router = new VueRouter({
  routes: [
    //重定向至‘/b’，但保持标签为'/a'
    { path: "/a", redirect: "/b", alias: "/a" },
    { path: "/a", redirect: { name: "foo" } },
    {
      path: "/a",
      redirect: (to) => {
        // 方法接收 目标路由 作为参数
        // return 重定向的 字符串路径/路径对象
      },
    },
  ],
});
```

# [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)

通过跳转或取消的方式守卫导航。

## 全局钩子

1. 全局前置守卫

```javascript
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

每个守卫方法接收三个参数：

- to: Route: 即将要进入的目标 路由对象

- from: Route: 当前导航正要离开的路由

- next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

      - next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。

      - next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。

      - next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。

      - next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。

  确保 next 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。

2. 全局后置钩子

```javascript
router.afterEach((to, from) => {
  // ...
});
```

## 路由独享的钩子

```javascript
const router = new VueRouter({
  routes: [
    {
      path: "/foo",
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      },
    },
  ],
});
```

## 组件内的钩子

```javascript
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  },
};
```

beforeRouteEnter 守卫 不能 访问 this，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。<br>
不过，你可以通过传一个回调给 next 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```javascript
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

注意 beforeRouteEnter 是支持给 next 传递回调的唯一守卫。对于 beforeRouteUpdate 和 beforeRouteLeave 来说，this 已经可用了，所以不支持传递回调，因为没有必要了。

```javascript
beforeRouteUpdate (to, from, next) {
  // just use `this`
  this.name = to.params.name
  next()
}
```

保存验证

```javascript
beforeRouteLeave (to, from, next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

# [路由元信息](https://router.vuejs.org/zh/guide/advanced/meta.html)

定义路由时配置 meta 字段

```javascript
const router = new VueRouter({
  routes: [
    {
      path: "/foo",
      component: Foo,
      children: [
        {
          path: "bar",
          component: Bar,
          // a meta field
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});
```

一个路由匹配到的所有路由记录会暴露为 $route 对象 (还有在导航守卫中的路由对象) 的 $route.matched 数组。因此，我们需要遍历 $route.matched 来检查路由记录中的 meta 字段。<br>
使用 meta 设置路由登录访问限制

```javascript
router.beforeEach((to, from, next) => {
  //全局钩子
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});
```

实例

```javascript
const routes = [
  {
    path: "/loginlimit",
    component: () => import("../views/loginLimit.vue"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      console.log("登录限制");
      if (to.matched.some((route) => route.meta.requiresAuth)) {
        //避免没有user存在，使用‘{}’返回值
        let user = window.window.sessionStorage.user || "{}";
        user = JSON.parse(user);
        //若存在用户id，可访问网站，若不存在，则直接返回首页
        if (user.id) {
          next();
        } else {
          next({ path: "/" });
        }
      } else {
        //必然需要使用next()执行函数
        next();
      }
    },
  },
];
```

设置 sessionStorage

```javascript
setSession(){
      sessionStorage.setItem('user',JSON.stringify({id:'123'}))
    }
}
```

# [router 过渡特效](https://router.vuejs.org/zh/guide/advanced/transitions.html#%E5%8D%95%E4%B8%AA%E8%B7%AF%E7%94%B1%E7%9A%84%E8%BF%87%E6%B8%A1)

## 全局过渡

```html
<transition mode="out-in">
  <router-view></router-view>
</transition>
```

使用 animate.css 类

```html
<transition
  enter-active-class="animate__animated animate__fadeIn"
  leave-active-class="animate__animated animate__fadeOut"
  :duration="{enter:500,leave:500}"
>
  <router-view></router-view>
</transition>
```

## 单个路由过渡

```html
<template>
  <transition name="slide">
    <div class="foo">...</div>
  </transition>
</template>
```

```html
</template>
    <transition name="fade">
      <div class="bar">...</div>
    </transition>
</template>
```

基于当前路由与目标路由关系实现过渡
父组件

```html
<template>
  <div>
    <router-link to="/guideTransition/a">a</router-link>
    <router-link to="/guideTransition/b">b</router-link>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    name: "guideTransition",
    data() {
      return {
        transitionName: "",
      };
    },
    beforeRouteUpdate(to, from, next) {
      const toDeap = to.path.split("/").length;
      const fromDeap = from.path.split("/").length;
      this.transitionName = toDeap < fromDeap ? "slide-right" : "slide-right";
      next();
    },
  };
</script>

<style>
  .slide-left-enter,
  .slide-left-leave-to {
    opacity: 0;
    transform: translateX(-300px);
  }
  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: all 1s ease;
  }
  .slide-right-enter,
  .slide-right-leave-to {
    opacity: 0;
    transform: translateX(300px);
  }
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all 1s ease;
  }
</style>
```

a.vue

```html
<template>
  <div><h1>hkdklsjndlk;jfa;jdl;asdkfl;</h1></div>
</template>

<script>
  export default {
    name: "a",
  };
</script>
```

b.vue

```html
<template>
  <div><h1>skdjaso;jdf'ajf</h1></div>
</template>

<script>
  export default {
    name: "b",
  };
</script>
```

# [数据获取](https://router.vuejs.org/zh/guide/advanced/data-fetching.html#%E5%AF%BC%E8%88%AA%E5%AE%8C%E6%88%90%E5%90%8E%E8%8E%B7%E5%8F%96%E6%95%B0%E6%8D%AE)

## 导航完成后获取数据

```html
<template>
  <div class="post">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>
```

```javascript
export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
    //另一种调用方法
    $route(to,from){
      this.fetchData()
    }
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      // 可使用相应的数据获取方式替代
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    }
  }
}
```

## 导航前获取数据

```javascript
export default {
  data() {
    return {
      post: null,
      error: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    getPost(to.params.id, (err, post) => {
      next((vm) => vm.setData(err, post));
    });
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  beforeRouteUpdate(to, from, next) {
    this.post = null;
    getPost(to.params.id, (err, post) => {
      this.setData(err, post);
      next();
    });
  },
  methods: {
    setData(err, post) {
      if (err) {
        this.error = err.toString();
      } else {
        this.post = post;
      }
    },
  },
};
```

# 滚动行为

使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。

- scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
- -这个方法返回滚动位置的对象信息，长这样：

```javascript
{ x: number, y: number }
{ selector: string, offset? : { x: number, y: number }}
```

```javascript
  const router = new VueRouter({
    routes: [...],
    scrollBehavior (to, from, savedPosition) {
      // return 期望滚动到哪个的位置
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
  }
    }
  })
```

模拟滚动锚点

```javascript
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}
```

详细实例：https://github.com/vuejs/vue-router/blob/dev/examples/scroll-behavior/app.js

## promise 简述

一个 Promise 对象代表一个在这个 promise 被创建出来时不一定已知的值。它让您能够把异步操作最终的成功返回值或者失败原因和相应的处理程序关联起来。 这样使得异步方法可以像同步方法那样返回值：异步方法并不会立即返回最终的值，而是会返回一个 promise，以便在未来某个时候把值交给使用者。
一个 Promise 必然处于以下几种状态之一：

- 待定（pending）: 初始状态，既没有被兑现，也没有被拒绝。
- 已兑现（fulfilled）: 意味着操作成功完成。
- 已拒绝（rejected）: 意味着操作失败。
  ![promise](https://mdn.mozillademos.org/files/8633/promises.png)

### promise 链式调用

我们可以用 promise.then()，promise.catch() 和 promise.finally() 这些方法将进一步的操作与一个变为已敲定状态的 promise 关联起来。

```javascript
const myPromise = new Promise(myExecutorFunc)
  .then(handleFulfilledA, handleRejectedA)
  .then(handleFulfilledB, handleRejectedB)
  .then(handleFulfilledC, handleRejectedC);

const myPromise = new Promise(myExecutorFunc)
  .then(handleFulfilledA)
  .then(handleFulfilledB)
  .then(handleFulfilledC)
  .catch(handleRejectedAny);
```

在没有迫切需要的情况下，可以在最后一个.catch() 语句时再进行错误处理，这种做法更加简单。

### promise 静态方法

1. Promise.all(iterable)

- 这个方法返回一个新的 promise 对象，该 promise 对象在 iterable 参数对象里所有的 promise 对象都成功的时候才会触发成功，一旦有任何一个 iterable 里面的 promise 对象失败则立即触发该 promise 对象的失败。这个新的 promise 对象在触发成功状态以后，会把一个包含 iterable 里所有 promise 返回值的数组作为成功回调的返回值，顺序跟 iterable 的顺序保持一致；如果这个新的 promise 对象触发了失败状态，它会把 iterable 里第一个触发失败的 promise 对象的错误信息作为它的失败错误信息。Promise.all 方法常被用于处理多个 promise 对象的状态集合。（可以参考 jQuery.when 方法---译者注）

2. Promise.allSettled(iterable)

- 等到所有 promises 都已敲定（settled）（每个 promise 都已兑现（fulfilled）或已拒绝（rejected））。
  返回一个 promise，该 promise 在所有 promise 完成后完成。并带有一个对象数组，每个对象对应每个 promise 的结果。

3. Promise.any(iterable)

- 接收一个 Promise 对象的集合，当其中的一个 promise 成功，就返回那个成功的 promise 的值。

4. Promise.race(iterable)

- 当 iterable 参数里的任意一个子 promise 被成功或失败后，父 promise 马上也会用子 promise 的成功返回值或失败详情作为参数调用父 promise 绑定的相应句柄，并返回该 promise 对象。

5. Promise.reject(reason)

- 返回一个状态为失败的 Promise 对象，并将给定的失败信息传递给对应的处理方法

6. Promise.resolve(value)[[1](https://wohugb.gitbooks.io/promise/content/usage/resolve.html)]

- 返回一个状态由给定 value 决定的 Promise 对象。如果该值是 thenable(即，带有 then 方法的对象)，返回的 Promise 对象的最终状态由 then 方法执行决定；否则的话(该 value 为空，基本类型或者不带 then 方法的对象),返回的 Promise 对象状态为 fulfilled，并且将该 value 传递给对应的 then 方法。通常而言，如果您不知道一个值是否是 Promise 对象，使用 Promise.resolve(value) 来返回一个 Promise 对象,这样就能将该 value 以 Promise 对象形式使用。

### 创建 promise

Promise 对象是由关键字 new 及其构造函数来创建的。该构造函数会把一个叫做“处理器函数”（executor function）的函数作为它的参数。这个“处理器函数”接受两个函数——resolve 和 reject ——作为其参数。当异步任务顺利完成且返回结果值时，会调用 resolve 函数；而当异步任务失败且返回失败原因（通常是一个错误对象）时，会调用 reject 函数。

```javascript
function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}
```

## 异步滚动

```javascript
scrollBehavior (to, from, savedPosition) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ x: 0, y: 0 })//将resove中的值传给后面的then
    }, 500)
  })
}
```

## 平滑滚动

```javascript
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash,
      behavior: 'smooth',
    }
  }
}
```

# 懒加载

```javascript
const Foo = () => import(/* webpackChunkName: "group-foo" */ "./Foo.vue");
```
