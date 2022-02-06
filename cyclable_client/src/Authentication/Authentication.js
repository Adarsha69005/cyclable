class Authentication {

    logOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('latitude');
        localStorage.removeItem('longitude');
        localStorage.removeItem('username');
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