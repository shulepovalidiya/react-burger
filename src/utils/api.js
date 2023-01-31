import {BASE_URL} from "./constants";

class Api {
    constructor(options) {
        this.base_url = options.url;
    }

    _request(url, options) {
        return fetch(url, options).then(res => this._getResponseData(res))
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getIngredientsArray() {
        return this._request(`${this.base_url}/ingredients`, {})
    }

    getOrderNumber(ingredientsID) {
        return this._request(`${this.base_url}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ingredients: ingredientsID,
            })
        })
    }
}

const api = new Api ({
    url: BASE_URL,
})

export default api;
