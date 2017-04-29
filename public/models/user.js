import Model from "../modules/model";

export default class User extends Model {
    constructor(attributes) {
        super(attributes);
    }

    url(id) {
        let url = 'https://java-heroku-test-victor.herokuapp.com/user/';
        if (id) {
            return url + id;
        }
        return url;
    }

}
