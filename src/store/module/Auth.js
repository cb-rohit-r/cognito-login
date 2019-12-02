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
                return state.auth.isUserSignedIn();
            }
            return false;
        },
        isTokenExpired(state) {
            if (state.session.getJson('_token_valid') !== null) {
                return false;
            }
            localStorage.clear()
            return true;
        },
        getCredentials() {
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
        logout(context) {
            context.state.auth.signOut();
        },
        getUser (context) {
            if (!context.state.session.isExpired('jwt')) {
                const jwt = context.state.session.getJson('jwt')
                return jwt.email;
            }
            return '';        
        },
    }
}
