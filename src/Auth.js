import { getLoginId } from "./Reducers/reducer";

const Auth = {
    isAuthenticated: false,
    authenticate() {
    this.isAuthenticated = true;
    },
    signout() {
    this.isAuthenticated = false;
    },
    getAuth() {
        console.log(this.isAuthenticated)
    return this.isAuthenticated;
    },
    getId(){
        return localStorage.getItem('loginid');
    }
    };
    export default Auth;