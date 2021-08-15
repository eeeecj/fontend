<template>
  <div class="Learning">
    {{ msg }}
    <p v-text="msg"></p>
    <div v-html="html"></div>
    <!-- 避免网络不好造成vue加载缓慢行程部分插件显示不正常 -->
    <div v-cloak>ststst</div>
    <!-- myTitle 绑定事件 -->
    <!-- .stop阻止冒泡 -->
    <input type="button" :value="myTitle + '123'" v-on:click.stop="alter" />

    <div>
      <!-- v-model唯一一个双向数据绑定指令  -->
      <!-- v-model只能运用于表单元素 -->
      <h4 v-text="input_msg"></h4>
      <input type="text" name="" id="" v-model="input_msg" />
    </div>

    <div>
      <h1 :class="['thin', 'color']">大</h1>
    </div>

    <div>
      <p v-for="(item, index) in list1" :key="'list1' + index">{{ item }}</p>
      <p v-for="(user, index) in list2" :key="'list2' + index">
        {{ user.id }}:{{ user.name }}
      </p>
      <p v-for="(val, key, index) in list3" :key="'list3' + index">
        {{ val }}:{{ key }},{{ index }}
      </p>
      <p v-for="count in 10" :key="'count' + count">{{ count }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Learning_com",
  props: {
    msg: String,
  },
  data() {
    return {
      html: "<p>hello</p>",
      myTitle: "按钮",
      input_msg: "",
      list1: [1, 2, 3, 4, 5],
      list2: [
        { id: 1, name: "张三" },
        { id: 2, name: "李四" },
      ],
      list3: {
        id: 1,
        name: "王五",
        gender: "男",
      },
    };
  },
  methods: {
    alter() {
      alert("click");
    },
  },
};
</script>

<style>
[v-cloak] {
  display: none;
}
.color {
  color: red;
}
.thin {
  font-weight: 200;
}
.italic {
  font-style: italic;
}
.ative {
  letter-spacing: 20;
}
</style>