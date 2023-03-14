import {BASE_URL} from "./constants";

class Api {
    constructor(options) {
        this.base_url = options.url;
    }

    _checkResponse(res) {
        return res.ok
            ? res.json()
            : res.json().then((err) => Promise.reject(err));
    }

    _request(url, options) {
        return fetch(url, options).then(res => this._checkResponse(res))
    }

    _refreshToken() {
        return fetch(`${this.base_url}/auth/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            }),
        }).then(res => this._checkResponse(res))
    }

    _fetchWithRefresh = async (url, options) => {
        try {
            const res = await fetch(url, options);
            return await this._checkResponse(res);
        } catch (err) {
            if (err.message === "jwt expired") {
                const refreshData = await this._refreshToken();
                if (!refreshData.success) {
                    return Promise.reject(refreshData);
                }
                localStorage.setItem("refreshToken", refreshData.refreshToken);
                localStorage.setItem("accessToken", refreshData.accessToken.split('Bearer ')[1]);
                options.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
                const res = await fetch(url, options);
                return await this._checkResponse(res);
            } else {
                return Promise.reject(err);
            }
        }
    }

    getIngredientsArray() {
        return this._request(`${this.base_url}/ingredients`, {})
    }

    getOrderNumber(ingredientsID) {
        return this._fetchWithRefresh(`${this.base_url}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({
                ingredients: ingredientsID,
            })
        })
    }

    sendPasswordRecoveryCode(email) {
        return this._request(`${this.base_url}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
            })
        })
    }

    resetPassword(password, token) {
        return this._request(`${this.base_url}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                token,
            })
        })
    }

    createUser(email, password, name) {
        return this._request(`${this.base_url}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                name,
            })
        })
    }

    authorize(email, password) {
        return this._request(`${this.base_url}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        })
    }

    logout() {
        return this._request(`${this.base_url}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            })
        })
    }


    getUserInfo() {
        return this._fetchWithRefresh(`${this.base_url}/auth/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            }
        })
    }

    updateUserInfo(name, email, password) {
        return this._fetchWithRefresh(`${this.base_url}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
    }
}

const api = new Api({
    url: BASE_URL,
})

export default api;
