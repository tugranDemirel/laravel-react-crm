import {observable, action, makeObservable } from "mobx";
import jwt_decode from 'jwt-decode'
import CryptoJS from 'crypto-js'
import sign from 'jwt-encode'
class AuthStore {
    appState = null

    constructor() {
        makeObservable(this, {
            appState: observable,
            saveToken: action,
            getToken: action
        })
    }

    saveToken = (appState) => {
        try {
            localStorage.setItem('appState', CryptoJS.AES.encrypt(sign(appState, 'secret'), 'laravel-react').toString())
            this.getToken();
        }catch (e){
            console.log(e)
        }
    }

    getToken = () => {
        try {
            const appStateData =  localStorage.getItem('appState')
            if (appStateData){
                var bytes = CryptoJS.AES.decrypt(appStateData, 'laravel-react')
                var originalText = bytes.toString(CryptoJS.enc.Utf8)
                this.appState = jwt_decode(originalText);
            }
            else
                this.appState = null
        }catch (e){
            console.log(e)
        }
    }
}

export default new AuthStore()
