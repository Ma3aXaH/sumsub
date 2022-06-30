
import {Platform} from 'react-native'

function timeout(promise) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('request timeout'))
        }, API.timeoutDelay)

        promise.then(value => {
            clearTimeout(timer)
            resolve(value)
        })
        .catch(err => {
            clearTimeout(timer)
            reject(err)
        })
    })
}

class API {

    static BASE_URL = __DEV__ ? 'https://m-txapi.bpay.md' : 'https://m-xapi.bpay.md' // http://developer.api 'http://172.16.101.215:82'//https://m-xapi.bpay.md' // https://m-xapi.bpay.md
    static IDENTITY_URL = __DEV__ ? 'http://192.168.30.139:9250' : 'https://identity-service.bpay.md/'
    static PROJECT_NAME = 'mobileapp'
    static USER_AGENT = Platform.OS == 'ios' ? 'BPAYAPP iPhone' : 'BPAYAPP Android'

    static token = null;

    static timeoutDelay = 60000;

    static endpoints = {

        getSessionToken: {
            method: 'POST',
            url: API.url('Auth/AuthProject')
        },
        login: {
            method: 'POST',
            url:API.url('Auth/Authorization')
        },

        identitySetUserInfo: {
            method: 'POST',
            url: `${API.IDENTITY_URL}/setUserInfo`
        },
        identityGetToken: {
            method: 'GET',
            url: `${API.IDENTITY_URL}/getAccessToken`
        }

    }

    static url(path){
        return `${API.BASE_URL}/${path}`;
    }

    static headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': API.USER_AGENT,
        'App-Version': '3.22.4',
        'Os-Version': '11'
    }
    
    static saveSessionToken(data){

        API.token = data.token;
        return new Promise((resolve,reject) => {
          resolve(data)
        })
    }

    static async handleHttpResponse(response) {
        if (response.ok) {
            return response.json()
        }
        else {
            throw new Error(`HTTP error: ${response.status} on ${response.url}`)
        }
    }

    static async handleError(error) {
        if (error instanceof Error) {
            // web or parsing error
        }
        throw error
    }

    static async handleResponseCodes(responseJSON){
      if (responseJSON.new_token) {
        API.token = responseJSON.new_token
      }

      if (responseJSON.code == 100) {
        return Promise.resolve(responseJSON);
      }
      else {
        return Promise.reject(responseJSON.text);
      }        
    }



    static async getSessionToken(token = null){

        const {url,method} = API.endpoints.getSessionToken;

        return timeout(fetch(url,{
            headers: API.headers,
            method: method,
            body: JSON.stringify({
                project: API.PROJECT_NAME,
                token: token  // null
            })
        }))
        .then(API.handleHttpResponse)
        .then(API.handleResponseCodes)
        .then(res => {
          API.token = res.token;
          return Promise.resolve(res)
        })
        .catch(API.handleError)
    }

    static async identitySetUserInfo(data){
        const {url, method} = API.endpoints.identitySetUserInfo;

        return timeout(fetch(url, {
            method: method,
            body: JSON.stringify({
                token: API.token,
                project: API.PROJECT_NAME,
                passInfo: data
            })
        }))
        .then(API.handleHttpResponse)
        .then(API.handleResponseCodes)
        .catch(API.handleError)
    }

    static async identityGetToken() {
        const {url, method} = API.endpoints.identityGetToken;

        return timeout(fetch(`${url}/${API.token}/${API.PROJECT_NAME}`, {
            method: method
        }))
        .then(API.handleHttpResponse)
    }

    static async login(data){ 

        await API.getSessionToken();

        const {url,method} = API.endpoints.login;

        return timeout(fetch(url,{
            method: method,
            headers: API.headers,
            body: JSON.stringify({
                authtype: 'user',
                token: API.token,
                project: API.PROJECT_NAME,
                lang: 'ru',
                ...data
            })
        }))
        .then(API.handleHttpResponse)
        .then(API.handleResponseCodes)
        .catch(API.handleError)
    }
}

export default API