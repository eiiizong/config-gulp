var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串

function isIE () {
  return !!window.ActiveXObject || 'ActiveXObject' in window
}
/**
 * 判断是否是不支持的IE版本（版本9以下）
 * @returns {*|boolean}
 */

function notSupported () {
  return isIE() && IEVersion() < 9
}
/**
 * 判断是否是IE9
 * @returns {*|boolean}
 */

function isIE9 () {
  return isIE() && IEVersion() === 9
}
/**
 * 判断是否是IE10
 * @returns {*|boolean}
 */

function isIE10 () {
  return isIE() && IEVersion === 10
}
/**
 * 判断是否是IE11
 * @returns {*|boolean}
 */

function isIE11 () {
  return isIE() && userAgent.indexOf('rv 11.0') > 0
}
/**
 * 获取IE版本
 * 这个函数不公开
 * @returns {number}
 * @constructor
 */

function IEVersion () {
  // 取得浏览器的userAgent字符串
  // 判断是否IE浏览器
  var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
  reIE.test(userAgent)
  var fIEVersion = parseFloat(RegExp['$1'])
  return fIEVersion
}
/**
 * 是否是chrome
 * @returns {boolean|boolean}
 */

function isChrome () {
  return userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1
}
/**
 * 是否是Firefox
 * @returns {boolean}
 */

function isFireFox () {
  return userAgent.indexOf('Firefox') > -1 // 判断是否Firefox浏览器
}
/**
 * 是否是Safari
 * @returns {boolean|boolean}
 */

function isSafari () {
  return userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1 // 判断是否Safari浏览器
}

var browserType = function browserType () {
  return {
    isIE: isIE,
    notSupported: notSupported,
    isIE9: isIE9,
    isIE10: isIE10,
    isIE11: isIE11,
    isChrome: isChrome,
    isFireFox: isFireFox,
    isSafari: isSafari
  }
}

