import Model from "../modules/model";
import Router from "../modules/router";

export default class Session extends Model {
    constructor(attributes) {
        super(attributes);
        this._url = 'https://java-heroku-test-victor.herokuapp.com/';
    }


    login(login) {
        this._login = login;
    }

    logout() {
        this.send("GET", null, this._url, "exit/").then((response) => {
            this._login = null;

            document.dispatchEvent(new CustomEvent("updateMenu", {
                detail: {
                    isAuthorized: false
                }
            }));
            (new Router).go('/');

        });
    }

    isAuthorised() {
        return this.send("GET", null, this.url(null, true), "isAuthorised/");
    }

    getLogin() {
        return this._login;
    }


    // получаем базовый урл
    url(id, base = false) {


        if (id) {
            return base ? this._url : this._url + "session/";
        }
        return base ? this._url : this._url + "session/";
    }

}
