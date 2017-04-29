import View from "../modules/view";
import Menu from "../components/menu/menu";
import Profile from "../components/profileForm/profile";

export default class ProfileView extends View {
	constructor(options = {}) {
		super(options);
		this._el = document.querySelector('.js-profile');
		this.show();
	}

	init(options = {}) {
		let menu = new Menu();
		menu._updateHtml();
		let profile = new Profile();
		profile._updateHtml();
	}
}
