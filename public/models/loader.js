(function() {
	'use strict'

	function ScreenLoader(text) {
		this.loadingUIText = text;
	}

	ScreenLoader.prototype.displayLoadingUI = function() {
		console.log(this.loadingUIText);
	};

	ScreenLoader.prototype.hideLoadingUI = function() {
		console.log("Loaded!");
	};

	window.ScreenLoader = ScreenLoader;

}
