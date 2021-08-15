function myAjax(type, url, params, datatype, callback, async) {
  var xhr = null;
  type = type.toUpperCase();
  datatype = datatype.toLowerCase();
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  if (type == "POST") {
    var param = "";
    for (var i = 0; i < params.length; i++) {
      if (i != params.length - 1) {
        param += params[i].name + "=" + params[i].value + "&";
      } else {
        param += params[i].name + "=" + params[i].value;
      }
    }
    xhr.open(type, url, async);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("x-csrftoken", getCookie("csrftoken"));
    xhr.send(param);
  } else if (type == "GET") {
    if (params && params != "") {
      url += "?";
      for (var i = 0; i < params.length; i++) {
        if (i != params.length - 1) {
          url += params[i].name + "=" + params[i].value + "&";
        } else {
          url += params[i].name + "=" + params[i].value;
        }
      }
    }
    xhr.open(type, url, async);
    xhr.send(null);
  }
  if (async) {
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (datatype == "xml") {
          var result = xhr.responseXML;
        } else if (datatype == "json") {
          var result = xhr.responseText;
          result = JSON.parse(result);
        } else {
          var result = xhr.responseText;
        }
        if (callback) {
          callback(result);
        }
      }
    };
  } else {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (datatype == "xml") {
        var result = xhr.responseXML;
      } else if (datatype == "json") {
        var result = xhr.responseText;
        result = JSON.parse(result);
      } else {
        var result = xhr.responseText;
      }
      if (callback) {
        callback(result);
      }
    }
  }
}
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = $.trim(cookies[i]);
      if (cookie.substring(0, name.length + 1) == name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

//利用对象解决参数顺序问题
function myAjax2(obj) {
  var defaults = {
    type: "GET",
    url: "#",
    dataType: "json",
    data: {},
    async: true,
    success: function (result) {
      console.log(result);
    },
  };

  //obj属性覆盖defaults值
  //-------------------------重要-------------------------------
  for (var key in obj) {
    defaults[key] = obj[key];
  }
  //-----------------------------------------------------------
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  var param = "";
  for (var each in defaults.data) {
    param += each + "=" + defaults.data[each] + "&";
  }
  if (param) {
    param = param.substring(0, param.length - 1);
  }
  if (defaults.type.toUpperCase() == "POST") {
    console.log("POST");
    xhr.open(defaults.type, defaults.url, defaults.async);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("x-csrftoken", getCookie("csrftoken"));
    xhr.send(param);
  } else if (defaults.type.toUpperCase() == "GET") {
    defaults.url += "?" + param;
    xhr.open(defaults.type, defaults.url, defaults.async);
    xhr.send(null);
  }
  if (defaults.async) {
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (defaults.dataType.toLowerCase() == "json") {
          var result = xhr.responseText;
          result = JSON.parse(result);
        } else if (defaults.dataType.toLowerCase() == "xml") {
          var result = xhr.responseXML;
        } else {
          var result = xhr.responseText;
        }
        defaults.success(result);
      }
    };
  } else {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (defaults.dataType.toLowerCase == "json") {
        var result = xhr.responseText;
        result = JSON.parse(result);
      } else if (defaults.dataType.toLowerCase == "xml") {
        var result = xhr.responseXML;
      } else {
        var result = xhr.responseText;
      }
      defaults.success(result);
    }
  }
}

function myAjax3(obj) {
  var defaults = {
    type: "GET",
    url: "#",
    data: {},
    success: function (data) {},
    jsonp: "callback",
    jsonCallback: "hehe",
  };
  for (var key in obj) {
    defaults[key] = obj[key];
  }
  var params = "";
  for (var key in defaults.data) {
    params += key + "=" + defaults.data[key] + "&";
  }
  if (params) {
    params = params.substring(0, params.length - 1);
    defaults.url += "?" + params;
  }

  defaults.url += "&" + defaults.jsonp + "=" + defaults.jsonCallback;
  window[defaults.jsonCallback] = function (data) {
    defaults.success(data);
  };
  var script = document.createElement("script");
  script.src = defaults.url;
  var head = document.querySelector("head");
  head.appendChild(script);
}

function myAjax4(obj) {
  if (obj.dataType == "jsonp") {
    myAjax3(obj);
  } else {
    myAjax2(obj);
  }
}
