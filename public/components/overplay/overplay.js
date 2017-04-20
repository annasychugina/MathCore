import Block from "../block/block";
import './overplay.scss';
import template from './overplay.tmpl.xml';

export default class Overplay extends Block {
    constructor(options = {data: {}}) {
        super('div', options);
        this._el = document.querySelector(".js-overplay");
        this.template = template;
        this.init();
        this._el.innerHTML = this.template();
        document.addEventListener('playermove', (e) => {
            this.setStatus(e.detail);

            // body...
        });
        //this._el.removeAttribute("hidden");
    }

    init() {
        this._updateHtml();

    }

    _updateHtml() {
         let userData = {
             login: window.session.getLogin() || ""
         };
         let params = window.location.pathname.split("/");
         this._el.innerHTML = this.template({userData: userData, active: params.length == 1 ? "" : params[1]});
        //this._el.innerHTML = this.template();
    }
    setStatus(message){
        let info = document.querySelector(".play__info");
        info.innerText = message;
    }
}
