var app = new Vue({
	el: '#app',
	data: function() {
		return {
			isAddClerkPopup: true
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init: function() {
			this.calcQRSize();
		},
		// 确定添加店员
		btnOk: function() {
			this.isAddClerkPopup = !this.isAddClerkPopup;
		},
		// 取消添加店员
		btnCancel: function() {
			this.isAddClerkPopup = !this.isAddClerkPopup;
		},
		// 显示添加店员提示
		showAddClerkPopup: function() {
			this.isAddClerkPopup = !this.isAddClerkPopup;
		},
		// 计算二维码大小
		calcQRSize: function() {
			var windowW = document.body.offsetWidth;
			var newImgW = windowW - 58;
			var r = parseFloat(newImgW / 317);
			var QRDOM = this.$refs.QR;
			QRDOM.style.width = (r * 162) + 'px';
			QRDOM.style.height = (r * 162) + 'px';
			QRDOM.style.top = (r * 37) + 'px';
			QRDOM.style.left = (r * 86 + 8) + 'px';
		}
	},
	components: {
		// draggable
	}
});
