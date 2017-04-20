import Block from "../block/block";
import './scoreboard.scss';
import template from './scoreboard.tmpl.xml';


export default class Scoreboard extends Block {
    constructor(options = {data: {}}) {
        super('div');
        this.data = options.data;
        this.template = template;

        this.render();
    }

    render() {
        this._updateHtml();
    }

    _updateHtml() {
        this._el.innerHTML = this.template(this.data);
    }
}
