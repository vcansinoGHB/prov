export function authData() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('usrtrx'));

    if (user ) {
        return user;
    } else {
        return "";
    }
}