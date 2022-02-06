import axios from 'axios';


class CyclableApi {

    constructor() {
        this.base_url = 'http://localhost:9001'
    }

    clientRegister(registerSchema) {
        const self = this;
        return new Promise(function (resolve, reject) {
            axios({
                method: 'post',
                url: self.base_url + '/user/signup',
                data:registerSchema,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    }

    clientLogin(signInSchema) {
        const self = this;
        return new Promise(function (resolve, reject) {
            axios({
                method: 'post',
                url: self.base_url + '/user/login',
                data:signInSchema,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                resolve(response.data);
                localStorage.setItem('token',response.data.token);
                localStorage.setItem('username',response.data.username);
                localStorage.setItem('user_id',response.data.user_id);
            }).catch(error => {
                reject(error.response);
            })
        })
    }

    addLocation(locationSchema) {
        const self = this;
        return new Promise(function (resolve, reject) {
            axios({
                method: 'post',
                url: self.base_url + '/location/add',
                data:locationSchema,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': self.getToken()
                }
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    }

    getUsersLocation() {
        const self = this;
        return new Promise(function (resolve, reject) {
            axios({
                method: 'get',
                url: self.base_url + '/location/all',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': self.getToken()
                }
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    }

    getClientDetails() {
        const self = this;
        return new Promise(function (resolve, reject) {
            axios({
                method: 'get',
                url: self.base_url + '/user',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': self.getToken()
                }
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    }

    getClientById(user_id) {
        const self = this;
        return new Promise(function (resolve, reject) {
            axios({
                method: 'get',
                url: self.base_url + '/user/' + user_id,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': self.getToken()
                }
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    }

    searchProduct(search_query) {
        const self = this;
        return new Promise(function (resolve, reject) {
            axios({
                method: 'post',
                url: self.base_url + '/product/search',
                data:search_query,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': self.getToken()
                }
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    }

    getProduct() {
        
        const self = this;
        console.log(self.getToken());
        return new Promise(function (resolve, reject) {
            axios({
                method: 'get',
                url: self.base_url + '/product/client',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': self.getToken()
                }
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    }

    getProductbyId(product_id) {
        const self = this;
        return new Promise(function (resolve, reject) {
            axios({
                method: 'get',
                url: self.base_url + '/product/' + product_id,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': self.getToken()
                }
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    }

    getToken() {
        return localStorage.getItem('token');
    }

}


export default CyclableApi;