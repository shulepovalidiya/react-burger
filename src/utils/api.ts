import {BASE_URL} from "./constants";

class Api {
    base_url: string;

    constructor(options: {url: string;}) {
        this.base_url = options.url;
    }

    private checkResponse(res: Response) {
        return res.ok
            ? res.json()
            : res.json().then((err) => Promise.reject(err));
    }

    private request(url: string, options: any) {
        return fetch(url, options).then(res => this.checkResponse(res))
    }

    private refreshToken() {
        return this.request(`${this.base_url}/auth/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            }),
        })
    }

    private fetchWithRefresh = async (url: string, options: any) => {
        try {
            const res = await fetch(url, options);
            return await this.checkResponse(res);
        } catch (err: any) {
            if (err.message === "jwt expired") {
                const refreshData = await this.refreshToken();
                if (!refreshData.success) {
                    return Promise.reject(refreshData);
                }
                localStorage.setItem("refreshToken", refreshData.refreshToken);
                localStorage.setItem("accessToken", refreshData.accessToken.split('Bearer ')[1]);
                options.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
                const res = await fetch(url, options);
                return await this.checkResponse(res);
            } else {
                return Promise.reject(err);
            }
        }
    }

    getIngredientsArray() {
        return this.request(`${this.base_url}/ingredients`, {})
    }

    getOrderNumber(ingredientsID: string) {
        return this.fetchWithRefresh(`${this.base_url}/orders`, {
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

    sendPasswordRecoveryCode(email: string) {
        return this.request(`${this.base_url}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
            })
        })
    }

    resetPassword(password: string, token: string) {
        return this.request(`${this.base_url}/password-reset/reset`, {
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

    createUser(email: string, password: string, name: string) {
        return this.request(`${this.base_url}/auth/register`, {
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

    authorize(email: string, password: string) {
        return this.request(`${this.base_url}/auth/login`, {
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
        return this.request(`${this.base_url}/auth/logout`, {
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
        return this.fetchWithRefresh(`${this.base_url}/auth/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            }
        })
    }

    updateUserInfo(name: string, email: string, password: string) {
        return this.fetchWithRefresh(`${this.base_url}/auth/user`, {
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
