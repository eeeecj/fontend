function test1() {
  $(document).ready(function () {
    alert("加载完毕");
    $(".div1").click(function () {
      $(this).hide(); //点击隐藏
    });
  });
}

function test2() {
  //1、选择所有元素: $(*)
  //因为*选择器获取所有的元素，有些浏览器较缓慢
  // 2、$(".class") 类选择器
  $(function () {
    $(".div1").html("选择器");
  });
  //   3、给定的html名称选择元素: $('element')
  // 4、id选择器:$('#id')
  // 5、将每一个选择器匹配到的元素合并后返回： $("selector1,selector2")
  // 6、属性选择器 ：$("[attribute|='value']")选择器以该字符为前缀并后跟一个‘-’连字符的元素
  $(function () {
    $("[hreflang='en']").css("color", "#f00");
  });
  //   $("[attribute*='value']")选择器包含某元素的值
  // $("[attribute~='value']")选择器包含以空格隔开的元素的值
  $(function () {
    $("input[name~='man']").val("milk man is here");
    $("input[id^='super'][name$='man']").val("only this one");
  });
  // $("[attribute='value']")属性为给定值的元素
  // $("[attribute!='value']")属性不等于给定值的元素
  // $("[attribute$='value']")属性以给定值结尾的元素
  // $("[attribute^='value']")属性以给定字符串开头的元素
  // $("[attribute]")选择具有给定属性值的元素
  // $("[attribute][attribute]")多属性选择
}

//基础过滤
function test3() {
  $(function () {
    function animatedIt() {
      $(".div2").slideToggle("slow", animatedIt);
    }
    animatedIt();
    $("#animated").click(function () {
      $("div:animated").css("background-color", "blue");
    });
  });
  //选择正在执行动画效果的元素 $(":animated")
  //在匹配的集合中选择索引值为index的元素 $(":eq(index)")
  //选择索引值为偶数的元素，索引从0开始 $(":even")
  //选择第一个匹配的元素 $(":first")
  //选择获取当前焦点的元素 $(":focus")
  //选择所有标题元素 $(":header")
  //选择最后一个匹配的元素 $(":last")
  //匹配集合匹配的大于给定index的元素 $(":gt(idnex)")
  //匹配集合匹配的小于给定index的元素 $(":lt(index)")
  //去除不匹配选择器的元素 $(":not(selector)")
  $(function () {
    //为所选元素的子元素添加事件
    $(".test3").delegate("*", "focus blur", function (event) {
      var e = $(this);
      setTimeout(function () {
        e.toggleClass("focused", e.is(":focus"));
      });
    });
  });
}
//子元素选择器
function test4() {
  //选择所有父级元素下的第一(最后)个子元素 $(":first-child") $(":last-child")
  //选择所有相同元素名称的第一个兄弟元素 $(":first-of-type") $(":last")
  //选择所有父元素的第几个子元素 $(":nth-child(idnex/even/equation)")
  $(function () {
    $("div span:first-child")
      .css("text-decoration", "underline")
      .hover(
        function () {
          $(this).toggleClass("focused");
        },
        function () {
          $(this).removeClass("focused");
        }
      );
  });
}

//内容选择器
function test5() {
  //选择包含指定文本的元素 $(":contains(text)") 包含子代
  //选择没有子元素的元素（包括文本节点）$(":empty")
  //选择包含制定选择器匹配的一种元素 $(":has(selector)")
  //选择包含子元素或文本元素的父元素 $(":parent")
}
//表单选择器
function test6() {
  //选择所有按钮元素与类型为button的元素 $(":button")
  //选择所有类型为复选框的元素 $(":checkbox")
  //$(":checked") 选择所有勾选的元素
  //选择所有被禁用的元素 $(":disabled") $(":enabled")
  //$(":file") $(":focus") $(":image") $(":radio") $(":submit")
  //选择所有input、textarea、select、button $(":input")
  //$(":password")
}

//jquery 层级
function test7() {
  //选择parent中指定的直接child元素 $("parent>child")
  //选择给定祖先元素的所有后代元素 $("ancestor descendant")
  // 相邻选择器(紧跟) $("pre+next")
  //匹配pre元素后的所有兄弟元素 $("pre~sibling")
  //选择所有隐藏的元素 $(":hidden")
  //选择可见元素 $(":visible")
}

function test8() {
  $(function () {
    $(document).keydown(function (event) {
      alert(event.keyCode);
    });
  });
}

//浏览器事件、文档加载事件
//.error()已弃用
//.scroll()滚动事件
//.resize()页面大小改变时，给window绑定
function test9() {
  //ready()文档dom绘制完成后执行，即使有大量的媒体没有加载出来，js也可以执行。
  //load必须等网页中所有内容歪尿补钾在完毕后执行，如果包含大量图片没有加载的话，js不能执行。
}

//绑定事件处理
function test10() {
  // $(function () {
  //   // bind已经不再使用，首选使用on  unbind()
  //   // $("#btn").bind("click mouseover", function () {
  //   //   alert("提示");
  //   // });

  //   $("#btn").bind({
  //     click: function () {
  //       alert("提示");
  //     },
  //     mousedown: function () {
  //       alert("提示2");
  //     },
  //   });
  // });
  // $(function () {
  //   $(".btn1").bind("mouseover mouseout", function () {
  //     $(this).toggleClass("pbtn");
  //   });
  // });

  //delegate 事件委托 undelegate()
  // $(function () {
  //   $(".test10 ul").delegate("li", "click", function () {
  //     alert($(this).html());
  //   });
  // });

  //on() 在选定的元素上绑定一个或多个函数
  $(function () {
    //事件委托
    $(".test10 ul").on("click", "li", function () {
      alert($(this).html());
    });
  });
  $(function () {
    $("#btn").on("click", function () {
      alert("提示");
    });
  });
  $(function () {
    $(".btn1").on("mouseover mouseout", function () {
      $(this).toggleClass("pbtn");
    });
  });
  var fn = function () {
    alert("提示");
  };
  //off() 移除事件
  $(function () {
    $(".test10 .div2").on("click mouseover", "p", fn);

    $(".test10 .div2").off("mouseover", "p", fn);
  });

  //one() 仅触发一次
}

//事件对象
function test11() {
  $(function () {
    $(".test11 .div2").on("click", function (e) {
      console.log($(e.currentTarget)); //事件监听者
      console.log($(e.target)); //事件的目标
      console.log(this); //事件监听者
    });
  });
  $(function () {
    $(".test11 ul").on("click", "li", function (e) {
      console.log($(e.currentTarget)); //事件监听者
      console.log($(e.delegateTarget)); //当前事件的委托者
      // $(e.delegateTarget).css("line-height", "100px")
    });
  });

  //获取鼠标相对于上边缘与左边缘的位置
  $(function () {
    $(".test11 .log").on("mousemove", function (e) {
      console.log("pageX=" + e.pageX + "    pageY=" + e.pageY);
      //获取当前事件类型
      console.log(e.type);
    });
    //e.preventDefault 阻止默认事件
    $(".test11 a").on("click", function (e) {
      e.preventDefault();
      alert("baidu");
    });
  });
  //e.stopProgression() 阻止冒泡事件
}

//表单事件
function test12() {
  $(function () {
    //失去焦点触发，适用所有元素 focus()
    $(".test12 #target1").blur(function () {
      alert("失去焦点");
    });
  });

  //change()元素值改变时触发 只限于 input selector textarea
  $(function () {
    //失去焦点触发，适用所有元素 focus()
    $(".test12 #target2").change(function () {
      alert("类容改变");
    });

    //select() 当用户使用文本选择时触发input['text']  textarea
    $(".test12 #target2").select(function () {
      alert("选择内容");
    });

    //submit()用户试图提交表单时触发 只能绑定到form 表单上
    $(function () {
      $("#target3").submit(function () {
        alert("表单提交");
      });
    });
  });
}

function test13() {
  //addClass()为匹配元素添加样式类名 removeClass()
  // attr() 获取匹配元素的第一个元素的属性值,设置匹配元素的一个或多个属性值 removeAttr
  // hasClass() 确定任何一个匹配元素是否有被分配给定样式
  // html() 获取第一个匹配原色的html内容
  // prop() 为匹配的元素设置一个或多个属性值(只能获取已有的默认属性)
  //toggleClass()
  //val()获取匹配元素第一个元素的当前值（表单元素）
  $(function () {
    $(".test13 p").addClass("btn1");
    $(".test13 a").attr("href", "http://www.baidu.com"); //使用对象分配多个属性值
  });
}

//DOM 插入并包裹现有内容
function test14() {
  // wrap() 在每一个匹配的元素外层包裹一个html元素
  // unwrap() 将匹配元素的父元素删除，保留自身
  // wrapAll() 在所有匹配元素外层包裹一个html结构
  // wrapInner() 在匹配元素里的内容外包裹一层结构

  $(function () {
    $(".test14 *").wrap("<div></div>");
    $(".test14 *").unwrap();
  });
  // append()在每个匹配元素里面的末尾处插入参数内容。
  // appendTo()将匹配的元素插入到目标元素的最后面（译者注：内部插入）
  // prepend()将参数内容插入到每个匹配元素的前面（元素内部）。
  // prependTo()将所有元素插入到目标前面（元素内）。

  // clone() 创建一个匹配的元素集合的深度拷贝副本。保留原来的，拷贝一份
  // after() 在匹配元素集合中的每个元素后面插入参数所指定的内容，作为其兄弟节点。
  // insertAfter() 在目标元素后面插入集合中每个匹配的元素(注：插入的元素作为目标元素的兄弟元素)。

  // detach() 从DOM中去掉所有匹配的元素。
  // empty() 从DOM中移除集合中匹配元素的所有子节点。
  // remove() 将匹配元素集合从DOM中删除。（注：同时移除元素上的事件及 jQuery 数据。）
  // replaceAll() 用集合的匹配元素替换每个目标元素。
  // replaceWith() 用提供的内容替换集合中所有匹配的元素并且返回被删除元素的集合。
}

//css属性
function test15() {
  // position() 获取匹配元素中第一个元素的当前坐标，相对于offset parent的坐标。( 译者注：offset parent指离该元素最近的而且被定位过的祖先元素 ) position()返回一个包含 top 和 left属性的对象.
  // offset() 在匹配的元素集合中，获取的第一个元素的当前坐标，坐标相对于文档。 设置匹配的元素集合中每一个元素的坐标， 坐标相对于文档。

  // scrollLeft()获取匹配的元素集合中第一个元素的当前水平滚动条的位置或设置每个匹配元素的水平滚动条位置。

  $(".test15").scrollLeft(300);
  $(function () {
    var salt = $(".test15 p").css("background-color", "#f00");
    console.log(salt);
  });
}

//map()
function test16() {
  $(function () {
    var a = $(".test16 :checkbox")
      .map(function () {
        return this.id;
      })
      .get()
      .join(" ");
    console.log(a);
  });
}

function test17() {
  $(function () {
    var mappedItems = $(".test17 li").map(function (index) {
      var re = $("<li>").text($(this).text()).get(0);
      if (index == 0) {
        $(re).text($(re).text() + "hello");
      } else {
        re = [re];
        $(re[0]).append("-A");
      }
      // console.log($("<li>"));
      return re;
    });
    $(".test17 ul:last").append(mappedItems);
  });

  // $(function () {
  //   $.fn.equalizeHeights = function () {
  //     var maxHeight = this.map(function (i, e) {
  //       return $(e).height();
  //     });
  //     return this.height(Math.max.apply(this, maxHeight));
  //   };
  //   $(".test17 div").click(function () {
  //     $(".test17 div").equalizeHeights();
  //   });
  // });
  // slice 根据指定的下标范围，过滤匹配的元素集合，并生成一个新的 jQuery 对象。
  $(function () {
    var colorChange = function () {
      var $div = $(".test17 .div_container div");
      var start = Math.floor(Math.random() * $div.length);
      var end = Math.floor(Math.random() * ($div.length - start) + start + 1);
      if (end == $div.length) end = undefined;
      $div.css("background-color", "");
      if (end) {
        $div.slice(start, end).css("background-color", "#f00");
      } else {
        $div.slice(start).css("background-color", "#f00");
      }
    };
    $(".test17 .div_container div").click(colorChange);
  });
}

function test18() {
  //add() 意为向选择器中添加，并非向文档中添加
  $(function () {
    $(".test18 div")
      .css("border", "1px solid #f00f0f")
      .add("p")
      .css("background-color", "#f00");
  });
}

function test19() {
  //children() 获得匹配元素集合中每个元素的子元素，选择器选择性筛选。
  $(function () {
    $(".test19 div_box1 div").children().css("text-decoration", "underline");
  });

  //closet() 从元素本身开始，在DOM 树上逐级向上级元素匹配，并返回最先匹配的祖先元素。
  //parents() 向上遍历DOM树到文档的根元素，每个祖先元素加入到临时集合，如果提供一个选择器，则会使用该选择器在集合中进行过滤
  //find()通过一个选择器，jQuery对象，或元素过滤，得到当前匹配的元素集合中每个元素的后代。
  $(function () {
    $(".test19 .div_box1").find("p").css("background-color", "red");
  });
  //为p标签下的所有单词添加hover事件
  $(function () {
    var text = $(".test19 .div_box2 p:first")
      .text()
      .split(" ")
      .join("</span> <span>");
    text = "<span>" + text + "</span>";
    $(".test19 .div_box2 p")
      .html(text)
      .find("span")
      .hover(
        function () {
          $(this).css("background-color", "yellow");
        },
        function () {
          $(this).css("background-color", "");
        }
      )
      .end()
      .find(":contains('H')")
      .hover(
        function () {
          $(this).css({
            "background-color": "yellow",
            "font-style": "italic",
            "font-weight": "bold",
          });
        },
        function () {
          $(this).css({
            "background-color": "",
            "font-style": "",
            "font-weight": "",
          });
        }
      );
  });
  //next()取得匹配的元素集合中每一个元素紧邻的后面同辈元素的元素集合。
  // offsetParent()取得离指定元素最近的含有定位信息的祖先元素。
  $(function () {
    // 如果我们从项目 A开始，我们可以通过下面的方法找到它的最近的被定过位的祖先元素：
    $(".test19 .div_box3 li.item-a")
      .offsetParent()
      .css("background-color", "red");
    // 将改变列表项 II的颜色，因为它被定位了。
  });
  // prev() 取得一个包含匹配的元素集合中每一个元素紧邻的前一个同辈元素的元素集合
  // siblings()获得匹配元素集合中每个元素的兄弟元素,可以提供一个可选的选择器
}

//隐藏与显示
function test20() {
  $(function () {
    // $(".test20 .div_box1 div").click(function () {
    //   $(this).toggleClass("pbtn");
    // });\
    //prev()
    var cur = $(".test20 .div_box1 div:eq(2)");
    cur.css("background-color", "green");
    $(".test20 .div_box1 div").click(function () {
      cur = cur.prev();
      $(".test20 .div_box1 div").css("background", "");
      cur.css("background-color", "green");
    });
  });

  //hide() 隐藏匹配的元素。
  //show() 显示匹配的元素
  $(function () {
    var $hide = $(".test20 .div_box_hide1 div");
    $hide.click(function () {
      $(this).hide(2000, function () {
        $(this).remove();
      });
    });
  });

  $(function () {
    var $hide = $(".test20 .div_box_hide2 p");
    var $text = $hide.text().split(" ").join("</span> <span>");
    $text = "<span>" + $text + "</span>";
    $hide.html($text);
    $("#hide1").click(function () {
      $hide.find("span:last-child").hide(500, function () {
        $(this).prev().hide(500, arguments.callee);
      });
    });
    $("#show1").click(function () {
      $hide.find("span").show(2000);
    });
  });
  //toggle() 显示或隐藏匹配元素。
  $(function () {
    $("#toggle1").click(function () {
      $(".test20 .div_box_toggle p").toggle("slow");
    });
  });
}
//淡入淡出
function test21() {
  //fadeIn()通过淡入的方式显示匹配元素。
  $(function () {
    $(".test21").css({
      position: "relative",
    });
    $(".test21 .div_fadein p").css({
      position: "relative",
      width: "400px",
      height: "400px",
    });
    $(".test21 .div_fadein div").css({
      position: "absolute",
      width: "400px",
      height: "300px",
      fontSize: "36px",
      color: "yellow",
      "background-color": "red",
      "line-height": "300px",
      display: "none",
      top: "0",
      left: "0",
      "text-align": "center",
    });
    $(".test21 .div_fadein span").css("display", "none");
    $(".test21 .div_fadein a").click(function () {
      $(".test21 .div_fadein div").fadeIn(3000, function () {
        $(".test21 .div_fadein span").fadeIn(100);
      });
      return false;
    });
  });

  //fadeOut()通过淡出的方式隐藏匹配元素。
  $(function () {
    var $text = $(".test21 .div_fadeOut p")
      .text()
      .split(" ")
      .join("</span> <span>");
    $text = "<span>" + $text + "</span>";
    $(".test21 .div_fadeOut p")
      .html($text)
      .find("span")
      .hover(
        function () {
          $(this).css("background-color", "yellow");
        },
        function () {
          $(this).css("background-color", " ");
        }
      )
      .click(function () {
        $(this).fadeOut(500, function () {
          $(this).remove();
        });
      });
  });

  //fadeTo()调整匹配元素的透明度。
  //fadeToggle() 通过匹配的元素的不透明度动画，来显示或隐藏它们。
}

//滑动
function test22() {
  // slideDown()用滑动动画显示一个匹配元素
  // slideToggle()用滑动动画显示或隐藏一个匹配元素。
  // slideUp()用滑动动画隐藏一个匹配元素。

  $(function () {
    $("#slideT").click(function () {
      $(".test22 .div_slideT div:not('.still')").slideToggle(
        "slow",
        function () {
          var n = parseInt($(".test22 span").text(), 10);
          $(".test22 span").text(n + 1);
        }
      );
    });
  });
}

//animate
function test23() {
  $(function () {
    $("#animatedGo1").click(function () {
      $("#animatedBlock1")
        .animate({ width: "90%" }, { queue: false, duration: 3000 })
        .animate({ fontSize: "24px" }, 1500)
        .animate({ borderLeftWidth: "15px" }, 1000);
    });
    $("#animatedGo2").click(function () {
      $("#animatedBlock2")
        .animate({ width: "90%" }, 1000)
        .animate({ fontSize: "24px" }, 1500)
        .animate({ borderRightWidth: "15px" }, 1000);
    });
    $("#animatedGo3").click(function () {
      $("#animatedBlock1,#animatedBlock2")
        .animate({ width: "90%" }, 1000)
        .animate({ fontSize: "24px" }, 1500)
        .animate({ borderRightWidth: "15px" }, 1000);
    });
    $("#animatedGo4").click(function () {
      $("#animatedBlock1,#animatedBlock2").css({
        width: "",
        fontSize: "",
        borderWidth: "",
      });
    });
  });
}

//clearQueue从列队中移除所有未执行的项。
//dequeue()执行匹配元素队列的下一个函数。
// finish()停止当前正在运行的动画，删除所有排队的动画，并完成匹配元素所有的动画。
function test24() {
  $(function () {
    $("#quenceStart").click(function () {
      var myDiv = $(".test24 .div_quence div");
      myDiv.show("slow");
      myDiv.animate({ left: "+=200" }, 5000);
      myDiv.queue(function () {
        var _this = $(this);
        _this.addClass("newcolor");
        _this.dequeue();
      });
      myDiv.animate({ left: "-=200" }, 3000);
      myDiv.queue(function () {
        var _this = $(this);
        _this.removeClass("newcolor");
        _this.dequeue();
      });
      myDiv.slideUp();
    });
    $("#quenceStop").click(function () {
      var myDiv = $(".test24 .div_quence div");
      myDiv.clearQueue(); //清除队列
      myDiv.stop(); //停止当前动画
    });
  });
}

function ghostButton() {
  $(function () {
    $(function () {
      $(".ghostButton .button").hover(
        function () {
          var titleText = $(this).attr("data-text");
          var leftLoc = $(this).offset().left;
          var topLoc = $(this).offset().top;
          $(".ghostButton .tooltip em").text(titleText);
          var addLeft =
            ($(".ghostButton .tooltip").outerWidth() - $(this).outerWidth()) /
            2; //此句应在赋予text值之后执行
          $(".ghostButton .tooltip")
            .css({
              left: leftLoc - addLeft,
              top: topLoc - 80,
            })
            .animate(
              {
                opacity: 1,
                top: topLoc - 50,
              },
              500
            );
        },
        function () {
          $(".ghostButton .tooltip").css("opacity", "0");
        }
      );
    });
  });
}

function water() {
  $(function () {
    $(window).on("load", function () {
      imgLoc();
      var data = { data: [{ src: "1.jpg" }] };
      $(window).scroll(function () {
        if (getHeight()) {
          var pin = $("<div>").addClass("pin").appendTo(".water");
          var box = $("<div>").addClass("box").appendTo(pin);
          var img = $("<img>")
            .attr("src", "静态资源/" + Math.floor(Math.random() * 9+1) + ".jpg")
            .appendTo(box);
          imgLoc();
        }
      });
    });
  });
  function getHeight() {
    var $box = $(".water .pin");
    var lastImgHeight =
      $box.last().offset().top - Math.floor($box.last().height / 2);
    var docHeight = $(document).height();
    var scrollHeight = $(window).scrollTop;
    return lastImgHeight < docHeight + scrollHeight ? false : true;
  }
  function imgLoc() {
    var $box = $(".water .pin");
    var boxWidth = $box.eq(0).width();
    var num = Math.floor($(window).width() / boxWidth);
    var numArr = [];
    $box.each(function (index, value) {
      var boxHeight = $box.eq(index).height();
      if (index < num) {
        numArr[index] = boxHeight;
      } else {
        var minHeight = Math.min.apply(numArr, numArr);
        var minIndex = $.inArray(minHeight, numArr);
        $(value).css({
          position: "absolute",
          top: minHeight,
          left: $box.eq(minIndex).position().left,
        });
        numArr[minIndex] += $box.eq(index).height();
      }
    });
  }
}
