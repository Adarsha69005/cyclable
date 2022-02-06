import axios from 'axios';


class CyclableApi {

    constructor() {
        this.base_url = 'http://localhost:9001'
    }

    adminRegister(registerSchema) {
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

    adminLogin(signInSchema) {
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
            }).catch(error => {
                reject(error.response);
            })
        })
    }

    updateAdmin(updateSchema) {
        const self = this;
        return new Promise(function (resolve, reject) {
            axios({
                method: 'post',
                url: self.base_url + '/user/profile',
                data:updateSchema,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': self.getToken()
                }
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response);
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

    deleteClientById(user_id) {
        const self = this;
        return new Promise(function (resolve, reject) {
            axios({
                method: 'delete',
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

    activateClient(activateSchema) {
        const self = this;
        return new Promise(function (resolve, reject) {
            axios({
                method: 'post',
                url: self.base_url + '/user/activate',
                data:activateSchema,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token':self.getToken()
                }
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    }

    addProduct(addProductSchema) {
        const self = this;
        console.log('schema data',addProductSchema)
        return new Promise(function (resolve, reject) {
            axios({
                method: 'post',
                url: self.base_url + '/product/add',
                data:addProductSchema,
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
                url: self.base_url + '/product',
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

    deleteProductById(product_id) {
        const self = this;
        return new Promise(function (resolve, reject) {
            axios({
                method: 'delete',
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