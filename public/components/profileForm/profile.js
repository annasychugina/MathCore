import Block from "../block/block";
import './profile.scss';
import template from './profile.tmpl.xml';


export default class Profile extends Block {
    constructor(options = {data: {}}) {
        super('div', options);
        this._el = document.querySelector(".js-profile");
        this.template = template;
        this.init();
    }

    init() {
        this._updateHtml();
        document.addEventListener("updateMenu", this.performupdate.bind(this));
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
        this._el.style.display = "block";
    }

    hide() {
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
