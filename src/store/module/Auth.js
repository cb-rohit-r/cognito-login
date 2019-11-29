import Vue from 'vue'
import Vuex from 'vuex'
import ExpiredStorage from 'expired-storage'
import { CognitoAuth } from 'amazon-cognito-auth-js';
import AWS from 'aws-sdk'
import COGNITO_CONF from '../../env'

Vue.use(Vuex)

export default {
    state: {
        auth : new CognitoAuth(COGNITO_CONF.COGNITO_CONF),
        session: new ExpiredStorage(),
        isLoggedIn: false
    },
    getters: {
        isLoggedIn(state) {
            if (state.auth !== null) {
                console.log(state.auth.isUserSignedIn());
                return state.auth.isUserSignedIn();
            }
            return state.isLoggedIn;
        },
        isTokenExpired(state) {
            if (state.session.getJson('_token_valid') !== null) {
                return false;
            }
            localStorage.clear()
            return true;
        },
        getCredential() {
            return {
                accessKey : AWS.config.credentials.accessKeyId,
                secretKey : AWS.config.credentials.secretAccessKey,
                sessionToken : AWS.config.credentials.sessionToken
            }
        },
        getJwtToken(state) {
            return state.auth.getSignInUserSession().getIdToken().getJwtToken()
        }
        
    },
    mutations: {
    },
    actions: {
        login (context) {
            if (context.state.auth != null) {
                context.state.auth.getSession();
            }
        },
        getUser (context) {
            if (!context.state.session.isExpired('jwt')) {
                const jwt = context.state.session.getJson('jwt')
                return jwt.email;
            }
            return '';        
        },
        initAuth (context, payload) {
            const that = context;
            const curUrl = payload.url;
            that.state.auth.userhandler = {
                onSuccess(session) {
                    if (session) {
                        that.state.session.setItem('_token_valid', 'true', 3500);
                        window.location = window.location.href.substr(0, window.location.href.indexOf('#'))
                    }
                },
                onFailure(err) {
                    that.state.errorMessage = true
                }
            };
            that.state.auth.parseCognitoWebResponse(curUrl);
        },
        initAws (context, payload) {
            if (context.state.session.getJson('_token_valid') !== null) {
                AWS.config.region = 'ap-south-1';
                const url = 'cognito-idp.ap-south-1.amazonaws.com/ap-south-1_2R8h4MmpH'
                const Logins = {}
                Logins[url] = context.state.auth.getSignInUserSession().getIdToken().getJwtToken()
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    AllowUnauthenticatedIdentities: true,
                    IdentityPoolId : 'ap-south-1:b5cc8a97-9479-431f-bd8e-b321d7ccee19',
                    Logins
                })
                AWS.config.credentials.get((err) => {
                    if (!err) {
                        console.log('Application init')
                    }
                })
            }
        }
    }
}
