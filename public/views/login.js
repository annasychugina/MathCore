import View from "../modules/view";
import Form from "../components/form/form";
import Menu from "../components/menu/menu";
import Scoreboard from "../components/scoreboard/scoreboard";
import Session from "../models/session";
import Router from "../modules/router";
import Button from "../components/button/button";


export default class LoginView extends View {
	constructor(options = {}) {
		super(options);
		this._el = document.querySelector('.js-welcome-panel');
		// this.handleClick = this.handleClick.bind(this);
		// this.init = this.init.bind(this);
		this.form = new Form({
			el: this._el,
			data: {
				title: 'WELCOME TO SPACECORE',
				fields: [
					{
						name: 'login',
						type: 'text',
						placeholder: 'Your login here',
						required : true,
					},
					{
						name: 'password',
						type: 'password',
						placeholder: 'Your password here',
						required : true,
					},
				],
				controls: [
					{
						text: 'Sign in',
						attrs: {
							type: 'submit',
							class: 'btnsignin'
						},
					},
					{
						text: 'Sign up',
						attrs: {
							type: 'button',
							class: 'btnsignup',
							id: 'btnsignup'
							// onclick: "(new Router).go('/user')"
						},
					}
				],
			},
		});
		this.init();
		this.show();
		this.submitFunc = this.onSubmit.bind(this);
	}

	init(options = {}) {

	}

	onSubmit(event){
		event.preventDefault();
		let userData = this.form.getFormData();
		if(this.form.isValid()){
		window.session.send('POST', userData).then(
			() => {
				window.session.login(userData.login);
				document.dispatchEvent( new CustomEvent("updateMenu", {
					detail:{
						isAuthorized: true
					}
				}) );
				(new Router).go('/scores');
			}).catch(
				(error) => {
					console.log(error);
					alert("This user doesn't exist");
					this.form.reset();

			});
	}
	}

	 handleClick(){
	 	(new Router).go('/user');
	 }

	resume(options = {}) {
		this._el.setAttribute('hidden', false);
		this.form.render();
		this.form.on('submit', this.submitFunc);
		this.show();
		let button = document.getElementById('btnsignup');
		button.onclick = this.handleClick;
	}

	pause(options = {}) {
		this.form.hide();
		this.form.stop('submit', this.submitFunc);
		this.hide();
	}
}
