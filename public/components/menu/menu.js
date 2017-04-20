import Block from "../block/block";
import './menu.scss';
import template from './menu.tmpl.xml';


export default class Menu extends Block {

    constructor(options = {data: {}}) {
        super('div', options);
        this._el = document.querySelector(".js-topmenu");
        this.template = template;
        this.init();
    }

    init() {
        this._updateHtml();
        document.addEventListener("updateMenu", this.performupdate.bind(this));
        let btn = document.getElementById('btnlogOut');
        btn.onclick = window.session.__proto__.logout;
    }

    performupdate(options) {
        if (!options.detail || !options.detail.isAuthorized) {
            this.hide();
            return;
        }
        this._updateHtml();
        this.show();

    }

    show() {
        //   this._el.setAttribute('hidden', false);
        this._el.style.display = "block";
    }

    hide() {
        //   this._el.setAttribute('hidden', true);
        this._el.style.display = "none";
    }

    _updateHtml() {
        let userData = {
            login: window.session.getLogin() || ""
        };
        let params = window.location.pathname.split("/");
        this._el.innerHTML = this.template({userData: userData, active: params.length == 1 ? "" : params[1]});
    }
}
