import View from "../modules/view";
import Menu from "../components/menu/menu";

import GameRules from "../components/gamerules/rules";


export default class GameRulesView extends View {
	constructor(options = {}) {
		super(options);
		this._el = document.querySelector('.js-rules');
		this.show();

	}


	init(options = {}) {
  let menu = new Menu();
  menu._updateHtml();

		let rules= new GameRules();
		rules._updateHtml();
  }


}
