/**
 * 自定义cookie相关方法
 *
 * /


/**
 * 设置cookie
 * @param {String} name 名称
 * @param {String} value 储存之前先转换为字符串 该函数为
 * @param {Number} seconds 单位为秒s
 * @param {String} path 路径
 */
var setCookie = function(name, value, seconds, path) {
  // seconds有值就直接赋值，没有为0
  seconds = seconds || 0;
  path = path || '/';
  var expires = '';
  // 设置cookie的保存时间
  if (seconds != 0) {
    var date = new Date();
    date.setTime(date.getTime() + seconds * 1000);
    expires = '; expires=' + date.toGMTString();
  }
  // 对数组和对象的转换
  if (typeof value == 'object') {
    value = JSON.stringify(value);
  }
  // escape("Visit W3School!")  编码后为 Visit%20W3School%21
  document.cookie = name + '=' + escape(value) + expires + '; path=' + path; // 转码并赋值
};

/**
 * 获取cookie
 * @param {String} name
 */
var getCookie = function(name) {
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');

  if (arr == document.cookie.match(reg)) {
    var value = unescape(arr[2]);
    var len = value.length;
    if (
      (value.charAt(0) == '{' && value.charAt(len - 1) == '}') ||
      (value.charAt(0) == '[' && value.charAt(len - 1) == ']')
    ) {
      return JSON.parse(value);
    }
    return value;
  } else {
    return null;
  }
};

/**
 * 删除cookies 通过设置过期时间删除
 * @param {String} name
 */
var delCookie = function(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
};

/**
 * 获取cookie中的token
 * @param {String} tokenName
 */
var getToken = function(tokenName) {
  var strCookie = document.cookie; // 获取cookie字符串
  var arrCookie = strCookie.split('; '); // 分割
  // 遍历匹配
  var token = '';
  arrCookie.map(function(value) {
    if (value.indexOf(tokenName) !== -1) {
      token = value.slice(tokenName.length + 1);
    }
  });
  return token;
};

(function() {
  var cookieUtil = function cookieUtil() {
    return {
      setCookie: setCookie,
      delCookie: delCookie,
      getCookie: getCookie,
      getToken: getToken
    };
  };
})();

