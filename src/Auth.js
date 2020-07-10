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

        console.log(this.isAuthenticated);
        if(this.isAuthenticated == false){
            alert("Please Login First to access that Page");
        }
    return this.isAuthenticated;
    },
    getId(){
        return localStorage.getItem('loginid');
    }
    };
    export default Auth;