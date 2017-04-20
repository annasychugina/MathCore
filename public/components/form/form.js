import Block from "../block/block";
import Button from "../button/button";
import './form.scss';
import template from './form.tmpl.xml';

export default class Form extends Block {

    constructor(options = {data: {}}) {
        super('form');
        this.template = template;
        this.data = options.data;
        this._el = options.el;
        this.validFlag = false;
        this.render();
    }


    render() {
        this._updateHtml();
        this._installControls();
    }

    hide() {
        let controls = this._el.querySelector('.js-controls');
        let btns = controls.children;
        Array.prototype.forEach.call(btns, function (btn) {
            if (btn.hasAttribute('onclick')) {
                btn.onclick = '';
            }
        });
        this._el.innerHTML = '';
    }

    reset() {
        this._el.querySelector('form').reset();
    }

    _updateHtml() {

        this._el.innerHTML = this.template(this.data);
    }


    _installControls() {
        let {controls = []} = this.data;

        controls.forEach(data => {
            let control = data instanceof Button ? data :
                new Button({text: data.text, attrs: data.attrs});
            this._el.querySelector('.js-controls').appendChild(control._get());
        });
    }

    isValid() {
        return this.validFlag;
    }

    /**
     * Взять данные формы
     * @return {object}
     */
    getFormData() {
        let form = this._el.querySelector('form');

        let elements = form.elements;
        let check = true;
        let fields = {};

        Array.prototype.forEach.call(elements, function (element) {
            let name = element.name;
            let value = element.value;

            if (!name) {
                return;
            }

            if (value === '') {
                alert('Заполните поле ' + name + '!!');
                check = check && false;
            }
            else {
                fields[name] = value;
                check = check && true;
            }
        });

        this.validFlag = check;
        return fields;
    }

}
