export default class Model {

    constructor(attributes) {
        this.attributes = Object.assign({}, this.defaults, this._clean(attributes));
    }

    get baseUrl() {
        return 'https://java-heroku-test-victor.herokuapp.com';
    }

    get defaults() {
        return {};
    }

    _clean(attributes) {
        Object.keys(attributes).forEach(key => {
            if (attributes[key] === undefined) {
                delete attributes[key];
            }

            if (typeof attributes[key] === 'object' && attributes[key] !== null) {
                this._clean(attributes[key]);
            }
        });

        return attributes;
    }

    fetch() {
        return this.send('GET', {id: this.attributes.id})
            .then(data => JSON.parse(data))
            .then(json => {
                this.attributes = json;
                return this.attributes;
            });
    }

    save() {
        const method = this.attributes.id ? 'PUT' : 'POST';

        return this.send(method, this.attributes)
            .then((data => JSON.parse(data)))
            .then(json => {
                this.attributes.id = json.name;
                return this.attributes;
            });
    }

    remove() {
        return this.send('DELETE', {id: this.attributes.id})
            .then(() => {
                this.attributes = {};
            });
    }


    send(method, data, _url = "", path = "") {
        let url = _url ? _url : this.url();
        url = path ? url + path : url;
        if (data && data.id) {
            url += data.id;
        }
        return fetch(url, {
            method: method,
            mode: "cors",
            body: data ? JSON.stringify(data) : null,
            headers: {'Content-type': 'application/json'},
            credentials: 'include'
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return Promise.resolve(response)
                }
                return Promise.reject(new Error(response.statusText))
            })
            .then(response => response.text())
        //.catch(error => console.log(error));

    }


    fetchAll(method = "GET") {
        const url = this.url();
        return fetch(url, {
            method: method,
            mode: "cors",
            headers: {'Content-type': 'application/json'}
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return Promise.resolve(response)
                }
                return Promise.reject(new Error(response.statusText))
            })
            .then(response => response.text())
            .catch(error => console.log(error));

    }


}
