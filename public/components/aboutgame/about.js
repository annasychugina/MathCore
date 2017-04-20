import Block from "../block/block";
import './about.scss';
import template from './about.tmpl.xml';


export default class GameAbout extends Block {
    constructor(options = {data: {}}) {
        super('div', options);
        this._el = document.querySelector(".js-about");
        this.template = template;
        this.init();
        this._el.innerHTML = this.template();

        this.mas = ["./static/img/game7.png", "./static/img/game3.png", "./static/img/game2.png"]
        this.to = -1;
        window.left_arrow = this.left_arrow.bind(this);
        window.right_arrow = this.right_arrow.bind(this);
    }

    right_arrow() {
        let obj = document.getElementById("img");
        if (this.to < this.mas.length - 1) this.to++
        else
            this.to = 0;
        obj.src = this.mas[this.to];
    }

    left_arrow() {
        let obj = document.getElementById("img");
        if (this.to > 0) this.to--;
        else
            this.to = this.mas.length - 1;
        obj.src = this.mas[this.to];
    }

	
    init() {
        this._updateHtml();
    }

    _updateHtml() {
        this._el.innerHTML = this.template();
    }
}
