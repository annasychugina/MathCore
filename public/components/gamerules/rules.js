import Block from "../block/block";
import './rules.scss';
import template from './rules.tmpl.xml';

export default class GameRules extends Block {

    constructor(options = {data: {}}) {
        super('div', options);
        this._el = document.querySelector(".js-rules");
        this.template = template;
        this.init();
        this._el.innerHTML = this.template();
    }

    init() {
        this._updateHtml();
    }

    _updateHtml() {
        this._el.innerHTML = this.template();
    }
}
