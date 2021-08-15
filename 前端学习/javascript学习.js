// 单独的js文件中的代码是不能直接在浏览器中运行

// 声明变量与类型转换
function test1() {
  var a;
  a = 18; //var a=18;
  //   一次性声明多个变量并赋值
  var a1 = 12,
    a2 = 13;
  // +既可以作为数学运算，也可以作为字符串拼接
  //    若两个变量为数字型时，才作为数学运算

  //   其他类型转字符串
  var n = 5;
  var s1 = n.toString(); //数值转字符串
  console.log(typeof s1);

  var s2 = String(a);
  console.log(typeof s2);

  var s3 = "" + a;
  console.log(typeof s3);

  var n = true;
  console.log(typeof (n + ""));

  //   其他类型转字符型
  var a = "1";
  var b = Number(a);
  console.log(typeof b);

  console.log(Number("c")); //NaN not a number
  console.log(Number(null)); //0
  console.log(Number(undefined)); //NaN

  var a = parseInt("2"); //2
  var b = parseInt("dsf2"); //NaN
  var c = parseInt(null); //NaN
  var d = parseInt(undefined); //NaN
  var e = parseInt("2najksd"); //2
  console.log(a, b, c, d, e); //NaN

  var a = parseFloat("1.243"); //1.243
  var b = parseFloat("1.2.3.4"); //1.2
  var c = parseFloat("123dfsssad23"); //123
  var d = parseFloat("saf123"); //NaN
  var e = parseFloat(null); //NaN
  var f = parseFloat(undefined); //NaN
  console.log(a, b, c, d, e, f);

  //   布尔类型转换
  var a = Boolean("0"); //true 字符串有类容即为真
  var b = Boolean(0); //false 数值0为false
  var c = Boolean("2"); //true
  var d = Boolean("asds"); //true
  var e = Boolean(null); //false
  var f = Boolean(undefined); //false
  var g = Boolean(""); //false
  console.log(a, b, c, d, e, f, g);
}

// 操作符与运算符
function test2() {
  // 一元运算符
  var n1 = 5;
  var n2 = 6;
  // n++; //对自身操作加1或减一
  //操作符在变量前面，先进行自身运算，再进行其他运算
  //操作符再变量后面，先进行其他运算，后进行自身运算
  console.log(n1++ + ++n2, n1, n2); //12=>(5+7),6,7
  var n1 = 5;
  var n2 = 6;
  console.log(++n1 + n2++, n1, n2); //12=>(6+6),6,7
  var n1 = 5;
  console.log(n1++ + ++n1); //12=>5+7
  var n1 = 5;
  console.log(++n1 + n1++); //12=>6+6

  // && 逻辑与
  // || 逻辑或
  // ！逻辑非
  var a = true;
  console.log(!a); //false
  var a = 1;
  var b = 2;
  var c = 0;
  console.log(a && b);
  //   运算优先级，先运算&&，再运算||
  console.log(a || (c && b));

  var a = "2";
  var b = 2;
  console.log(a == b); //true javascript为弱类型语言，只比较值
  console.log(a === b); //false  比较值与数据类型

  //   优先级
  // 1、（）
  // 2、一元运算符 ++、--、！
  // 3、算术运算符 + - * /
  // 4、关系运算符 > <
  // 5、相等运算符 == ===
  // 6、逻辑运算符 && || 先&&后||
  // 7、赋值运算 =
}

function func() {
  //函数声明包括函数声明与表达式声明
  var fun = function () {};
  (function () {}); //自调用函数，防止全局变量污染，封装一个局部作用

  // 函数被当作参数传入
  function fun1(s) {
    s();
  }
  function fun2() {
    console.log(222);
  }
  fun1(fun2);

  //将函数作为返回值
  function fun3() {
    function fun4() {
      console.log("222");
    }
    return fun4;
  }
  fun3()();

  //JS 变量运行分为两个阶段
  // 1、解析（编译）阶段：语法检查，变量声明（变量提升）
  // 2、运行阶段：变量赋值，代码流程的执行

  //若函数与变量声明重名，函数将替换变量
  console.log(a);
  var a = 1;
  function a() {
    console.log(222);
  }
  console.log(a);
}

//面向对象
function test3() {
  //name为属性，fly为方法（函数）
  //字面声明对象
  var obj1 = {
    name: "xiaoming",
    age: 12,
    sg: 190,
    //this指向
    fly: function () {
      //在方法中的this指的是这个方法所在的对象
      console.log(this.name);
    },
  };
  // 实例化方法声明对象
  var obj2 = new Object();

  //调用对象属性或方法 对象.属性(方法)
  //普通函数也有this对象，指向全局对象（window）
  //this永远指向一个对象
  console.log(obj1.name);
  obj1.fly();

  //this运行在哪个对象下，就指向哪个对象
  function func1() {
    console.log(this.name);
  }

  var obj3 = {
    name: "123",
    fun: func1,
  };
  var obj4 = {
    name: "345",
    fun: func1,
  };
  obj3.fun(); //123
  obj4.fun(); //345

  var obj5 = {
    age: 19,
    fun: function () {
      console.log(this.age);
    },
  };
  var obj6 = {
    age: 16,
    fun: obj5.fun,
  };
  obj6.fun(); //16

  //循环遍历对象元素
  //for...in循环不仅可以遍历对象，还可以遍历数组
  for (var key in obj6) {
    console.log(obj6[key]);
  }

  var list1 = [1, 2, 3, 4, 5];
  for (var key in list1) {
    console.log(list1[key]);
  }

  // 删除某一属性
  delete obj5.age;
  console.log(obj5);
}

function test4() {
  //包装对象
  // 三种原始类型：数值型、字符串、布尔类型
  // 原始类型的数组在一定条件下可自动转为对象 =>包装对象

  var date = new Date();
  console.log(date.getHours());
}
