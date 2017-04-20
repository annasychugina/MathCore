import View from "../modules/view";
import Menu from "../components/menu/menu";
import CollectionUser from "../models/collectionUser";
import Button from "../components/button/button";
import Scoreboard from "../components/scoreboard/scoreboard";
import Router from "../modules/router";


export default class ScoreBoardView extends View {
	constructor(options = {}) {
		super(options);
		this._el = document.querySelector('.scoreboard_container');
		this._init();
		this.show();
		this.handleClick = this.handleClick.bind(this);
	}



	_init() {
		let container = document.querySelector('.scoreboard_container');
		this.btnplay = new Button({
			text: "Play",
			attrs: {
			type: 'button',
			class: 'btnplay',
			id: 'btnplay'
			// onclick: "(new Router).go('/play')"
			// onclick: this.handleClick
		}
	});

		this.btnplay.renderTo(container);
		this.menu = new Menu();
		this.menu._updateHtml();
		this.collectionUser = new CollectionUser({});
		this.collectionUser.fetchAll().then(response => {
			let json = {
				data: {
					scores: JSON.parse(response)
				}};
				this._menu = new Scoreboard(json);
				this._el = this._menu._el;
				container.appendChild(this._menu._el);
			})
		}


		handleClick(){
			(new Router).go('/play');
		}

		resume(options = {}) {
			this.show();
			this.menu.show();
			let container = document.querySelector('.scoreboard_container');
			container.removeAttribute('hidden');
			let button = document.getElementById('btnplay');
			button.onclick = this.handleClick;

			document.dispatchEvent( new CustomEvent("updateMenu", {
				detail:{
					isAuthorized: true
				}
			}) );
		}

		pause(options = {}) {
			let container = document.querySelector('.scoreboard_container');
			container.setAttribute('hidden', true);

			this.hide();
		}

		init(options = {}) {
			this.menu = new Menu();
			this.menu._updateHtml();
			this.menu.show();

		}

	}
