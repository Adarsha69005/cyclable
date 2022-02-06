class Authentication {

    logOut(){
        localStorage.removeItem('token');
    }

    isAuthenticated() {
        const token = localStorage.getItem('token');
        if(!token) {
            return false;
        }
        return true;
    }
}

export default new Authentication();