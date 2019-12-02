import { CognitoAuth } from 'amazon-cognito-auth-js';
import ExpiredSession from 'expired-storage'
import AWS from 'aws-sdk'

class CognitoHelper {
    constructor(cognitoConfig, region, url, identityPool) {
        this.cognitoAuth = new CognitoAuth(cognitoConfig)
        this.region = region
        this.url = url
        this.session = new ExpiredSession()
        this.identityPool = identityPool
        this.loggedIn = false
        this.isCredentialsInit = false
    }

    getCredentials() {
        return {
            accessKey : this.AWS.config.credentials.accessKeyId,
            secretKey : this.AWS.config.credentials.secretAccessKey,
            sessionToken : this.AWS.config.credentials.sessionToken
        }
    }

    login() {
        if (this.cognitoAuth != null) {
            this.cognitoAuth.getSession();
            this.loggedIn = true
        }
    }

    logout() {
        this.cognitoAuth.signOut()
    }

    isLoggedIn() {
        if (this.cognitoAuth !== null) {
            return this.cognitoAuth.isUserSignedIn();
        }
        return false;
    }
    isTokenExpired() {
        if (this.session.getJson('_token_valid') !== null) {
            return false;
        }
        localStorage.clear()
        return true;
    }

    initAuth (payload) { 
        const curUrl = payload;
        this.cognitoAuth.userhandler = {
            onSuccess(session) {
                if (session) {
                    this.session.setItem('_token_valid', 'true', 3500);
                    AWS.config.region = this.region;
                    const url = this.url;
                    const Logins = {}
                    if (this.loggedIn) {
                        Logins[url] = this.cognitoAuth.getSignInUserSession().getIdToken().getJwtToken()
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        AllowUnauthenticatedIdentities: true,
                        IdentityPoolId : this.identityPool,
                        Logins
                    })
                    AWS.config.credentials.get((err) => {
                        if (!err) {
                            console.log('Application init')
                            return {
                                accessKey : AWS.config.credentials.accessKeyId,
                                secretKey : AWS.config.credentials.secretAccessKey,
                                sessionToken : AWS.config.credentials.sessionToken
                            }
                        }
                        return {}
                    })
                    window.location = window.location.href.substr(0, window.location.href.indexOf('#'))
                    }
                }
            },
            onFailure(err) {

            }
        };
        this.cognitoAuth.parseCognitoWebResponse(curUrl);
    }
}
export default CognitoHelper;
