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

	// 根据不同设备 设置类名
	function setHtmlClassName() {
		var statusBarAppearance = true; //本属性配置是否配置透明式状态栏，值需要与config.json的statusBarAppearance一致。
		var browser = {
			versions: (function() {
				var u = navigator.userAgent,
					app = navigator.appVersion;
				return {
					//移动终端浏览器版本信息
					trident: u.indexOf('Trident') > -1, //IE内核
					presto: u.indexOf('Presto') > -1, //opera内核
					webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
					gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
					mobile:
						!!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
					android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
					iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
					iPad: u.indexOf('iPad') > -1, //是否iPad
					webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
				};
			})(),
			language: (navigator.browserLanguage || navigator.language).toLowerCase()
		};
		console.log(browser);
		if (statusBarAppearance) {
			//在statusBarAppearance为true情况下添加透明状态栏样式
			if (
				browser.versions.ios ||
				browser.versions.iPhone ||
				browser.versions.iPad
			) {
				document.documentElement.className = 'ios';
			} else if (browser.versions.android) {
				document.documentElement.className = 'android';
			}
		}
	}
	// detect 0.5px supports
	if (dpr >= 2) {
		var fakeBody = document.createElement('body');
		var testElement = document.createElement('div');
		testElement.style.border = '.5px solid transparent';
		fakeBody.appendChild(testElement);
		docEl.appendChild(fakeBody);
		if (testElement.offsetHeight === 1) {
			docEl.classList.add('hairlines');
		}
		docEl.removeChild(fakeBody);
	}

	function init() {
		setBodyFontSize();
		setRemUnit();
		setHtmlClassName();
	}
	init();
})(window, document);
