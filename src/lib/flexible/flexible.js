/*
 * @eiiizong
 * 2019.10.14
 */

(function flexible(window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + 'px';
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize);
    }
  }

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    var rem = docEl.clientWidth / 10;
    docEl.style.fontSize = rem + 'px';
  }

  // reset rem unit on page resize
  window.addEventListener('resize', init);
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) init();
  });

  // detect 0.5px supports
  // 检测 0.5px 支持
  function check() {
    if (dpr >= 2) {
      var fakeBody = document.createElement('body');
      var testElement = document.createElement('div');
      testElement.style.border = '.5px solid transparent';
      fakeBody.appendChild(testElement);
      docEl.appendChild(fakeBody);
      if (testElement.offsetHeight === 1) {
        console.log('浏览器 dpr 大于等于 2 时，支持 0.5px 的边框。');
        docEl.classList.add('hairlines');
      }
      docEl.removeChild(fakeBody);
    }
  }
  function init() {
    setBodyFontSize();
    setRemUnit();
    check();
  }
  init();
})(window, document);
