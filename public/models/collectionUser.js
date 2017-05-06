import Model from "../modules/model";


export default class CollectionUser extends Model {
    constructor(attributes) {
        super(attributes);
    }

    /* пока для осторожности прописываем url напрямую */
    url(id) {
        let url = 'https://java-heroku-test-victor.herokuapp.com/rating/';
        return url;
    }

}
