import View from "../modules/view";
import Menu from "../components/menu/menu";
import GameAbout from "../components/aboutgame/about";

export default class GameAboutView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-about');
			this.show();
		}
		init(options = {}) {
			let menu = new Menu();
			menu._updateHtml();
			let about= new GameAbout();
			about._updateHtml();
		}
	}
