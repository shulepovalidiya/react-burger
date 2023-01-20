import {BASE_URL} from "./constants";

class Api {
    constructor(options) {
        this.base_url = options.url;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getIngredientsArray() {
        return fetch(`${this.base_url}/ingredients`)
            .then(res => this._getResponseData(res))
    }

    getOrderNumber(ingredientsID) {
        return fetch(`${this.base_url}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ingredients: ingredientsID,
            })
        })
            .then(res => this._getResponseData(res))
    }
}

const api = new Api ({
    url: BASE_URL,
})

export default api;
