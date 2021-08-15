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